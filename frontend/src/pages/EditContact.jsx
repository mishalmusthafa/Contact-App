import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import ContactForm from '../components/ContactForm';
// import { toast } from 'react-toastify';
import { updateContact, reset, getContacts } from '../features/contact/contactSlice';
import Spinner from '../components/Spinner';
// import { current } from '@reduxjs/toolkit';

function EditContact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { contacts, isLoading, isError, message } = useSelector((state) => state.contacts);
  let contact;
  const index = contacts.findIndex((contact) =>
    contact._id === params.id
  );
  if (index !== -1) {
    contact = contacts[index];
  }

  const [formData, setFormData] = useState({
    id: params.id,
    name: '',
    email: '',
    phone: '',
  });

  const { email, name, phone } = formData;
  const { user } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };


  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContact(formData));
    navigate('/');
  };

  useEffect(() => {
    // Used Private route instead because of not logging out bug
    // if (!user) {
    //   navigate('/login');
    //   return;
    // }
    dispatch(getContacts());

    return () => {
      dispatch(reset());
    };

  }, [user, navigate, isError, dispatch, message]);

  useEffect(() => {
    if (contact) {
      setFormData((prevState) => ({
        ...prevState,
        name: contact.name,
        email: contact.email,
        phone: contact.phone
      }));
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <>
    <div className="w-full flex flex-row justify-center min-h-svh">
      <div className="form card w-96 bg-base-100 shadow-xl max-h-60">
        <p className='p-3 font-medium border-b-2' >Change the contact details:</p>
        <form className='pt-3' onSubmit={onSubmit}>
          <label className="input flex items-center gap-2">
            Full Name
            <input type="text" className="grow" placeholder="Anna" name='name' value={name} onChange={onChange} required />
          </label>
          <label className="input  flex items-center gap-2">
            Email
            <input type="email" name='email' value={email} onChange={onChange} className="grow" placeholder="anna@gamil.com" required />
          </label>
          <label className="input  flex items-center gap-2">
            Phone
            <input type="text" name='phone' value={phone} onChange={onChange} className="grow" placeholder="+12 345 6789" required />
          </label>
          <button type='submit' className='btn btn-block btn-primary rounded-none mt-5'>Update contact</button>
        </form>
      </div>
    </div>
  </>;
}

export default EditContact;
