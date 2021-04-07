import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Button, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import QuantityField from 'components/QuantityField';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    position: 'relative',
  },

  submit: {
    width: '150px',
  },
}));

const AddToCartForm = ({ onSubmit = null }) => {
  const classes = useStyles();

  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter your quantity.')
      .min(1, 'Minimum value is 1')
      .typeError('Please enter a number.'),
  });

  const form = useForm({
    defaultValues: {
      quantity: '',
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
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <QuantityField form={form} name="quantity" label="Quantity" />

        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          size="small"
        >
          Add to cart
        </Button>
      </form>
    </div>
  );
};

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddToCartForm;
