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
		setPage: (state, action: PayloadAction<number>) => void (state.page = action.payload),
		setPerPage: (state, action: PayloadAction<number>) => void (state.per_page = action.payload),
		setOrder: (state, action: PayloadAction<string>) => void (state.order = action.payload),
		setOrderBy: (state, action: PayloadAction<string>) => void (state.order_by = action.payload)
	}
});

// exports
export const { setPage, setPerPage, setOrder, setOrderBy } = slice.actions;
export default slice.reducer;
