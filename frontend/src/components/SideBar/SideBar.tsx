// react
import { NavLink } from 'react-router-dom';

// icons
import { AiOutlineHome } from 'react-icons/ai';
import { BiHistory } from 'react-icons/bi';
import { GiStarsStack } from 'react-icons/gi';

// redux
import { useDispatch } from 'react-redux';
import { setHistoryPage, setHistoryPerPage } from '../../services/redux/slices/HistoryPagination';
import { setRatePage, setRatePerPage, setText } from '../../services/redux/slices/ListDetails';

// sidebar
const SideBar: React.FC<{
	isMenuShown: boolean;
	setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isMenuShown, setIsMenuShown }) => {
	// redux dispatch hook
	const dispatch = useDispatch();

	// tsx
	return (
		<>
			{/* menu */}
			<aside
				className={`fixed top-0 z-30 flex h-screen w-5/12 flex-col gap-y-2 rounded-l-xl border-l border-slate-300 bg-slate-900/75 p-5 shadow-lg backdrop-blur-sm transition-all duration-1000 md:right-0 md:w-3/12 md:rounded-none md:bg-slate-900 md:p-8 ${
					isMenuShown ? 'right-0' : '-right-full'
				}`}
			>
				{/* menu items */}
				<ul className="flex flex-col gap-y-2 text-xs text-slate-300 child:rounded-md child:transition-all child:duration-500 lg:text-base xl:text-lg">
					<li className="text-center" onClick={() => setIsMenuShown(false)}>
						<NavLink
							to=""
							className={({ isActive }) =>
								`flex items-center justify-center gap-x-2 rounded py-1 tracking-tighter hover:bg-rose-500/50 ${
									isActive
										? 'bg-rose-700/50 font-semibold hover:bg-rose-700/50'
										: 'hover:bg-rose-500/50'
								} `
							}
						>
							<AiOutlineHome className="text-rose-500" />
							User Info
						</NavLink>
					</li>
					<li className="text-center" onClick={() => setIsMenuShown(false)}>
						<NavLink
							to="rate"
							onClick={() => {
								dispatch(setRatePage(1));
								dispatch(setRatePerPage(10));
								dispatch(setText(''));
							}}
							className={({ isActive }) =>
								`flex items-center justify-center gap-x-2 rounded py-1 tracking-tighter hover:bg-rose-500/50 ${
									isActive
										? 'bg-rose-700/50 font-semibold hover:bg-rose-700/50'
										: 'hover:bg-rose-500/50'
								} `
							}
						>
							<GiStarsStack className="text-rose-500" />
							Scoreboard
						</NavLink>
					</li>
					<li className="text-center" onClick={() => setIsMenuShown(false)}>
						<NavLink
							to="history"
							onClick={() => {
								dispatch(setHistoryPage(1));
								dispatch(setHistoryPerPage(10));
							}}
							className={({ isActive }) =>
								`flex items-center justify-center gap-x-2 rounded py-1 tracking-tighter hover:bg-rose-500/50 ${
									isActive
										? 'bg-rose-700/50 font-semibold hover:bg-rose-700/50'
										: 'hover:bg-rose-500/50'
								} `
							}
						>
							<BiHistory className="text-rose-500" />
							History
						</NavLink>
					</li>
				</ul>
			</aside>
			{/* overlay */}
			<div
				className={`absolute left-0 top-0 z-20 w-screen bg-black/50 md:hidden ${
					isMenuShown ? 'visible' : 'hidden'
				}`}
				style={{ height: document.documentElement.scrollHeight }}
				onClick={() => setIsMenuShown(false)}
			></div>
		</>
	);
};

export default SideBar;
