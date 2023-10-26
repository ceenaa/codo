// react
import React from 'react';
import { useSelector } from 'react-redux';
import useReceived from '../../hooks/useReceived';
import HistoryList from './HistoryList/HistoryList';
import Pagination from '../Rate/Pagintaion/Pagination';

// history
const History = () => {
	// tsx
	return (
		<>
			<HistoryList />
			<Pagination />
		</>
	);
};

// exports
export default History;
``;
