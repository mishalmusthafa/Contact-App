import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  const [passwordVisible, setPasswordVisible] = useState(false);


  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Password do not match');
    } else {
      const userData = {
        name,
        email,
        password
      };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());

  }, [isError, isLoading, user, message, isSuccess, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Password Visiblity
  const onPasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (isLoading) {
    return <Spinner />;
  }



  return (
    <div className='flex flex-col justify-center bg-base-200 min-h-128 min-w-fit mt-auto relative'>
      <p className='link link-primary  text-right text-lg pt-5 px-8 font-medium no-underline absolute top-5 right-5'>
        <Link to='/login'>Sign me in</Link>
      </p>
      <div className="hero  bg-base">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-5xl font-bold">Register Now!</h1>
            <p className="py-3 lg:py-6">Please fill the form to register</p>
          </div>
          <div className="card shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={onSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name='name' value={name} onChange={onChange} placeholder="name" className="input input-bordered h-10 lg:h-12 bg-base-100" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' value={email} onChange={onChange} placeholder="email" className="input input-bordered h-10 lg:h-12 bg-base-100" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text" >Password</span>
                </label>
                <input type="password" name='password' value={password} onChange={onChange} placeholder="password" className="input input-bordered h-10 lg:h-12 bg-base-100" required />
              </div>
              <div className="form-control relative">
                <label className="label" htmlFor='password'>
                  <span className="label-text">Confirm Password</span>
                </label>
                <input type={!passwordVisible ? 'password' : 'text'} name='password2' value={password2} onChange={onChange} placeholder="confirm password" className="input input-bordered h-10 lg:h-12 bg-base-100" required />
                <label className="swap absolute top-10 right-5 mt-2 lg:mt-3 ">
                  <input type="checkbox" onClick={onPasswordVisible} />
                  <FaEye className='swap-on' />
                  <FaEyeSlash className='swap-off' />
                </label>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary" type='submit'>Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );


}

export default Register;
