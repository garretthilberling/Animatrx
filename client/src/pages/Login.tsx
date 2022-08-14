import React, { useState } from "react";
import { userOutput } from '../utils/types';
import {login} from '../utils/userRoutes';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
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
        login(formState, setError, setResponse, Auth);
        console.log(response);
    } catch (e) {
        console.error(e);
    }

  }

  return (
    <div className="login-signup-container">
          <div className="">
            <h4 className="">Login</h4>
            <div className="">
              <form
                className="login-signup-flex"
                onSubmit={handleFormSubmit}
              >
                <input
                  className=""
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className=""
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Link className="" to="/signup">
                  Don't have an account?
                </Link>
                <button
                  className="submit"
                  type="submit"
                >
                  Submit
                </button>
                {error && <div>Login failed</div>}
              </form>
            </div>
          </div>
        </div>
  )
};

export default Login;
