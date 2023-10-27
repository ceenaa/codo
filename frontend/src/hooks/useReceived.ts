// react query
import { useQuery } from 'react-query';

// axios
import { getReceived } from '../services/axios/requests/rating';

// use received
const useReceived = (
	rater_username: string,
	rated_username: string,
	page: number,
	per_page: number
) =>
	useQuery(
		'User/List',
		() =>
			getReceived(rater_username, rated_username, page, per_page).then((res) => res.data.ratings),
		{
			refetchOnWindowFocus: false
		}
	);

// exports
export default useReceived;
