// redux
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// reducers
import User from './slices/User';

// store
export const store = configureStore({
	reducer: {
		user: User
	}
});

// types
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// exports
export default store;
