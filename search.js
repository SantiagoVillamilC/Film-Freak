const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const sortSelect = document.getElementById('sortSelect');
const resultsContainer = document.getElementById('results');

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    const filter = filterSelect.value;
    const sort = sortSelect.value;

    const results = await searchMovies(query);

    displayResults(results);
});

async function searchMovies(query, filter, sort) {
    const apiKey = 'cace972f4626db6a5ee3ae755a24b03d';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&language=es&api_key=${apiKey}&page=1&include_adult=false`;

    // if (filter) {
    //     apiUrl += `&with_genres=${filter}`;
    // }

    // if (sort) {
    //     apiUrl += `&sort_by=${sort}`;
    // }

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

            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">${movie.overview}</p>
        
        <a href="movie.html?id=${movie.id}">Ver Detalles</a>
      </div>
    </div>
  </div>
</div>
        `;
        
        //<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
        resultsContainer.appendChild(movieElement);
    });
}
