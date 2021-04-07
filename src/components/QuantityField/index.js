import { Box, FormHelperText, IconButton, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {},

  quantityBox: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '200px',
  },
}));

function QuantityField(props) {
  const { form, name, label, disabled } = props;
  const { errors, setValue } = form;
  const hasError = !!errors[name];
  //   console.log(formState.touched[name], errors[name]);

  const classes = useStyle();

  return (
    <FormControl
      variant="outlined"
      fullWidth
      margin="normal"
      error={hasError}
      size="small"
    >
      <Typography>{label}</Typography>
      <Controller
        control={form.control}
        name={name}
        id={name}
        render={({ onChange, onBlur, value, name }) => (
          <Box className={classes.quantityBox}>
            <IconButton
              onClick={() =>
                setValue(
                  name,
                  Number.parseInt(value) ? Number.parseInt(value) - 1 : 1
                )
              }
            >
              <RemoveCircleOutline />
            </IconButton>
            <OutlinedInput
              type="number"
              disabled={disabled}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />

            <IconButton
              onClick={() =>
                setValue(
                  name,
                  Number.parseInt(value) ? Number.parseInt(value) + 1 : 1
                )
              }
            >
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default QuantityField;
