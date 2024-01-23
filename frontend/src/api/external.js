import axios from "axios";

// const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=business AND blockchain&sortBy=publishedAt&language=en&apiKey=${import.meta.env.VITE_NEWS_API_KEY}
// `;
const NEWS_API_ENDPOINT = "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json";
export const getArticlesApi = async () => {
    let response;
    try {
        response = await axios.get(NEWS_API_ENDPOINT);    
        // response = response.data.articals.slice(0,15);
    } 
    catch (error) {
        return error
    }
    return response;
} 

const CRYPTO_COINGOCKO_API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false&locale=en"
export const getCrypto = async() => {
    let response;
    try {
        response = await axios.get(CRYPTO_COINGOCKO_API_URL);
    } catch (error) {
        return error
    }
    return response;
}