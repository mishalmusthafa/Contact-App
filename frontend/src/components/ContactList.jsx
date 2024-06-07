import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, reset } from '../features/contact/contactSlice';
import Spinner from './Spinner';
import SingleContact from './SingleContact';
import { toast } from 'react-toastify';


function ContactItem() {
  const { contacts, isLoading, isSuccess, isError, message } = useSelector((state) => state.contacts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }
    dispatch(getContacts());

  }, [isSuccess, isError, message, isLoading, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return <>
    <div className="py-5 flex flex-col min-h-screen">
      <div>
        {contacts.length > 0 ?
          (<div>{contacts.map((contact) =>
            (<SingleContact contact={contact} />))}
          </div>) :
          (<p>No Contacts found</p>)}
      </div>

    </div>
  </>;
};

export default ContactItem;
