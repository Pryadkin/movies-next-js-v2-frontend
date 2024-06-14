/* eslint-disable init-declarations */
import {RootState} from "@/redux/store/rootReducer"

export const getPopularitySort = (state: RootState) => state.profilePersonReducer.popularitySort

export const getGenderFilter = (state: RootState) => state.profilePersonReducer.genderFilter

export const getKnownDepartmentFilter = (state: RootState) => state.profilePersonReducer.knownDepartmentFilter