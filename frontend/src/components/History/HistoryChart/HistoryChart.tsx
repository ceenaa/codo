// react
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// rechart
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

// react query
import useChartDetails from '../../../hooks/useChartDetails';

// history chart
const HistoryChart: React.FC = () => {
	// GET chart details from react query
	const { data } = useChartDetails();

	// tsx
	return (
		<LineChart
			className=" mx-auto"
			width={document.documentElement.clientWidth * 0.5}
			height={400}
			data={data}
		>
			<XAxis dataKey="Date" />
			<YAxis dataKey="AverageRate" />
			<CartesianGrid />
			<Line type="monotone" dataKey="AverageRate" stroke="#f43f5e" />
		</LineChart>
	);
};

export default HistoryChart;
