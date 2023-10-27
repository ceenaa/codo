// pages
import History from './components/History/History';
import Private from './components/Private/Private';
import Rate from './components/Rate/Rate';
import Source from './components/Source/Source';
import UserProfile from './components/UserProfile/UserProfile';
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
			{ path: '', element: <UserProfile /> },
			{ path: 'rate', element: <Rate /> },
			{ path: 'rate/:user', element: <Source /> },
			{ path: 'history', element: <History /> }
		]
	},
	{ path: '/login', element: <Login /> },
	{ path: '/signup', element: <SignUp /> }
];

// exports
export default routes;
