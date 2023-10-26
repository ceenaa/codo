// redux
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// reducers
import User from './slices/User';
import ListDetails from './slices/ListDetails';

// store
export const store = configureStore({
	reducer: {
		user: User,
		listDetails: ListDetails
	}
});

// types
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// exports
export default store;
