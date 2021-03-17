import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { FilterCategory, FilterPrice } from './Fitlters';

const ProductFilters = (props) => {
  const { filter, onFilterChange } = props;

  const handleCategoryChange = (newCategoryId) => {
    if (!onFilterChange) return;

    const newFilter = {
      ...filter,
      'category.id': newCategoryId,
    };

    onFilterChange(newFilter);
  };

  const handlePriceChange = (values) => {
    console.log(values);
    onFilterChange(values);
  };

  return (
    <Box>
      <FilterCategory onFilterChange={handleCategoryChange} />
      <FilterPrice onFilterChange={handlePriceChange} />
    </Box>
  );
};

ProductFilters.propTypes = {
  filter: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func,
};

export default ProductFilters;
