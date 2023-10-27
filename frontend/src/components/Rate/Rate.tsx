// react
import React, { useEffect } from 'react';

// iconss
import { FaStarOfLife } from 'react-icons/fa';

// components
import SearchInput from './SearchBar/SearchBar';
import UsersList from './UsersList/UsersList';
import Pagination from './RatePagintaion/RatePagination';

// search bar
const Rate: React.FC = () => {
	// mounting side effects
	useEffect(() => {
		// change document title
		document.title = `CodoCodile | Bruv - Rate`;
	}, []);

	// tsx
	return (
		<>
			<div className="container flex items-center gap-x-2 py-5">
				<FaStarOfLife className="text-rose-500" />
				<h1 className="text-2xl font-semibold text-slate-300">Rate New Person</h1>
			</div>
			<SearchInput />
			<UsersList />
			<Pagination />
		</>
	);
};

// exports
export default Rate;
