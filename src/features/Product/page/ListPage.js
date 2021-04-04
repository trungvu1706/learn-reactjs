import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import FilterViewer from '../components/FilterViewer';
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

  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 10,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [filter, setFilter] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 10,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // }));

  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });

  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filter),
  //   });
  // }, [history, filter]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);

        console.log({ data, pagination });
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch data', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   _page: page,
    // }));

    const filter = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const handleSortChange = (newValue) => {
    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   _sort: newValue,
    // }));

    const filter = {
      ...queryParams,
      _sort: newValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const handleFilterChange = (newFilter) => {
    // setFilter((prevFilter) => ({
    //   ...prevFilter,
    //   ...newFilter,
    // }));

    const filter = {
      ...queryParams,
      ...newFilter,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  };

  const handleFilterViewChange = (newFilters) => {
    // setFilter(newFilters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
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
                  filter={queryParams}
                />
              )}
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductListSort
                currentSort={queryParams._sort}
                onSortChange={handleSortChange}
              />

              <FilterViewer
                filter={queryParams}
                onFilterChange={handleFilterViewChange}
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
