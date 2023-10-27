// react
import React from 'react';

// react query
import useSingleUser from '../../../hooks/useSingleUser';

// icons
import { AiTwotoneStar } from 'react-icons/ai';

// user profile
const SourceProfile: React.FC<{ username: string }> = ({ username }) => {
	// GET user from react query
	const { data } = useSingleUser(username);

	console.log(data);

	// tsx
	return (
		<main className="mt-10 flex h-96 items-center justify-center">
			<div className="flex h-auto w-10/12 flex-col items-center justify-center rounded-xl border border-slate-300 md:w-3/4">
				<div className="flex w-full justify-center">
					<img
						src={`http://localhost:8080/${data?.user.picture_path}`}
						alt="user profile"
						className="h-40 w-40 rounded-full"
					/>
					<div className="flex w-1/2 flex-col items-center justify-evenly gap-y-5">
						<span className="text-2xl font-bold">{data?.user.username}</span>
						<div className="flex items-center justify-between gap-x-10">
							<div className="flex items-center justify-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 shadow-md">
								<span className="text-yellow-900">{data?.user.average_rate?.toFixed(2)}</span>
								<AiTwotoneStar className="text-yellow-600" />
							</div>
							<span className="rounded-md bg-slate-400 px-3 py-1 text-slate-900">
								#{data?.user.rank}
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start justify-center gap-x-1.5 gap-y-2 py-5 text-lg text-rose-100">
					<p>
						First Name: <span className="text-slate-300">{data?.user.first_name}</span>
					</p>
					<p>
						Last Name: <span className="text-slate-300">{data?.user.last_name}</span>
					</p>
					<p>
						Created At:{' '}
						<span className="text-slate-300">{data?.user.created_at?.slice(0, 10)}</span>
					</p>
					<p>
						Total Raters: <span className="text-slate-300">{data?.user.total_raters}</span>
					</p>
				</div>
			</div>
		</main>
	);
};

// exports
export default SourceProfile;
