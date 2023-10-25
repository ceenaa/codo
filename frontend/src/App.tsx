// react
import { useRoutes } from 'react-router-dom';

// routes
import routes from './router';

// app
const App: React.FC = () => {
	// router
	const router = useRoutes(routes);

	// tsx
	return <>{router}</>;
};

// exports
export default App;
