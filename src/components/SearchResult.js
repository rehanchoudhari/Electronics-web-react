import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { getProductByQuery } from '../fetcher';
import CategoryProducts from './CategoryProducts';


const SearchResult = () => {
    const[products, setProducts] = React.useState({errorMessage: '', data: []});
    const [searchParam] = useSearchParams();
    let query = searchParam.get("s");

    useEffect(() => {
        const fetchData = async () => {
            const responseObject = await getProductByQuery(query);
            setProducts(responseObject);
        };
        fetchData();
    }, [query]);

    const renderProducts = () => {
        if(products.data.length > 0){
            return products.data.map((p) => (
                <CategoryProducts key={p.id} {...p}>
                    {p.title}
                </CategoryProducts>
            ));
        }else{
            return <div>No Result Found</div>
        }
    };

  return (
    <div>
        { products.errorMessage && <div>Error: under maintaince {products.errorMessage}</div> }
        
        { renderProducts() }
    </div>
  )
}

export default SearchResult;