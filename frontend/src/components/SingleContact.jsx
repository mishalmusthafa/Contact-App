import { FaRegUserCircle } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { deleteContact, updateContact } from '../features/contact/contactSlice';
import { useSelector, useDispatch } from 'react-redux';

function SingleContact({ contact }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteContact(contact._id));
    }
  };

  return (
    <>
      <div className='flex flex-row mb-5  hover:bg-base-200 pl-2 cursor-pointer items-center justify-between '>
        <div className='inline'>
          <FaRegUserCircle />
          <div className='flex-col'>
            <div className='font-bold'>{contact.name}</div>
            <div>{contact.email}</div>
            <div>{contact.phone}</div>
          </div>
        </div>
        <div className='item-end flex flex-row p-5 text-3xl'>
          <Link to={`/contacts/${contact._id}`} >
            <CiEdit className='hover:bg-base-300 rounded mr-3 ' /></Link>
          <CiCircleRemove className='hover:bg-red-200 rounded mr-3 text-red-400' onClick={onDelete} />
        </div>

      </div>
    </>
  );
}

export default SingleContact;
