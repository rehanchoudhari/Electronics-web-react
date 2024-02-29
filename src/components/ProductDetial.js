import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '../fetcher';
import styled from 'styled-components';

const ProductDetial = () => {
  const [productDetail, setProductDetail] = useState({errorMessage: '', data: {}})
  const {productId} = useParams();

  React.useEffect(()=> {
    const fetchData = async () => {
        const responseObject = await getProductById(productId);
        setProductDetail(responseObject);
    }
    fetchData();
  }, [productId])

  const createMarkup = () => {
    return { __html: productDetail.data?.description}
  };

  return (
    <ProductInfoArticle>
        <ProductInfoTitle>
            {productDetail.data.title}
        </ProductInfoTitle>
        <figure>
            <ProductImageContainer>
                <ProductImage src={`/assets/${productDetail.data.image}`}  alt={productDetail.data.title} />
            </ProductImageContainer>
        </figure>
        <aside>
            <ProductInfo>
                <ProductInfoHeader>Dimension</ProductInfoHeader>
                <label>{productDetail.data.specs?.dimensions}</label>
            </ProductInfo>
            {productDetail.data.specs?.capacity && 
                <ProductInfo>
                    <ProductInfoHeader>Capacity</ProductInfoHeader>
                    <label>{productDetail.data.specs?.capacity}</label>
                </ProductInfo>
            }
            {productDetail.data.features &&
                <ProductInfo>
                    <ProductInfoHeader>Features</ProductInfoHeader>
                    <ul>
                        {productDetail.data.features?.map((f, i) => {
                            return <ProductInfoListItem key={`features${i}`}> {f} </ProductInfoListItem>
                        })}
                    </ul>
                </ProductInfo>
            }
        </aside>
        <aside>
            <ProductInfoFinancePrice>
                &repuees;{productDetail.data.price}
            </ProductInfoFinancePrice>
            <ProductInfoStock>
                <ProductInfoStockLable> Stock Level: {productDetail.data.stock}</ProductInfoStockLable>
                <ProductInfoStockLable>Free Delivery</ProductInfoStockLable>
            </ProductInfoStock>
            <ProductInfoAction>
                <ProductInfoActionButton>Add to Cart</ProductInfoActionButton>
            </ProductInfoAction>
        </aside>
        <ProductDiscription dangerouslySetInnerHTML={createMarkup()}></ProductDiscription>
    </ProductInfoArticle>
  )
}

export default ProductDetial;


const ProductInfoArticle = styled.article`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 0.25fr 1fr 0.25fr;
    column-gap: 20px;
`;

const ProductInfoTitle = styled.div`
    grid-column: 1 / span 3;
    color: darkslategray;
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 10px;
`;

const ProductImageContainer = styled.div`
    padding: 10px;
    width: 60%;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductInfoHeader = styled.h3`
    color: darkslategray;
    font-size: 1em;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 5px;
`;

const ProductInfoListItem = styled.li`
    padding-top: 5px;
`;

const ProductInfoFinancePrice = styled.div`
    color: darkslategray;
`;

const ProductInfoStock = styled.div`
    padding-left: 10px;
    margin-top: 20px;
    padding-top: 10px;
    background-color: lightgrey;
    height: 20%;
    width:30%;
    border-radius: 5px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
`;

const ProductInfoStockLable = styled.label`
    padding-bottom: 5px;
`;

const ProductInfoAction = styled.div`
    display: flex;
    flex-direction: column;
`;
const ProductInfoActionButton = styled.button`
    width: 160px;
    height: 30px;
    border-radius: 10px;
    margin-top: 20px;
    background-color: lightgray;
    border: solid 1px lightgray;
    font-weight: bold;
`;

const ProductDiscription = styled.div`
    grid-column: 1 / span 3;
    padding-top: 10px;
`;