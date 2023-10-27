// react
import React, { useEffect } from 'react';

// components
import HistoryList from './HistoryList/HistoryList';
import Pagination from '../Rate/RatePagintaion/RatePagination';
import HistoryChart from './HistoryChart/HistoryChart';

// icons
import { FaStarOfLife } from 'react-icons/fa';
import HistoryListPagination from './HistoryListPagination/HistoryListPagination';

// redux
import { useSelector } from 'react-redux';

// history
const History: React.FC = () => {
	// mounting side effects
	useEffect(() => {
		// change document title
		document.title = `CodoCodile | Bruv - History`;
	}, []);

  // GET username from redux state
	const userName = useSelector((state: any) => state.user.username);

	// tsx
	return (
		<>
			<div className="container flex items-center gap-x-2 py-5">
				<FaStarOfLife className="text-rose-500" />
				<h1 className="text-2xl font-semibold text-slate-300">History</h1>
			</div>
			<HistoryList />
			<HistoryListPagination />
			<HistoryChart username={userName} />
		</>
	);
};

// exports
export default History;
``;
