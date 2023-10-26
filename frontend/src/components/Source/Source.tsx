// react
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// icons
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineStar, AiFillStar, AiTwotoneStar } from 'react-icons/ai';

// react query
import useSingleUser from '../../hooks/useSingleUser';

// axios
import { postRating } from '../../services/axios/requests/rating';

// react toastify
import { ToastContainer, toast } from 'react-toastify';

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
				<div className="flex items-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 shadow-md">
					<span className="text-yellow-900">{data?.user.average_rate.toFixed(1)}</span>
					<AiTwotoneStar className="text-yellow-600" />
				</div>
				<span className="rounded-md bg-slate-400 px-3 py-1 text-slate-900">#{data?.rank}</span>
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
				className="mx-auto mt-10 flex h-10 w-32 items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-emerald-500 text-lg text-slate-50 hover:bg-gradient-to-l"
				type="submit"
				onClick={submitRatingHandler}
			>
				Submit
			</button>
			{/* react toastify container */}
			<ToastContainer
				position="bottom-right"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				theme="dark"
				toastStyle={{ backgroundColor: '#111827' }}
			/>
		</>
	);
};

// exports
export default Source;
