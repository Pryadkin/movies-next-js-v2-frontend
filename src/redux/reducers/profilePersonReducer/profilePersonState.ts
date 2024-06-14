import {TGender, TPersonKnownDepartment} from "@/api/apiTypes/requestPerson"

export interface State {
    popularitySort: 'asc' | 'desc'
    genderFilter: TGender
    knownDepartmentFilter: TPersonKnownDepartment
}

export const initialState: State = {
    popularitySort: 'asc',
    genderFilter: 0,
    knownDepartmentFilter: 'All'
}
