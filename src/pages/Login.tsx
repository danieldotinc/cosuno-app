import React from 'react';
import { Navigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Input from '../components/Input';

import auth from '../services/authService';

type LoginProps = { user: User | null };

const loginSchema = Yup.object({
  email: Yup.string()
    .min(5)
    .email('Invalid email address')
    .label('Email')
    .required(),
  password: Yup.string()
    .min(5)
    .label('Password')
    .required(),
});

const Login: React.FC<LoginProps> = ({ user }) => {
  if (user) return <Navigate to="/companies" />;

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    try {
      await auth.login(email, password);
      window.location.href = '/companies';
    } catch (ex) {
      //@ts-ignore
      if (ex.response && ex.response.status === 400) console.log({ error: ex.response.data });
    }
  };

  return (
    <Formik initialValues={{ email: '', password: '' }} validationSchema={loginSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <>
          <h1>Login</h1>
          <Form>
            <Input type="email" name="email" label="Email" />
            <Input type="password" name="password" label="Password" />
            <button disabled={isSubmitting} className="btn btn-primary m-2">
              Login
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default Login;
