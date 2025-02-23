export const enum RequestUrl {
    // movies
    BASE_URL = 'https://api.themoviedb.org/3',
    GET_MOVIES = '/search/movie',
    GET_MULTI = '/search/multi',
    GET_SEARCH_PERSON= '/search/person',
    GET_MOVIE = '/movie',
    GET_DETAILS_TV = '/tv',

    //TV
    GET_TV = '/search/tv',
    GET_TOP_RATED = '/top_rated',
    GET_NOW_PLAYING = '/now_playing',
    GET_POPULAR_MOVIES= '/popular',

    // Popular
    GET_POPULAR = '/person/popular',

    // Credits
    GET_CREDITS= 'credits',

    // Person
    GET_PERSON= '/person',

    // profile movies
    GET_PROFILE_MOVIES = '/profile/get_movies',
    GET_PROFILE_MOVIE_BY_NAME = '/profile/get_movie_by_name',
    ADD_PROFILE_MOVIE = '/profile/add_movie',
    UPDATE_PROFILE_MOVIE = '/profile/update_movie',
    DELETE_PROFILE_MOVIE = '/profile/delete_movie',
    UPDATE_MOVIE_TAGS = '/profile/update_movie_tags',
    DELETE_MOVIE_TAGS = '/profile/delete_movie_tags',
    GET_PROFILE_MOVIE_IDS = '/profile/get_movie_ids',

    GET_PROFILE_PERSONS = '/profile/get_persons',
    ADD_PROFILE_PERSON = '/profile/add_person',
    DELETE_PROFILE_PERSON = '/profile/delete_person',

    SAVE_MOVIE_COLLECTION = '/profile/set_movies_collection',
    EDIT_MOVIE_COLLECTION = '/profile/edit_movie_collection',
    DELETE_MOVIE_COLLECTION = '/profile/delete_movies_collection',
    GET_COLLECTIONS_NAME = '/profile/get_collections_name',
    GET_COLLECTION_BY_NAME = '/profile/get_collection_by_name',
    SET_MOVIE_TO_COLLECTION = '/profile/set_movie_to_collection',

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
    GET_SELECT_GENRES = '/filters/get-select-genres',
    GET_SELECT_TAGS = '/filters/get-select-tags',
    BY_GENRE_FILTER = '/filters/by-genre',
    BY_TAG_FILTER = '/filters/by-tag',

    // localBackend
    BASE_URL_LOCAL = 'http://localhost:4001',
}