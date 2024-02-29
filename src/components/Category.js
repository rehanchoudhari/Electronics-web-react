import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getByCatIdProdcuts } from '../fetcher';
import CategoryProducts from './CategoryProducts';

const Category = () => {
    const [products, setProducts] = useState({errorMessage: '', data: []});
    const { categoryId } = useParams();
    
    React.useEffect(() => {
        const fetchData = async () => {
          const responseObject = await getByCatIdProdcuts(categoryId);
          setProducts(responseObject);
        }
        fetchData();
      }, [categoryId])
    
    const renderProducts = () => {
      return products.data.map((p) => (
          <CategoryProducts key={p.id} {...p}>
              {p.title}
          </CategoryProducts>
      ));
    };

    
  return (
    <div>
        { products.errorMessage && <div>Error: under maintaince {products.errorMessage}</div> }
        
        { products.data && renderProducts() }
    </div>
  )
}

export default Category;