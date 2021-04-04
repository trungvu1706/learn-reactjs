import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const SkeletonFilter = ({ length = 10 }) => {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((item, index) => (
          <Grid item key={index} xs={12}>
            <Box padding={1}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

SkeletonFilter.propTypes = {
  length: PropTypes.number,
};

export default SkeletonFilter;
