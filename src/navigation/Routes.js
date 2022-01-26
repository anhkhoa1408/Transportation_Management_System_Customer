import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import AuthStack from './StackNavigator/AuthStack';
import TabNavigatior from './TabNavigator/TabNavigatior';

export const Routes = props => {
  const [logged, setLogged] = useState();
  const [loading, setLoading] = useState(props.userInfo.isLoading);

  useEffect(() => {
    if (props.userInfo && props.userInfo.jwt) {
      setLogged(true);
    } else {
      setLogged(false);
    }
    setLoading(false);
  }, [props.userInfo]);

  if (loading) {
    return <Loading />;
  }

  return logged ? <TabNavigatior /> : <AuthStack />;
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps, null)(Routes);
