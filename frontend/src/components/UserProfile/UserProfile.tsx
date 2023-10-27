// react
import React, { useEffect } from 'react';

// icons
import { AiOutlinePlus, AiOutlineSearch, AiTwotoneStar } from 'react-icons/ai';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setText } from '../../services/redux/slices/ListDetails';

// react query
import useSingleUser from '../../hooks/useSingleUser';

// axios
import { postProfilePicture } from '../../services/axios/requests/picture';

// react toastify
import { ToastContainer, toast } from 'react-toastify';

// icons
import { FaStarOfLife } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// user profile
const UserProfile: React.FC = () => {
	// navigator
	const navigate = useNavigate();

	// redux dispatch hook
	const dispatch = useDispatch();

	// GET user from redux
	const user = useSelector((state: any) => state.user);

	// GET user from react query
	const { data } = useSingleUser(user.username);

	// mounting side effects
	useEffect(() => {
		// change document title
		document.title = `Codo | Bruv - ${user.username}`;
	}, []);

	// tsx
	return (
		<>
			<div className="container flex items-center gap-x-2 py-5">
				<FaStarOfLife className="text-rose-500" />
				<span className="text-2xl font-semibold text-slate-300">Public Profile</span>
			</div>
			<main className="flex h-screen flex-col items-center gap-y-5">
				<div className="flex h-auto w-10/12 flex-col items-center justify-center rounded-xl border border-slate-300 pt-5 md:w-3/4">
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
				<section className="flex w-full flex-col self-start">
					<div className="container flex items-center gap-x-2 py-5">
						<AiOutlinePlus className="h-7 w-7 text-rose-500" />
						<span className="text-2xl font-semibold text-slate-300">New Rate</span>
					</div>
					<label
						htmlFor="searchByName"
						className="flex w-full items-center justify-center gap-x-5 pt-5 pb-20"
					>
						<AiOutlineSearch className="h-7 w-7 rounded-full bg-rose-500/50 p-1.5 text-rose-500 hover:bg-rose-500/50 md:h-10 md:w-10 md:p-2" />
						<input
							type="text"
							id="searchByName"
							className="h-7 w-1/2 rounded-3xl bg-slate-700 px-5 text-lg font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 md:h-10"
							placeholder="Search"
							onChange={(e) => {
								dispatch(setText(String(e.target.value)));

								navigate('/rate');
							}}
						/>
					</label>
				</section>
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
