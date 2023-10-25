// axios
import axiosInstance from '../config/config';

// log out
const getLogout = () => axiosInstance.get('/users/logout', { withCredentials: true });

// sign up
const postSignUp = (userDetails: {
	first_name: string;
	last_name: string;
	password: string;
	role: string;
	username: string;
}) =>
	axiosInstance.post('/users/signup', userDetails, {
		withCredentials: true
	});

// log in
const postLogin = (userDetails: { username: string; password: string }) =>
	axiosInstance.post('/users/login', userDetails, { withCredentials: true });

// validate
const getValidate = () => axiosInstance.get('/users/validate', { withCredentials: true });

// exports
export { getLogout, postSignUp, postLogin, getValidate };
