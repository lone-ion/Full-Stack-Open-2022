import { createSlice } from '@reduxjs/toolkit'

// const filterReducer = (state = 'ALL', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterChange = (filter) => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter,
//   }
// }

// export default filterReducer

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: 'ALL',
  reducers: {
    filterChange(state, action) {

      return action.payload
    }
  }
})

export const { filterChange } = anecdoteSlice.actions
export default anecdoteSlice.reducer