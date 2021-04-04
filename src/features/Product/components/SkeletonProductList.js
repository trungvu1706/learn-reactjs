import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const SkeletonProductList = ({ length = 6 }) => {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={4}>
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" height={200} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

SkeletonProductList.propTypes = {
  length: PropTypes.number,
};

export default SkeletonProductList;
