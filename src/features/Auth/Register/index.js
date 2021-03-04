import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';

function Register(props) {
  const handleSubmit = (values) => {
    console.log('Form submit:', values);
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

Register.propTypes = {};

export default Register;
