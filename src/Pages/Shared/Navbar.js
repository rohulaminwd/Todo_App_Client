import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from './Loading';
import {RiTodoLine} from 'react-icons/ri'
import {FaRegCalendarCheck} from 'react-icons/fa'
import {BiCalendar} from 'react-icons/bi'
import {HiOutlineLogin} from 'react-icons/hi'

const Navbar = () => {
    const [user, loading] = useAuthState(auth);

    const logOut = () => {
        signOut(auth)
        localStorage.removeItem('accessToken');
    }
    if(loading){
        <Loading />
    }
    const menuItems = <>
        <div className='mx-3'>
            <NavLink className='' to='/' >
                <div className='sm:flex justify-center sm:items-center'>
                    <div className='font-bold text-[18px] sm:block flex justify-center'><RiTodoLine /></div>
                    <span className='ml-1 mt-0 block sm:text-[18px] text-sm'>Todo</span>
                </div>
            </NavLink>
        </div>
        <div className='mx-3 my-0 py-0'>
            <NavLink className='' to='/completed' >
                <div className='sm:flex justify-center sm:items-center'>
                    <div className='font-bold leading-none text-[18px] sm:block flex justify-center'><FaRegCalendarCheck /></div>
                    <span className='ml-1 mt-0 block sm:text-[18px] text-sm'>Complete</span>
                </div>
            </NavLink>
        </div>
        <div className='mx-3 my-0 py-0'>
            <NavLink className='' to='/calender' >
                <div className='sm:flex justify-center sm:items-center'>
                    <div className='font-bold leading-none text-[18px] sm:block flex justify-center'><BiCalendar /></div>
                    <span className='ml-1 mt-0 block sm:text-[18px] text-sm'>Calender</span>
                </div>
            </NavLink>
        </div>
    </>
    const profile = <>
        <li className='mx-2'>
          {
              user?
              <div class="dropdown p-0 dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-8 sm:w-10 rounded-full">
                        { user?.photoURL? <img src={user.photoURL} alt='profile' /> : <img src="https://api.lorem.space/image/face?hash=33791" alt='profile' />}
                        </div>
                    </label>
                    <ul tabindex="0" class="p-2 shadow-md border border-blue-200 top-[60px] menu menu-compact dropdown-content bg-base-100 rounded-box w-48">
                        <div className="text-center border-b-2 border-blue-200 mb-3">
                            <div class="avatar online">
                                <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                { user?.photoURL? <img src={user.photoURL} alt='profile' /> : <img src="https://api.lorem.space/image/face?hash=33791" alt='profile' />}
                                </div>
                            </div>
                            <h1 className='mb-2 text-blue-900'>{user.displayName}</h1>
                        </div>
                        <li><a>Settings</a></li>
                        <li onClick={logOut}><a>Sign Out</a></li>
                    </ul>
                </div>
              :
              <div className='mx-3 my-0 py-0 sm:py-3'>
                    <NavLink className='' to='/login' >
                        <div className='sm:flex justify-center sm:items-center'>
                            <div className='font-bold leading-none text-[18px] sm:block flex justify-center'><HiOutlineLogin /></div>
                            <span className='ml-1 mt-0 block sm:text-[18px] text-sm'>Login</span>
                        </div>
                    </NavLink>
                </div>
          }
        </li>
    </>
    return (
        <div className="fixed top-0 py-0 z-50 left-0 border-b bg-white w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between w-full">
                    <div className="w-full">
                        <div className="w-full px-1">
                            <ul className="menu menu-horizontal font-bold p-0">
                                {menuItems}
                            </ul>
                        </div>
                    </div>
                    <div className="">
                        <ul className="menu menu-horizontal font-bold p-0">
                            {profile}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;