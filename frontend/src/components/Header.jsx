import { MdNaturePeople } from "react-icons/md";
import { Link } from 'react-router-dom';

function Header() {
  return <>
    <div className="flex flex items-center justify-between p-3">
      <Link to='/'>
        <h1 className='text-3xl font-bold text-primary flex flex-row items-center' > <MdNaturePeople />Contacts App</h1>
      </Link>
      <ul className='flex flex-row'>
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
      </ul>

    </div>

  </>;
}

export default Header;
