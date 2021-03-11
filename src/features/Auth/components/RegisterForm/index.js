import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { LockOpenOutlined } from '@material-ui/icons';
import InputField from 'components/InputField';
import PasswordField from 'components/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    position: 'relative',
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

  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function RegisterForm(props) {
  const { onSubmit } = props;
  const classes = useStyles();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name.')
      .test(
        'Full name error!',
        'Your Full Name should be at least two words.',
        (value) => {
          return value.split(' ').length >= 2;
        }
      ),

    email: yup
      .string()
      .required('Please enter your email')
      .email('Your email is incorrect.'),

    password: yup
      .string()
      .required('Please enter your password.')
      .min(6, 'Your password is at least 6 character.'),

    confirmPassword: yup
      .string()
      .required('Please confirm your password.')
      .oneOf([yup.ref('password')], 'Password does not match.'),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOpenOutlined />
      </Avatar>

      <Typography component="h2" variant="h5" className={classes.title}>
        Register
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField form={form} name="fullName" label="Full Name" />
        <InputField form={form} name="email" label="Email" />
        <PasswordField form={form} name="password" label="Password" />
        <PasswordField
          form={form}
          name="confirmPassword"
          label="Confirm password"
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          fullWidth
          variant="contained"
          color="primary"
          size="large">
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
