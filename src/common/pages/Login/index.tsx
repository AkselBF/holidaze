import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const Login: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div>
      <h1>{isLoginForm ? 'Login' : 'Register'}</h1>
      {isLoginForm ? <LoginForm /> : <RegistrationForm />}
      <button onClick={() => setIsLoginForm(!isLoginForm)}>
        {isLoginForm ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default Login;