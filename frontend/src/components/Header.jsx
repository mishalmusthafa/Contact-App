import { MdNaturePeople } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset, logout } from '../features/auth/authSlice';

function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login');
  };


  return <>
    <div className="flex flex items-center justify-between px-3 py-3 lg:px-10 py-3 border-b min-h-20 ">
      <Link to='/'>
        <h1 className='text-5xl md:text-3xl font-bold text-primary flex flex-row items-center' > <MdNaturePeople /><span className='hidden md:block'>
          Contacts App</span></h1>
      </Link>
      <ul className='flex flex-row'>

        {user ? (
          <li>
            <div className='cursor-pointer hover:underline  font-medium' onClick={onLogout}>Sign Out</div>
          </li>
        ) : (<>
          <li>
            <Link to='/register'>
              <div className="btn btn-outline rounded-full btn-primary w-32 mr-3">
                Register
              </div>
            </Link>
          </li>
          <li>
            <Link to='/login'>
              <div className="btn btn-ghost mr-3">Login</div>
            </Link>
          </li>
        </>)}

      </ul>

    </div>

  </>;
}

export default Header;
