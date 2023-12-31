// react
import React, { useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

// react query
import useReceived from '../../../hooks/useReceived';

// react spinier
import { BeatLoader } from 'react-spinners';

// icons
import { AiTwotoneStar } from 'react-icons/ai';
import { TbDatabaseX } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

// history list
const HistoryList: React.FC = () => {
	// navigator
	const navigate = useNavigate();

	// GET username from redux
	const userName = useSelector((state: any) => state.user.username);

	// GET history from redux
	const history = useSelector((state: any) => state.history);

	// GET received from react query
	const { data, isFetching, refetch } = useReceived(userName, '', history.page, history.per_page);

	// refetch when changing pagination
	useEffect(() => {
		refetch();
	}, [history]);

	// tsx
	return (
		<table className="mx-auto mt-10 w-11/12 table-auto border border-slate-500 text-center  md:border-2">
			<thead className="h-16 border-b-2 border-slate-500">
				<tr className="">
					<td className="h-10 border-l border-rose-400 font-black text-slate-200 sm:text-sm">
						NO.
					</td>
					<td className="h-10 border-l border-rose-400 font-black text-slate-200 sm:text-sm">
						Rater User Name
					</td>
					<td className="h-10 border-l border-rose-400 font-black text-slate-200 sm:text-sm">
						Date
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
					data?.map((rate: any, index: number) => (
						<tr
							key={index}
							className="h-20 cursor-pointer border-b border-slate-50 transition-all duration-500 hover:bg-rose-500/10"
							onClick={() => navigate(`/rate/${rate.rated_username}`)}
						>
							<td className="text-base lg:text-lg">
								{(history.page - 1) * history.per_page + index + 1}
							</td>
							<td>{rate.rated_username}</td>
							<td className="tracking-tighter sm:text-base">{rate.created_at?.slice(0, 10)}</td>
							<td className="tracking-tighter">
								<div className="mx-auto flex w-4/12 items-center justify-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 shadow-md">
									<span className="text-yellow-900">{rate.rate}</span>
									<AiTwotoneStar className="text-yellow-600" />
								</div>
							</td>
						</tr>
					))
				)}
			</tbody>
		</table>
	);
};

// exports
export default HistoryList;
