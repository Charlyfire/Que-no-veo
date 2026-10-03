# Guía de Desarrollo para Antigravity: ¿Qué no veo?

Este proyecto es un juego interactivo de estimulación de la memoria visual diseñado para niños de Educación Infantil (3 a 6 años) en Pizarra Digital Interactiva (PDI).

## Principios Técnicos y Pedagógicos
1. **Relación de aspecto fija 16:9:** Todo el layout (`#game-wrapper`) debe mantenerse centrado y sin barras de scroll verticales ni horizontales en 1920x1080.
2. **Dimensiones táctiles:** Cualquier elemento interactivo (botones, cartas, fichas de la bandeja) debe tener un hitbox generoso (mínimo 120px) para facilitar el toque infantil.
3. **Audio:** Emplea Web Audio API sin dependencias de red. Si se añaden archivos `.mp3` o `.ogg`, colocarlos en `assets/audio/`.
4. **Imágenes:**
   - Fondos: 1920x1080 px en `assets/fondos/`.
   - Fichas: PNG con transparencia o SVG 1:1 en `assets/familias/<categoria>/`.
