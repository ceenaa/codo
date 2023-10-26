// axios
import axiosInstance from '../config/config';

// upload picture
const postProfilePicture = (file: any) =>
	axiosInstance.post('/picture/upload', file, {
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		withCredentials: true
	});

// exports
export { postProfilePicture };
