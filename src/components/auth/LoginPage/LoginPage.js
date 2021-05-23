
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUi } from '../../../store/selectors';

import LoginForm from './LoginForm';
import { loginAction, resetError } from '../../../store/actions';

function LoginPage({ location, onLogin }) {
  const dispatch = useDispatch();
  const {error, isLoading} = useSelector(getUi);
   
  const handleSubmit = credentials => {
    dispatch(loginAction (credentials, location));
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={() => dispatch(resetError())} style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}


export default LoginPage;
