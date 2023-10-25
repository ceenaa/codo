// react
import React from 'react';

// icons
import { AiTwotoneStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

// user list
const UsersList = () => {
	// navigator
	const navigate = useNavigate();

	// tsx
	return (
		<table className="mx-auto mt-10 w-11/12 table-auto border border-slate-500 text-center  md:border-2">
			<thead className="h-16 border-b-2 border-slate-500">
				<tr className="">
					<td className="h-10 border-l border-rose-400 font-black text-slate-200 sm:text-sm">
						NO.
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
				<tr
					className="h-20 cursor-pointer border-b border-slate-50 transition-all duration-500 hover:bg-rose-500/10"
					onClick={() => navigate('lol1')}
				>
					<td className="font-Lalezar text-base lg:text-lg">1</td>
					<td>Mahdi</td>
					<td className="tracking-tighter sm:text-base">Abdollahi</td>
					<td className="tracking-tighter">
						<div className="mx-auto flex w-4/12 items-center justify-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 shadow-md">
							<span className="text-yellow-900">5.5</span>
							<AiTwotoneStar className="text-yellow-600" />
						</div>
					</td>
				</tr>
				<tr
					className="h-20 cursor-pointer border-b border-slate-50 transition-all duration-500 hover:bg-rose-500/10"
					onClick={() => navigate('lol2')}
				>
					<td className="font-Lalezar text-base lg:text-lg">1</td>
					<td>Mahdi</td>
					<td className="tracking-tighter sm:text-base">Abdollahi</td>
					<td className="tracking-tighter">
						<div className="mx-auto flex w-4/12 items-center justify-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 shadow-md">
							<span className="text-yellow-900">5</span>
							<AiTwotoneStar className="text-yellow-600" />
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

// exports
export default UsersList;
