<template>
<div>
<h1>Produtos ({{numberOfProdutos}})</h1>
<Loading :loading="loading"></Loading>
<table class="table table-bordered table-hover">
  <thead>
    <tr>
      <th>#</th>
      <th>Chave</th>
      <th>Nome</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="produto in produtos" @click="selectProduto(produto)">
      <th>{{produto.pk}}</th>
      <th>{{produto.chave}}</th>
      <td>{{produto.nome}}</td>
      <td>
        <button class="btn btn-danger" @click="deleteProduto(produto)"> X</button>
        <a class="btn btn-primary" v-bind:href="'/produto-update/' + produto.pk"> &#9998; </a>
      </td>
    </tr>
  </tbody>
</table>
<div>
<ul class="list-horizontal">
  <li><button class="btn btn-primary" @click="getPreviousPage()">Previous</button></li>
  <li v-for="page in pages">
    <a class="btn btn-primary" @click="getPage(page.link)">{{ page.pageNumber }}</a>
  </li>
  <li><button class="btn btn-primary" @click="getNextPage()">Next</button></li>
</ul>


</div>

<div class="card text-center" v-if="selectedProduto">
  <div class="card-header">
    #{{selectedProduto.pk}} -- {{selectedProduto.sku}}
  </div>
  <div class="card-block">
    <h4 class="card-title">{{selectedProduto.name}}</h4>
    <p class="card-text">
    {{selectedProduto.description}}
    </p>
    <a class="btn btn-primary" v-bind:href="'/produto-update/' + selectedProduto.pk"> &#9998; </a>
    <button class="btn btn-danger" @click="deleteProduto(selectedProduto)"> X</button>

  </div>

</div>
</div>
</template>

<script>
/* eslint-disable */
import {APIService} from '../http/APIService';
import Loading from './Loading';
const API_URL = 'http://localhost:8000';
const apiService = new APIService();

export default {
  name: 'ProdutoList',
  components: {
    Loading
  },
  data() {
    return {
      selectedProduto:null,
      produtos: [],
      numberOfPages:0,
      pages : [],
      numberOfProdutos:0,
      loading: false,
      nextPageURL:'',
      previousPageURL:''
    };
  }, 
  methods: {
    getProdutos(){

      this.loading = true;    
      apiService.getProdutos().then((page) => {
        this.produtos = page.data;
        console.log(page);
        console.log(page.nextlink);
        this.numberOfProdutos = page.count;
        this.numberOfPages = page.numpages;
        this.nextPageURL = page.nextlink;
        this.previousPageURL = page.prevlink;
        if(this.numberOfPages)
        {
          for(var i = 1 ; i <= this.numberOfPages ; i++)
          {
            const link = `/api/produtos/?page=${i}`;
            this.pages.push({pageNumber: i , link: link})
          }
        }
        this.loading = false;
      });
    },
    getPage(link){
      this.loading = true;  
      apiService.getProdutosByURL(link).then((page) => {
        this.produtos = page.data;
        this.nextPageURL = page.nextlink;
        this.previousPageURL = page.prevlink;
        this.loading = false;
      });     
    },
    getNextPage(){
      console.log('next' + this.nextPageURL);
      this.loading = true;  
      apiService.getProdutosByURL(this.nextPageURL).then((page) => {
        this.produtos = page.data;
        this.nextPageURL = page.nextlink;
        this.previousPageURL = page.prevlink;
        this.loading = false;
      });      
      
    },
    getPreviousPage(){
      this.loading = true;  
      apiService.getProdutosByURL(this.previousPageURL).then((page) => {
        this.produtos = page.data;
        this.nextPageURL = page.nextlink;
        this.previousPageURL = page.prevlink;
        this.loading = false;
      });      
            
    },
    deleteProduto(produto){
      console.log("deleting produto: " + JSON.stringify(produto))
      apiService.deleteProduto(produto).then((r)=>{
        console.log(r);
        if(r.status === 204)
        {
          alert("Produto deleted");
          this.$router.go()
          
        }
      })
    },
    selectProduto(produto){
      this.selectedProduto = produto;
    }
  },
  mounted() {
   
    this.getProdutos();

  },
}
</script>
<style scoped>
.list-horizontal li {
	display:inline-block;
}
.list-horizontal li:before {
	content: '\00a0\2022\00a0\00a0';
	color:#999;
	color:rgba(0,0,0,0.5);
	font-size:11px;
}
.list-horizontal li:first-child:before {
	content: '';
}
</style>
