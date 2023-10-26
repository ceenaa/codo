// react
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// rechart
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

// react query
import useReceived from '../../../hooks/useReceived';

// history chart
const HistoryChart: React.FC = () => {
	// GET username from redux
	const userName = useSelector((state: any) => state.user.username);

	// GET history from redux
	const history = useSelector((state: any) => state.history);

	// GET received from react query
	const { data, refetch } = useReceived(
		userName,
		history.page,
		history.per_page,
		history.order,
		history.order_by
	);

	// refetch when changing pagination
	useEffect(() => {
		refetch();
	}, [history]);

	console.log(data);

	// tsx
	return (
		<LineChart
			className="mx-auto"
			width={document.documentElement.clientWidth * 0.5}
			height={400}
			data={[
				{
					date: 'lol',
					rate: 1
				},
				{
					date: 'lol2',
					rate: 5
				},
				{
					date: 'lol3',
					rate: 3
				},
				{
					date: 'lol4',
					rate: 5
				},
				{
					date: 'lol5',
					rate: 2
				}
			]}
		>
			<XAxis dataKey="date" />
			<YAxis dataKey="rate" />
			<CartesianGrid />
			<Line name="pv of pages" type="monotone" dataKey="rate" stroke="#f43f5e" />
		</LineChart>
	);
};

export default HistoryChart;
