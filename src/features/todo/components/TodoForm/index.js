import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

function TodoForm(props) {
  const { onSubmit } = props;

  const schema = yup.object().shape({
    title: yup
      .string()
      .required('Please enter your tilte!')
      .min(5, 'Your title is too short.'),
  });

  const form = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    console.log(values);
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField form={form} name="title" label="Todo" />
    </form>
  );
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default TodoForm;
