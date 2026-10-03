/**
 * SISTEMA DE RECOMPENSAS, MEDALLAS, XP Y COFRES COLECCIONABLES (REBALANCEADO)
 */
const Rewards = {
  STORAGE_KEYS: {
    STARS: 'que_no_veo_total_stars',
    MEDALS: 'que_no_veo_unlocked_medals',
    ROUNDS: 'que_no_veo_total_rounds',
    FAMILY_ROUNDS: 'que_no_veo_family_rounds',
    PERFECT_ROUNDS: 'que_no_veo_perfect_rounds',
    TOTAL_XP: 'que_no_veo_total_xp',
    CHESTS: 'que_no_veo_available_chests',
    COLLECTIBLES: 'que_no_veo_unlocked_collectibles',
    EQUIPPED_AVATAR: 'que_no_veo_equipped_avatar'
  },

  // COLECCIÓN DE TARJETAS DORADAS (12)
  GOLDEN_CARDS_DEF: [
    { id: 'gold_leon', nombre: 'León Dorado', icon: '🦁✨', desc: 'Edición limitada del Rey de la Selva' },
    { id: 'gold_cohete', nombre: 'Cohete de Diamante', icon: '🚀✨', desc: 'Propulsor espacial de velocidad luz' },
    { id: 'gold_dino', nombre: 'Dinosaurio Mágico', icon: '🦕✨', desc: 'Criatura legendaria de colección' },
    { id: 'gold_atomo', nombre: 'Átomo de Neón', icon: '⚛️✨', desc: 'Energía atómica luminosa' },
    { id: 'gold_saturno', nombre: 'Saturno Dorado', icon: '🪐✨', desc: 'Planeta brillante del cosmos' },
    { id: 'gold_eiffel', nombre: 'Torre Eiffel Reluciente', icon: '🗼✨', desc: 'Monumento de luces de París' },
    { id: 'gold_corona', nombre: 'Corona Imperial', icon: '👑✨', desc: 'Símbolo del Gran Maestro' },
    { id: 'gold_unicornio', nombre: 'Unicornio Estelar', icon: '🦄✨', desc: 'Ser místico de fantasía' },
    { id: 'gold_trofeo', nombre: 'Trofeo Mágico', icon: '🏆✨', desc: 'Copa de campeón de la memoria' },
    { id: 'gold_diamante', nombre: 'Diamante Supremo', icon: '💎✨', desc: 'Gema preciosa del cofre' },
    { id: 'gold_bandera', nombre: 'Banderola Dorada', icon: '🚩✨', desc: 'Insignia del aventurero' },
    { id: 'gold_varita', nombre: 'Varita Mística', icon: '🪄✨', desc: 'Varita de magia brillante' }
  ],

  // AVATARES DE PERFIL (6)
  AVATARS_DEF: [
    { id: 'avatar_owl', nombre: 'Búho Sabio', icon: '🦉', desc: 'Observador nocturno de gran agudeza' },
    { id: 'avatar_cat', nombre: 'Gato Detective', icon: '🐱', desc: 'Rastreador de pistas y memoria' },
    { id: 'avatar_astro', nombre: 'Astronauta', icon: '👩‍🚀', desc: 'Explorador de galaxias y memoria' },
    { id: 'avatar_wizard', nombre: 'Mago Sabio', icon: '🧙', desc: 'Maestro de la magia y concentración' },
    { id: 'avatar_robot', nombre: 'Robot Cognitivo', icon: '🤖', desc: 'Procesador de velocidad cálculo' },
    { id: 'avatar_fox', nombre: 'Zorro Astuto', icon: '🦊', desc: 'Agilidad mental y reflejos' }
  ],

  // 18 MEDALLAS TEMÁTICAS ESPECÍFICAS
  FAMILY_MEDALS_DEF: [
    { id: 'med_fam_colegio', familyId: 'colegio', nombre: 'Mano de Lápiz', icon: '✏️', reqFamilyRounds: 5, type: 'family', descripcion: '¡Maestro de la asamblea escolar! (5 rondas en El Colegio)' },
    { id: 'med_fam_animales', familyId: 'animales', nombre: 'Rey de la Selva', icon: '🦁', reqFamilyRounds: 5, type: 'family', descripcion: '¡Gran observador de la fauna! (5 rondas en Animales)' },
    { id: 'med_fam_comida', familyId: 'comida', nombre: 'Chef Saludable', icon: '🍎', reqFamilyRounds: 5, type: 'family', descripcion: '¡Experto en hábitos saludables! (5 rondas en Comida)' },
    { id: 'med_fam_transportes', familyId: 'transportes', nombre: 'Piloto Veloz', icon: '🚗', reqFamilyRounds: 5, type: 'family', descripcion: '¡Dominas ruedas, alas y raíles! (5 rondas en Transportes)' },
    { id: 'med_fam_numeros', familyId: 'numeros', nombre: 'Genio de Números', icon: '🔢', reqFamilyRounds: 5, type: 'family', descripcion: '¡Mente imbatible en conteo y secuencia! (5 rondas en Números)' },
    { id: 'med_fam_casa', familyId: 'casa', nombre: 'Dueño del Hogar', icon: '🏡', reqFamilyRounds: 5, type: 'family', descripcion: '¡Conoces cada rincón de la casa! (5 rondas en La Casa)' },
    { id: 'med_fam_formas', familyId: 'formas', nombre: 'Maestro del Color', icon: '🔷', reqFamilyRounds: 5, type: 'family', descripcion: '¡Especialista en figuras y colores! (5 rondas en Formas)' },
    { id: 'med_fam_ropa', familyId: 'ropa', nombre: 'Estilista Estelar', icon: '👕', reqFamilyRounds: 5, type: 'family', descripcion: '¡Gran conocedor de la vestimenta! (5 rondas en La Ropa)' },
    { id: 'med_fam_naturaleza', familyId: 'naturaleza', nombre: 'Espíritu del Bosque', icon: '🌳', reqFamilyRounds: 5, type: 'family', descripcion: '¡Amante del sol, flores y naturaleza! (5 rondas en Naturaleza)' },
    { id: 'med_fam_profesiones', familyId: 'profesiones', nombre: 'Héroe del Trabajo', icon: '👩‍🚀', reqFamilyRounds: 5, type: 'family', descripcion: '¡Conoces todos los oficios! (5 rondas en Profesiones)' },
    { id: 'med_fam_deportes', familyId: 'deportes', nombre: 'Atleta de Oro', icon: '⚽', reqFamilyRounds: 5, type: 'family', descripcion: '¡Campeón de los juegos y energía! (5 rondas en Deportes)' },
    { id: 'med_fam_fantasia', familyId: 'fantasia', nombre: 'Mago de Fantasía', icon: '🦄', reqFamilyRounds: 5, type: 'family', descripcion: '¡Poder mágico e imaginación sin límites! (5 rondas en Fantasía)' },
    { id: 'med_fam_palabras', familyId: 'palabras', nombre: 'Gran Lingüista', icon: '🔤', reqFamilyRounds: 5, type: 'family', descripcion: '¡Dominio excelente de memoria verbal y texto! (5 rondas en Palabras)' },
    { id: 'med_fam_paises', familyId: 'paises', nombre: 'Ciudadano del Mundo', icon: '🌍', reqFamilyRounds: 5, type: 'family', descripcion: '¡Conoces banderas y países a la perfección! (5 rondas en Países)' },
    { id: 'med_fam_monumentos', familyId: 'monumentos', nombre: 'Historiador del Arte', icon: '🏛️', reqFamilyRounds: 5, type: 'family', descripcion: '¡Experto en arte y monumentos! (5 rondas en Monumentos)' },
    { id: 'med_fam_astronomia', familyId: 'astronomia', nombre: 'Astrónomo Estelar', icon: '🌌', reqFamilyRounds: 5, type: 'family', descripcion: '¡Memoria del universo y galaxias! (5 rondas en Astronomía)' },
    { id: 'med_fam_ciencia', familyId: 'ciencia', nombre: 'Científico Ilustre', icon: '🔬', reqFamilyRounds: 5, type: 'family', descripcion: '¡Espíritu investigador en ciencia! (5 rondas en Ciencia)' },
    { id: 'med_fam_finanzas', familyId: 'finanzas', nombre: 'Estratega Financiero', icon: '💶', reqFamilyRounds: 5, type: 'family', descripcion: '¡Dominio de símbolos y mercados! (5 rondas en Finanzas)' }
  ],

  // 6 TROFEOS GLOBALES EXIGENTES
  GLOBAL_MEDALS_DEF: [
    { id: 'med_bronce', nombre: 'Medalla de Bronce', icon: '🥉', reqStars: 25, reqPerfect: 0, type: 'global', descripcion: '¡Primeros pasos de gran observador! (25 Estrellas ⭐)' },
    { id: 'med_plata', nombre: 'Medalla de Plata', icon: '🥈', reqStars: 60, reqPerfect: 3, type: 'global', descripcion: '¡Tu memoria es sorprendente! (60 Estrellas ⭐ + 3 rondas perfectas)' },
    { id: 'med_oro', nombre: 'Medalla de Oro', icon: '🥇', reqStars: 120, reqPerfect: 8, type: 'global', descripcion: '¡Súper Campeón de la Memoria! (120 Estrellas ⭐ + 8 rondas perfectas)' },
    { id: 'med_explorador', nombre: 'Explorador Legendario', icon: '🌟', reqStars: 200, reqFamilyMedals: 4, type: 'global', descripcion: '¡Has dominado 4 familias temáticas y acumulado 200 Estrellas ⭐!' },
    { id: 'med_maestro', nombre: 'Mente Brillante', icon: '🎓', reqStars: 350, reqFamilyMedals: 8, type: 'global', descripcion: '¡Memoria de águila! (350 Estrellas ⭐ + 8 Medallas Temáticas)' },
    { id: 'med_trofeo_supremo', nombre: 'Copa Gran Maestro', icon: '🏆', reqStars: 500, reqFamilyMedals: 12, type: 'global', descripcion: '¡Máximo honor! (500 Estrellas ⭐ y Las 12 Medallas Temáticas)' }
  ],

  totalStars: 0,
  totalRounds: 0,
  perfectRounds: 0,
  totalXP: 0,
  availableChests: 0,
  familyRounds: {},
  unlockedMedals: [],
  unlockedCollectibles: [],
  equippedAvatar: 'avatar_owl',

  init() {
    try {
      const savedStars = localStorage.getItem(this.STORAGE_KEYS.STARS);
      this.totalStars = savedStars ? parseInt(savedStars, 10) : 0;

      const savedRounds = localStorage.getItem(this.STORAGE_KEYS.ROUNDS);
      this.totalRounds = savedRounds ? parseInt(savedRounds, 10) : 0;

      const savedPerfect = localStorage.getItem(this.STORAGE_KEYS.PERFECT_ROUNDS);
      this.perfectRounds = savedPerfect ? parseInt(savedPerfect, 10) : 0;

      const savedXP = localStorage.getItem(this.STORAGE_KEYS.TOTAL_XP);
      this.totalXP = savedXP ? parseInt(savedXP, 10) : 0;

      const savedChests = localStorage.getItem(this.STORAGE_KEYS.CHESTS);
      this.availableChests = savedChests ? parseInt(savedChests, 10) : 0;

      const savedFamilyRounds = localStorage.getItem(this.STORAGE_KEYS.FAMILY_ROUNDS);
      this.familyRounds = savedFamilyRounds ? JSON.parse(savedFamilyRounds) : {};

      const savedMedals = localStorage.getItem(this.STORAGE_KEYS.MEDALS);
      this.unlockedMedals = savedMedals ? JSON.parse(savedMedals) : [];

      const savedCollectibles = localStorage.getItem(this.STORAGE_KEYS.COLLECTIBLES);
      this.unlockedCollectibles = savedCollectibles ? JSON.parse(savedCollectibles) : ['avatar_owl'];

      const savedAvatar = localStorage.getItem(this.STORAGE_KEYS.EQUIPPED_AVATAR);
      this.equippedAvatar = savedAvatar || 'avatar_owl';
    } catch (e) {
      console.warn("No se pudo acceder a localStorage:", e);
      this.totalStars = 0;
      this.totalRounds = 0;
      this.perfectRounds = 0;
      this.totalXP = 0;
      this.availableChests = 0;
      this.familyRounds = {};
      this.unlockedMedals = [];
      this.unlockedCollectibles = ['avatar_owl'];
      this.equippedAvatar = 'avatar_owl';
    }

    this.checkMedals();
    this.updateTopBarUI();
  },

  getLevelInfo() {
    const xpPerLevel = 600; // 600 XP por nivel para progresión equilibrada
    const level = Math.floor(this.totalXP / xpPerLevel) + 1;
    const currentXPInLevel = this.totalXP % xpPerLevel;
    const progressPct = Math.round((currentXPInLevel / xpPerLevel) * 100);

    let title = '🐣 Observador Principiante';
    if (level >= 3 && level < 6) title = '🔍 Detective Visual';
    else if (level >= 6 && level < 10) title = '💡 Mente Aguda';
    else if (level >= 10 && level < 15) title = '🌟 Gran Explorador';
    else if (level >= 15 && level < 20) title = '🎓 Maestro de la Memoria';
    else if (level >= 20) title = '🏆 Gran Maestro Supremo';

    return {
      level,
      currentXPInLevel,
      xpPerLevel,
      progressPct,
      title
    };
  },

  addRoundResult(starsEarned, familyId = 'colegio') {
    const prevLevel = this.getLevelInfo().level;
    const prevStarMilestone = Math.floor(this.totalStars / 25); // 25 Estrellas por cofre

    this.totalStars += starsEarned;
    this.totalRounds++;

    let xpGained = starsEarned * 30;
    if (starsEarned === 3) {
      this.perfectRounds++;
      xpGained += 35; // Bonus ronda perfecta
    }

    this.totalXP += xpGained;
    this.familyRounds[familyId] = (this.familyRounds[familyId] || 0) + 1;

    // Comprobar si se gana un cofre por cada 25 estrellas o por subir de nivel
    const newStarMilestone = Math.floor(this.totalStars / 25);
    const newLevel = this.getLevelInfo().level;

    let chestsGained = 0;
    if (newStarMilestone > prevStarMilestone) {
      chestsGained += (newStarMilestone - prevStarMilestone);
    }
    if (newLevel > prevLevel) {
      chestsGained += (newLevel - prevLevel);
    }

    this.availableChests += chestsGained;

    try {
      localStorage.setItem(this.STORAGE_KEYS.STARS, this.totalStars.toString());
      localStorage.setItem(this.STORAGE_KEYS.ROUNDS, this.totalRounds.toString());
      localStorage.setItem(this.STORAGE_KEYS.PERFECT_ROUNDS, this.perfectRounds.toString());
      localStorage.setItem(this.STORAGE_KEYS.TOTAL_XP, this.totalXP.toString());
      localStorage.setItem(this.STORAGE_KEYS.CHESTS, this.availableChests.toString());
      localStorage.setItem(this.STORAGE_KEYS.FAMILY_ROUNDS, JSON.stringify(this.familyRounds));
    } catch (e) {
      console.warn("Error guardando estadísticas:", e);
    }

    const newlyUnlocked = this.checkMedals();
    this.updateTopBarUI();

    return {
      starsEarned,
      xpGained,
      chestsGained,
      totalStars: this.totalStars,
      newlyUnlocked
    };
  },

  openChest() {
    if (this.availableChests <= 0) return null;

    this.availableChests--;
    try {
      localStorage.setItem(this.STORAGE_KEYS.CHESTS, this.availableChests.toString());
    } catch (e) {}

    const allCollectibles = [...this.GOLDEN_CARDS_DEF, ...this.AVATARS_DEF];
    const lockedItems = allCollectibles.filter(item => !this.unlockedCollectibles.includes(item.id));

    let rewardedItem = null;

    // 35% de probabilidad de tarjeta/avatar de colección, 65% de paquete de gemas/XP bonus
    const isCollectibleRoll = Math.random() < 0.35;

    if (isCollectibleRoll && lockedItems.length > 0) {
      rewardedItem = lockedItems[Math.floor(Math.random() * lockedItems.length)];
      this.unlockedCollectibles.push(rewardedItem.id);
      try {
        localStorage.setItem(this.STORAGE_KEYS.COLLECTIBLES, JSON.stringify(this.unlockedCollectibles));
      } catch (e) {}
    } else {
      // Recompensa de Puntos de Experiencia Extra
      const bonusXP = 150;
      this.totalXP += bonusXP;
      rewardedItem = {
        id: 'bonus_xp',
        nombre: '+150 XP Extra',
        icon: '⚡✨',
        desc: '¡Paquete de Experiencia Extra para subir de nivel!'
      };
      try {
        localStorage.setItem(this.STORAGE_KEYS.TOTAL_XP, this.totalXP.toString());
      } catch (e) {}
    }

    this.updateTopBarUI();
    return rewardedItem;
  },

  countUnlockedFamilyMedals() {
    return this.FAMILY_MEDALS_DEF.filter(m => this.unlockedMedals.includes(m.id)).length;
  },

  checkMedals() {
    const newlyUnlocked = [];

    this.FAMILY_MEDALS_DEF.forEach(medal => {
      const rCount = this.familyRounds[medal.familyId] || 0;
      if (rCount >= medal.reqFamilyRounds && !this.unlockedMedals.includes(medal.id)) {
        this.unlockedMedals.push(medal.id);
        newlyUnlocked.push(medal);
      }
    });

    const unlockedFamCount = this.countUnlockedFamilyMedals();
    this.GLOBAL_MEDALS_DEF.forEach(medal => {
      const hasStars = this.totalStars >= (medal.reqStars || 0);
      const hasPerfect = this.perfectRounds >= (medal.reqPerfect || 0);
      const hasFamMedals = unlockedFamCount >= (medal.reqFamilyMedals || 0);

      if (hasStars && hasPerfect && hasFamMedals && !this.unlockedMedals.includes(medal.id)) {
        this.unlockedMedals.push(medal.id);
        newlyUnlocked.push(medal);
      }
    });

    if (newlyUnlocked.length > 0) {
      try {
        localStorage.setItem(this.STORAGE_KEYS.MEDALS, JSON.stringify(this.unlockedMedals));
      } catch (e) {
        console.warn("Error guardando medallas:", e);
      }
    }

    return newlyUnlocked;
  },

  getMedalsProgress(type = 'family') {
    const list = type === 'family' ? this.FAMILY_MEDALS_DEF : this.GLOBAL_MEDALS_DEF;
    const unlockedFamCount = this.countUnlockedFamilyMedals();

    return list.map(medal => {
      const isUnlocked = this.unlockedMedals.includes(medal.id);
      let pct = 0;

      if (medal.type === 'family') {
        const cur = this.familyRounds[medal.familyId] || 0;
        pct = Math.min(100, Math.round((cur / medal.reqFamilyRounds) * 100));
      } else {
        const starPct = Math.min(100, Math.round((this.totalStars / medal.reqStars) * 100));
        let familyPct = 100;
        if (medal.reqFamilyMedals) {
          familyPct = Math.min(100, Math.round((unlockedFamCount / medal.reqFamilyMedals) * 100));
        }
        pct = Math.min(starPct, familyPct);
      }

      return {
        ...medal,
        isUnlocked,
        progressPct: isUnlocked ? 100 : pct
      };
    });
  },

  getCollectiblesProgress() {
    const cards = this.GOLDEN_CARDS_DEF.map(item => ({
      ...item,
      isUnlocked: this.unlockedCollectibles.includes(item.id),
      category: 'gold'
    }));

    const avatars = this.AVATARS_DEF.map(item => ({
      ...item,
      isUnlocked: this.unlockedCollectibles.includes(item.id),
      isEquipped: this.equippedAvatar === item.id,
      category: 'avatar'
    }));

    return { cards, avatars };
  },

  equipAvatar(avatarId) {
    if (this.unlockedCollectibles.includes(avatarId)) {
      this.equippedAvatar = avatarId;
      try {
        localStorage.setItem(this.STORAGE_KEYS.EQUIPPED_AVATAR, avatarId);
      } catch (e) {}
      this.updateTopBarUI();
    }
  },

  updateTopBarUI() {
    const starCountEl = document.getElementById('global-stars-count');
    if (starCountEl) starCountEl.textContent = this.totalStars;

    const chestBtnHome = document.getElementById('btn-open-chest-home');
    const chestBadgeCount = document.getElementById('chest-count-badge');
    if (chestBtnHome) {
      chestBtnHome.style.display = this.availableChests > 0 ? 'inline-flex' : 'none';
      if (chestBadgeCount) chestBadgeCount.textContent = this.availableChests;
    }

    const lvlInfo = this.getLevelInfo();
    const lvlNumEl = document.getElementById('player-level-num');
    const lvlTitleEl = document.getElementById('player-level-title');
    const xpBarFillEl = document.getElementById('player-xp-fill');

    if (lvlNumEl) lvlNumEl.textContent = lvlInfo.level;
    if (lvlTitleEl) lvlTitleEl.textContent = lvlInfo.title;
    if (xpBarFillEl) xpBarFillEl.style.width = lvlInfo.progressPct + '%';

    const avatarIconEl = document.getElementById('equipped-avatar-icon');
    const currentAvatarObj = this.AVATARS_DEF.find(a => a.id === this.equippedAvatar) || this.AVATARS_DEF[0];
    if (avatarIconEl) avatarIconEl.textContent = currentAvatarObj.icon;
  },

  resetProgress() {
    this.totalStars = 0;
    this.totalRounds = 0;
    this.perfectRounds = 0;
    this.totalXP = 0;
    this.availableChests = 0;
    this.familyRounds = {};
    this.unlockedMedals = [];
    this.unlockedCollectibles = ['avatar_owl'];
    this.equippedAvatar = 'avatar_owl';

    try {
      Object.values(this.STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.warn("Error borrando datos guardados:", e);
    }

    if (typeof Engine !== 'undefined' && Engine.state) {
      Engine.state.teamScores = { red: 0, blue: 0 };
      Engine.state.level = 1;
      Engine.state.consecutiveWins = 0;
      if (Engine.updateVersusTopBarUI) Engine.updateVersusTopBarUI();
    }

    this.updateTopBarUI();
  }
};
