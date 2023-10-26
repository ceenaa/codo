// react query
import { useQuery } from 'react-query';

// axios
import { getReceived } from '../services/axios/requests/rating';

// use received
const useReceived = (
	userName: string,
	page: number,
	per_page: number,
	order: string,
	order_by: string
) =>
	useQuery(
		'User/List',
		() => getReceived(userName, page, per_page, order, order_by).then((res) => res.data.ratings),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false
		}
	);

// exports
export default useReceived;
