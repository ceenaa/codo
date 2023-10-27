// react
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// icons
import { AiOutlineArrowLeft, AiOutlineLineChart } from 'react-icons/ai';
import { AiOutlineStar, AiFillStar, AiTwotoneStar } from 'react-icons/ai';
import { CiViewTable } from 'react-icons/ci';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

// react query
import useSingleUser from '../../hooks/useSingleUser';

// axios
import { postRating } from '../../services/axios/requests/rating';

// react toastify
import { ToastContainer, toast } from 'react-toastify';

// components
import SourceProfile from './SourceProfile/SourceProfile';
import SourceHistory from './SourceHistory/SourceHistory';
import HistoryChart from '../History/HistoryChart/HistoryChart';

// rate user
const Source: React.FC = () => {
	// rate
	const [rate, setRate] = React.useState<number>(0);

	// navigator
	const navigate = useNavigate();

	// GET username from url params
	const { user } = useParams();

	// GET single user from react query
	const { data } = useSingleUser(String(user));

	// create new rating
	const submitRatingHandler = () => {
		postRating({ rate, rated_username: user! })
			.then(() => {
				toast.success('Rating Created ✅', {
					onClose: () => navigate('/rate')
				});
			})
			.catch(() => {
				toast.error('Something went wrong ❌');
			});
	};

	// mounting side effects
	useEffect(() => {
		// change document title
		document.title = `Codo | Bruv - Rate : ${user}`;
	}, []);

	// is Shown User History
	const [isShownHistory, setIsShownHistory] = useState<boolean>(true);

	// is Shown History chart
	const [isShownChart, setIsShownChart] = useState<boolean>(true);

	// tsx
	return (
		<>
			<div className="container flex flex-wrap items-center justify-between gap-y-5 py-5 text-2xl">
				<div className="flex items-center gap-x-2">
					<AiOutlineArrowLeft
						className="block h-10 w-10 cursor-pointer rounded-full bg-rose-500/50 p-2 text-rose-500 transition-colors duration-500 hover:bg-rose-500/60"
						onClick={() => navigate('/rate')}
					/>
					<h1 className="font-semibold text-rose-200">
						{data?.user.first_name} {data?.user.last_name}
					</h1>
				</div>
				<div className="flex select-none items-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 text-xs shadow-md md:text-lg">
					<span className="text-yellow-900">{data?.user.average_rate.toFixed(2)}</span>
					<AiTwotoneStar className="text-yellow-600" />
				</div>
				<span className="select-none rounded-md bg-slate-400 px-3 py-1 text-xs text-slate-900 md:text-lg">
					# {data?.user.rank}
				</span>
			</div>
			<main className="flex items-center justify-center pt-10">
				<div className="flex gap-x-3">
					{Array.from({ length: rate }, (_, i) => i + 1).map((index) => (
						<AiFillStar
							key={index}
							className="h-10 w-10 cursor-pointer select-none text-yellow-400"
							onClick={() => (rate === index ? setRate(0) : setRate(index))}
						/>
					))}
					{Array.from({ length: 5 - rate }, (_, i) => i + 1).map((index) => (
						<AiOutlineStar
							key={index}
							className="h-10 w-10 cursor-pointer select-none text-yellow-400"
							onClick={() => (rate === index ? setRate(0) : setRate(rate + index))}
						/>
					))}
				</div>
			</main>
			<button
				className="mx-auto mt-10 flex h-10 w-32 items-center justify-center rounded-md bg-gradient-to-tl from-emerald-600 to-green-400 text-lg font-extrabold text-slate-50 hover:bg-gradient-to-br"
				type="submit"
				onClick={submitRatingHandler}
			>
				Submit
			</button>
			{user ? <SourceProfile username={user} /> : null}
			<div
				className="group container flex cursor-pointer select-none items-center gap-x-2 py-5"
				onClick={() => setIsShownChart(!isShownChart)}
			>
				<AiOutlineLineChart className="h-7 w-7 text-rose-500" />
				<span className="text-2xl font-semibold text-slate-300 transition-all duration-500 group-hover:text-rose-200">
					History Chart
				</span>
				{isShownChart ? (
					<BiChevronDown className="h-8 w-8 cursor-pointer rounded-lg p-1 text-rose-500 transition-all duration-500 group-hover:bg-rose-500/50" />
				) : (
					<BiChevronUp className="h-8 w-8 cursor-pointer rounded-lg p-1 text-rose-500 transition-all duration-500 group-hover:bg-rose-500/50" />
				)}
			</div>
			{user && isShownChart ? <HistoryChart username={user} /> : null}
			<div
				className="group container flex cursor-pointer select-none items-center gap-x-2 py-5"
				onClick={() => setIsShownHistory(!isShownHistory)}
			>
				<CiViewTable className="h-7 w-7 text-rose-500" />
				<span className="text-2xl font-semibold text-slate-300 transition-all duration-500 group-hover:text-rose-200">
					Last Interactions
				</span>
				{isShownHistory ? (
					<BiChevronDown className="h-8 w-8 cursor-pointer rounded-lg p-1 text-rose-500 transition-all duration-500 group-hover:bg-rose-500/50" />
				) : (
					<BiChevronUp className="h-8 w-8 cursor-pointer rounded-lg p-1 text-rose-500 transition-all duration-500 group-hover:bg-rose-500/50" />
				)}
			</div>
			{user && isShownHistory ? <SourceHistory username={user} /> : null}
			{/* react toastify container */}
			<ToastContainer
				position="bottom-right"
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				theme="dark"
				toastStyle={{ backgroundColor: '#1f2937' }}
			/>
		</>
	);
};

// exports
export default Source;
