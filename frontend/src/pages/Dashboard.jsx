import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import ContactItem from '../components/ContactItem';

function Dashboard() {

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return <>
    <div className=" min-h-svh">
      <div className="flex flex-col-reverse items-center lg:items-start lg:flex-row  border-b px-10 gap-5">
        <div className='basis-1/3 lg:border-r'>
          <ContactItem />
        </div>
        <div className='basis-3/4'>
          <h1 className='text-3xl font-bold my-10 text-center'>
            {user && `Welcome Back ${user.name}`}
          </h1>
          <ContactForm />
        </div>
      </div>
    </div>
  </>;

}

export default Dashboard;
