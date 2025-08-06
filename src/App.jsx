import { BrowserRouter, Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import Body from './components/Body';
import Login from './components/Login';
import Feed from './components/Feed';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/feed' element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
