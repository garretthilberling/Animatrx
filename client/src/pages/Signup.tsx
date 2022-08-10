import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {signup} from '../utils/userRoutes';
import Auth from '../utils/auth';
import { userOutput } from '../utils/types';

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [response, setResponse] = useState<userOutput>({
    token: '',
    user: {
        username: '',
        email: '',
        password: '',
    }
  });

    // update state based on form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        signup(formState, setError, setResponse, Auth);
        console.log(response);
    } catch (e) {
        console.error(e);
    }

  }

  return (
    <div className=''>
    <div className='uk-card uk-card-body card-centering'>
      <h4 className='uk-card-title uk-text-center'>Sign Up</h4>
      <div className=''>
        <form className='form-centering form-input-margin' onSubmit={(e) =>  handleFormSubmit(e)}>
          <input
            className='form-input-margin'
            placeholder='Username'
            name='username'
            type='username'
            id='username'
            value={formState.username}
            onChange={handleChange}
          />
          <input
            className='form-input-margin'
            placeholder='Your email'
            name='email'
            type='email'
            id='email'
            value={formState.email}
            onChange={handleChange}
          />
          <input
            className='form-input-margin'
            placeholder='******'
            name='password'
            type='password'
            id='password'
            value={formState.password}
            onChange={handleChange}
          />
           <Link className='form-input-margin account-prop' to="/login">
            Already have an account?
          
          </Link>
          <button className='form-input-margin button-border' type='submit'>
            Submit
          </button>
         
          {error && <div className='form-input-margin'>Sign up failed</div>}
        </form>
      </div>
    </div>
  </div>
  );
};

export default Signup;
