import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer from "../slice/reducer";

const store = configureStore({
	reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	{},
	null,
	Action<string>
>;
