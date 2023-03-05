import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets'
import { login } from './features/userSlice';
import { auth } from './firebase-config';

function App() {

  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery("(max-width: 850px)");


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // the user is logged in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, []);


  return (
    <div className="app">
      {isSmallScreen ? (
        <>
        <Sidebar />
        <Feed />
        </>
      ) : (
        <>
        <Sidebar />
        <Feed />
        <Widgets />
        </>
      )}
    </div>
  );
}

export default App;
