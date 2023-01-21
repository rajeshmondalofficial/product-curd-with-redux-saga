import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React from 'react';
import {Button, Input} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import {connect} from 'react-redux';

import {InitialAuthstate, LoginCredentialsI} from '../../types';
import {AppDispatch, RootStateI} from '../../stores';
import {REQUEST_SIGNUP} from '../../stores/authSlice';

interface SignupPropsI {
  navigation: any;
  signup: (data: LoginCredentialsI) => void;
  auth: InitialAuthstate;
}

const Signup: React.FC<SignupPropsI> = ({navigation, signup, auth}) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<LoginCredentialsI>();

  const onSubmit = (data: LoginCredentialsI) => signup(data);

  const handleLoginLink = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/ic_user.png')} />
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Username</Text>
        <Controller
          control={control}
          name="username"
          rules={{required: true}}
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
        {errors.username && (
          <Text style={styles.errorText}>Username required</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          rules={{required: true}}
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
        {errors.password && (
          <Text style={styles.errorText}>Password required</Text>
        )}
      </View>
      <Button style={{width: 200}} onPress={handleSubmit(onSubmit)}>
        Create Account
      </Button>

      <Text style={styles.signupLink} onPress={handleLoginLink}>
        Already have an account Login
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
    signup: (payload: LoginCredentialsI) =>
      dispath({type: REQUEST_SIGNUP, payload}),
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
    marginBottom: 24
  },
  errorText: {color: '#ff0000', padding: 2},
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
