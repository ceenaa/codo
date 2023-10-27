// react query
import { useQuery } from 'react-query';

// axios
import { getUserList } from '../services/axios/requests/users';

// use get me
const useUsersList = ({
	text,
	page,
	per_page,
	order_by,
	order
}: {
	text: string;
	page: number;
	per_page: number;
	order: string;
	order_by: string;
}) =>
	useQuery('User/List', () =>
		getUserList({ text, page, per_page, order, order_by }).then((res) => res.data.users)
	);

// exports
export default useUsersList;
