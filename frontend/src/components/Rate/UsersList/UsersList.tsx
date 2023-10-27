// react
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// icons
import { AiTwotoneStar } from 'react-icons/ai';
import { TbDatabaseX } from 'react-icons/tb';

// react query
import useUsersList from '../../../hooks/useUsersList';

// redux
import { useSelector } from 'react-redux';

// types
import { user } from '../../../types/User.type';

// react spinner
import { BeatLoader } from 'react-spinners';

// user list
const UsersList: React.FC = () => {
	// navigator
	const navigate = useNavigate();

	// GET list details from redux
	const listDetails = useSelector((state: any) => state.listDetails);

	// GET list details from redux
	const self = useSelector((state: any) => state.user);

	// GET userList from react query
	const { data, refetch, isFetching } = useUsersList(listDetails);

	useEffect(() => {
		refetch();
	}, [listDetails]);

	// tsx
	return (
		<table className="mx-auto mt-10 w-11/12 table-auto border border-slate-500 text-center  md:border-2">
			<thead className="h-16 border-b-2 border-slate-500">
				<tr className="">
					<td className="h-10 border-l border-rose-400 font-black text-slate-200 sm:text-sm">
						Rank
					</td>
					<td className="h-10 border-l border-rose-400 font-black text-slate-200 sm:text-sm">
						First Name
					</td>
					<td className="h-10 border-l border-rose-400 font-black text-slate-200 sm:text-sm">
						Last Name
					</td>
					<td className="h-10 border-l border-rose-400 font-black text-slate-200 sm:text-sm">
						Rate
					</td>
				</tr>
			</thead>
			<tbody>
				{isFetching ? (
					<tr className="absolute right-1/2 translate-y-10">
						<td>
							<BeatLoader size={10} color="#f43f5e" />
						</td>
					</tr>
				) : data.length === 0 ? (
					<>
						<tr>
							<td></td>
							<td className="flex h-20 translate-x-16 items-center justify-center gap-x-3 text-rose-300">
								<TbDatabaseX className="h-10 w-10 rounded-full bg-rose-500/50 p-2 text-rose-500" />
								No Data Found !
							</td>
							<td></td>
							<td></td>
						</tr>
					</>
				) : (
					data?.map((user: user, index: number) =>
						user.username !== self.username ? (
							<tr
								key={user.user_id}
								className="h-20 cursor-pointer border-b border-slate-50 transition-all duration-500 hover:bg-rose-500/10"
								onClick={() => navigate(String(user.username))}
							>
								<td className="text-base lg:text-lg">
									{(listDetails.page - 1) * listDetails.per_page + index + 1}
								</td>
								<td>{user.first_name}</td>
								<td className="tracking-tighter sm:text-base">{user.last_name}</td>
								<td className="tracking-tighter">
									<div className="mx-auto flex w-3/12 shrink-0 items-center justify-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 shadow-md">
										<span className="text-yellow-900">{user.average_rate?.toFixed(2)}</span>
										<AiTwotoneStar className="text-yellow-600" />
									</div>
								</td>
							</tr>
						) : (
							<tr
								key={user.user_id}
								className="h-20 cursor-no-drop border-b border-slate-50 bg-rose-500/20 transition-all duration-500"
							>
								<td className="text-base lg:text-lg">
									{(listDetails.page - 1) * listDetails.per_page + index + 1}
								</td>
								<td>{user.first_name}</td>
								<td className="tracking-tighter sm:text-base">{user.last_name}</td>
								<td className="tracking-tighter">
									<div className="mx-auto flex w-3/12 shrink-0 items-center justify-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 shadow-md">
										<span className="text-yellow-900">{user.average_rate?.toFixed(2)}</span>
										<AiTwotoneStar className="text-yellow-600" />
									</div>
								</td>
							</tr>
						)
					)
				)}
			</tbody>
		</table>
	);
};

// exports
export default UsersList;
