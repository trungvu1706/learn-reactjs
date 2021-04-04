import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Product from './Product';

const ProductList = (props) => {
  const { data } = props;
  return (
    <Box>
      <Grid container>
        {data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3} lg={4}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ProductList.propTypes = {
  length: PropTypes.number,
};

export default ProductList;
