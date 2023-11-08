import {RootState} from "@/redux/store/rootReducer"

export const getSelectLanguage = (state: RootState) => state.layoutReducer.language
export const getIsModalDetailsOpen = (state: RootState) => state.layoutReducer.isModalDetailsOpen
export const getIsAddMovieModalOpen = (state: RootState) => state.layoutReducer.isAddMovieModalOpen
export const getArtistId = (state: RootState) => state.layoutReducer.artistId
