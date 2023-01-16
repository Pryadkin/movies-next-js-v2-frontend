import {combineReducers} from '@reduxjs/toolkit'

import {
    searchReducer,
} from '../reducers'

const rootReducer = combineReducers({
    searchReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
