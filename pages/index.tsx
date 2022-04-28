import { useEffect } from 'react';
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from '../redux_toolkit/hooks';
import {userSelector, logoutUser, refreshToken} from "../features/auth/authSlice"
const IndexPage:React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(userSelector).isAuthenticated;
  const router = useRouter();
  useEffect(() => {
 
  if(!isAuthenticated || !localStorage.getItem('token')) {
router.push("/login")
  }
  }, [isAuthenticated])

  return (
    <>
      <h1>Welcome to the greatest app in the world!</h1>
        <button
          onClick={() => dispatch(logoutUser())}
        >
          Logout
        </button>
        <button
          onClick={() =>        dispatch(refreshToken())}
        >
          refresh token
        </button>
    </>
  );
};
export default IndexPage;