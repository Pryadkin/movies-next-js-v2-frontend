export const enum RequestUrl {
    // movies
    BASE_URL = 'https://api.themoviedb.org/3',
    GET_MOVIES = '/search/movie',

    //TV
    GET_TV = '/search/tv',

    // profile movies
    GET_PROFILE_MOVIES = '/profile/get_movies',
    ADD_PROFILE_MOVIE = '/profile/add_movie',
    UPDATE_PROFILE_MOVIE = '/profile/update_movie',
    DELETE_PROFILE_MOVIE = '/profile/delete_movie',
    UPDATE_MOVIE_TAGS = '/profile/update_movie_tags',
    DELETE_MOVIE_TAGS = '/profile/delete_movie_tags',

    // movie tags
    GET_MOVIE_TAGS = '/movie_tags/get_movie_tags',
    ADD_MOVIE_TAG = '/movie_tags/add_movie_tag',
    DELETE_TAG = '/movie_tags/delete_tag',
    UPDATE_TAGS = '/movie_tags/update_tags',

    // movies tree
    GET_MOVIES_TREE = '/movie_tree/get_movie_tree',

    // genres
    GET_GENRES = '/genres/get_genres',

    // localBackend
    BASE_URL_LOCAL = 'http://localhost:4001',
}