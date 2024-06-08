import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContact } from '../features/contact/contactSlice';

function ContactForm() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const { name, email, phone } = formData;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createContact(formData));
    setFormData({
      name: '',
      email: '',
      phone: ''
    });
  };


  return <>
    <div className="w-full flex flex-row justify-center">
      <div className="form card w-96 bg-base-100 shadow-xl max-h-60">
        <p className='p-3 font-medium border-b-2' >Please Enter the contact details:</p>
        <form className='pt-3' onSubmit={onSubmit}>
          <label className="input flex items-center gap-2">
            Full Name
            <input type="text" className="grow" placeholder="Anna" name='name' value={name} onChange={onChange} required />
          </label>
          <label className="input  flex items-center gap-2">
            Email
            <input type="email" name='email' value={email} onChange={onChange} className="grow" placeholder="anna@gmail.com" />
          </label>
          <label className="input  flex items-center gap-2">
            Phone
            <input type="text" name='phone' value={phone} onChange={onChange} className="grow" placeholder="+12 345 6789" required />
          </label>
          <button type='submit' className='btn btn-block btn-primary rounded-none mt-5'>Add contact</button>
        </form>
      </div>
    </div>
  </>;
}

export default ContactForm;
