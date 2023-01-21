import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {AppDispatch, RootStateI} from '../stores';
import {InitialAuthstate} from '../types';
import {AuthRoutes, UserRoutes} from '../routes';
import {CHECK_FOR_AUTHENTICATION} from '../stores/authSlice';

interface AppPropsI {
  auth: InitialAuthstate;
  checkForLogin: () => void;
}

const RootRoutes: React.FC<AppPropsI> = ({auth, checkForLogin}) => {
  useEffect(() => {
    checkForLogin();
  }, []);

  if (auth.user) {
    return <UserRoutes />;
  }
  return <AuthRoutes />;
};

const mapStateToProps = (state: RootStateI) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    checkForLogin: () => dispatch({type: CHECK_FOR_AUTHENTICATION}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootRoutes);
