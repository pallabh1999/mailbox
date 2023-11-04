import React,{Fragment,useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import PageRoutes from './Components/Routes/PageRoutes';
import Notification from './Components/Assets/Notication';
import { useSelector, useDispatch } from 'react-redux';
import { userAction } from './Store/UserSlice';
import { fetchUserData,logOut } from './Store/UserAction';
import { getInboxData,getSentData } from './Store/mailAction';

function App() {
  const notification = useSelector((state) => state.userInfo.notification);

  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.userInfo.isLoggedIn)
  const token = useSelector((state) => state.userInfo.token)
  const email = useSelector((state) => state.userInfo.email)
  const mail = email.replace(/[@.]/g, "");


  useEffect(() => {
    dispatch(userAction.setLogin());
    dispatch(getInboxData(mail));
    dispatch(getSentData(mail))
  }, [email , token]);
  
  useEffect(() => {
    if (email && token) {
      dispatch(fetchUserData(token));
    }
  }, [token, email, dispatch])

  const autoLogout = () => {
    console.log('autologout called');
    dispatch(logOut());
  };

  useEffect(() => {
    let logoutTimer;
    if (token) {

      logoutTimer = setTimeout(() => {
        autoLogout();
      }, 10 * 60 * 1000);
    }
    return () => clearTimeout(logoutTimer);
  }, [token ])
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(userAction.showNotification(null));
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification, dispatch]);

  return (
    <Fragment>
        {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    <Router>
      <PageRoutes loggedIn={loggedIn}/>
    </Router>
  </Fragment>

  );
}

export default App;
