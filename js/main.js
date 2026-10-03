/**
 * PUNTO DE ENTRADA Y GESTIÓN DE LA INTERFAZ
 */
let currentRewardsTab = 'family'; // 'family' | 'global' | 'collectibles'

document.addEventListener('DOMContentLoaded', () => {
  Rewards.init();
  initSettingsUI();
  setupPresets();
  setupSettingsSubtabs();
  setupNavigationEvents();
  setupChestEvents();
  setupResetEvents();
  Engine.updateBackground();
});

function populateFamilySelect() {
  const familySelects = document.querySelectorAll('.cfg-family-select');
  familySelects.forEach(familySelect => {
    familySelect.innerHTML = '';

    const randOpt = document.createElement('option');
    randOpt.value = 'random';
    randOpt.textContent = '🎲 Aleatoria (Cambia en cada ronda)';
    if (Engine.state.familySelectMode === 'random') randOpt.selected = true;
    familySelect.appendChild(randOpt);

    const keys = Object.keys(BANCO_FAMILIAS);
    keys.forEach(key => {
      const fam = BANCO_FAMILIAS[key];
      const target = fam.target || 'both';

      let show = true;
      if (Engine.state.audienceMode === 'kids' && target === 'adults') show = false;
      if (Engine.state.visualMode === 'silhouettes' && fam.isTextMode) show = false;

      if (show) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = fam.nombre;
        if (Engine.state.familySelectMode === 'fixed' && key === Engine.state.family) {
          opt.selected = true;
        }
        familySelect.appendChild(opt);
      }
    });
  });
}

function initSettingsUI() {
  populateFamilySelect();

  document.querySelectorAll('.cfg-family-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'random') {
        Engine.state.familySelectMode = 'random';
      } else {
        Engine.state.familySelectMode = 'fixed';
        Engine.state.family = val;
      }
      document.querySelectorAll('.cfg-family-select').forEach(s => s.value = val);
    });
  });

  const syncGameMode = (val) => {
    Engine.state.gameMode = val;
    updateButtonGroupActive('group-game-mode', val);
    updateButtonGroupActive('group-game-mode-adults', val);
    updateButtonGroupActive('group-game-mode-silhouettes', val);
  };
  setupButtonGroup('group-game-mode', syncGameMode);
  setupButtonGroup('group-game-mode-adults', syncGameMode);
  setupButtonGroup('group-game-mode-silhouettes', syncGameMode);

  document.querySelectorAll('.cfg-bg-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'random-image') Engine.state.bgMode = 'random-image';
      else if (val === 'theme') Engine.state.bgMode = 'theme';
      else if (val.startsWith('fixed-')) {
        Engine.state.bgMode = 'fixed-image';
        Engine.state.fixedBgIndex = parseInt(val.split('-')[1], 10);
      }
      document.querySelectorAll('.cfg-bg-select').forEach(s => s.value = val);
      Engine.updateBackground();
    });
  });

  document.querySelectorAll('.cfg-total-range').forEach(rangeInput => {
    rangeInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      Engine.state.totalItems = val;
      document.querySelectorAll('.cfg-total-range').forEach(r => r.value = val);
      document.querySelectorAll('.cfg-total-output').forEach(out => out.textContent = val);
      validateMissingCount();
    });
  });

  document.querySelectorAll('.cfg-missing-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const val = parseInt(e.target.value, 10);
      Engine.state.missingCount = val;
      document.querySelectorAll('.cfg-missing-select').forEach(s => s.value = val);
    });
  });

  document.querySelectorAll('.cfg-timer-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const val = parseInt(e.target.value, 10);
      Engine.state.timerDuration = val;
      document.querySelectorAll('.cfg-timer-select').forEach(s => s.value = val);
    });
  });

  setupButtonGroup('group-order-adults', (val) => Engine.state.orderMode = val);
  setupButtonGroup('group-mode-adults', (val) => {
    Engine.state.mode = val;
    document.getElementById('level-badge').style.display = val === 'progressive' ? 'flex' : 'none';
  });

  setupButtonGroup('group-silhouettes-difficulty', (val) => {
    Engine.state.silhouettesDifficulty = val;
  });

  setupButtonGroup('group-silhouettes-presentation', (val) => {
    Engine.state.silhouettesPresentation = val;
  });

  setupButtonGroup('group-silhouettes-interaction', (val) => {
    Engine.state.silhouetteInteraction = val;
    if (Engine.state.visualMode === 'silhouettes') {
      Engine.state.interaction = val;
    }
  });

  setupButtonGroup('group-space', (val) => Engine.state.spaceMode = val);
  setupButtonGroup('group-interaction', (val) => Engine.state.interaction = val);
}

function setupPresets() {
  // Mantener compatibilidad si es necesario
}

function applyPreset(config) {
  Object.assign(Engine.state, config);
  populateFamilySelect();
  Engine.updateBackground();
}

function updateButtonGroupActive(groupId, val) {
  const container = document.getElementById(groupId);
  if (!container) return;
  const buttons = container.querySelectorAll('.toggle-btn');
  buttons.forEach(btn => {
    if (btn.dataset.value === val) btn.classList.add('selected');
    else btn.classList.remove('selected');
  });
}

function setupSettingsSubtabs() {
  const tKids = document.getElementById('tab-mode-kids');
  const tAdults = document.getElementById('tab-mode-adults');
  const tSilhouettes = document.getElementById('tab-mode-silhouettes');

  const secKids = document.getElementById('sec-mode-kids');
  const secAdults = document.getElementById('sec-mode-adults');
  const secSilhouettes = document.getElementById('sec-mode-silhouettes');

  const activateTab = (activeTab, activeSec, audience, visual) => {
    [tKids, tAdults, tSilhouettes].forEach(t => t && t.classList.remove('active'));
    [secKids, secAdults, secSilhouettes].forEach(s => s && (s.style.display = 'none'));

    if (activeTab) activeTab.classList.add('active');
    if (activeSec) activeSec.style.display = 'flex';

    Engine.state.audienceMode = audience;
    Engine.state.visualMode = visual;
    if (visual === 'silhouettes') Engine.state.interaction = Engine.state.silhouetteInteraction || 'tap';
    else Engine.state.interaction = 'tap';

    const subtitle = document.getElementById('home-subtitle');
    if (subtitle) {
      subtitle.textContent = audience === 'adults'
        ? '🧠 Entrenamiento de Memoria Visual y Agilidad Cognitiva'
        : '¡Abre bien los ojos antes de que desaparezca!';
    }

    populateFamilySelect();
    Engine.updateBackground();
  };

  if (tKids) tKids.addEventListener('click', () => activateTab(tKids, secKids, 'kids', 'normal'));
  if (tAdults) tAdults.addEventListener('click', () => activateTab(tAdults, secAdults, 'adults', 'normal'));
  if (tSilhouettes) tSilhouettes.addEventListener('click', () => activateTab(tSilhouettes, secSilhouettes, 'kids', 'silhouettes'));

  const btnOpenSettings = document.getElementById('btn-open-settings');
  if (btnOpenSettings) {
    btnOpenSettings.addEventListener('click', () => {
      if (Engine.state.visualMode === 'silhouettes') {
        activateTab(tSilhouettes, secSilhouettes, 'kids', 'silhouettes');
      } else if (Engine.state.audienceMode === 'adults') {
        activateTab(tAdults, secAdults, 'adults', 'normal');
      } else {
        activateTab(tKids, secKids, 'kids', 'normal');
      }
    });
  }
}

function setupNavigationEvents() {
  const btnQueNoVeo = document.getElementById('btn-play-que-no-veo');
  if (btnQueNoVeo) {
    btnQueNoVeo.addEventListener('click', () => {
      Engine.state.visualMode = 'normal';
      Engine.state.interaction = 'tap';
      AudioFx.init();
      autoLockLandscape();
      showScreen('game-screen');
      Engine.startRound();
    });
  }

  const btnSombras = document.getElementById('btn-play-sombras-magicas');
  if (btnSombras) {
    btnSombras.addEventListener('click', () => {
      Engine.state.visualMode = 'silhouettes';
      Engine.state.interaction = Engine.state.silhouetteInteraction || 'tap';
      AudioFx.init();
      autoLockLandscape();
      showScreen('game-screen');
      Engine.startRound();
    });
  }

  document.getElementById('btn-open-settings').addEventListener('click', () => {
    showScreen('settings-screen');
  });

  document.getElementById('btn-close-settings').addEventListener('click', () => {
    showScreen('home-screen');
    Engine.updateBackground();
  });

  const btnExitApp = document.getElementById('btn-exit-app');
  if (btnExitApp) {
    btnExitApp.addEventListener('click', () => {
      const confirmExit = confirm("¿Estás seguro de que deseas salir del juego?");
      if (confirmExit) {
        AudioFx.init();
        try {
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          window.close();
          window.location.href = "about:blank";
        } catch (e) {
          window.close();
        }
      }
    });
  }

  const exitToMenu = () => {
    clearInterval(Engine.state.timerRef);
    if (Engine.cleanupDragGhosts) Engine.cleanupDragGhosts();
    document.getElementById('feedback-modal').classList.remove('active');
    showScreen('home-screen');
    Engine.updateBackground();
  };

  document.getElementById('btn-ingame-home').addEventListener('click', exitToMenu);

  const feedbackExit = document.getElementById('btn-feedback-exit');
  if (feedbackExit) feedbackExit.addEventListener('click', exitToMenu);

  document.getElementById('btn-manual-ready').addEventListener('click', () => {
    if (Engine.state.isObserving) {
      Engine.endObservationPhase();
    }
  });

  document.getElementById('btn-next-round').addEventListener('click', () => {
    document.getElementById('feedback-modal').classList.remove('active');
    Engine.startRound();
  });

  const openRewards = () => {
    renderRewardsAlbum(currentRewardsTab);
    document.getElementById('rewards-modal').classList.add('active');
  };

  const closeRewards = () => {
    document.getElementById('rewards-modal').classList.remove('active');
  };

  document.getElementById('btn-open-rewards-home').addEventListener('click', openRewards);
  document.getElementById('btn-open-rewards-topbar').addEventListener('click', openRewards);
  document.getElementById('btn-close-rewards').addEventListener('click', closeRewards);

  const tabFamily = document.getElementById('tab-family-medals');
  const tabGlobal = document.getElementById('tab-global-medals');
  const tabCollectibles = document.getElementById('tab-collectibles-medals');

  if (tabFamily && tabGlobal && tabCollectibles) {
    tabFamily.addEventListener('click', () => {
      currentRewardsTab = 'family';
      tabFamily.classList.add('active');
      tabGlobal.classList.remove('active');
      tabCollectibles.classList.remove('active');
      renderRewardsAlbum('family');
    });

    tabGlobal.addEventListener('click', () => {
      currentRewardsTab = 'global';
      tabGlobal.classList.add('active');
      tabFamily.classList.remove('active');
      tabCollectibles.classList.remove('active');
      renderRewardsAlbum('global');
    });

    tabCollectibles.addEventListener('click', () => {
      currentRewardsTab = 'collectibles';
      tabCollectibles.classList.add('active');
      tabFamily.classList.remove('active');
      tabGlobal.classList.remove('active');
      renderCollectiblesAlbum();
    });
  }
}

function setupResetEvents() {
  const handleReset = () => {
    const confirmReset = confirm("¿Estás seguro de que deseas reiniciar la puntuación, nivel y medallas para que juegue un nuevo jugador?");
    if (confirmReset) {
      AudioFx.init();
      AudioFx.wrong();
      Rewards.resetProgress();
      showScreen('home-screen');
      alert("🔄 ¡Puntuación y nivel reiniciados con éxito! ¡Bienvenido nuevo jugador!");
    }
  };

  const btnProfileReset = document.getElementById('btn-reset-player-profile');
  const btnSettingsReset = document.getElementById('btn-reset-scores-settings');

  if (btnProfileReset) btnProfileReset.addEventListener('click', handleReset);
  if (btnSettingsReset) btnSettingsReset.addEventListener('click', handleReset);
}

function autoLockLandscape() {
  try {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().then(() => {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('landscape').catch(() => {});
        }
      }).catch(() => {});
    }
  } catch (e) {}
}

function setupChestEvents() {
  const btnChestHome = document.getElementById('btn-open-chest-home');
  const chestModal = document.getElementById('chest-modal');
  const chestClickZone = document.getElementById('chest-click-zone');
  const chestGraphic = document.getElementById('chest-graphic');
  const chestPrompt = document.getElementById('chest-prompt-text');
  const revealContainer = document.getElementById('chest-reveal-container');
  const btnClaim = document.getElementById('btn-claim-chest');

  const openChestModal = () => {
    AudioFx.init();
    chestGraphic.textContent = '🎁';
    chestGraphic.style.transform = 'scale(1)';
    chestPrompt.style.display = 'block';
    chestPrompt.textContent = '✨ ¡Toca el cofre para abrirlo! ✨';
    revealContainer.style.display = 'none';
    chestModal.classList.add('active');
  };

  if (btnChestHome) {
    btnChestHome.addEventListener('click', openChestModal);
  }

  if (chestClickZone) {
    chestClickZone.addEventListener('click', () => {
      if (revealContainer.style.display === 'flex' || revealContainer.style.display === 'block') return;

      const reward = Rewards.openChest();
      if (!reward) return;

      AudioFx.medalUnlock();
      Engine.launchConfetti();

      chestGraphic.textContent = '📦';
      chestPrompt.style.display = 'none';

      document.getElementById('reveal-icon').textContent = reward.icon;
      document.getElementById('reveal-title').textContent = reward.nombre;
      document.getElementById('reveal-desc').textContent = reward.desc;

      revealContainer.style.display = 'flex';
    });
  }

  if (btnClaim) {
    btnClaim.addEventListener('click', () => {
      chestModal.classList.remove('active');
      if (Rewards.availableChests > 0) {
        setTimeout(() => openChestModal(), 300);
      }
    });
  }
}

function renderRewardsAlbum(tabType = 'family') {
  if (tabType === 'collectibles') {
    renderCollectiblesAlbum();
    return;
  }

  const container = document.getElementById('medals-grid-container');
  container.innerHTML = '';

  const medals = Rewards.getMedalsProgress(tabType);
  medals.forEach(medal => {
    const card = document.createElement('div');
    card.className = `medal-card ${medal.isUnlocked ? 'unlocked' : 'locked'}`;

    let reqText = '';
    if (medal.type === 'family') {
      const cur = Rewards.familyRounds[medal.familyId] || 0;
      reqText = medal.isUnlocked ? '¡CONSEGUIDA! 🎉' : `${cur} / ${medal.reqFamilyRounds} Rondas Ganadas`;
    } else {
      reqText = medal.isUnlocked ? '¡DESBLOQUEADA! 🏆' : `${Rewards.totalStars} / ${medal.reqStars} ⭐`;
    }

    card.innerHTML = `
      <div class="medal-icon">${medal.icon}</div>
      <div class="medal-title">${medal.nombre}</div>
      <div class="medal-desc">${medal.descripcion}</div>
      <div style="font-size: 0.9vw; font-weight: bold; margin-bottom: 0.5vh; color: #78909C;">
        ${reqText}
      </div>
      <div class="medal-progress-bar">
        <div class="medal-progress-fill" style="width: ${medal.progressPct}%;"></div>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderCollectiblesAlbum() {
  const container = document.getElementById('medals-grid-container');
  container.innerHTML = '';

  const { cards, avatars } = Rewards.getCollectiblesProgress();

  avatars.forEach(item => {
    const card = document.createElement('div');
    card.className = `medal-card ${item.isUnlocked ? 'unlocked' : 'locked'}`;

    card.innerHTML = `
      <div class="medal-icon">${item.icon}</div>
      <div class="medal-title">${item.nombre}</div>
      <div class="medal-desc">${item.desc}</div>
      <div style="margin-top: 0.5vh;">
        ${
          !item.isUnlocked
            ? '<span style="font-size: 0.9vw; color: #94A3B8;">🔒 En Cofre Mágico</span>'
            : item.isEquipped
              ? '<span style="font-size: 0.9vw; font-weight: bold; color: #4E9F3D;">✓ Equipado</span>'
              : `<button type="button" class="btn btn-settings" style="font-size: 0.9vw; padding: 0.4vh 1vw;" onclick="Rewards.equipAvatar('${item.id}'); renderCollectiblesAlbum();">Equipar</button>`
        }
      </div>
    `;
    container.appendChild(card);
  });

  cards.forEach(item => {
    const card = document.createElement('div');
    card.className = `medal-card golden-card ${item.isUnlocked ? 'unlocked' : 'locked'}`;

    card.innerHTML = `
      <div class="medal-icon">${item.icon}</div>
      <div class="medal-title">${item.nombre}</div>
      <div class="medal-desc">${item.desc}</div>
      <div style="font-size: 0.9vw; font-weight: bold; color: #FFB300; margin-top: 0.5vh;">
        ${item.isUnlocked ? '✨ TARJETA DORADA' : '🔒 En Cofre Mágico'}
      </div>
    `;
    container.appendChild(card);
  });
}

function setupButtonGroup(groupId, callback) {
  const container = document.getElementById(groupId);
  if (!container) return;
  const buttons = container.querySelectorAll('.toggle-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      callback(btn.dataset.value);
    });
  });
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function validateMissingCount() {
  const missingSelect = document.getElementById('cfg-missing');
  if (missingSelect && Engine.state.missingCount >= Engine.state.totalItems) {
    Engine.state.missingCount = Math.max(1, Engine.state.totalItems - 1);
    missingSelect.value = Engine.state.missingCount;
  }
}
