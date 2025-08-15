import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'This banner displays the state of Redux store.',
  reducers: {
    displayMessage(state, action) {

      return initialState
    }
  }
})

export const { displayMessage } = notificationSlice.actions
export default notificationSlice.reducer