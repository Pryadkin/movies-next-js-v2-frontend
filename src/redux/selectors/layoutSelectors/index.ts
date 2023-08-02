import {RootState} from "@/redux/store/rootReducer"

export const getSelectLanguage = (state: RootState) => state.layoutReducer.language
