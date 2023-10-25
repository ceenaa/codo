// react query
import { useQuery } from 'react-query';

// axios
import { getValidate } from '../services/axios/requests/authentication';

// use get me
const useGetMe = () =>
	useQuery('User/GetME', () => getValidate().then((res) => res.data), {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false
	});

// exports
export default useGetMe;
