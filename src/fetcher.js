const BASE_URL = 'http://localhost:3001'

const fetcher = async (url) => {
    let responseObject = {errorMessage: '', data: []}
    try {
    const response = await fetch(BASE_URL + url);
    if(!response.ok){
        throw new Error(`HTTP Error ${response.status}`);
    }
    const responseData = await response.json();
    responseObject.data = responseData;
    }
    catch(err){
        responseObject.errorMessage = err.message;
    }
    return responseObject;
};
// Product category related urls
export const getCategories = () => {
    return fetcher('/categories');
}

// Product related urls
export const getByCatIdProdcuts = (id) => {
    return fetcher('/products?catId=' + id);
}

export const getProductById = (id) => {
    return fetcher('/products/'+id);
}

export const getProductByQuery = query =>{
    return fetcher('/products?q=' + query);
}