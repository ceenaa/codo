// react
import React from 'react';

// icons
import { AiOutlineSearch } from 'react-icons/ai';

// redux
import { useDispatch } from 'react-redux';
import { setText } from '../../../services/redux/slices/ListDetails';

// search bar
const SearchInput: React.FC = () => {
	// redux dispatch hook
	const dispatch = useDispatch();
	// tsx
	return (
		<label htmlFor="searchByName" className="flex w-full items-center justify-center gap-x-5">
			<AiOutlineSearch className="h-7 w-7 rounded-full bg-rose-500/50 p-1.5 text-rose-500 hover:bg-rose-500/50 md:h-10 md:w-10 md:p-2" />
			<input
				type="text"
				id="searchByName"
				className="h-7 w-3/4 rounded-3xl bg-slate-700 px-5 text-lg font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 md:h-10"
				placeholder="Search By Name"
				onChange={(e) => dispatch(setText(String(e.target.value)))}
			/>
		</label>
	);
};

// exports
export default SearchInput;
