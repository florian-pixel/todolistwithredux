import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducer/index'

export default configureStore ({
    reducer: rootReducer
})