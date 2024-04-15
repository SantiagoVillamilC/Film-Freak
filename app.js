let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});


const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cace972f4626db6a5ee3ae755a24b03d&language=es-MX&page=${pagina}`);

        console.log(respuesta);

        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
            });

            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 401) {
            console.log('Pusiste la llave mal');
        } else if (respuesta.status === 404) {
            console.log('La pelicula que buscas no existe');
        } else {
            console.log('Hubo un error y no sabemos que paso');
        }

    } catch (error) {
        console.log(error);
    }

}

cargarPeliculas();






// const cargarTrailer = async () => {
//     try {
//         const respuesta = await fetch(`https://api.themoviedb.org/3/movie/550/videos?api_key=cace972f4626db6a5ee3ae755a24b03d`);

//         if (respuesta.status === 200) {
//             const datos = await respuesta.json();
//             let trailersHTML = '';

//             datos.results.forEach(trailer => {
//                 trailersHTML += `
//                     <div class="pelicula">
//                          //Toca utilizar embed para traer los videos de youtube de forma segura
//                         <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//                     </div>
//                 `;
//             });

//             document.getElementById('contenedor').innerHTML = trailersHTML;
//         } else if (respuesta.status === 401) {
//             console.log('Pusiste la llave mal');
//         } else if (respuesta.status === 404) {
//             console.log('La película que busca no existe');
//         } else {
//             console.log('Hubo un error');
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// cargarTrailer();

// let title_hero = document.getElementById('title_hero');
// let sinopsis_hero = document.getElementById('sinopsis_hero');

const cargarCincoPopulares = async () => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=cace972f4626db6a5ee3ae755a24b03d&Language=es-MX&page=${pagina}`);
        console.log(respuesta);

        //Si la respuesta es correcta
        if (respuesta.status == 200) {
            const datos = await respuesta.json();
            console.log(datos);

            let populares = [];

            for (let i = 0; i < 4; i++) {
                populares.push(JSON.parse(JSON.stringify(datos.results[i])));
            }

            // Ahora 'populares' contiene los objetos de las películas populares

            // console.log('Populares: ' + (populares));

            for (let i = 0; i < 4; i++) {
                console.log("Primeras 4 películas más populares hoy: ", populares[i].title, populares[i].poster_path);
            }

            let firstCardPopular = document.getElementById('firstCardPopular');
            firstCardPopular.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${populares[0].poster_path})`;
            let firstTitleCardPopular = document.getElementById('firstTitleCardPopular');
            firstTitleCardPopular.textContent = populares[0].title;

            let secondCardPopular = document.getElementById('secondCardPopular');
            secondCardPopular.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${populares[1].poster_path})`;
            let secondTitleCardPopular = document.getElementById('secondTitleCardPopular');
            secondTitleCardPopular.textContent = populares[1].title;

            let thirdCardPopular = document.getElementById('thirdCardPopular');
            thirdCardPopular.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${populares[2].poster_path})`;
            let thirdTitleCardPopular = document.getElementById('thirdTitleCardPopular');
            thirdTitleCardPopular.textContent = populares[2].title;

            let fourthCardPopular = document.getElementById('fourthCardPopular');
            fourthCardPopular.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${populares[3].poster_path})`;
            let fourthTitleCardPopular = document.getElementById('fourthTitleCardPopular');
            fourthTitleCardPopular.textContent = populares[3].title;

            let index = 0;

            // Función para mostrar el título de las películas de forma ordenada
            function mostrarCincoPopulares() {
                let popularObj = populares[index];
                document.getElementById('title_hero').textContent = popularObj.title;
                document.getElementById('sinopsis_hero').textContent = popularObj.overview;
                console.log('Que cosa: ', popularObj);

                let idPeli = popularObj.id;

                let header = document.getElementById('myHeader');
                header.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${popularObj.backdrop_path})`;

                index = (index + 1) % 4; // Avanzar al siguiente título (ciclo circular)
            }

            // Mostrar el primer título inmediatamente y luego actualizar cada 7 segundos
            mostrarCincoPopulares();
            setInterval(mostrarCincoPopulares, 7000);


            // datos.results.forEach(pelicula => {
            //     peliculas += `
            //          <div class="pelicula">
            //              <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            //              <h3 class="titulo">${pelicula.title}</h3>
            //          </div>
            //      `;
            // });

            // document.getElementById('contenedor').innerHTML = peliculas;


        }
        else if (respuesta.status == 401) {
            console.log('Pusiste la llave mal');
        }
        else if (respuesta.status == 404) {
            console.log('La pelicula que busca no existe');
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