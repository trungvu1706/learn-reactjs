import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import DOMPurify from 'dompurify';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 3),
  },
}));

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
  const classes = useStyle();

  const safeDescription = DOMPurify.sanitize(product.description);
  return (
    <Paper elevation={0} className={classes.root}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
    </Paper>
  );
}

export default ProductDescription;
