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
        const respuesta = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=cace972f4626db6a5ee3ae755a24b03d&Language=es-MX&page=${pagina}`);
        console.log(respuesta);

        //Si la respuesta es correcta
        if (respuesta.status == 200) {
            const datos = await respuesta.json();
            console.log(datos);

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
