import productApi from 'api/productApi';
import { useEffect, useState } from 'react';

export default function useProductDetail(productId) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await productApi.get(productId);
        // console.log(result);
        setProduct(result);
      } catch (e) {
        console.log('Failed to fetch data', e);
      }
      setLoading(false);
    })();
  }, [productId]);

  return { product, loading };
}
