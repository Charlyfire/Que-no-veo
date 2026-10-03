/**
 * MOTOR DE JUEGO Y LÓGICA DE ESTADOS
 */
const Engine = {
  state: {
    mode: 'manual', // 'manual' | 'progressive'
    gameMode: 'single', // 'single' | 'versus' (Modo 2 Jugadores / Equipos)
    currentTurn: 'red', // 'red' | 'blue'
    teamScores: { red: 0, blue: 0 },

    audienceMode: 'kids', // 'kids' | 'adults'
    visualMode: 'normal', // 'normal' | 'silhouettes' (Sombras Mágicas)
    silhouettesDifficulty: 'easy', // 'easy' | 'medium' | 'hard'
    silhouettesPresentation: 'single', // 'single' | 'all'
    silhouetteInteraction: 'tap', // 'tap' | 'drag'
    currentShadowIndex: 0,
    familySelectMode: 'fixed', // 'fixed' | 'random'
    family: 'colegio',
    totalItems: 4,
    missingCount: 1,
    spaceMode: 'keep-slot', // 'keep-slot' | 'reorganize'
    timerDuration: 6000,
    interaction: 'tap', // 'tap' | 'drag'
    orderMode: 'disordered', // 'disordered' | 'ordered'
    bgMode: 'random-image', // 'random-image' | 'theme' | 'fixed-image'
    fixedBgIndex: 1,

    // Adaptativo progresivo
    level: 1,
    consecutiveWins: 0,

    // Datos de la ronda
    currentRoundItems: [],
    missingItems: [],
    remainingToFind: [],
    errorsInRound: 0,
    isObserving: false,
    timerRef: null,
    draggedData: null
  },

  bgImages: [
    'assets/fondos/fondo (1).jpg',
    'assets/fondos/fondo (2).jpg',
    'assets/fondos/fondo (3).jpg',
    'assets/fondos/fondo (4).jpg',
    'assets/fondos/fondo (5).jpg'
  ],

  startRound() {
    clearInterval(this.state.timerRef);
    this.cleanupDragGhosts();
    this.state.errorsInRound = 0;
    this.state.isObserving = true;

    // Lógica de turnos en Modo 2 Jugadores / Equipos
    if (this.state.gameMode === 'versus') {
      this.updateVersusTopBarUI();
    } else {
      const versusTopbar = document.getElementById('versus-topbar-info');
      if (versusTopbar) versusTopbar.style.display = 'none';
    }

    // Configurar interacción según el modo de juego
    if (this.state.visualMode === 'silhouettes') {
      this.state.interaction = this.state.silhouetteInteraction || 'tap';
    } else {
      this.state.interaction = this.state.interaction || 'tap';
    }

    // Si el modo de selección de familia es 'random', elegimos una al azar
    if (this.state.familySelectMode === 'random') {
      const keys = Object.keys(BANCO_FAMILIAS);
      const filtered = keys.filter(k => {
        const fam = BANCO_FAMILIAS[k];
        if (this.state.visualMode === 'silhouettes' && fam.isTextMode) return false;
        const target = fam.target || 'both';
        if (this.state.audienceMode === 'adults') return target === 'adults' || target === 'both';
        return target === 'kids' || target === 'both';
      });
      const validKeys = filtered.length > 0 ? filtered : keys;
      this.state.family = validKeys[Math.floor(Math.random() * validKeys.length)];
    }

    this.updateBackground();

    if (this.state.mode === 'progressive') {
      this.applyProgressiveLevel();
    }

    let familyObj = BANCO_FAMILIAS[this.state.family];
    if (this.state.visualMode === 'silhouettes' && (!familyObj || familyObj.isTextMode)) {
      this.state.family = 'animales';
      familyObj = BANCO_FAMILIAS.animales;
    }
    const familyData = familyObj ? familyObj.items : BANCO_FAMILIAS.colegio.items;

    let targetCount = this.state.totalItems;
    if (this.state.visualMode === 'silhouettes') {
      if (this.state.silhouettesDifficulty === 'easy') targetCount = 4;
      else if (this.state.silhouettesDifficulty === 'medium') targetCount = 4;
      else if (this.state.silhouettesDifficulty === 'hard') targetCount = 5;
    }

    if (this.state.orderMode === 'ordered') {
      const sortedAll = [...familyData].sort((a, b) => {
        if (a.orderValue !== undefined && b.orderValue !== undefined) {
          return a.orderValue - b.orderValue;
        }
        return a.nombre.localeCompare(b.nombre);
      });
      this.state.currentRoundItems = sortedAll.slice(0, Math.min(targetCount, familyData.length));
    } else {
      const shuffled = [...familyData].sort(() => 0.5 - Math.random());
      this.state.currentRoundItems = shuffled.slice(0, Math.min(targetCount, familyData.length));
    }

    const shuffledCurrent = [...this.state.currentRoundItems].sort(() => 0.5 - Math.random());
    this.state.missingItems = shuffledCurrent.slice(0, Math.min(this.state.missingCount, this.state.currentRoundItems.length - 1));
    this.state.remainingToFind = [...this.state.missingItems];

    if (this.state.visualMode === 'silhouettes') {
      this.state.isObserving = false;
      this.state.missingItems = [...this.state.currentRoundItems];
      this.state.remainingToFind = [...this.state.missingItems];
      this.state.currentShadowIndex = 0;

      // Asignar rotación / espejado en dificultad difícil
      this.state.currentRoundItems.forEach((item, idx) => {
        item._isMirrored = (this.state.silhouettesDifficulty === 'hard' && (idx % 2 === 0 || Math.random() > 0.4));
      });

      if (this.state.silhouettesPresentation === 'single') {
        this.renderSingleSilhouetteStep();
      } else {
        this.renderSilhouettesMatchingBoard();
        this.renderSilhouettesMatchingTray();
      }
      return;
    }

    this.renderObservationBoard();
    this.startObservationTimer();
  },

  renderSilhouettesMatchingBoard() {
    const board = document.getElementById('main-board');
    board.innerHTML = '';

    const count = this.state.currentRoundItems.length;
    const cols = count <= 4 ? count : Math.ceil(count / 2);
    board.style.gridTemplateColumns = `repeat(${cols}, minmax(80px, 1fr))`;

    this.state.currentRoundItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card card-silhouette slot-missing';
      if (item.text) card.classList.add('card-word-style');
      card.dataset.id = item.id;
      card.innerHTML = this.renderSilhouetteVisual(item);
      
      this.setupDropTarget(card);

      board.appendChild(card);
    });

    const timerIndicator = document.getElementById('timer-indicator');
    if (timerIndicator) timerIndicator.style.width = '0%';
  },

  renderSilhouettesMatchingTray() {
    const tray = document.getElementById('selection-tray');
    tray.innerHTML = '';

    const familyObj = BANCO_FAMILIAS[this.state.family] || BANCO_FAMILIAS.colegio;
    const familyData = familyObj.items;

    const boardItemIds = new Set(this.state.currentRoundItems.map(i => i.id));
    let availableDistractors = familyData.filter(i => !boardItemIds.has(i.id));

    let distractorCount = 0;
    if (this.state.silhouettesDifficulty === 'medium') distractorCount = 2;
    else if (this.state.silhouettesDifficulty === 'hard') distractorCount = 3;

    if (distractorCount > 0 && availableDistractors.length < distractorCount) {
      const allKeys = Object.keys(BANCO_FAMILIAS);
      const extraItems = [];

      allKeys.forEach(k => {
        const fam = BANCO_FAMILIAS[k];
        if (fam.isTextMode) return;
        const target = fam.target || 'both';
        if (this.state.audienceMode === 'kids' && target === 'adults') return;

        fam.items.forEach(item => {
          if (!boardItemIds.has(item.id) && !availableDistractors.some(c => c.id === item.id)) {
            extraItems.push(item);
          }
        });
      });

      const needed = distractorCount - availableDistractors.length;
      const shuffledExtra = extraItems.sort(() => 0.5 - Math.random()).slice(0, needed);
      availableDistractors = [...availableDistractors, ...shuffledExtra];
    }

    const chosenDistractors = availableDistractors
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(distractorCount, availableDistractors.length));

    const allTrayOptions = [...this.state.currentRoundItems, ...chosenDistractors].sort(() => 0.5 - Math.random());

    allTrayOptions.forEach(item => {
      const tile = document.createElement('div');
      tile.className = 'tray-item';
      if (item.text) tile.classList.add('card-word-style');
      tile.dataset.id = item.id;
      tile.innerHTML = this.renderItemVisual(item, '4.2vw', true);

      if (this.state.interaction === 'tap') {
        tile.addEventListener('click', () => this.handleOptionSelection(tile, item));
      } else {
        this.setupDraggableItem(tile, item);
      }

      tray.appendChild(tile);
    });
  },

  renderSilhouetteVisual(item) {
    const mirrorClass = item._isMirrored ? ' silhouette-mirrored' : '';
    if (item.text) {
      const len = item.text.length;
      let fontSize = '15cqw';
      if (len >= 13) fontSize = '10.5cqw';
      else if (len >= 11) fontSize = '12.5cqw';
      else if (len >= 9) fontSize = '14.5cqw';
      else if (len >= 7) fontSize = '17.5cqw';
      else if (len >= 5) fontSize = '20.5cqw';
      else fontSize = '23cqw';

      return `<span class="word-card-text item-silhouette${mirrorClass}" style="font-size: ${fontSize};">${item.text}</span>`;
    }
    if (item.img) {
      return `<img src="${item.img}" class="item-silhouette${mirrorClass}" alt="${item.nombre || ''}">`;
    }
    return `<span class="icon-content item-silhouette${mirrorClass}" style="font-size: 50cqw">${item.icon}</span>`;
  },

  updateVersusTopBarUI() {
    const versusTopbar = document.getElementById('versus-topbar-info');
    const turnBadge = document.getElementById('versus-turn-badge');
    const redScore = document.getElementById('score-red');
    const blueScore = document.getElementById('score-blue');

    if (versusTopbar) {
      versusTopbar.style.display = 'flex';
      if (redScore) redScore.textContent = this.state.teamScores.red;
      if (blueScore) blueScore.textContent = this.state.teamScores.blue;

      if (turnBadge) {
        if (this.state.currentTurn === 'red') {
          turnBadge.innerHTML = '🔴 Turno: Equipo Rojo';
          turnBadge.style.color = '#EF4444';
        } else {
          turnBadge.innerHTML = '🔵 Turno: Equipo Azul';
          turnBadge.style.color = '#3B82F6';
        }
      }
    }
  },

  renderObservationBoard() {
    const board = document.getElementById('main-board');
    board.innerHTML = '';

    const count = this.state.currentRoundItems.length;
    const cols = count <= 4 ? count : Math.ceil(count / 2);
    board.style.gridTemplateColumns = `repeat(${cols}, minmax(80px, 1fr))`;

    this.state.currentRoundItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      if (item.text) card.classList.add('card-word-style');
      if (this.state.visualMode === 'silhouettes') card.classList.add('card-silhouette');
      card.dataset.id = item.id;
      card.innerHTML = this.renderItemVisual(item, '6.5vw', false);
      board.appendChild(card);
    });

    const tray = document.getElementById('selection-tray');
    const msgText = this.state.timerDuration === 0
      ? '👀 Memoria Visual: Toca el botón cuando los recuerdes...'
      : '👀 ¡Fíjate bien! Tienes unos segundos...';

    tray.innerHTML = `
      <div id="tray-instruction">
        <span>${msgText}</span>
        <button class="btn btn-ready-tray pulse-btn" id="btn-manual-ready">¡Ya los tengo! 🚀</button>
      </div>
    `;

    const readyBtn = document.getElementById('btn-manual-ready');
    if (readyBtn) {
      readyBtn.addEventListener('click', () => {
        if (this.state.isObserving) {
          this.endObservationPhase();
        }
      });
    }
  },

  renderItemVisual(item, iconSize = '50cqw', isTray = false) {
    const isSilhouette = (!isTray && this.state.isObserving && this.state.visualMode === 'silhouettes');
    const silhouetteClass = isSilhouette ? ' item-silhouette' : '';

    if (item.text) {
      const len = item.text.length;
      let fontSize = '15cqw';
      if (len >= 13) fontSize = '10.5cqw';
      else if (len >= 11) fontSize = '12.5cqw';
      else if (len >= 9) fontSize = '14.5cqw';
      else if (len >= 7) fontSize = '17.5cqw';
      else if (len >= 5) fontSize = '20.5cqw';
      else fontSize = '23cqw';

      return `<span class="word-card-text${silhouetteClass}" style="font-size: ${fontSize};">${item.text}</span>`;
    }
    if (item.img) {
      return `<img src="${item.img}" class="${silhouetteClass.trim()}" alt="${item.nombre || ''}">`;
    }
    const calcIconSize = isTray ? '45cqw' : '50cqw';
    return `<span class="icon-content${silhouetteClass}" style="font-size: ${calcIconSize}">${item.icon}</span>`;
  },

  startObservationTimer() {
    this.state.isObserving = true;
    const bar = document.getElementById('timer-indicator');

    if (this.state.timerDuration === 0) {
      bar.style.width = '100%';
      return;
    }

    bar.style.transition = 'none';
    bar.style.width = '100%';

    const startTime = Date.now();
    this.state.timerRef = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, this.state.timerDuration - elapsed);
      const pct = (remaining / this.state.timerDuration) * 100;
      bar.style.width = pct + '%';

      if (remaining <= 0) {
        clearInterval(this.state.timerRef);
        this.endObservationPhase();
      }
    }, 50);
  },

  endObservationPhase() {
    this.state.isObserving = false;
    clearInterval(this.state.timerRef);
    document.getElementById('timer-indicator').style.width = '0%';
    document.getElementById('btn-manual-ready').style.display = 'none';

    const board = document.getElementById('main-board');
    const cards = board.querySelectorAll('.card');

    const shouldKeepSlots = this.state.interaction === 'drag' || this.state.spaceMode === 'keep-slot';

    if (shouldKeepSlots) {
      cards.forEach(card => {
        const isMissing = this.state.missingItems.some(m => m.id === card.dataset.id);
        if (isMissing) {
          card.classList.add('slot-missing');
          card.innerHTML = `<span class="slot-question">❓</span>`;
          if (this.state.interaction === 'drag') {
            this.setupDropTarget(card);
          }
        }
      });
    } else {
      board.innerHTML = '';
      const remainingItems = this.state.currentRoundItems.filter(
        item => !this.state.missingItems.some(m => m.id === item.id)
      );
      const cols = remainingItems.length <= 4 ? remainingItems.length : Math.ceil(remainingItems.length / 2);
      board.style.gridTemplateColumns = `repeat(${cols}, minmax(80px, 1fr))`;

      remainingItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        if (item.text) card.classList.add('card-word-style');
        card.dataset.id = item.id;
        card.innerHTML = this.renderItemVisual(item, '6.5vw', false);
        board.appendChild(card);
      });
    }

    this.renderSelectionTray();
  },

  renderSelectionTray() {
    const tray = document.getElementById('selection-tray');
    tray.innerHTML = '';

    const currentFamKey = this.state.family;
    const currentFamObj = BANCO_FAMILIAS[currentFamKey] || BANCO_FAMILIAS.colegio;
    const currentBoardItemIds = new Set(this.state.currentRoundItems.map(item => item.id));

    // 1. Obtener distractores de la misma familia
    let candidateDistractors = currentFamObj.items.filter(item => !currentBoardItemIds.has(item.id));

    // 2. Garantizar un mínimo de 4 opciones en la bandeja para que siempre haya varias alternativas visuales
    const targetMinOptions = Math.max(4, this.state.missingItems.length + 2);

    if (candidateDistractors.length + this.state.missingItems.length < targetMinOptions) {
      const allKeys = Object.keys(BANCO_FAMILIAS);
      const extraItems = [];

      allKeys.forEach(k => {
        const fam = BANCO_FAMILIAS[k];
        if (this.state.visualMode === 'silhouettes' && fam.isTextMode) return;
        const target = fam.target || 'both';
        if (this.state.audienceMode === 'kids' && target === 'adults') return;

        fam.items.forEach(item => {
          if (!currentBoardItemIds.has(item.id) && !candidateDistractors.some(c => c.id === item.id)) {
            extraItems.push(item);
          }
        });
      });

      const needed = targetMinOptions - (candidateDistractors.length + this.state.missingItems.length);
      const shuffledExtra = extraItems.sort(() => 0.5 - Math.random()).slice(0, needed);
      candidateDistractors = [...candidateDistractors, ...shuffledExtra];
    }

    const maxDistractorCount = Math.max(2, targetMinOptions - this.state.missingItems.length);
    const chosenDistractors = candidateDistractors
      .sort(() => 0.5 - Math.random())
      .slice(0, maxDistractorCount);

    const options = [...this.state.missingItems, ...chosenDistractors].sort(() => 0.5 - Math.random());

    options.forEach(item => {
      const tile = document.createElement('div');
      tile.className = 'tray-item';
      if (item.text) tile.classList.add('card-word-style');
      tile.dataset.id = item.id;
      tile.innerHTML = this.renderItemVisual(item, '4.2vw', true);

      if (this.state.interaction === 'tap') {
        tile.addEventListener('click', () => this.handleOptionSelection(tile, item));
      } else {
        this.setupDraggableItem(tile, item);
      }

      tray.appendChild(tile);
    });
  },

  renderSingleSilhouetteStep() {
    const board = document.getElementById('main-board');
    board.innerHTML = '';
    board.style.gridTemplateColumns = '1fr';

    const total = this.state.currentRoundItems.length;
    const currentIndex = this.state.currentShadowIndex;
    const targetItem = this.state.currentRoundItems[currentIndex];

    // Contenedor principal de la sombra única
    const singleContainer = document.createElement('div');
    singleContainer.className = 'single-shadow-container';

    // Barra de progreso de la ronda de sombras
    let dotsHTML = '';
    for (let i = 0; i < total; i++) {
      if (i < currentIndex) {
        dotsHTML += `<span class="shadow-dot completed">✓</span>`;
      } else if (i === currentIndex) {
        dotsHTML += `<span class="shadow-dot active">👤</span>`;
      } else {
        dotsHTML += `<span class="shadow-dot pending">○</span>`;
      }
    }

    const progressHeader = document.createElement('div');
    progressHeader.className = 'single-shadow-header';
    progressHeader.innerHTML = `
      <span class="shadow-progress-title">✨ Sombra ${currentIndex + 1} de ${total} ✨</span>
      <div class="shadow-dots-bar">${dotsHTML}</div>
    `;
    singleContainer.appendChild(progressHeader);

    // Carta con la sombra a adivinar
    const shadowCard = document.createElement('div');
    shadowCard.className = 'card card-silhouette card-single-target slot-missing';
    shadowCard.dataset.id = targetItem.id;
    shadowCard.id = 'current-single-shadow-card';
    shadowCard.innerHTML = this.renderSilhouetteVisual(targetItem);

    if (this.state.interaction === 'drag') {
      this.setupDropTarget(shadowCard);
    }

    singleContainer.appendChild(shadowCard);
    board.appendChild(singleContainer);

    const timerIndicator = document.getElementById('timer-indicator');
    if (timerIndicator) timerIndicator.style.width = '0%';

    this.renderSingleSilhouetteTray(targetItem);
  },

  renderSingleSilhouetteTray(targetItem) {
    const tray = document.getElementById('selection-tray');
    tray.innerHTML = '';

    const familyObj = BANCO_FAMILIAS[this.state.family] || BANCO_FAMILIAS.colegio;
    const familyData = familyObj.items;

    let distractorCount = 2; // Fácil: 3 opciones (1 correcta + 2 distractores)
    if (this.state.silhouettesDifficulty === 'medium') distractorCount = 3; // 4 opciones
    else if (this.state.silhouettesDifficulty === 'hard') distractorCount = 3; // 4 opciones

    let availableDistractors = familyData.filter(i => i.id !== targetItem.id);

    if (availableDistractors.length < distractorCount) {
      const allKeys = Object.keys(BANCO_FAMILIAS);
      const extraItems = [];

      allKeys.forEach(k => {
        const fam = BANCO_FAMILIAS[k];
        if (fam.isTextMode) return;
        const target = fam.target || 'both';
        if (this.state.audienceMode === 'kids' && target === 'adults') return;

        fam.items.forEach(item => {
          if (item.id !== targetItem.id && !availableDistractors.some(c => c.id === item.id)) {
            extraItems.push(item);
          }
        });
      });

      const needed = distractorCount - availableDistractors.length;
      const shuffledExtra = extraItems.sort(() => 0.5 - Math.random()).slice(0, needed);
      availableDistractors = [...availableDistractors, ...shuffledExtra];
    }

    const chosenDistractors = availableDistractors
      .sort(() => 0.5 - Math.random())
      .slice(0, distractorCount);

    const trayOptions = [targetItem, ...chosenDistractors].sort(() => 0.5 - Math.random());

    trayOptions.forEach(item => {
      const tile = document.createElement('div');
      tile.className = 'tray-item tray-item-large';
      if (item.text) tile.classList.add('card-word-style');
      tile.dataset.id = item.id;
      tile.innerHTML = this.renderItemVisual(item, '4.2vw', true);

      if (this.state.interaction === 'tap') {
        tile.addEventListener('click', () => this.handleOptionSelection(tile, item));
      } else {
        this.setupDraggableItem(tile, item);
      }

      tray.appendChild(tile);
    });
  },

  handleOptionSelection(element, item) {
    if (this.state.visualMode === 'silhouettes') {
      if (this.state.silhouettesPresentation === 'single') {
        const targetItem = this.state.currentRoundItems[this.state.currentShadowIndex];
        const shadowCard = document.getElementById('current-single-shadow-card');

        if (item.id === targetItem.id) {
          AudioFx.correct();
          if (element) {
            element.classList.add('correct');
            element.style.pointerEvents = 'none';
          }

          if (shadowCard) {
            shadowCard.classList.remove('card-silhouette', 'slot-missing');
            shadowCard.classList.add('correct', 'revealed-single-card');
            shadowCard.innerHTML = `
              ${this.renderItemVisual(item, '6.5vw', false)}
              <div class="revealed-item-name">${item.nombre || item.text}</div>
            `;
          }

          const trayItems = document.querySelectorAll('#selection-tray .tray-item');
          trayItems.forEach(t => t.style.pointerEvents = 'none');

          this.state.currentShadowIndex++;

          if (this.state.currentShadowIndex >= this.state.currentRoundItems.length) {
            setTimeout(() => this.handleRoundWin(), 900);
          } else {
            setTimeout(() => this.renderSingleSilhouetteStep(), 900);
          }
        } else {
          this.state.errorsInRound++;
          AudioFx.wrong();
          if (element) {
            element.classList.add('wrong');
            setTimeout(() => element.classList.remove('wrong'), 450);
          }
        }
        return;
      }

      const slot = document.querySelector(`.card.slot-missing[data-id="${item.id}"]`);
      if (slot) {
        AudioFx.correct();
        if (element) {
          element.classList.add('correct');
          element.style.opacity = '0.25';
          element.style.pointerEvents = 'none';
        }

        slot.classList.remove('card-silhouette');
        slot.classList.remove('slot-missing');
        slot.classList.add('correct');
        slot.innerHTML = this.renderItemVisual(item, '6.5vw', false);

        this.state.remainingToFind = this.state.remainingToFind.filter(t => t.id !== item.id);

        if (this.state.remainingToFind.length === 0) {
          setTimeout(() => this.handleRoundWin(), 500);
        }
      } else {
        this.state.errorsInRound++;
        AudioFx.wrong();
        if (element) {
          element.classList.add('wrong');
          setTimeout(() => element.classList.remove('wrong'), 450);
        }
      }
      return;
    }

    const isTarget = this.state.remainingToFind.some(target => target.id === item.id);

    if (isTarget) {
      AudioFx.correct();
      element.classList.add('correct');
      element.style.pointerEvents = 'none';

      const slot = document.querySelector(`.card.slot-missing[data-id="${item.id}"]`) || document.querySelector('.card.slot-missing');
      if (slot) {
        slot.classList.remove('slot-missing');
        slot.dataset.id = item.id;
        if (item.text) slot.classList.add('card-word-style');
        slot.innerHTML = this.renderItemVisual(item, '6.5vw', false);
      }

      this.state.remainingToFind = this.state.remainingToFind.filter(t => t.id !== item.id);

      if (this.state.remainingToFind.length === 0) {
        setTimeout(() => this.handleRoundWin(), 500);
      }
    } else {
      this.state.errorsInRound++;
      AudioFx.wrong();
      element.classList.add('wrong');
      setTimeout(() => element.classList.remove('wrong'), 450);
    }
  },

  handleRoundWin() {
    let starsEarned = 3;
    if (this.state.errorsInRound === 1) starsEarned = 2;
    else if (this.state.errorsInRound >= 2) starsEarned = 1;

    if (this.state.gameMode === 'versus') {
      const points = starsEarned * 10;
      this.state.teamScores[this.state.currentTurn] += points;
    }

    const result = Rewards.addRoundResult(starsEarned, this.state.family);

    if (this.state.mode === 'progressive') {
      this.state.consecutiveWins++;
      if (this.state.consecutiveWins >= 2) {
        this.state.level++;
        this.state.consecutiveWins = 0;
      }
    }

    if (result.newlyUnlocked && result.newlyUnlocked.length > 0) {
      AudioFx.medalUnlock();
    } else {
      AudioFx.successRound();
    }

    this.showFeedbackModal(result);
    this.launchConfetti();

    if (this.state.gameMode === 'versus') {
      this.state.currentTurn = this.state.currentTurn === 'red' ? 'blue' : 'red';
    }
  },

  showFeedbackModal(result) {
    const modal = document.getElementById('feedback-modal');
    const titleEl = modal.querySelector('h2');
    const starsContainer = modal.querySelector('.feedback-stars');
    const medalNotice = document.getElementById('feedback-medal-notice');

    if (this.state.gameMode === 'versus') {
      const activeTeamName = this.state.currentTurn === 'red' ? '🔴 Equipo Rojo' : '🔵 Equipo Azul';
      titleEl.textContent = `¡PUNTO PARA EL ${activeTeamName.toUpperCase()}! 🏆`;
    } else if (this.state.audienceMode === 'adults') {
      titleEl.textContent = '¡EXCELENTE MEMORIA! 🧠';
    } else {
      titleEl.textContent = '¡GENIAL! 🌟';
    }

    starsContainer.innerHTML = '⭐'.repeat(result.starsEarned) + '☆'.repeat(3 - result.starsEarned);

    let noticeContent = '';

    if (result.chestsGained > 0) {
      noticeContent += `
        <div class="unlocked-medal-card" style="background: linear-gradient(135deg, #FFFDE7, #FFF59D); border-color: #FFD56B;">
          <span class="unlocked-icon">🎁</span>
          <div>
            <strong>¡HAS GANADO ${result.chestsGained} COFRE MÁGICO!</strong>
            <p>Abre tu cofre en el menú para conseguir coleccionables.</p>
          </div>
        </div>
      `;
    }

    if (result.newlyUnlocked && result.newlyUnlocked.length > 0) {
      const medal = result.newlyUnlocked[0];
      noticeContent += `
        <div class="unlocked-medal-card">
          <span class="unlocked-icon">${medal.icon}</span>
          <div>
            <strong>¡NUEVA MEDALLA DESBLOQUEADA!</strong>
            <p>${medal.nombre} - ${medal.descripcion}</p>
          </div>
        </div>
      `;
    }

    if (noticeContent) {
      medalNotice.style.display = 'block';
      medalNotice.innerHTML = noticeContent;
    } else {
      medalNotice.style.display = 'none';
      medalNotice.innerHTML = '';
    }

    modal.classList.add('active');
  },

  launchConfetti() {
    const wrapper = document.getElementById('game-wrapper');
    const colors = ['#FFD56B', '#FF7B54', '#4E9F3D', '#03A9F4', '#AB47BC', '#38BDF8'];
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = '-5%';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      p.style.animationDuration = (1.2 + Math.random() * 1.5) + 's';
      wrapper.appendChild(p);
      setTimeout(() => p.remove(), 2800);
    }
  },

  cleanupDragGhosts() {
    document.querySelectorAll('.drag-ghost').forEach(ghost => ghost.remove());
    document.querySelectorAll('.card.slot-missing').forEach(s => {
      s.classList.remove('drag-active');
      s.classList.remove('drop-hover');
    });
    this.state.draggedData = null;
  },

  setupDraggableItem(element, item) {
    element.style.touchAction = 'none';
    element.removeAttribute('draggable');

    const onPointerDown = (e) => {
      if (this.state.interaction !== 'drag') return;
      if (e.cancelable) e.preventDefault();

      this.cleanupDragGhosts();

      this.state.draggedData = { element, item };

      const ghost = element.cloneNode(true);
      ghost.classList.add('drag-ghost');

      const touchX = e.clientX;
      const touchY = e.clientY;

      ghost.style.left = (touchX - 50) + 'px';
      ghost.style.top = (touchY - 50) + 'px';
      document.body.appendChild(ghost);

      element.classList.add('dragging');
      document.querySelectorAll('.card.slot-missing').forEach(s => s.classList.add('drag-active'));

      const onPointerMove = (moveEvt) => {
        const curX = moveEvt.clientX;
        const curY = moveEvt.clientY;

        ghost.style.left = (curX - 50) + 'px';
        ghost.style.top = (curY - 50) + 'px';

        ghost.style.display = 'none';
        const hoveredEl = document.elementFromPoint(curX, curY);
        ghost.style.display = 'flex';

        document.querySelectorAll('.card.slot-missing').forEach(s => s.classList.remove('drop-hover'));
        const slot = hoveredEl ? hoveredEl.closest('.card.slot-missing') : null;
        if (slot) {
          slot.classList.add('drop-hover');
        }
      };

      const onPointerUp = (upEvt) => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);

        const endX = upEvt.clientX;
        const endY = upEvt.clientY;

        ghost.style.display = 'none';
        const hoveredEl = document.elementFromPoint(endX, endY);
        ghost.remove();

        const slot = hoveredEl ? hoveredEl.closest('.card.slot-missing') : null;
        if (slot) {
          if (slot.dataset.id === item.id || (this.state.visualMode !== 'silhouettes' && this.state.remainingToFind.some(t => t.id === item.id))) {
            this.handleOptionSelection(element, item);
          } else {
            this.state.errorsInRound++;
            AudioFx.wrong();
            element.classList.add('wrong');
            setTimeout(() => element.classList.remove('wrong'), 450);
          }
        }

        element.classList.remove('dragging');
        document.querySelectorAll('.card.slot-missing').forEach(s => {
          s.classList.remove('drag-active');
          s.classList.remove('drop-hover');
        });
        this.state.draggedData = null;
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    };

    element.addEventListener('pointerdown', onPointerDown);
  },

  setupDropTarget(slotElement) {
    // Drop logic handled via document.elementFromPoint in setupDraggableItem
  },

  applyProgressiveLevel() {
    document.getElementById('level-number').innerText = this.state.level;
    if (this.state.level === 1) {
      this.state.totalItems = 3;
      this.state.missingCount = 1;
      this.state.spaceMode = 'keep-slot';
    } else if (this.state.level === 2) {
      this.state.totalItems = 4;
      this.state.missingCount = 1;
      this.state.spaceMode = 'keep-slot';
    } else if (this.state.level === 3) {
      this.state.totalItems = 4;
      this.state.missingCount = 1;
      this.state.spaceMode = 'reorganize';
    } else if (this.state.level === 4) {
      this.state.totalItems = 5;
      this.state.missingCount = 2;
      this.state.spaceMode = 'keep-slot';
    } else if (this.state.level >= 5) {
      this.state.totalItems = 6;
      this.state.missingCount = 2;
      this.state.spaceMode = 'reorganize';
    }
  },

  updateBackground() {
    const wrapper = document.getElementById('game-wrapper');
    const currentFam = BANCO_FAMILIAS[this.state.family] || BANCO_FAMILIAS.colegio;

    let ambient = document.getElementById('ambient-bg-pattern');
    if (!ambient) {
      ambient = document.createElement('div');
      ambient.id = 'ambient-bg-pattern';
      wrapper.appendChild(ambient);
    }

    if (this.state.audienceMode === 'adults') {
      wrapper.classList.add('theme-adults');
    } else {
      wrapper.classList.remove('theme-adults');
    }

    if (this.state.bgMode === 'random-image') {
      const chosenImg = this.bgImages[Math.floor(Math.random() * this.bgImages.length)];
      const overlayColor = this.state.audienceMode === 'adults' ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255,255,255,0.35)';
      wrapper.style.background = `linear-gradient(${overlayColor}, ${overlayColor}), url("${chosenImg}") center/cover no-repeat`;
      ambient.style.display = 'none';
    } else if (this.state.bgMode === 'fixed-image') {
      const imgPath = `assets/fondos/fondo (${this.state.fixedBgIndex}).jpg`;
      const overlayColor = this.state.audienceMode === 'adults' ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255,255,255,0.35)';
      wrapper.style.background = `linear-gradient(${overlayColor}, ${overlayColor}), url("${imgPath}") center/cover no-repeat`;
      ambient.style.display = 'none';
    } else {
      wrapper.style.background = currentFam.bg;
      ambient.style.display = 'flex';
      ambient.textContent = (currentFam.pattern + " ").repeat(6);
    }
  }
};
