import { createSlice } from "@reduxjs/toolkit";
import { createNewMatrix } from "../gamelogic/utils";

const initialState = {
  matrix: createNewMatrix(10),
  timerIsRunning: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: (state) => {
      state.matrix = createNewMatrix(10);
      state.timerIsRunning = false;
    },
    update: (state, action) => {
      state.matrix = action.payload;
    },
    setTimerIsRunning: (state, action) => {
      state.timerIsRunning = action.payload;
    },
  },
});

export const { resetGame, update, setTimerIsRunning } = gameSlice.actions;

// Export the reducer
export default gameSlice.reducer;
