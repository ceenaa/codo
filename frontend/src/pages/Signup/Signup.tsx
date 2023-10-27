// react
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// react hook form
import { useForm } from 'react-hook-form';

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// axios
import { postSignUp } from '../../services/axios/requests/authentication';

// icons
import { BiRename } from 'react-icons/bi';
import { CgRename } from 'react-icons/cg';
import { AiFillLock } from 'react-icons/ai';
import { GrBlockQuote } from 'react-icons/gr';
import { GiFlame } from 'react-icons/gi';

// sign up
const SignUp: React.FC = () => {
	// form handler
	const { register, handleSubmit, reset } = useForm();

	// set submit button disabled
	const [isDisable, setIsDisable] = useState(false);

	// navigator
	const navigate = useNavigate();

	// transition handler
	const [isLoad, setIsLoad] = useState(true);

	// mounting side effects
	useEffect(() => {
		// change document title
		document.title = 'CodoCodile | Bruv - Signup';
	}, []);

	// jsx
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			{/* container */}
			<div
				className={`flex h-auto flex-col items-center justify-between gap-y-7 rounded-3xl bg-slate-900 p-10 transition-opacity duration-300 md:w-5/12 ${
					isLoad ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<h1 className="flex items-center justify-center gap-x-5 text-xl font-black tracking-wide text-slate-200">
					<GiFlame className="h-10 w-10 rounded-full bg-slate-500/50 p-2 text-slate-400" />
					CodoCodile | Bruv
				</h1>
				{/* inputs */}
				<main>
					{/* form */}
					<form
						className="flex flex-col items-center justify-center gap-y-7"
						onSubmit={handleSubmit((data) => {
							setIsDisable(true);

							const userDetails = {
								first_name: data.firstName,
								last_name: data.lastName,
								password: data.password,
								role: 'user',
								username: data.userName
							};

							postSignUp(userDetails)
								.then(() => {
									// show success toast
									toast.success('Signup Successful ✅', {
										position: 'bottom-right',
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'dark',
										onOpen: () => {
											setTimeout(() => {
												// navigate to panel
												navigate('/login');
											}, 2500);

											setTimeout(() => {
												// transition handler
												setIsLoad(!isLoad);
											}, 2200);
										},
										onClose: () => {
											// enabling submit button
											setIsDisable(false);

											// reset form values
											reset();
										}
									});
								})
								.catch(() =>
									// show error toast
									toast.error('Incorrect Information ❌', {
										position: 'bottom-right',
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										onClose: () => {
											// enabling submit button
											setIsDisable(false);

											// reset form values
											reset();
										}
									})
								);
						})}
					>
						{/* first name */}
						<label htmlFor="firstname" className="flex w-full items-center justify-center gap-x-5">
							<BiRename className="h-7 w-7 rounded-full bg-rose-500/50 p-1.5 text-rose-500 hover:bg-rose-500/50 md:h-10 md:w-10 md:p-2" />
							<input
								required
								type="text"
								id="firstname"
								className="h-7 w-3/4 rounded-3xl bg-slate-700 px-5 text-base font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 md:h-10 md:text-lg"
								placeholder="first name"
								{...register('firstName')}
							/>
						</label>
						{/* last name */}
						<label htmlFor="lastname" className="flex w-full items-center justify-center gap-x-5">
							<CgRename className="h-7 w-7 rounded-full bg-rose-500/50 p-1.5 text-rose-500 hover:bg-rose-500/50 md:h-10 md:w-10 md:p-2" />
							<input
								required
								type="text"
								id="lastname"
								className="h-7 w-3/4 rounded-3xl bg-slate-700 px-5 text-base font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 md:h-10 md:text-lg"
								placeholder="last name"
								{...register('lastName')}
							/>
						</label>
						{/* username */}
						<label htmlFor="userName" className="flex w-full items-center justify-center gap-x-5">
							<GrBlockQuote className="h-7 w-7 rounded-full bg-rose-500/50 p-1.5 text-rose-500 hover:bg-rose-500/50 md:h-10 md:w-10 md:p-2" />
							<input
								required
								type="text"
								id="userName"
								className="h-7 w-3/4 rounded-3xl bg-slate-700 px-5 text-base font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 md:h-10 md:text-lg"
								placeholder="User name"
								{...register('userName')}
							/>
						</label>
						{/* password */}
						<label htmlFor="password" className="flex w-full items-center justify-center gap-x-5">
							<AiFillLock className="h-7 w-7 rounded-full bg-rose-500/50 p-1.5 text-rose-500 hover:bg-rose-500/50 md:h-10 md:w-10 md:p-2" />
							<input
								required
								type="password"
								id="password"
								className="h-7 w-3/4 rounded-3xl bg-slate-700 px-5 text-base font-bold tracking-tight text-slate-50 outline-none placeholder:tracking-tight placeholder:text-slate-300 md:h-10 md:text-lg"
								placeholder="password"
								{...register('password')}
							/>
						</label>
						{/* submit button  */}
						<button
							type="submit"
							disabled={isDisable}
							className={`h-10 w-1/2 rounded-3xl bg-slate-700 text-base font-bold tracking-tight text-slate-300 transition-all hover:bg-slate-700/75 hover:shadow-slate-700/25 md:text-lg ${
								isDisable ? 'animate-bounce bg-rose-700' : null
							}`}
						>
							{!isDisable ? 'Signup' : 'wait a second ⏳'}
						</button>
					</form>
				</main>
			</div>
			<p className="pt-5 text-xs font-bold text-rose-50">
				Already Have An Account ?{' '}
				<Link
					to="/login"
					className="rounded-lg p-2 text-rose-300 transition-all duration-500 hover:bg-rose-500/50 "
				>
					Login
				</Link>
			</p>
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
		</div>
	);
};

// exports
export default SignUp;
