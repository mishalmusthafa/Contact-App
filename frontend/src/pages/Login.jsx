import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { input } from '@testing-library/user-event/dist/cjs/event/input.js';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
  };

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

    <div className='bg-base-200'>

      <p className='link link-primary  text-right text-lg pt-5 px-8 font-medium no-underline'>
        <Link to='/register'>Don't have an account?</Link>
      </p>
      <div className="hero min-h-128">
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
                <input type="email" name='email' value={email} onChange={onChange} placeholder="email" className="input input-bordered h-10 lg:h-12" required />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input type={!passwordVisible ? 'password' : 'text'} name='password' value={password} onChange={onChange} placeholder="password" className="input input-bordered h-10 lg:h-12" required />
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
