// react
import React from 'react';
import HistoryList from './HistoryList/HistoryList';
import Pagination from '../Rate/Pagintaion/Pagination';
import HistoryChart from './HistoryChart/HistoryChart';

// history
const History: React.FC = () => {
	// tsx
	return (
		<>
			<HistoryList />
			<Pagination />
			<HistoryChart />
		</>
	);
};

// exports
export default History;
``;
