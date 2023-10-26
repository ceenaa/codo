// axios
import axiosInstance from '../config/config';

// rating
const postUsersList = (listDetails: { text: string; page: number; per_page: number }) =>
	axiosInstance.get(
		`/users/list?text=${listDetails.text}&page=${listDetails.page}&per_page=${listDetails.per_page}
    `
	);

// single user
const getUser = (userName: string) => axiosInstance.get(`/users/${userName}`);

// exports
export { postUsersList, getUser };
