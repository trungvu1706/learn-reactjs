import React from 'react';
import PropTypes from 'prop-types';
import { Box, Link } from '@material-ui/core';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    listStyleType: 'none',

    '& > li ': {
      padding: theme.spacing(2, 4),
    },
    '& > li > a': {
      color: theme.palette.grey[700],
    },

    '& > li > a.active': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
}));

const ProductMenu = (props) => {
  const { url } = useRouteMatch();
  const classes = useStyle();

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={`${url}/description`} exact>
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional_information`} exact>
          Additional Information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          Reviews
        </Link>
      </li>
    </Box>
  );
};

ProductMenu.propTypes = {};

export default ProductMenu;
