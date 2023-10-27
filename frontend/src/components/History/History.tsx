// react
import React from 'react';

// components
import HistoryList from './HistoryList/HistoryList';
import Pagination from '../Rate/Pagintaion/Pagination';
import HistoryChart from './HistoryChart/HistoryChart';

// icons
import { FaStarOfLife } from 'react-icons/fa';

// history
const History: React.FC = () => {
	// tsx
	return (
		<>
			<div className="container flex items-center gap-x-2 py-5">
				<FaStarOfLife className="text-rose-500" />
				<h1 className="text-2xl font-semibold text-slate-300">History</h1>
			</div>
			<HistoryList />
			<Pagination />
			<HistoryChart />
		</>
	);
};

// exports
export default History;
``;
