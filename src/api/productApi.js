import axiosClient from './axiosClient';

const productApi = {
  async getAll(params) {
    // tranform _page to _start
    const newParams = { ...params };
    newParams._start =
      !params._page || params._page <= 1
        ? 0
        : (params._page - 1) * (params._limit || 50);

    delete newParams._page;

    // product list
    const productList = await axiosClient.get('/products', {
      params: newParams,
    });

    console.log('here', newParams);

    //total of product
    const count = await axiosClient.get('/products/count', {
      params: newParams,
    });

    //  build response and return

    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },

  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/products';
    return axiosClient.post(url, data);
  },

  update(data) {
    const url = `products/${data.id}`;
    return axiosClient.patch(url, data);
  },

  remove(id) {
    const url = `products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
