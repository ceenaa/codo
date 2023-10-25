// react
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './services/redux/Store';

// global styles
import './Styles/app.css';

// components
import App from './App';

// react query client
import { QueryClient, QueryClientProvider } from 'react-query';
const client = new QueryClient();

// main
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<QueryClientProvider client={client}>
		<Provider store={store}>
			{/* router */}
			<BrowserRouter>
				{/* application */}
				<App />
			</BrowserRouter>
		</Provider>
	</QueryClientProvider>
);
