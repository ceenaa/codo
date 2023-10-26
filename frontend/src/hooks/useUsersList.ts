// react query
import { useQuery } from 'react-query';

// axios
import { postUsersList } from '../services/axios/requests/users';

// use get me
const useUsersList = ({ text, page, per_page }: { text: string; page: number; per_page: number }) =>
	useQuery(
		'User/List',
		() => postUsersList({ text, page, per_page }).then((res) => res.data.users),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		}
	);

// exports
export default useUsersList;
