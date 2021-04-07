import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    paddingBottom: theme.spacing(2),
  },

  description: {
    margin: theme.spacing(2, 0),
  },

  price: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },

  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
  },

  salePrice: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: 'bold',
    marginRight: theme.spacing(2),
  },
}));

const ProductInfo = ({ product = {} }) => {
  const {
    name,
    shortDescription,
    originalPrice,
    salePrice,
    promotionPercent,
  } = product;

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h4">
        {name}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.price}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>

            <Box component="span">
              {product.promotionPercent > 0
                ? ` - ${product.promotionPercent}%`
                : ''}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
};

export default ProductInfo;
