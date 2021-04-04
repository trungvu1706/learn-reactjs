import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: theme.spacing(2),
    padding: 0,
    listStyleType: 'none',

    ' & > li ': {
      margin: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'FreeShip',
    isVisible: () => true,
    isActive: (filters) => filters.isFreeShip,
    isRemovable: false,
    onRemove: null,
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }

      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Promotion',
    isVisible: (filters) => filters.isPromotion,
    isActive: () => true,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 3,
    getLabel: (filters) =>
      `From ${filters.salePrice_gte} to ${filters.salePrice_lte}`,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_gte') &&
      Object.keys(filters).includes('salePrice_lte'),
    isActive: () => true,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 4,
    getLabel: (filters) => ` Danh mục ${filters['category.id']} `,
    isVisible: (filters) => filters['category.id'],

    isActive: () => true,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: null,
  },
];

const FilterViewer = ({ filter = {}, onFilterChange = null }) => {
  const classes = useStyles();
  const visibleFilter = useMemo(() => {
    return FILTER_LIST.filter((filterEle) => filterEle.isVisible(filter));
  }, [filter]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilter.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filter)}
            color={x.isActive(filter) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onFilterChange) return;

                    const newFilters = x.onToggle(filter);
                    console.log('new filters:', newFilters);
                    onFilterChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onFilterChange) return;

                    const newFilters = x.onRemove(filter);
                    console.log('new filters:', newFilters);
                    onFilterChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
};

FilterViewer.propTypes = {
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
};

export default FilterViewer;
