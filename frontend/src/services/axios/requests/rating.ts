// axios
import axiosInstance from '../config/config';

// rating
const postRating = (rateDetails: { rate: number; rated_username: string }) =>
	axiosInstance.post('/rating/create', rateDetails);

// exports
export { postRating };
