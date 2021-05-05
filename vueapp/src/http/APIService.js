/* eslint-disable */
import axios from 'axios';
import AuthService from '../auth/AuthService';
const API_URL = 'http://localhost:8000';

export class APIService{
    constructor(){
      
    }
    getProdutos() {
        const url = `${API_URL}/api/produtos/`;
        return axios.get(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }}).then(response => response.data);
    }
    getProdutosByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }}).then(response => response.data);
        
    }
    getProduto(pk) {
        const url = `${API_URL}/api/produtos/${pk}`;
        return axios.get(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }}).then(response => response.data);
    }    
    deleteProduto(produto){
        const url = `${API_URL}/api/produtos/${produto.pk}`;
        return axios.delete(url, { headers: { Authorization: `Bearer ${AuthService.getAuthToken()}` }});

    }
    createProduto(produto){
        const url = `${API_URL}/api/produtos/`;
        const headers = {Authorization: `Bearer ${AuthService.getAuthToken()}`};
        return axios.post(url,produto,{headers: headers});
    }
    updateProduto(produto){
        const url = `${API_URL}/api/produtos/${produto.pk}`;
        const headers = {Authorization: `Bearer ${AuthService.getAuthToken()}`};
        return axios.put(url,produto,{headers: headers});
    }    
} 