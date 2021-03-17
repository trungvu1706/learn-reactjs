import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[400]}`,
  },

  range: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),

    '& > span': {
      margin: '0 5px 0 5px',
    },
  },
}));

const FilterPrice = (props) => {
  const classes = useStyles();
  const { onFilterChange } = props;
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (onFilterChange) onFilterChange(values);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h5">Price Range</Typography>
      <Box className={classes.range}>
        <TextField
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
        <span>-</span>

        <TextField
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
          variant="outlined"
          size="small"
        />
      </Box>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleSubmit}>
        Search
      </Button>
    </Box>
  );
};

FilterPrice.propTypes = {
  onFilterChange: PropTypes.func,
};

export default FilterPrice;
