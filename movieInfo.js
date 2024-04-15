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
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es`)
      .then(response => response.json())
      .then(data => {
        // Mostrar la información de la película en la página
        const movieInfoDiv = document.getElementById('movieInfo');
        movieInfoDiv.innerHTML = `
          <h2>${data.title}</h2>
          <p><strong>Descripción:</strong> ${data.overview}</p>
          <p><strong>Fecha de Lanzamiento:</strong> ${data.release_date}</p>
          <!-- Puedes añadir más información de la película aquí -->
        `;
      })
      .catch(error => {
        console.error('Error al obtener información de la película:', error);
      });
  }

  // Llamar a la función para mostrar la información de la película cuando la página se cargue
  window.addEventListener('DOMContentLoaded', mostrarInformacionPelicula);