import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import { LockOpenOutlined } from '@material-ui/icons';
import InputField from 'components/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },

  title: {
    textAlign: 'center',
    margin: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 1, 0),
  },
}));

function RegisterForm(props) {
  const { onSubmit } = props;
  const classes = useStyles();

  const schema = yup.object().shape({
    title: yup
      .string()
      .required('Please enter your tilte!')
      .min(5, 'Your title is too short.'),
  });

  const form = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
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
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOpenOutlined />
      </Avatar>

      <Typography component="h2" variant="h5" className={classes.title}>
        Register
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField form={form} name="fullname" label="Full Name" />
        <InputField form={form} name="email" label="Email" />
        <InputField form={form} name="password" label="Password" />
        <InputField
          form={form}
          name="confirmPassword"
          label="Confirm password"
        />
        <Button
          type="submit"
          className={classes.submit}
          fullWidth
          variant="contained"
          color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RegisterForm;
