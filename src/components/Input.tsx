import React from 'react';
import { Field, useFormikContext } from 'formik';

type InputFieldProps = { name: string; label: string; type: string };

const InputField: React.FC<InputFieldProps> = ({ name, label, type }) => {
  const { errors, touched } = useFormikContext();
  //@ts-ignore
  const errMsg = touched[name] && errors[name];

  return (
    <div className="form-group w-25 p-2">
      <label htmlFor={name}>{label}</label>
      <Field type={type} name={name} id={name} className="form-control" />
      {errMsg && <div className="alert alert-danger mt-2">{errMsg}</div>}
    </div>
  );
};

export default InputField;
