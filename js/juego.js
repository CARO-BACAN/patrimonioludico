document.addEventListener("DOMContentLoaded", () => {
  // Configuración de partida
  const dificultad = "normal"; // Puedes cambiar a 'facil' o 'dificil'
  let indice = 0;
  let errores = 0;
  let tiempoInicio = Date.now();

  // Elementos de la interfaz visual
  const tituloDiv = document.getElementById("titulo");
  const textoDiv = document.getElementById("texto");
  const misionActualDiv = document.getElementById("misionActual");
  const estadoDiv = document.getElementById("estado");

  // Mezclar las misiones aleatoriamente en cada partida
  const partidas = [...misiones].sort(() => Math.random() - 0.5);

  function mostrarMision() {
    if (indice >= partidas.length) {
      terminarJuego();
      return;
    }

    const mision = partidas[indice];

    tituloDiv.textContent = mision.titulo;
    textoDiv.textContent = mision.pistas[dificultad];
    misionActualDiv.textContent = `${indice + 1} / ${partidas.length}`;
    estadoDiv.textContent = "Buscando tarjeta...";
    estadoDiv.style.color = "var(--azul-marino)";
  }

  // Función global que se activa al escanear correctamente desde MindAR
  window.escaneoCorrecto = function(nombreTarjeta) {
    const mision = partidas[indice];

    if (nombreTarjeta === mision.respuesta) {
      estadoDiv.textContent = "¡Correcto! 🎯";
      estadoDiv.style.color = "green";
      
      indice++;

      setTimeout(() => {
        mostrarMision();
      }, 2000);

    } else {
      errores++;
      estadoDiv.textContent = "Esa no era, ¡sigue buscando! ❌";
      estadoDiv.style.color = "var(--rojo-terracota)";
    }
  };

  function terminarJuego() {
    const segundos = ((Date.now() - tiempoInicio) / 1000).toFixed(1);
    
    tituloDiv.textContent = "¡Juego Terminando!";
    textoDiv.textContent = `Tiempo total: ${segundos} segundos. Errores cometidos: ${errores}`;
    estadoDiv.textContent = "¡Completado con éxito!";
  }

  // Arrancar la primera misión
  mostrarMision();
});