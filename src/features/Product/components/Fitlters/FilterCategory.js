import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2), // 1 = 8px
  },

  menu: {
    listStyleType: 'none',
    padding: 0,

    '& > li': {
      marginTop: theme.spacing(1),

      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.dark,
        transition: 'all 0.25s',
      },
    },
  },
}));

const FilterCategory = (props) => {
  const { onFilterChange } = props;

  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const res = await categoryApi.getAll();
        console.log({ res });
        setCategoryList(
          res.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch data', error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onFilterChange) onFilterChange(category.id);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h5">Category List</Typography>
      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

FilterCategory.propTypes = {
  onFilterChange: PropTypes.func,
};

export default FilterCategory;
