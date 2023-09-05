import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;