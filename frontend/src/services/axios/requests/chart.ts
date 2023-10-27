// axios
import axiosInstance from '../config/config';

// chart details
const getChartDetails = (username: string) =>
	axiosInstance.get(`/chart/list/${username}`, { withCredentials: true });

// exports
export { getChartDetails };
