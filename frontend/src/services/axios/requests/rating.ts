// axios
import axiosInstance from '../config/config';

// rating
const postRating = (rateDetails: { rate: number; rated_username: string }) =>
	axiosInstance.post('/rating/create', rateDetails, { withCredentials: true });

// received rating
const getReceived = (
	rater_username?: string,
	rated_username?: string,
	page?: number,
	per_page?: number
) =>
	axiosInstance.get(
		`rating/list?rated_username=${rated_username}&rater_username=${rater_username}&page=${page}&per_page=${per_page}`,
		{
			withCredentials: true
		}
	);

// exports
export { postRating, getReceived };
