import { FaRegUserCircle } from "react-icons/fa";



function SingleContact({ contact }) {
  return (
    <>
      <div className='flex flex-row gap-5 mb-5 h-full text-left hover:bg-base-200 pl-2 cursor-pointer items-center'>
        <FaRegUserCircle />
        <div className='flex-col '>
          <div className='font-bold'>{contact.name.charAt(0).toUpperCase() + contact.name.slice(1)}</div>
          <div>{contact.email}</div>
          <div>{contact.phone}</div>
        </div>
      </div>

    </>
  );
}

export default SingleContact;
