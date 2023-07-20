export const enum RequestUrl {
    // movies
    BASE_URL = 'https://api.themoviedb.org/3',
    GET_MOVIES = '/search/movie',

    // profile movies
    GET_PROFILE_MOVIES = '/profile/get_movies',

    // filter data
    GET_FILTER = '/movie_filter/get_filter',

    // localBackend
    BASE_URL_LOCAL = 'http://localhost:4001',
    ADD_MOVIE = 'add_movie',
}