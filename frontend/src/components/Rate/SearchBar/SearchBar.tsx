// react
import React, { MutableRefObject, useEffect, useRef } from 'react';

// icons
import { AiOutlineSearch } from 'react-icons/ai';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setText } from '../../../services/redux/slices/ListDetails';

// search bar
const SearchInput: React.FC = () => {
	// redux dispatch hook
	const dispatch = useDispatch();

	// search bar reference
	const input = useRef<HTMLInputElement>(null);

	// search input value
	const text = useSelector((state: any) => state.listDetails.text);

	useEffect(() => {
		input.current?.focus();
	});

	// tsx
	return (
		<label htmlFor="searchByName" className="flex w-full items-center justify-center gap-x-5">
			<AiOutlineSearch className="h-7 w-7 rounded-full bg-rose-500/50 p-1.5 text-rose-500 hover:bg-rose-500/50 md:h-10 md:w-10 md:p-2" />
			<input
				ref={input}
				type="text"
				id="searchByName"
				className="h-7 w-3/4 rounded-3xl bg-slate-700 px-5 text-lg font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 md:h-10"
				placeholder="Search"
				value={text}
				onChange={(e) => dispatch(setText(String(e.target.value)))}
			/>
		</label>
	);
};

// exports
export default SearchInput;
