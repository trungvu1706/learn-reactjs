import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors, formState } = form;
  const hasError = formState.touched[name] && errors[name];

  //   console.log(formState.touched[name], errors[name]);

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ onChange, onBlur, value, name }) => (
        <TextField
          autoFocus
          variant="outlined"
          fullWidth
          label={label}
          margin="normal"
          disabled={disabled}
          error={!!hasError}
          helperText={errors[name]?.message}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          name={name}
        />
      )}
    />
  );
}

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;
