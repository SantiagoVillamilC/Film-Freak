// Función para obtener el ID de la película de la URL
function obtenerIdPeliculaDeURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Funcion para hacer la solicitud a la API de TMDB y mostrar la información de la película
function mostrarInformacionPelicula() {
  const movieId = obtenerIdPeliculaDeURL();
  console.log(movieId);
  const apiKey = 'cace972f4626db6a5ee3ae755a24b03d';

  // Hacer la solicitud a la API de TMDB para obtener la información de la película
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-MX`)
    .then(response => response.json())
    .then(data => {
      const header = document.getElementById("header");
      header.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`;

      const tituloPelicula = document.getElementById('tituloPelicula');
      tituloPelicula.textContent = `${data.title}`

      const frasePelicula = document.getElementById('frasePelicula');
      frasePelicula.textContent = `${data.tagline}`;

      const posterPeli = document.getElementById('posterPeli');
      posterPeli.innerHTML = `<img class="poster" src="https://image.tmdb.org/t/p/original/${data.poster_path}" alt="movie poster">`;
      // Mostrar la información de la película en la página
      const movieInfoDiv = document.getElementById('movieInfo');
      // Construir una cadena con todos los géneros separados por comas
      // Construir una cadena con divs para cada género
      const genresDivs = data.genres.map(genre => `<div class="genre"><strong>${genre.name}</strong></div>`).join('');

      movieInfoDiv.innerHTML = `
          <div class="container-titles">
            <h2>${data.title}</h2>
            <h3>${data.tagline}</h3>
          </div>
          <div class="container-plot">
            <p><strong>Sinopsis:</strong></p>
            <p>${data.overview}</p>
          </div>

          <div class="genres-container">
            <p><strong>Géneros:</strong></p>
            ${genresDivs}
          </div>
          
          <div class="original-language-container">
            <p><strong>Titulo Original:</strong> ${data.original_title}</p>
            <p><strong>Idioma Original:</strong> ${data.original_language}</p>
            <p><strong>Estado:</strong> ${data.status}</p>
          </div>
          

          <!-- Puedes añadir más información de la película aquí -->
        `;
      //<p><strong>Estado:</strong> ${data.status}</p>
      //<p><strong>revenue:</strong> ${data.revenue}</p>
      const scoreDiv = document.getElementById('scoreDiv');
      scoreDiv.innerHTML = `
          <div class="container-score-principal">
            <p id="voteAverageElement" class="rating-circle"><strong>${data.vote_average}</strong></p>
          </div>
          <p class="votes-count"><strong>${data.vote_count}</strong> votos</p>
      `;
      //<p>Calificacion:</p>

      // Suponiendo que "runtime" es el valor obtenido de la API
      let runtime = data.runtime;

      // Convertir a horas y minutos
      let hours = Math.floor(runtime / 60);
      let minutes = runtime % 60;

      let durationString = hours + "h " + minutes + "min";

      console.log(durationString);

      // Obtener el presupuesto de la película de la respuesta de la API
      let budget = data.budget;

      // Formatear el presupuesto para que sea más legible para el usuario
      let formattedBudget = budget.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      // Insertar el presupuesto formateado en el DOM
      const barInfo = document.getElementById('barInfo');
      barInfo.innerHTML = `
        <div class="bar-info-icon">
          <i class="bi bi-calendar3"></i>
          <p><strong>Lanzamiento:</strong> ${data.release_date}</p>
        </div>
        <div class="bar-info-icon">
          <i class="bi bi-clock"></i>
          <p><strong>Duración:</strong> ${durationString}</p>
        </div>
        <div class="bar-info-icon">
          <i class="bi bi-cash-coin"></i>
          <p><strong>Presupuesto:</strong> ${formattedBudget}</p>
        </div>
`;



      let voteAverage = data.vote_average; //Puntaje de la película
      let formattedVoteAverage = Number(voteAverage.toFixed(1));

      // Función para asignar un color según el puntaje
      function getColorForVoteAverage(formattedVoteAverage) {
        if (formattedVoteAverage >= 7) {
          return "#00E676"; // Verde para puntajes altos
        } else if (formattedVoteAverage >= 5) {
          return "#FFEB3B"; // Amarillo para puntajes medios
        } else {
          return "#FF5252"; // Rojo para puntajes bajos
        }
      }

      // Obtener el color correspondiente al puntaje
      let color = getColorForVoteAverage(formattedVoteAverage);

      // Aplicar el color al elemento HTML que muestra el puntaje
      // const voteAverageElement = document.getElementById('voteAverageElement');
      // voteAverageElement.style.color = color;

      const scoreFace = document.getElementById('scoreFace');

      scoreFace.style.color = color;
      scoreDiv.style.backgroundColor = color;

      function getEmoji(formattedVoteAverage) {
        if (formattedVoteAverage >= 7) {
          return "bi bi-emoji-smile";
        } else if (formattedVoteAverage >= 5) {
          return "bi bi-emoji-neutral";
        } else {
          return "bi bi-emoji-frown"; 
        }
      }
      scoreFace.innerHTML = `
        <i class="${getEmoji(formattedVoteAverage)}"></i>
      `;
    })
    .catch(error => {
      console.error('Error al obtener información de la película:', error);
    });
}

// Llamar a la función para mostrar la información de la película cuando la página se cargue
window.addEventListener('DOMContentLoaded', mostrarInformacionPelicula);

document.addEventListener("DOMContentLoaded", function () {
  var logoHeader = document.getElementById("logoHeader");
  logoHeader.addEventListener("click", function () {
    window.location.href = "index.html";
  });
});


setInterval(cambiarColorTitulos, 7000);

function cambiarColorTitulos() {
  let tituloFrasePelicula = document.getElementById('tituloFrasePelicula');
  tituloFrasePelicula.classList.toggle('cambio-color');
}
