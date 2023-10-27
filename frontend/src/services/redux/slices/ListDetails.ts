// redux
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// init value
const initialState = {
	text: '',
	page: 1,
	per_page: 10,
	order: '',
	order_by: ''
};

// page slice
const slice = createSlice({
	name: 'ListDetails',
	initialState,
	reducers: {
		setText: (state, action: PayloadAction<string>) => void (state.text = action.payload),
		setRatePage: (state, action: PayloadAction<number>) => void (state.page = action.payload),
		setRatePerPage: (state, action: PayloadAction<number>) => void (state.per_page = action.payload)
	}
});

// exports
export const { setText, setRatePage, setRatePerPage } = slice.actions;
export default slice.reducer;
