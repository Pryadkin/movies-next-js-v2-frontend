export const enum RequestUrl {
    // movies
    BASE_URL = 'https://api.themoviedb.org/3',
    GET_MOVIES = '/search/movie',
    GET_MULTI = '/search/multi',
    GET_MOVIE = '/movie',
    GET_DETAILS_TV = '/tv',

    //TV
    GET_TV = '/search/tv',
    GET_TOP_RATED = '/top_rated',

    // Popular
    GET_POPULAR = '/person/popular',

    // Credits
    GET_CREDITS= '/credits',

    // Person
    GET_PERSON= '/person',

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

    // filters
    BY_GENRE_FILTER = '/filters/by-genre',

    // localBackend
    BASE_URL_LOCAL = 'http://localhost:4001',
}