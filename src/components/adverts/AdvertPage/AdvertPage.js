import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';

import { connect} from 'react-redux';
import { getAdvertDetail, getUi } from '../../../store/selectors';
import { advertsDeleteAction } from '../../../store/actions';

function AdvertPage({advert, error, dispatch}) {

  const handleDelete = () => {
    dispatch(advertsDeleteAction(advert.id))
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  if (error?.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  return (
    <Layout>
      {advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

const mapStateToProps = (state , ownProps)=>({
  advert: getAdvertDetail(state, ownProps.match.params.advertId),
  ...getUi(state)
})


export default connect(mapStateToProps)(AdvertPage);
