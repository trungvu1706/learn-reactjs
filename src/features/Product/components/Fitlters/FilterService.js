import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[400]}`,
  },

  serviceBox: {
    '& > ul': {
      listStyleType: 'none',
      padding: 0,
    },
  },
}));

const FilterService = (props) => {
  const { onFilterChange, filter } = props;
  const classes = useStyles();

  const handleChange = (e) => {
    if (!onFilterChange) return;

    const { name, checked } = e.target;
    onFilterChange({
      [name]: checked,
    });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h5">Service</Typography>
      <Box className={classes.serviceBox}>
        <ul>
          {[
            { value: 'isPromotion', label: 'Promotion' },
            { value: 'isFreeShip', label: 'FreeShip' },
          ].map((service) => (
            <li key={service.value}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(filter[service.value])}
                    onChange={handleChange}
                    name={service.value}
                    color="primary"
                  />
                }
                label={service.label}
              />
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

FilterService.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.object,
};

export default FilterService;
