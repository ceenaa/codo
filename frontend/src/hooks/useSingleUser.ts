// react query
import { useQuery } from 'react-query';

// axios
import { getUser } from '../services/axios/requests/users';

// use get me
const useSingleUser = (userName: string) =>
	useQuery('User/GetME', () => getUser(userName).then((res) => res.data));

// exports
export default useSingleUser;
