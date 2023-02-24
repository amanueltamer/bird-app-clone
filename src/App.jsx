import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets'
import { login, selectUser } from './features/userSlice';
import { auth } from './firebase-config';
import UserFeed from './components/UserFeed'

function App() {

  const user = useSelector(selectUser);

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
      {user ? <UserFeed /> : <Feed/>}
      <Widgets />
    </div>
  );
}

export default App;
