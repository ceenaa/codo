// react
import React from 'react';

// rechart
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

// react query
import useChartDetails from '../../../hooks/useChartDetails';

// redux
import { useSelector } from 'react-redux';

// history chart
const HistoryChart: React.FC<{ username: string }> = ({ username }) => {
	// GET chart details from react query
	const { data } = useChartDetails(username);

	// change Date format
	data?.map((item: any) => (item.Date = item.Date.slice(0, 10)));

	// tsx
	return (
		<LineChart
			className=" z-50 mx-auto"
			width={
				document.documentElement.clientWidth > 768
					? document.documentElement.clientWidth * 0.5
					: document.documentElement.clientWidth * 0.9
			}
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
