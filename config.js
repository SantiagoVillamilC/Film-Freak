// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWNlOTcyZjQ2MjZkYjZhNWVlM2FlNzU1YTI0YjAzZCIsInN1YiI6IjY2MTg4ODI1YWYzZGE2MDE2MzE4MWUzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.naEXd2hKg39DelNourumiTxYCLJnAsRZ9UeGVirkD78'
//     }
// };

// fetch('https://api.themoviedb.org/3/authentication', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


const movie = {
    "adult": false,
    "backdrop_path": "/eCynaAOgYYiw5yN5lBwz3IxqvaW.jpg",
    "belongs_to_collection": {
        "id": 137697,
        "name": "Finding Nemo Collection",
        "poster_path": "/xwggrEugjcJDuabIWvK2CpmK91z.jpg",
        "backdrop_path": "/2hC8HHRUvwRljYKIcQDMyMbLlxz.jpg"
    }
};

const posterUrl = `https://image.tmdb.org/t/p/original${movie.belongs_to_collection.poster_path}`;
document.querySelector('.poster').src = posterUrl;


// Suponiendo que 'movie' es el objeto JSON que proporcionaste anteriormente
const collectionName = movie.belongs_to_collection.name;

// Accede al elemento div utilizando su id y establece su contenido como el nombre de la colección
document.getElementById('collectionName').textContent = collectionName;