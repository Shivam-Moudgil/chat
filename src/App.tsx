import { Route, Routes } from 'react-router-dom';
import { useAuth } from './context/UserContext';
import Chat from './pages/Chat';
import Login from './pages/Login';


function App() {
const {user} = useAuth();
console.log(user,"User from the app component");
  return (
   <>
   <Routes>
    <Route path="/" element={user?<Chat />:<Login />} />
    <Route path='*' element={<div>Not Found</div>}/>
   </Routes>
   </>
  );
}

export default App;