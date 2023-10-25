// react
import { NavLink } from 'react-router-dom';

// icons
import { AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';

// sidebar
const SideBar: React.FC<{
	isMenuShown: boolean;
	setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isMenuShown, setIsMenuShown }) => {
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
							<AiOutlineStar className="text-rose-500" />
							User Info
						</NavLink>
					</li>
					<li className="text-center" onClick={() => setIsMenuShown(false)}>
						<NavLink
							to="rate"
							className={({ isActive }) =>
								`flex items-center justify-center gap-x-2 rounded py-1 tracking-tighter hover:bg-rose-500/50 ${
									isActive
										? 'bg-rose-700/50 font-semibold hover:bg-rose-700/50'
										: 'hover:bg-rose-500/50'
								} `
							}
						>
							<AiOutlinePlus className="text-rose-500" />
							New Rate
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
