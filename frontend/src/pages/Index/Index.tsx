// react
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

// components
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

// index
const Index: React.FC = () => {
	// menu handler
	const [isMenuShown, setIsMenuShown] = useState<boolean>(false);

	// change document name when mounting
	useEffect(() => {
		document.title = 'CODO';
	}, []);

	// tsx
	return (
		<>
			<SideBar isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} />
			<main className="absolute left-0 w-full md:w-9/12">
				<Header setIsMenuShown={setIsMenuShown} />
				<Outlet />
			</main>
		</>
	);
};

// exports
export default Index;
