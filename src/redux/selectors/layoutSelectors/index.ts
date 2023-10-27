import {RootState} from "@/redux/store/rootReducer"

export const getSelectLanguage = (state: RootState) => state.layoutReducer.language
export const getIsModalDetailsOpen = (state: RootState) => state.layoutReducer.isModalDetailsOpen
