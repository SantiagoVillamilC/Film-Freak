//Visita el sitio: https://santiagovillamilc.github.io/Film-Freak/index.html

let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const paginaPopular = document.getElementById('paginaPopular');

verBoton();
paginaPopular.textContent = `Página ${pagina} - Desliza para verlas todas`;

function verBoton() {
    if (pagina > 1) {
        btnAnterior.style.display = "block";
    } else {
        btnAnterior.style.display = "none";
    }
}

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
        verBoton();
        paginaPopular.textContent = `Pagina: ${pagina}`;
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
        verBoton();
        paginaPopular.textContent = `Pagina: ${pagina} `;
    }
});


const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cace972f4626db6a5ee3ae755a24b03d&language=es-MX&page=${pagina}`);

        // console.log(respuesta);

        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
					<div class="pelicula" id="peliculaPopular${pelicula.id}">
						<img class="poster" src="https://image.tmdb.org/t/p/original/${pelicula.poster_path}" alt="movie poster">
					</div>
				`;
            });

            document.getElementById('contenedor').innerHTML = peliculas;

            datos.results.forEach(pelicula => {
                document.getElementById(`peliculaPopular${pelicula.id}`).addEventListener('click', function () {
                    setTimeout(() => {
                        window.location.href = `movie.html?id=${pelicula.id}`;
                    }, 10);
                });
            });

        } else if (respuesta.status === 401) {
            console.log('Error de comunicación con el servidor');
        } else if (respuesta.status === 404) {
            console.log('Pelicula no encontrada');
        } else {
            console.log('Hubo un error y no sabemos que paso');
        }

    } catch (error) {
        console.log(error);
    }

}

cargarPeliculas();

const cargarPeliculasEnTeatros = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=cace972f4626db6a5ee3ae755a24b03d&language=es-MX`);

        console.log(respuesta);

        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.slice(0, 5).forEach(pelicula => {
                peliculas += `
                    <div class="peliculaTeatros" id="peliculaTeatro${pelicula.id}">
                        <img class="peliTeatro" src="https://image.tmdb.org/t/p/original/${pelicula.backdrop_path}" alt="movie backdrop">
                        <h3 class="tituloTeatro">${pelicula.title}</h3>
                    </div>
                `;
            });

            document.getElementById('containerTheaters').innerHTML = peliculas;

            datos.results.slice(0, 5).forEach(pelicula => {
                document.getElementById(`peliculaTeatro${pelicula.id}`).addEventListener('click', function () {
                    setTimeout(() => {
                        window.location.href = `movie.html?id=${pelicula.id}`;
                    }, 10);
                });
            });

        } else if (respuesta.status === 401) {
            console.log('Error de comunicación con el servidor');
        } else if (respuesta.status === 404) {
            console.log('Pelicula no encontrada');
        } else {
            console.log('Hubo un error y no sabemos que paso');
        }

    } catch (error) {
        console.log(error);
    }

}

cargarPeliculasEnTeatros();


let paginaTopRated = 1;
const btnAnteriorTopRated = document.getElementById('btnAnteriorTopRated');
const btnSiguienteTopRated = document.getElementById('btnSiguienteTopRated');

verBotonTopRated();

const mostrarPaginaTopRated = document.getElementById('mostrarPaginaTopRated');
mostrarPaginaTopRated.textContent = `Página ${paginaTopRated} - Desliza para verlas todas`;


function verBotonTopRated() {
    if (paginaTopRated > 1) {
        btnAnteriorTopRated.style.display = "block";
    } else {
        btnAnteriorTopRated.style.display = "none";
    }
}

btnSiguienteTopRated.addEventListener('click', () => {
    if (paginaTopRated < 1000) {
        paginaTopRated += 1;
        cargarPeliculasTopRated();
        verBotonTopRated();
        mostrarPaginaTopRated.textContent = `Página ${paginaTopRated}`;
    }
});

btnAnteriorTopRated.addEventListener('click', () => {
    if (paginaTopRated > 1) {
        paginaTopRated -= 1;
        cargarPeliculasTopRated();
        verBotonTopRated();
        mostrarPaginaTopRated.textContent = `Página ${paginaTopRated}`;
    }
});


const cargarPeliculasTopRated = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=cace972f4626db6a5ee3ae755a24b03d&language=es-MX&page=${paginaTopRated}`);

        console.log(respuesta);

        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
					<div class="pelicula" id="peliculaPopular${pelicula.id}">
						<img class="posterRated" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="movie poster">
					</div>
				`;
            });

            document.getElementById('contenedorTopRated').innerHTML = peliculas;

            datos.results.forEach(pelicula => {
                document.getElementById(`peliculaPopular${pelicula.id}`).addEventListener('click', function () {
                    setTimeout(() => {
                        window.location.href = `movie.html?id=${pelicula.id}`;
                    }, 10);
                });
            });

        } else if (respuesta.status === 401) {
            console.log('Error de comunicación con el servidor');
        } else if (respuesta.status === 404) {
            console.log('Pelicula no encontrada');
        } else {
            console.log('Hubo un error y no sabemos que paso');
        }

    } catch (error) {
        console.log(error);
    }

}

cargarPeliculasTopRated();

const cargarTrailers = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=cace972f4626db6a5ee3ae755a24b03d&language=es-MX`);

        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=cace972f4626db6a5ee3ae755a24b03d&language=es-MX`);

            // Si la respuesta es correcta
            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                let trailersHTML = '';
                const apiKey = 'cace972f4626db6a5ee3ae755a24b03d';
                const language = 'es-MX';

                // Promesas para todas las solicitudes de video
                const videoPromises = datos.results.slice(0, 10).map(async (pelicula) => {
                    const videoRespuesta = await fetch(`https://api.themoviedb.org/3/movie/${pelicula.id}/videos?api_key=${apiKey}&language=${language}`);
                    if (videoRespuesta.status === 200) {
                        const videoDatos = await videoRespuesta.json();
                        // Seleccionar solo el primer video (si existe) de cada película
                        const primerVideo = videoDatos.results.length > 0 ? videoDatos.results[0] : null;
                        return primerVideo;
                    }
                    return null;
                });

                // Esperar a que todas las solicitudes de video se completen
                const videosPorPelicula = await Promise.all(videoPromises);

                // Generar HTML para los trailers
                videosPorPelicula.forEach(video => {
                    if (video) {
                        trailersHTML += `
                        
                        <iframe src="https://www.youtube.com/embed/${video.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <div class="trailerFrame">
                                
                            </div>
                        `;
                    }
                });

                // Establecer el contenido HTML en el contenedor con el ID 'contenedorTrailers'
                document.getElementById('contenedorTrailers').innerHTML = trailersHTML;
            }

        } else if (respuesta.status === 401) {
            console.log('Error de comunicación con el servidor');
        } else if (respuesta.status === 404) {
            console.log('Pelicula no encontrada');
        } else {
            console.log('Hubo un error y no sabemos que paso');
        }

    } catch (error) {
        console.log(error);
    }

}

cargarTrailers();

const cargarCincoPopulares = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=cace972f4626db6a5ee3ae755a24b03d&Language=es-MX&page=${pagina}`);
        console.log(respuesta);

        //Si la respuesta es correcta
        if (respuesta.status == 200) {
            const datos = await respuesta.json();
            console.log(datos);

            let populares = [];

            for (let i = 0; i < 5; i++) {
                populares.push(JSON.parse(JSON.stringify(datos.results[i])));
            }


            let index = 0;

            // Función para mostrar el título de las películas de forma ordenada
            function mostrarCincoPopulares() {
                let popularObj = populares[index];

                let header = document.getElementById('myHeader');
                header.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${popularObj.backdrop_path})`;

                const posterHeaderPopular = document.getElementById('posterHeaderPopular');
                posterHeaderPopular.src = `https://image.tmdb.org/t/p/original/${popularObj.poster_path}`;

                const titlePopular = document.getElementById('titlePopular');
                titlePopular.textContent = popularObj.title;

                const generosPopular = document.getElementById('generosPopular');
                generosPopular.textContent = popularObj.release_date;

                const headerURL = document.getElementById('headerURL');
                headerURL.href = `movie.html?id=${popularObj.id}`;

                index = (index + 1) % 5; // Avanzar al siguiente título (ciclo circular)
            }

            // Mostrar el primer título inmediatamente y luego actualizar cada 7 segundos
            mostrarCincoPopulares();
            setInterval(mostrarCincoPopulares, 7000);


        }
        else if (respuesta.status == 401) {
            console.log('Error de comunicación con el servidor');
        }
        else if (respuesta.status == 404) {
            console.log('Pelicula no encontrada');
        }
        else {
            console.log('Hubo un error');
        }
    }
    catch (error) {
        console.log(error);
    }
}

cargarCincoPopulares();
