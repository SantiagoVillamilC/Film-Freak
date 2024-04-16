// Función para obtener el ID de la película de la URL
function obtenerIdPeliculaDeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }

  // Función para hacer la solicitud a la API de TMDB y mostrar la información de la película
  function mostrarInformacionPelicula() {
    const movieId = obtenerIdPeliculaDeURL();
    console.log(movieId);
    // Aquí debes reemplazar 'tu_api_key' con tu clave de API de TMDB
    const apiKey = 'cace972f4626db6a5ee3ae755a24b03d';

    // Hacer la solicitud a la API de TMDB para obtener la información de la película
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-MX`)
      .then(response => response.json())
      .then(data => {
        // Mostrar la información de la película en la página
        const movieInfoDiv = document.getElementById('movieInfo');
        movieInfoDiv.innerHTML = `
          <h2>${data.title}</h2>
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="movie poster">
          <p><strong>Descripción:</strong> ${data.overview}</p>
          <p><strong>Fecha de Lanzamiento:</strong> ${data.release_date}</p>

          <p><strong>Presupuesto:</strong> ${data.budget}</p>
          <p><strong>Generos:</strong> ${JSON.stringify(data.genres[0].name)}</p>

          <p><strong>Estado:</strong> ${data.status}</p>
          <p><strong>Compañias:</strong> ${JSON.stringify(data.production_companies[0].name)}</p>

          <p><strong>tagline:</strong> ${data.tagline}</p>
          <p><strong>vote_average:</strong> ${data.vote_average}</p>

          <p><strong>vote_count:</strong> ${data.vote_count}</p>

          <!-- Puedes añadir más información de la película aquí -->
        `;
      })
      .catch(error => {
        console.error('Error al obtener información de la película:', error);
      });
  }

  // Llamar a la función para mostrar la información de la película cuando la página se cargue
  window.addEventListener('DOMContentLoaded', mostrarInformacionPelicula);