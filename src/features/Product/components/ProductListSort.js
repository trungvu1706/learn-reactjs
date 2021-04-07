import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

const ProductListSort = (props) => {
  const { currentSort, onSortChange } = props;

  const handleSortChange = (e, newValue) => {
    if (onSortChange) onSortChange(newValue);
  };

  return (
    <Tabs
      value={currentSort}
      onChange={handleSortChange}
      indicatorColor="primary"
      textColor="primary"
    >
      <Tab label="Ascending:" value="salePrice:ASC"></Tab>
      <Tab label="Descending:" value="salePrice:DESC"></Tab>
    </Tabs>
  );
};

ProductListSort.propTypes = {
  onSortChange: PropTypes.func,
  currentSort: PropTypes.string.isRequired,
};

export default ProductListSort;
