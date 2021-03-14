import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import SkeletonProductList from '../components/SkeletonProductList';

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },
}));

const ListPage = (props) => {
  const classes = useStyles();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 10,
  });

  const [pagination, setPageination] = useState({
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
        setPageination(pagination);
      } catch (error) {
        console.log('Failed to fetch data', error);
      }

      setLoading(false);
    })();
  }, [filter]);

  const handlePageChange = (page) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      _page: page,
    }));
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left</Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {loading ? (
                <SkeletonProductList />
              ) : (
                <ProductList data={productList} />
              )}

              <Pagination
                count={Math.ceil(pagination.total / pagination.limit)}
                color="primary"
                page={pagination.page}
                onChange={handlePageChange}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

ListPage.propTypes = {};

export default ListPage;
