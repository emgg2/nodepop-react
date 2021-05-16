import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogged } from '../../../store/selectors';

const PrivateRoute = props  => {

  const isLogged = useSelector (getIsLogged);
  const location = useLocation();

  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};


// const mapStateToProps= state => ({ isLogged: getIsLogged(state) });
// export default connect(mapStateToProps)(PrivateRoute);

export default PrivateRoute;
