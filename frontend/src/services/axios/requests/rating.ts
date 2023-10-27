// axios
import axiosInstance from '../config/config';

// rating
const postRating = (rateDetails: { rate: number; rated_username: string }) =>
	axiosInstance.post('/rating/create', rateDetails, { withCredentials: true });

// received rating
const getReceived = (
	userName: string,
	page?: number,
	per_page?: number,
	order?: string,
	order_by?: string
) =>
	axiosInstance.get(`rating/received/${userName}?page=${page}&per_page=${per_page}`, {
		withCredentials: true
	});
// exports
export { postRating, getReceived };
