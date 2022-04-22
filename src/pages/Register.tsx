import React from 'react';
import { Navigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input';

import authService from '../services/authService';
import userService from '../services/userService';

type RegisterFormProps = { user: User | null };

const registerSchema = Yup.object({
  email: Yup.string()
    .min(5)
    .email('Invalid email address')
    .label('Email')
    .required(),
  password: Yup.string()
    .min(5)
    .label('Password')
    .required(),
  name: Yup.string()
    .min(2)
    .label('Name')
    .required(),
});

const Register: React.FC<RegisterFormProps> = ({ user }) => {
  if (user) return <Navigate to="/companies" />;

  const handleSubmit = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    try {
      const response = await userService.register({ email, password, name });
      authService.loginWithJwt(response.headers['x-auth-token']);
      window.location.href = '/companies';
    } catch (ex) {
      //@ts-ignore
      if (ex.response && ex.response.status === 400) console.log({ error: ex.response.data });
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '' }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <>
          <h1>Register</h1>
          <Form>
            <Input type="email" name="email" label="Email" />
            <Input type="password" name="password" label="Password" />
            <Input type="text" name="name" label="Name" />
            <button disabled={isSubmitting} className="btn btn-primary m-2">
              Register
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default Register;
