// react query
import { useQuery } from 'react-query';

// axios
import { getChartDetails } from '../services/axios/requests/chart';

// use received
const useChartDetails = (username: string) =>
	useQuery('Chart/List', () => getChartDetails(username).then((res) => res.data.charts),{
    refetchOnWindowFocus: false
  });

// exports
export default useChartDetails;
