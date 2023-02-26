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
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
}

export default App;
