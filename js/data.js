/**
 * BANCO DE DATOS DE FAMILIAS Y VOCABULARIO (18 FAMILIAS TEMÁTICAS)
 * Incluye categorías para Educación Infantil y Estimulación Cognitiva de Adultos (Palabras, Países, Ciencia, etc.)
 */
const BANCO_FAMILIAS = {
  colegio: {
    nombre: "🎒 El Colegio",
    target: "kids",
    bg: "radial-gradient(circle, #FFFDE7 0%, #FFF59D 100%)",
    accentColor: "#FBC02D",
    pattern: "🎒 ✏️ ✂️ 📚 🎨",
    items: [
      { id: "mochila", nombre: "Mochila", icon: "🎒" },
      { id: "lapiz", nombre: "Lápiz", icon: "✏️" },
      { id: "tijeras", nombre: "Tijeras", icon: "✂️" },
      { id: "libro", nombre: "Libro", icon: "📚" },
      { id: "pincel", nombre: "Pincel", icon: "🖌️" },
      { id: "regla", nombre: "Regla", icon: "📏" },
      { id: "campana", nombre: "Campana", icon: "🔔" },
      { id: "papelera", nombre: "Papelera", icon: "🗑️" }
    ]
  },
  animales: {
    nombre: "🦁 Animales",
    target: "kids",
    bg: "radial-gradient(circle, #E8F5E9 0%, #A5D6A7 100%)",
    accentColor: "#4CAF50",
    pattern: "🐾 🦁 🐘 🦒 🐶",
    items: [
      { id: "leon", nombre: "León", icon: "🦁" },
      { id: "mono", nombre: "Mono", icon: "🐵" },
      { id: "elefante", nombre: "Elefante", icon: "🐘" },
      { id: "jirafa", nombre: "Jirafa", icon: "🦒" },
      { id: "perro", nombre: "Perro", icon: "🐶" },
      { id: "gato", nombre: "Gato", icon: "🐱" },
      { id: "conejo", nombre: "Conejo", icon: "🐰" },
      { id: "oso", nombre: "Oso", icon: "🐻" },
      { id: "pato", nombre: "Pato", icon: "🦆" },
      { id: "rana", nombre: "Rana", icon: "🐸" }
    ]
  },
  comida: {
    nombre: "🍎 Comida Saludable",
    target: "kids",
    bg: "radial-gradient(circle, #FBE9E7 0%, #FFAB91 100%)",
    accentColor: "#FF5722",
    pattern: "🍎 🍌 🍓 🥕 🧀",
    items: [
      { id: "manzana", nombre: "Manzana", icon: "🍎" },
      { id: "platano", nombre: "Plátano", icon: "🍌" },
      { id: "fresa", nombre: "Fresa", icon: "🍓" },
      { id: "uva", nombre: "Uvas", icon: "🍇" },
      { id: "pera", nombre: "Pera", icon: "🍐" },
      { id: "sandia", nombre: "Sandía", icon: "🍉" },
      { id: "zanahoria", nombre: "Zanahoria", icon: "🥕" },
      { id: "queso", nombre: "Queso", icon: "🧀" }
    ]
  },
  transportes: {
    nombre: "🚗 Transportes",
    target: "kids",
    bg: "radial-gradient(circle, #E1F5FE 0%, #81D4FA 100%)",
    accentColor: "#03A9F4",
    pattern: "🚗 🚌 🚂 ✈️ 🚀",
    items: [
      { id: "coche", nombre: "Coche", icon: "🚗" },
      { id: "autobus", nombre: "Autobús", icon: "🚌" },
      { id: "tren", nombre: "Tren", icon: "🚂" },
      { id: "avion", nombre: "Avión", icon: "✈️" },
      { id: "barco", nombre: "Barco", icon: "⛵" },
      { id: "bici", nombre: "Bicicleta", icon: "🚲" },
      { id: "cohete", nombre: "Cohete", icon: "🚀" },
      { id: "helicoptero", nombre: "Helicóptero", icon: "🚁" }
    ]
  },
  numeros: {
    nombre: "🔢 Números (1 al 10)",
    target: "both",
    isTextMode: true,
    bg: "radial-gradient(circle, #EDE7F6 0%, #B39DDB 100%)",
    accentColor: "#673AB7",
    pattern: "1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣",
    items: [
      { id: "num1", nombre: "Uno", icon: "1️⃣", orderValue: 1 },
      { id: "num2", nombre: "Dos", icon: "2️⃣", orderValue: 2 },
      { id: "num3", nombre: "Tres", icon: "3️⃣", orderValue: 3 },
      { id: "num4", nombre: "Cuatro", icon: "4️⃣", orderValue: 4 },
      { id: "num5", nombre: "Cinco", icon: "5️⃣", orderValue: 5 },
      { id: "num6", nombre: "Seis", icon: "6️⃣", orderValue: 6 },
      { id: "num7", nombre: "Siete", icon: "7️⃣", orderValue: 7 },
      { id: "num8", nombre: "Ocho", icon: "8️⃣", orderValue: 8 },
      { id: "num9", nombre: "Nueve", icon: "9️⃣", orderValue: 9 },
      { id: "num10", nombre: "Diez", icon: "🔟", orderValue: 10 }
    ]
  },
  casa: {
    nombre: "🏡 La Casa y el Hogar",
    target: "both",
    bg: "radial-gradient(circle, #FFF3E0 0%, #FFCC80 100%)",
    accentColor: "#FB8C00",
    pattern: "🏡 🛋️ 🛏️ 📺 🔑",
    items: [
      { id: "cama", nombre: "Cama", icon: "🛏️" },
      { id: "sofa", nombre: "Sofá", icon: "🛋️" },
      { id: "tv", nombre: "Televisión", icon: "📺" },
      { id: "reloj", nombre: "Reloj", icon: "⏰" },
      { id: "lampara", nombre: "Lámpara", icon: "💡" },
      { id: "llave", nombre: "Llave", icon: "🔑" },
      { id: "banera", nombre: "Bañera", icon: "🛁" },
      { id: "puerta", nombre: "Puerta", icon: "🚪" },
      { id: "telefono", nombre: "Teléfono", icon: "☎️" },
      { id: "silla", nombre: "Silla", icon: "🪑" }
    ]
  },
  formas: {
    nombre: "🔷 Formas y Colores",
    target: "kids",
    bg: "radial-gradient(circle, #E0F7FA 0%, #80DEEA 100%)",
    accentColor: "#00ACC1",
    pattern: "🔴 🟦 🔺 🌟 🩷",
    items: [
      { id: "circulo", nombre: "Círculo Rojo", icon: "🔴" },
      { id: "cuadrado", nombre: "Cuadrado Azul", icon: "🟦" },
      { id: "triangulo", nombre: "Triángulo Verde", icon: "🔺" },
      { id: "estrella", nombre: "Estrella Amarilla", icon: "🌟" },
      { id: "corazon", nombre: "Corazón Rosa", icon: "🩷" },
      { id: "rombo", nombre: "Rombo Naranja", icon: "🔶" },
      { id: "ovalow", nombre: "Círculo Blanco", icon: "⚪" },
      { id: "cruz", nombre: "Cruz Morada", icon: "✝️" }
    ]
  },
  ropa: {
    nombre: "👕 La Ropa y Vestimenta",
    target: "kids",
    bg: "radial-gradient(circle, #FCE4EC 0%, #F48FB1 100%)",
    accentColor: "#E91E63",
    pattern: "👕 👖 👟 🧢 👗",
    items: [
      { id: "camiseta", nombre: "Camiseta", icon: "👕" },
      { id: "pantalon", nombre: "Pantalón", icon: "👖" },
      { id: "zapato", nombre: "Zapato", icon: "👟" },
      { id: "gorro", nombre: "Gorro", icon: "🧢" },
      { id: "vestido", nombre: "Vestido", icon: "👗" },
      { id: "calcetines", nombre: "Calcetines", icon: "🧦" },
      { id: "abrigo", nombre: "Abrigo", icon: "🧥" },
      { id: "gafas", nombre: "Gafas", icon: "👓" },
      { id: "guantes", nombre: "Guantes", icon: "🧤" },
      { id: "botas", nombre: "Botas", icon: "👢" }
    ]
  },
  naturaleza: {
    nombre: "🌳 Naturaleza y Sol",
    target: "both",
    bg: "radial-gradient(circle, #F1F8E9 0%, #C5E1A5 100%)",
    accentColor: "#7CB342",
    pattern: "🌳 🌻 ☀️ 🌙 🌈",
    items: [
      { id: "arbol", nombre: "Árbol", icon: "🌳" },
      { id: "flor", nombre: "Flor", icon: "🌻" },
      { id: "sol", nombre: "Sol", icon: "☀️" },
      { id: "luna", nombre: "Luna", icon: "🌙" },
      { id: "nube", nombre: "Nube", icon: "☁️" },
      { id: "arcoiris", nombre: "Arcoíris", icon: "🌈" },
      { id: "hoja", nombre: "Hoja", icon: "🍃" },
      { id: "seta", nombre: "Seta", icon: "🍄" },
      { id: "mariposa", nombre: "Mariposa", icon: "🦋" },
      { id: "planta", nombre: "Planta", icon: "🪴" }
    ]
  },
  profesiones: {
    nombre: "👩‍🚀 Profesiones y Oficios",
    target: "both",
    bg: "radial-gradient(circle, #E8EAF6 0%, #9FA8DA 100%)",
    accentColor: "#3F51B5",
    pattern: "👩‍🚀 👨‍🚒 👮 👩‍⚕️ 👨‍🍳",
    items: [
      { id: "astronauta", nombre: "Astronauta", icon: "👩‍🚀" },
      { id: "bombero", nombre: "Bombero", icon: "👨‍🚒" },
      { id: "policia", nombre: "Policía", icon: "👮" },
      { id: "medico", nombre: "Médico", icon: "👩‍⚕️" },
      { id: "pintor", nombre: "Pintor", icon: "👨‍🎨" },
      { id: "cocinero", nombre: "Cocinero", icon: "👨‍🍳" },
      { id: "detective", nombre: "Detective", icon: "🕵️" },
      { id: "mago", nombre: "Mago", icon: "🧙" },
      { id: "cientifico", nombre: "Científico", icon: "👩‍🔬" },
      { id: "piloto", nombre: "Piloto", icon: "👨‍✈️" }
    ]
  },
  deportes: {
    nombre: "⚽ Deportes y Juegos",
    target: "both",
    bg: "radial-gradient(circle, #FFF8E1 0%, #FFE082 100%)",
    accentColor: "#FFB300",
    pattern: "⚽ 🏀 🎾 🚲 🛴",
    items: [
      { id: "pelota", nombre: "Pelota", icon: "⚽" },
      { id: "baloncesto", nombre: "Baloncesto", icon: "🏀" },
      { id: "tenis", nombre: "Tenis", icon: "🎾" },
      { id: "bici", nombre: "Bicicleta", icon: "🚲" },
      { id: "patinete", nombre: "Patinete", icon: "🛴" },
      { id: "tobogan", nombre: "Tobogán", icon: "🛝" },
      { id: "cometa", nombre: "Cometa", icon: "🪁" },
      { id: "trofeo", nombre: "Trofeo", icon: "🏆" },
      { id: "medalla", nombre: "Medalla", icon: "🥇" },
      { id: "patines", nombre: "Patines", icon: "🛼" }
    ]
  },
  fantasia: {
    nombre: "🦄 Fantasía y Dinosaurios",
    target: "kids",
    bg: "radial-gradient(circle, #F3E5F5 0%, #CE93D8 100%)",
    accentColor: "#AB47BC",
    pattern: "🦕 🦄 🏰 🪄 👑",
    items: [
      { id: "dinosaurio", nombre: "Dinosaurio", icon: "🦕" },
      { id: "unicornio", nombre: "Unicornio", icon: "🦄" },
      { id: "castillo", nombre: "Castillo", icon: "🏰" },
      { id: "varita", nombre: "Varita Mágica", icon: "🪄" },
      { id: "corona", nombre: "Corona", icon: "👑" },
      { id: "dragon", nombre: "Dragón", icon: "🐉" },
      { id: "cofre", nombre: "Cofre del Tesoro", icon: "🪙" },
      { id: "hada", nombre: "Hada", icon: "🧚" },
      { id: "fantasma", nombre: "Fantasma", icon: "👻" },
      { id: "cohete_fan", nombre: "Cohete Mágico", icon: "🚀" }
    ]
  },

  // FAMILIAS AVANZADAS PARA ADULTOS Y ESTIMULACIÓN COGNITIVA
  palabras: {
    nombre: "🔤 Palabras y Vocabulario Textual",
    target: "adults",
    bg: "radial-gradient(circle, #1E293B 0%, #0F172A 100%)",
    accentColor: "#38BDF8",
    pattern: "🔤 📚 💡 ✍️ 🧠",
    isTextMode: true,
    items: [
      { id: "w1", nombre: "Resiliencia", text: "Resiliencia" },
      { id: "w2", nombre: "Serendipia", text: "Serendipia" },
      { id: "w3", nombre: "Empatía", text: "Empatía" },
      { id: "w4", nombre: "Paradójico", text: "Paradójico" },
      { id: "w5", nombre: "Efímero", text: "Efímero" },
      { id: "w6", nombre: "Utopía", text: "Utopía" },
      { id: "w7", nombre: "Sinfonía", text: "Sinfonía" },
      { id: "w8", nombre: "Cronómetro", text: "Cronómetro" },
      { id: "w9", nombre: "Metáfora", text: "Metáfora" },
      { id: "w10", nombre: "Ámbar", text: "Ámbar" },
      { id: "w11", nombre: "Nostalgia", text: "Nostalgia" },
      { id: "w12", nombre: "Cosmos", text: "Cosmos" }
    ]
  },
  paises: {
    nombre: "🌍 Países y Banderas",
    target: "adults",
    isTextMode: true,
    bg: "radial-gradient(circle, #0F172A 0%, #1E1B4B 100%)",
    accentColor: "#818CF8",
    pattern: "🇪🇸 🇯🇵 🇫🇷 🇧🇷 🇮🇹",
    items: [
      { id: "espana", nombre: "España", icon: "🇪🇸" },
      { id: "japon", nombre: "Japón", icon: "🇯🇵" },
      { id: "francia", nombre: "Francia", icon: "🇫🇷" },
      { id: "brasil", nombre: "Brasil", icon: "🇧🇷" },
      { id: "italia", nombre: "Italia", icon: "🇮🇹" },
      { id: "egipto", nombre: "Egipto", icon: "🇪🇬" },
      { id: "canada", nombre: "Canadá", icon: "🇨🇦" },
      { id: "mexico", nombre: "México", icon: "🇲🇽" },
      { id: "alemania", nombre: "Alemania", icon: "🇩🇪" },
      { id: "grecia", nombre: "Grecia", icon: "🇬🇷" }
    ]
  },
  monumentos: {
    nombre: "🏛️ Monumentos y Arte",
    target: "adults",
    bg: "radial-gradient(circle, #331800 0%, #1A0D00 100%)",
    accentColor: "#F59E0B",
    pattern: "🏛️ 🗼 🗽 🏟️ 🕌",
    items: [
      { id: "piramides", nombre: "Pirámides", icon: "🏛️" },
      { id: "eiffel", nombre: "Torre Eiffel", icon: "🗼" },
      { id: "libertad", nombre: "Estatua Libertad", icon: "🗽" },
      { id: "coliseo", nombre: "Coliseo Romano", icon: "🏟️" },
      { id: "tajmahal", nombre: "Taj Mahal", icon: "🕌" },
      { id: "bigben", nombre: "Big Ben", icon: "🕰️" },
      { id: "cuadro", nombre: "Pintura de Arte", icon: "🖼️" },
      { id: "moai", nombre: "Escultura Moái", icon: "🗿" }
    ]
  },
  astronomia: {
    nombre: "🌌 Astronomía y Espacio",
    target: "adults",
    bg: "radial-gradient(circle, #180033 0%, #0B001A 100%)",
    accentColor: "#C084FC",
    pattern: "🌌 🪐 ☄️ 🔭 🛰️",
    items: [
      { id: "galaxia", nombre: "Galaxia Espiral", icon: "🌌" },
      { id: "saturno", nombre: "Planeta Saturno", icon: "🪐" },
      { id: "cometa", nombre: "Cometa", icon: "☄️" },
      { id: "telescopio", nombre: "Telescopio", icon: "🔭" },
      { id: "eclipse", nombre: "Eclipse", icon: "🌒" },
      { id: "satelite", nombre: "Satélite", icon: "🛰️" },
      { id: "sol_astro", nombre: "Sol Central", icon: "☀️" },
      { id: "constelacion", nombre: "Constelación", icon: "✨" }
    ]
  },
  ciencia: {
    nombre: "🔬 Ciencia y Laboratorio",
    target: "adults",
    bg: "radial-gradient(circle, #002B36 0%, #00121A 100%)",
    accentColor: "#2DD4BF",
    pattern: "⚛️ 🧬 🔬 🧲 🧪",
    items: [
      { id: "atomo", nombre: "Átomo", icon: "⚛️" },
      { id: "adn", nombre: "Cadena ADN", icon: "🧬" },
      { id: "microscopio", nombre: "Microscopio", icon: "🔬" },
      { id: "iman", nombre: "Imán Magnético", icon: "🧲" },
      { id: "matraz", nombre: "Matraz Químico", icon: "🧪" },
      { id: "pila", nombre: "Batería / Pila", icon: "🔋" },
      { id: "radioactivo", nombre: "Símbolo Nuclear", icon: "☢️" },
      { id: "bombilla_idea", nombre: "Experimento", icon: "💡" }
    ]
  },
  finanzas: {
    nombre: "💶 Finanzas y Monedas",
    target: "adults",
    bg: "radial-gradient(circle, #064E3B 0%, #022C22 100%)",
    accentColor: "#34D399",
    pattern: "💶 💵 💴 🪙 💎",
    items: [
      { id: "euro", nombre: "Billetes Euro", icon: "💶" },
      { id: "dolar", nombre: "Billetes Dólar", icon: "💵" },
      { id: "yen", nombre: "Billetes Yen", icon: "💴" },
      { id: "oro", nombre: "Lingotes de Oro", icon: "🪙" },
      { id: "diamante", nombre: "Gema Diamante", icon: "💎" },
      { id: "balanza", nombre: "Balanza Comercial", icon: "⚖️" },
      { id: "banco", nombre: "Banco / Edificio", icon: "🏦" },
      { id: "tarjeta", nombre: "Tarjeta de Crédito", icon: "💳" }
    ]
  }
};
