import { BrowserRouter, Route, Routes } from 'react-router';
import Body from './components/Body';
import Connection from './components/Connection';
import Feed from './components/Feed';
import Login from './components/Login';
import Profile from './components/Profile';
import Request from './components/Request';

function App() {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/' element={<Feed />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/connection' element={<Connection />} />
            <Route path='/request' element={<Request />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
