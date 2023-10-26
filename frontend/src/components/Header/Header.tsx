// react
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// icons
import { FaBars, FaUserTie } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { AiTwotoneStar } from 'react-icons/ai';

// react spinner
import { BeatLoader } from 'react-spinners';

// types
import { user } from '../../types/User.type';
import { getLogout } from '../../services/axios/requests/authentication';
import { ToastContainer, toast } from 'react-toastify';

// header
const Header: React.FC<{
	setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsMenuShown }) => {
	// navigator
	const navigate = useNavigate();

	// GET user infos from redux
	const user = useSelector((state: any) => state.user);

	// logout fetch state
	const [isFetching, seIsFetching] = useState<boolean>(false);

	// auth logout handler
	const logoutHandler = () => {
		// set is fetching state to true
		seIsFetching(true);

		// get logout
		getLogout()
			.then(() => {
				toast.success('Logout successful ✅', {
					onClose: () => navigate('/login')
				});
			})
			.finally(() =>
				// set is fetching state to false
				seIsFetching(false)
			);
	};
	return (
		<>
			<header className="h-auto w-full border-b-2 border-slate-300 bg-slate-900 p-3 shadow-lg md:p-5">
				<div className="flex items-center justify-between">
					<span className=" flex select-none items-center justify-end gap-x-2 text-xs md:text-sm lg:text-lg">
						<FaBars
							className="block h-7 w-7 rounded-full bg-rose-500/50 p-1.5 text-rose-500 hover:bg-rose-500/50 md:hidden md:h-10 md:w-10 md:p-2"
							onClick={() => setIsMenuShown(true)}
						/>
						<FaUserTie
							className="hidden h-10 w-10 cursor-pointer rounded-full bg-rose-500/50 p-2 text-rose-500 md:block"
							onClick={() => navigate('/')}
						/>
						<span className="font-semibold text-rose-200">
							{user.first_name} {user.last_name}
						</span>
						<div className="flex items-center gap-x-1 rounded-md bg-yellow-300/90 px-2 py-1 shadow-md">
							<span className="text-yellow-900">{user.AverageRate}</span>
							<AiTwotoneStar className="text-yellow-600" />
						</div>
					</span>
					<button onClick={logoutHandler}>
						{isFetching ? (
							<BeatLoader size={10} color="#f43f5e" />
						) : (
							<FiLogOut className="h-7 w-7 rounded-full bg-rose-500/50 p-1.5 text-rose-500 transition-all duration-500 hover:bg-rose-500/60 md:h-10 md:w-10 md:p-2" />
						)}
					</button>
				</div>
			</header>
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

// tsx
export default Header;
