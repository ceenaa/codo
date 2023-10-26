// redux
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// init value
const initialState = {
	text: '',
	page: 1,
	per_page: 10
};

// page slice
const slice = createSlice({
	name: 'ListDetails',
	initialState,
	reducers: {
		setText: (state, action: PayloadAction<string>) => void (state.text = action.payload),
		setPage: (state, action: PayloadAction<number>) => void (state.page = action.payload),
		setPerPage: (state, action: PayloadAction<number>) => void (state.per_page = action.payload)
	}
});

// exports
export const { setText, setPage, setPerPage } = slice.actions;
export default slice.reducer;
