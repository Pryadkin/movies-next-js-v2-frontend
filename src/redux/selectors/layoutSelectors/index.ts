import {RootState} from "@/redux/store/rootReducer"

export const getSelectLanguage = (state: RootState) => state.layoutReducer.language
export const getIsModalDetailsOpen = (state: RootState) => state.layoutReducer.isModalDetailsOpen
export const getIsAddMovieModalOpen = (state: RootState) => state.layoutReducer.isAddMovieModalOpen
export const getArtistId = (state: RootState) => state.layoutReducer.artistId
export const getModelContent= (state: RootState) => state.layoutReducer.modelContent

export const getSelectDateViewing = (state: RootState) => state.layoutReducer.selectMovie?.settings.dateViewing

export const getSelectMovie = (state: RootState) => state.layoutReducer.selectMovie
