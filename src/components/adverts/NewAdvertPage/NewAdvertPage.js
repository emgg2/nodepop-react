import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';
import { useDispatch, useSelector } from 'react-redux';
import { advertsCreateAction } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

function NewAdvertPage() {
  
  const dispatch = useDispatch();
  const { error } = useSelector(getUi);

  const handleSubmit = newAdvert => {
      dispatch(advertsCreateAction(newAdvert)); 
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  return (   
    <Layout>    
      <NewAdvertForm onSubmit={handleSubmit} />
    </Layout>
  );
}

export default NewAdvertPage;
