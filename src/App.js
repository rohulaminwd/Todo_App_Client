import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "aos/dist/aos.css";
import AOS from "aos";
import 'react-day-picker/dist/style.css';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Login/SignUp';
import Navbar from './Pages/Shared/Navbar';
import Notfound from './Pages/Shared/Notfound';
import Todo from './Pages/Todo/Todo';
import RequireAuth from './Pages/Login/RequireAuth'
import CompleteTask from './Pages/CompleteTodo/CompleteTask';
import Calender from './Pages/Calender/Calender';
import useTodo from './Hooks/useTodo';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import { createContext } from 'react';

export const todoContext = createContext()


function App() {
  AOS.init();
  const [user] = useAuthState(auth);
  const [todo, todoLoading] = useTodo(user)
  return (
    <div className='max-w-7xl mx-auto h-screen bg-blue-100'>
      <todoContext.Provider value={[todo, todoLoading]}>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<RequireAuth><Todo /></RequireAuth>}></Route>
          <Route path='/completed' element={<RequireAuth><CompleteTask /></RequireAuth>}></Route>
          <Route path='/calender' element={<RequireAuth><Calender /></RequireAuth>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='*' element={<Notfound />}></Route>
        </Routes>
      </todoContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
