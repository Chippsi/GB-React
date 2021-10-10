import '@testing-library/jest-dom'
require('jest-fetch-mock').enableMocks()
import configureStore from 'redux-mock-store'

export const mockStore = configureStore()