import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterCategory from './Fitlters/FilterCategory';

const ProductFilters = (props) => {
  const { filter, onFilterChange } = props;

  const handleFilterChange = (newCategoryId) => {
    if (!onFilterChange) return;

    const newFilter = {
      ...filter,
      'category.id': newCategoryId,
    };

    onFilterChange(newFilter);
  };

  return (
    <Box>
      <FilterCategory onFilterChange={handleFilterChange} />
    </Box>
  );
};

ProductFilters.propTypes = {
  filter: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func,
};

export default ProductFilters;
