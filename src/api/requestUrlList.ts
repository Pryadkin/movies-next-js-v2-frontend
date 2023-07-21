export const enum RequestUrl {
    // movies
    BASE_URL = 'https://api.themoviedb.org/3',
    GET_MOVIES = '/search/movie',

    // profile movies
    GET_PROFILE_MOVIES = '/profile/get_movies',
    ADD_PROFILE_MOVIE = '/profile/add_movie',
    UPDATE_PROFILE_MOVIE = '/profile/update_movie',

    // movie tags
    GET_MOVIE_TAGS = '/movie_tags/get_movie_tags',

    // movies tree
    GET_MOVIES_TREE = '/movie_tree/get_movie_tree',

    // localBackend
    BASE_URL_LOCAL = 'http://localhost:4001',
}