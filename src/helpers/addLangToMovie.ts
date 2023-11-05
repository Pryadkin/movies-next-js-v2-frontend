import {IMovie} from "@/api/apiTypes"
import {ICorrectMovie} from "@/api/apiTypes/requestMovies"
import {TLanguage} from '@/types'

export const addLangToMovie = (movie: IMovie, lang: TLanguage): ICorrectMovie => {
    const {
        adult,
        genre_ids,
        id,
        original_language,
        original_title,
        popularity,
        release_date,
        video,
        vote_average,
        vote_count,
        settings,
    } = movie
    const updateMovie = {
        adult,
        genre_ids,
        id,
        original_language,
        original_title,
        popularity,
        release_date,
        video,
        vote_average,
        vote_count,
        settings,
    }

    if (lang === 'en-EN') {
        return {
            adult,
            backdrop_path_en: movie.backdrop_path,
            backdrop_path_ru: null,
            genre_ids,
            id,
            original_language,
            original_title,
            overview_en: movie.overview,
            overview_ru: null,
            popularity,
            poster_path_en: movie.poster_path,
            poster_path_ru: null,
            release_date,
            title_en: movie.title,
            title_ru: null,
            video,
            vote_average,
            vote_count,
            settings,
        }
    }
    return {
        adult,
        backdrop_path_ru: movie.backdrop_path,
        backdrop_path_en: null,
        genre_ids,
        id,
        original_language,
        original_title,
        overview_ru: movie.overview,
        overview_en: null,
        popularity,
        poster_path_ru: movie.poster_path,
        poster_path_en: null,
        release_date,
        title_ru: movie.title,
        title_en: null,
        video,
        vote_average,
        vote_count,
        settings,
    }
}

export const addContantToMovieLang = (
    movie: ICorrectMovie,
    movieLang: ICorrectMovie,
    anotherlang: TLanguage,
): ICorrectMovie => {
    if (anotherlang === 'en-EN') {
        return {
            ...movieLang,
            backdrop_path_en: movie.backdrop_path,
            overview_en: movie.overview,
            poster_path_en: movie.poster_path,
            title_en: movie.title,
        }
    }
    return {
        ...movieLang,
        backdrop_path_ru: movie.backdrop_path,
        overview_ru: movie.overview,
        poster_path_ru: movie.poster_path,
        title_ru: movie.title,

    }
}