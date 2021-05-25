import React from 'react';
import { Redirect } from 'react-router-dom';

import { createAdvert } from '../../../api/adverts';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
import { useDispatch, useSelector } from 'react-redux';
import { advertsCreateAction, resetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

function NewAdvertPage() {
  
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector(getUi);

  const handleSubmit = newAdvert => {
    dispatch(advertsCreateAction(newAdvert)); 
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  return (   
    <Layout>
       {isLoading && <p>...login in nodepop</p>}
      {error && (
      <div onClick={() => dispatch(resetError())} style={{ color: 'red' }}>
        {error.message}
      </div>
    )}
      <NewAdvertForm onSubmit={handleSubmit} />
    </Layout>
  );
}

export default NewAdvertPage;
