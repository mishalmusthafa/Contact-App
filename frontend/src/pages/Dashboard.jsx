import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import SingleContact from '../components/SingleContact';
import { getContacts } from '../features/contact/contactSlice';
import { reset } from '../features/contact/contactSlice';


function Dashboard() {

  const { contacts, isLoading, isError, message } = useSelector((state) => state.contacts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  if (contacts.length === 0 || contacts.length < 1) {
    dispatch(getContacts());
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Used Private route instead because of not logging out bug
    // if (!user) {
    //   navigate('/login');
    //   return;
    // }
    dispatch(getContacts());

    return () => {
      dispatch(reset());
    };

  }, [user, navigate, isError, dispatch, message,]);

  if (isLoading) {
    return <Spinner />;
  }

  return <>
    <div className=" min-h-svh">
      <div className="flex flex-col-reverse items-center lg:items-start lg:flex-row  border-b px-10 gap-5">
        <div className='basis-1/3 lg:border-r'>
          <div className="py-5 flex flex-col min-h-screen">
            <div>
              {contacts.length > 0 ?
                (<div>
                  {contacts.map((contact) => (
                    <SingleContact contact={contact} key={contact._id} />))}
                </div>) :
                (<p>No Contacts found</p>)}
            </div>
          </div>
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
