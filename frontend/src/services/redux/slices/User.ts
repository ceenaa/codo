// redux
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// init value
const initialState: {
	first_name: string;
	last_name: string;
	AverageRate: number;
	message: string;
	role: 'user' | 'admin';
	username: string;
} = { first_name: '', last_name: '', AverageRate: 0, message: '', role: 'user', username: '' };

// page slice
const slice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		setUser: (
			state,
			action: PayloadAction<{
				first_name: string;
				last_name: string;
				AverageRate: number;
				message: string;
				role: 'user' | 'admin';
				username: string;
			}>
		) => action.payload,
		clearUser: () => initialState
	}
});

// exports
export const { setUser, clearUser } = slice.actions;
export default slice.reducer;
