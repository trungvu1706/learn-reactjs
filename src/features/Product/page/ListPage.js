import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductListSort from '../components/ProductListSort';
import SkeletonFilter from '../components/SkeletonFilter';
import SkeletonProductList from '../components/SkeletonProductList';

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
    // padding: '0 20px 0 20px',
  },

  sub_left: {
    padding: '0 10px 0 10px',
  },

  right: {
    flex: '1 1 0',
  },

  paginationStyles: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    paddingBottom: '20px',
  },
}));

function ListPage() {
  const classes = useStyles();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 10,
    _sort: 'salePrice:ASC',
  });

  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filter);
        console.log({ data, pagination });
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch data', error);
      }

      // setLoading(false);
    })();
  }, [filter]);

  const handlePageChange = (e, page) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      _page: page,
    }));
  };

  const handleSortChange = (newValue) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      _sort: newValue,
    }));
  };

  const handleFilterChange = (newFilter) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0} className={classes.sub_left}>
              {loading ? (
                <SkeletonFilter />
              ) : (
                <ProductFilters
                  onFilterChange={handleFilterChange}
                  filter={filter}
                />
              )}
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductListSort
                currentSort={filter._sort}
                onSortChange={handleSortChange}
              />

              {loading ? (
                <SkeletonProductList />
              ) : (
                <ProductList data={productList} />
              )}

              <Box className={classes.paginationStyles}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  color="primary"
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ListPage.propTypes = {};

export default ListPage;
