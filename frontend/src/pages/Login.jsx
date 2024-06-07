import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';


function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);



  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    };

    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());

  }, [user, isError, isSuccess, isLoading, message, navigate, dispatch]);

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

  return (

    <div className='flex flex-col justify-center bg-base-200 lg:min-h-lvh min-w-fit mt-auto relative '>

      <Link to='/register' className='link link-primary  text-center text-lg p-3 font-medium no-underline  top-5 right-5 lg:absolute'>Dont have an account?</Link>
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse">

          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-5xl font-bold">Login Now!</h1>
            <p className="py-3 lg:py-6">Please fill the email and password</p>
          </div>
          <div className="card shrink-0 w-96 
       
        max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={onSubmit}>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' value={email} onChange={onChange} placeholder="email" className="input input-bordered h-10 lg:h-12 bg-base-100" required />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input type={!passwordVisible ? 'password' : 'text'} name='password' value={password} onChange={onChange} placeholder="password" className="input input-bordered h-10 lg:h-12 bg-base-100" required />
                <label className="swap absolute top-10 right-5 mt-2 lg:mt-3">
                  <input type="checkbox" onClick={onPasswordVisible} />
                  <FaEye className='swap-on' />
                  <FaEyeSlash className='swap-off' />
                </label>


                <label className="label">
                  <Link to='/forgot-password' className="label-text-alt link link-hover">Forgot password?</Link>
                </label>
              </div>


              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>

      </div >
    </div >
  );


}

export default Login;
