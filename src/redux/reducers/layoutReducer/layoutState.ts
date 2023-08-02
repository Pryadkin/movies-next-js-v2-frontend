import {TLanguage} from "@/types"

export interface State {
    language: TLanguage,
}

export const initialState: State = {
    language: 'ru-RU',
}
