import React from 'react';
import { useNavigate } from 'react-router-dom';

// react query

// react spinner
import { PacmanLoader } from 'react-spinners';

// redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../services/redux/slices/User';

// react-query
import useGetMe from '../../hooks/useGetMe';

// panel private route
const Private: React.FC<React.PropsWithChildren> = ({ children }) => {
	// navigator
	const navigate = useNavigate();

	// GET validate user token
	const { data } = useGetMe();

	// tsx
	return <>{data ? <>{children}</> : navigate('/login')}</>;
};

// exports
export default Private;
