import T from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { resetError } from '../../store/actions';
import { getUi } from '../../store/selectors';

function Layout({ children }) {
  
  const dispatch = useDispatch();
  const {error, isLoading} = useSelector(getUi);

  return (    
    <React.Fragment>
      <Header />
        {isLoading && <p>...login in nodepop</p>}
        {error && (
          <div onClick={() => dispatch(resetError())} style={{ color: 'red' }}>
            {error.message}
          </div>   
        )}
        <main>{children}</main>
        <Footer />
      </React.Fragment>
    
  );
}

Layout.propTypes = {
  children: T.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
