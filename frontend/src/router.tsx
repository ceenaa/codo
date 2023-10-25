// pages
import Private from './components/Private/Private';
import Rate from './components/Rate/Rate';
import Source from './components/Source/Source';
import Index from './pages/Index/Index';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';

// routes
const routes = [
	{
		path: '/',
		element: (
			<Private>
				<Index />
			</Private>
		),
		children: [
			{ path: 'rate', element: <Rate /> },
			{ path: 'rate/:user', element: <Source /> }
		]
	},
	{ path: '/login', element: <Login /> },
	{ path: '/signup', element: <SignUp /> }
];

// exports
export default routes;
