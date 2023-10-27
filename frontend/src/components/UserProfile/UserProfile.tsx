// react
import React, { useEffect, useState } from 'react';

// icons
import { AiTwotoneStar } from 'react-icons/ai';

// redux
import { useSelector } from 'react-redux';

// react query
import useSingleUser from '../../hooks/useSingleUser';

// axios
import { postProfilePicture } from '../../services/axios/requests/picture';

// react toastify
import { ToastContainer, toast } from 'react-toastify';

// icons
import { FaStarOfLife } from 'react-icons/fa';

// user profile
const UserProfile: React.FC = () => {
	// GET user from redux
	const user = useSelector((state: any) => state.user);

	// GET user from react query
	const { data } = useSingleUser(user.username);

	// mounting side effects
	useEffect(() => {
		// change document title
		document.title = `CodoCodile | Bruv - ${user.username}`;
	}, []);

	// tsx
	return (
		<>
			<div className="container flex items-center gap-x-2 py-5">
				<FaStarOfLife className="text-rose-500" />
				<span className="text-2xl font-semibold text-slate-300">Public Profile</span>
			</div>
			<main className="flex h-96 items-center justify-center pt-20">
				<div className="flex h-auto w-10/12 flex-col items-center justify-center rounded-xl border border-slate-300 md:w-3/4">
					<div className="flex w-full justify-center">
						<label htmlFor="imageUploader">
							{data?.user.picture_path ? (
								<img
									src={`http://localhost:8080/${data.user.picture_path}`}
									alt="user profile"
									className="h-40 w-40 rounded-full"
								/>
							) : (
								<img
									src="/media/default.png"
									alt="user profile"
									className="h-40 w-40 rounded-full"
								/>
							)}
							<input
								className="ml-6 mt-3 w-24 md:mt-5"
								type="file"
								id="file-input"
								accept="image/*"
								onChange={(e) => {
									const formData = new FormData();
									e.target.files ? formData.append('file', e.target.files[0]) : null;

									postProfilePicture(formData)
										.then(() => toast.success('Image Updated Successfully ✅'))
										.catch(() => toast.error('Image Update Failed ❌'));
								}}
							/>
						</label>
						<div className="flex w-1/2 flex-col items-center justify-evenly gap-y-5">
							<span className="text-2xl font-bold">{user.username}</span>
							<div className="flex items-center justify-between gap-x-10">
								<div className="flex items-center justify-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 shadow-md">
									<span className="text-yellow-900">{user.AverageRate?.toFixed(2)}</span>
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
							First Name: <span className="text-slate-300">{user.first_name}</span>
						</p>
						<p>
							Last Name: <span className="text-slate-300">{user.last_name}</span>
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
export default UserProfile;
