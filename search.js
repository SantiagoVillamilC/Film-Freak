const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

searchInput.addEventListener('input', async function() {
    const query = searchInput.value.trim();
    const results = await searchMovies(query);
    displayResults(results);
});

async function searchMovies(query) {
    const apiKey = 'cace972f4626db6a5ee3ae755a24b03d';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&language=es-MX&api_key=${apiKey}&page=1`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.results;
}

function displayResults(results) {
    resultsContainer.innerHTML = '';

    results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `         
               
            <div class="card mb-3" style="max-width: 540px;" data-bs-theme="dark" >
                <div class="row row-cols-1 row-cols-md-2 g-0">
                    <div class="col-md-4">
                        <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="img-fluid rounded-start" alt="Poster Pelicula">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">Titulo original: ${movie.original_title}</p>
                            <p class="card-text">Fecha de salida: ${movie.release_date}</p>
                            <a href="movie.html?id=${movie.id}">Ver Detalles</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        resultsContainer.appendChild(movieElement);
    });
}
