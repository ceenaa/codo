// axios
import axiosInstance from '../config/config';

// chart details
const getChartDetails = () => axiosInstance.get('/chart/list', { withCredentials: true });

// exports
export { getChartDetails };
