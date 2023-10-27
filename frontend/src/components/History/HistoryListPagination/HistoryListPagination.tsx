// react
import React from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
	setHistoryPerPage,
	setHistoryPage
} from '../../../services/redux/slices/HistoryPagination';

// icons
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

// history list pagination
const HistoryListPagination: React.FC = () => {
	// redux dispatch hook
	const dispatch = useDispatch();

	// GET list details from redux
	const history = useSelector((state: any) => state.history);

	// tsx
	return (
		<div className="container flex flex-wrap items-center justify-between gap-y-5 py-5">
			<div className="flex items-center justify-center gap-x-3 self-start">
				<label className="select-none text-base text-rose-300">Item Per Page:</label>
				<select
					className="h-7 w-10 appearance-none rounded-xl bg-slate-700 text-center text-lg tracking-wider outline-none transition-colors hover:bg-slate-600"
					onChange={(e) => dispatch(setHistoryPerPage(Number(e.target.value)))}
					value={history.perPage}
				>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>
			<div className="flex items-center self-end">
				<button
					className="flex h-7 w-[60px] cursor-pointer select-none items-center justify-center gap-x-3 rounded-l-xl bg-slate-800 px-3 text-sm transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-white/10"
					onClick={() => dispatch(setHistoryPage(Number(history.page - 1)))}
					disabled={history.page === 1 ? true : false}
				>
					<BsArrowLeft className="h-5 w-5 shrink-0" />
				</button>
				<div className="h-7 w-7 select-none bg-slate-600 text-center text-lg">{history.page}</div>
				<button
					className="flex h-7 w-[60px] cursor-pointer select-none items-center justify-center gap-x-3 rounded-r-xl bg-slate-800 px-3 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-white/10"
					onClick={() => dispatch(setHistoryPage(Number(history.page + 1)))}
				>
					<BsArrowRight className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};

// exports
export default HistoryListPagination;
