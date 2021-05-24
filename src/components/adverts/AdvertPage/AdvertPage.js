import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvert, deleteAdvert } from '../../../api/adverts';
import usePromise from '../../../hooks/usePromise';
import { useDispatch, useSelector } from 'react-redux';
import { advertsLoadAction, resetError } from '../../../store/actions';
import { getUi, getAdvertsData } from '../../../store/selectors';

function AdvertPage() {
  const { advertId } = useParams();
  const dispatch = useDispatch();
  const { error, isLoading} = useSelector(getUi);


  const { isPending: isLoading,  execute, data: advert } = usePromise(
    null
  );

  React.useEffect(() => {
    execute(getAdvert(advertId));
  }, [advertId]);

  const handleDelete = () => {
    execute(deleteAdvert(advertId)).then(() => history.push('/'));
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  if (error?.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  return (
    <Layout>
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={() => dispatch(resetError())} style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
      {advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

export default AdvertPage;
