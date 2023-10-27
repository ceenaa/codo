// react query
import { useQuery } from 'react-query';

// axios
import { getChartDetails } from '../services/axios/requests/chart';

// use received
const useChartDetails = () =>
	useQuery('Chart/List', () => getChartDetails().then((res) => res.data.charts));

// exports
export default useChartDetails;
