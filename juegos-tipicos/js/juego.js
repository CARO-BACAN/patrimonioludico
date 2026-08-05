let errores = 0;
let tiempoInicio = 0;
let indice = 0;
let partidas = [];
let bloqueado = true; 

// Elementos de la interfaz
const textoPistaDiv = document.getElementById("texto-pista");
const estadoDiv = document.getElementById("estado");
const misionActualSpan = document.getElementById("misionActual");
const barraProgreso = document.getElementById("barra-progreso");

const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaFinal = document.getElementById("pantalla-final");

const tituloFinal = document.getElementById("titulo-final");
const estrellasFinal = document.getElementById("estrellas-final");
const textoFinal = document.getElementById("texto-final");
const textoErrores = document.getElementById("texto-errores");

function iniciarJuego() {
  pantallaInicio.style.display = "none";
  pantallaFinal.style.display = "none";
  pantallaJuego.style.display = "block";
  barraProgreso.style.display = "block"; // Mostramos el contador superior
  
  partidas = [...misiones].sort(() => Math.random() - 0.5).slice(0, 6);
  
  errores = 0;
  indice = 0;
  tiempoInicio = Date.now(); 
  
  mostrarMision();
}

function mostrarMision() {
  if (indice >= partidas.length) {
    terminarJuego();
    return;
  }

  const misionActual = partidas[indice];
  const indicePista = Math.floor(Math.random() * misionActual.pistas.length);
  
  textoPistaDiv.textContent = misionActual.pistas[indicePista];
  misionActualSpan.textContent = indice + 1;
  
  // Reseteamos el estilo de la etiqueta de estado a tu diseño original
  estadoDiv.textContent = "Buscando...";
  estadoDiv.style.background = "var(--crema-oscuro)";
  estadoDiv.style.color = "var(--rojo-terracota)";
  
  bloqueado = false; 
}

window.escaneoCorrecto = function(nombreTarjeta) {
  if (bloqueado) return; 

  const misionActual = partidas[indice];

  if (misionActual.respuestas.includes(nombreTarjeta)) {
    bloqueado = true; 
    
    // Estilo verde al acertar
    estadoDiv.textContent = "¡Correcto! 🎯";
    estadoDiv.style.background = "#2e7d32"; // Verde sutil
    estadoDiv.style.color = "white";
    
    indice++;

    setTimeout(() => {
      mostrarMision();
    }, 2000);

  } else {
    errores++;
    
    // Estilo rojo intenso al fallar
    estadoDiv.textContent = "¡Sigue buscando! ❌";
    estadoDiv.style.background = "var(--rojo-terracota)";
    estadoDiv.style.color = "white";
    
    setTimeout(() => {
      if (!bloqueado) {
        estadoDiv.textContent = "Buscando...";
        estadoDiv.style.background = "var(--crema-oscuro)";
        estadoDiv.style.color = "var(--rojo-terracota)";
      }
    }, 1500);
  }
};

function terminarJuego() {
  bloqueado = true;
  barraProgreso.style.display = "none"; // Ocultamos el contador

  const tiempoFinal = Date.now();
  const segundosTotales = Math.floor((tiempoFinal - tiempoInicio) / 1000);
  const minutos = Math.floor(segundosTotales / 60);
  const segundos = segundosTotales % 60;
  const textoTiempo = minutos > 0 ? `${minutos} min y ${segundos} seg` : `${segundos} segundos`;

  let estrellas = "⭐⭐⭐";
  let mensaje = "¡Perfecto!";
  
  if (errores > 0 && errores <= 2) {
    estrellas = "⭐⭐";
    mensaje = "¡Muy bien!";
  } else if (errores > 2) {
    estrellas = "⭐";
    mensaje = "¡Misión completada!";
  }

  pantallaJuego.style.display = "none";
  pantallaFinal.style.display = "block";

  tituloFinal.textContent = mensaje;
  estrellasFinal.textContent = estrellas;
  textoFinal.innerHTML = `Misiones superadas en <strong>${textoTiempo}</strong>.`;
  textoErrores.textContent = `Tuviste ${errores} intento(s) extra.`;
}