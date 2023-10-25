// redux
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// types
import { user } from '../../../types/User.type';

// init value
const initialState: user = {
	firstName: 'Mahdi',
	lastName: 'Abdollahi',
	emailAddress: 'MAwasTaken@gmail.com',
	overallRate: 5,
	countOfRates: 0
};

// page slice
const slice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<user>) => action.payload,
		clearUser: () => initialState
	}
});

// exports
export const { setUser, clearUser } = slice.actions;
export default slice.reducer;
