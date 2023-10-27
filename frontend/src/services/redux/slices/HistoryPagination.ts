// redux
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// init value
const initialState = {
	page: 1,
	per_page: 10,
	order_by: '',
	order: ''
};

// page slice
const slice = createSlice({
	name: 'ListDetails',
	initialState,
	reducers: {
		setHistoryPage: (state, action: PayloadAction<number>) => void (state.page = action.payload),
		setHistoryPerPage: (state, action: PayloadAction<number>) =>
			void (state.per_page = action.payload)
	}
});

// exports
export const { setHistoryPage, setHistoryPerPage } = slice.actions;
export default slice.reducer;
