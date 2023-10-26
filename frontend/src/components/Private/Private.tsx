import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// react query

// react spinner
import { PacmanLoader } from 'react-spinners';

// redux
import { useDispatch } from 'react-redux';
import { setUser } from '../../services/redux/slices/User';
import { getValidate } from '../../services/axios/requests/authentication';

// panel private route
const Private: React.FC<React.PropsWithChildren> = ({ children }) => {
	// navigator
	const navigate = useNavigate();

	// redux dispatch hook
	const dispatch = useDispatch();

	const [data, setData] = useState();

	// POST validate user token
	useEffect(() => {
		getValidate().then((res) => {
			setData(res.data);
      
			dispatch(setUser(res.data));
		});
	}, []);

	// set user data to redux store
	// data ? dispatch(setUser(data)) : null;

	// tsx
	return <>{data ? <>{children}</> : navigate('/login')}</>;
};

// exports
export default Private;
