import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const AuthCheck = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                dispatch(authActions.setLoading(true)); // Start loading

                const response = await axios.get('http://localhost:3000/api/v1/auth/me', {
                    withCredentials: true
                });

                if (response.data.user) {
                    dispatch(authActions.login());
                    dispatch(authActions.changeRole(response.data.user.role));
                } else {
                    dispatch(authActions.logout());
                }
            } catch (error) {
                dispatch(authActions.logout());
            } finally {
                dispatch(authActions.setLoading(false)); // Stop loading
            }
        };

        fetchUser();
    }, [dispatch]);

    return null;
};

export default AuthCheck;