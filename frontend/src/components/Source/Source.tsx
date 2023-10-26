// react
import React, { useEffect } from 'react';

// icons
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineStar, AiFillStar, AiTwotoneStar } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import useSingleUser from '../../hooks/useSingleUser';

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

	// tsx
	return (
		<>
			<div className="container flex items-center justify-between py-5 text-2xl">
				<div className="flex items-center gap-x-2">
					<AiOutlineArrowLeft
						className="block h-10 w-10 cursor-pointer rounded-full bg-rose-500/50 p-2 text-rose-500 transition-colors duration-500 hover:bg-rose-500/60"
						onClick={() => navigate('/rate')}
					/>
					<h1 className="font-semibold text-rose-200">
						{data?.first_name} {data?.last_name}
					</h1>
				</div>
				<div className="flex items-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 shadow-md">
					<span className="text-yellow-900">{data?.average_rate}</span>
					<AiTwotoneStar className="text-yellow-600" />
				</div>
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
				className="mx-auto mt-10 flex h-10 w-32 items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-emerald-500 text-lg hover:bg-gradient-to-l"
				type="submit"
			>
				Submit
			</button>
		</>
	);
};

// exports
export default Source;