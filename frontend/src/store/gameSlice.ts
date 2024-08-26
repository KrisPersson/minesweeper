import { createSlice } from "@reduxjs/toolkit";
import { createNewMatrix } from "../gamelogic/utils";

const initialState = {
  matrix: createNewMatrix(10),
  // Add other state properties here
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: (state) => {
      state.matrix = createNewMatrix(10);
      // Reset other state properties as needed
    },
    update: (state, action) => {
      state.matrix = action.payload;
    },
    // Add more actions as needed
  },
});

// Export the actions
export const { resetGame, update } = gameSlice.actions;

// Export the reducer
export default gameSlice.reducer;
