import {RootState} from "@/redux/store/rootReducer"


export const getSelectMyMovies = (state: RootState) => state.profileReducer.myMovies
