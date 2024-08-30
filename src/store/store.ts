import { configureStore } from "@reduxjs/toolkit";

// Import your reducers here (we'll create them in the next step)
import gameReducer from "./gameSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    // Add more reducers here if needed
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
