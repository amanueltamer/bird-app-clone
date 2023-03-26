import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets'
import { login } from './features/userSlice';
import { auth } from './firebase-config';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Thread from './components/Thread';

function App() {

  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery("(max-width: 694px)");


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
    <Router>
      <div className="app">
        {isSmallScreen ? (
          <>
          <Sidebar />
            <Routes>
              <Route path="/thread/:postId" element={<Thread />}></Route>
              <Route path="/" element={<Feed />}></Route>
            </Routes>
          </>
        ) : (
          <>
          <Sidebar />
            <Routes>
              <Route path="/thread/:postId" element={<Thread />}></Route>
              <Route path="/" element={<Feed />}></Route>
            </Routes>
          <Widgets />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
