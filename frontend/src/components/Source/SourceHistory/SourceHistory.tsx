// react
import React, { useEffect } from 'react';

// icons
import { TbDatabaseX } from 'react-icons/tb';
import { AiTwotoneStar } from 'react-icons/ai';

// redux
import { useSelector } from 'react-redux';

// react spinier
import { BeatLoader } from 'react-spinners';

// react query
import useReceived from '../../../hooks/useReceived';

// source history
const SourceHistory: React.FC<{ username: string }> = ({ username }) => {
	// GET username from redux
	const raterUsername = useSelector((state: any) => state.user.username);

	// GET received from react query
	const { data, isFetching, refetch } = useReceived(raterUsername, username, 1, 20);

	// refetch when changing pagination
	useEffect(() => {
		refetch();
	}, [history]);

	// tsx
	return (
		<table className="mx-auto mb-5 w-11/12 table-auto border border-slate-500 text-center  md:border-2">
			<thead className="h-16 border-b-2 border-slate-500">
				<tr className="">
					<td className="h-10 border-l border-rose-400 font-black text-slate-200 sm:text-sm">
						NO.
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
							<td className="flex h-20 items-center justify-center gap-x-3 text-center text-rose-300">
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
							className="h-20 border-b border-slate-50 transition-all duration-500 hover:bg-rose-500/10"
						>
							<td className="text-base lg:text-lg">{index + 1}</td>
							<td className="tracking-tighter sm:text-base">{rate.created_at?.slice(0, 10)}</td>
							<td className="tracking-tighter">
								<div className="mx-auto flex w-5/12 md:w-3/12 lg:w-2/12 items-center justify-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 shadow-md">
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
export default SourceHistory;
