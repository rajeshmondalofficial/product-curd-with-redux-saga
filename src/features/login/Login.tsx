import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Button, Input} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import {connect} from 'react-redux';

import {InitialAuthstate, LoginCredentialsI} from '../../types';
import {AppDispatch, RootStateI} from '../../stores';
import {REQUEST_LOGIN} from '../../stores/authSlice';

interface LoginPropsI {
  login: (payload: LoginCredentialsI) => void;
  navigation: any;
  auth: InitialAuthstate;
}

const Login: React.FC<LoginPropsI> = props => {
  const {login, navigation, auth} = props;
  const {handleSubmit, control} = useForm<LoginCredentialsI>();

  const onSubmit = (data: LoginCredentialsI) => login(data);

  const handleSignupLink = () => {
    navigation.navigate('signup');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/ic_user.png')} />
      <Text style={styles.title}>Welcome back</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Username</Text>
        <Controller
          control={control}
          name="username"
          render={({field: {onChange, value, onBlur}}) => (
            <Input
              placeholder="Username"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
            />
          )}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value, onBlur}}) => (
            <Input
              secureTextEntry={true}
              placeholder="********"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
            />
          )}
        />
      </View>
      <Button style={{width: 200}} onPress={handleSubmit(onSubmit)}>
        Login
      </Button>

      <Text style={styles.signupLink} onPress={handleSignupLink}>
        Don't have an account Create Account
      </Text>
      {auth.errorMessage && (
        <Text style={styles.errorText}>{auth.errorMessage}</Text>
      )}
    </View>
  );
};

const mapStateToProps = (state: RootStateI) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispath: AppDispatch) => {
  return {
    login: (payload: LoginCredentialsI) =>
      dispath({type: REQUEST_LOGIN, payload}),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
  },
  label: {
    fontWeight: 'bold',
    padding: 2,
  },
  formGroup: {
    padding: 12,
    width: Dimensions.get('window').width,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  signupLink: {
    marginTop: 24,
    marginBottom: 24,
  },
  errorText: {color: '#ff0000', padding: 2},
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
