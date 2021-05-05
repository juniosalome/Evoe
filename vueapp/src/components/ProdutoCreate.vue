<template>

        <div id="container" class="container">
      
            <div class="row">
            
                <div class="col-sm-8 offset-sm-2">
                <div class="alert alert-warning" v-show="showCreateMessage"  >
                  <button type="button" class="close" @click="hideMessage()">X</button>
                  <strong>Produto successfully created!</strong>
                </div>
                <div class="alert alert-warning" v-show="showUpdateMessage"  >
                  <button type="button" class="close" @click="hideMessage()">X</button>
                  <strong>Produto successfully updated!</strong>
                </div>
                
                <div class="alert alert-warning" v-show="showError"  >
                  <button type="button" class="close" @click="hideMessage()">X</button>
                  <strong>Error!</strong>
                </div>                
                    <h1>Create a Produto</h1>
                    <div class="info-form">
                      <form>
                        <div class="form-group">
                          <label for="sku">Produto SKU</label>
                          <input v-model="produto.sku" type="text" class="form-control" id="sku" aria-describedby="skuHelp" placeholder="Enter SKU">
                          <small id="skuHelp" class="form-text text-muted">Enter your produto's SKU</small>
                          <label for="name">Produto Name</label>
                          <input v-model="produto.name" type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name">
                          <small id="nameHelp" class="form-text text-muted">Enter your produto's name</small>

                          <label for="description">Produto Description</label>
                          <textarea v-model="produto.description" class="form-control" id="description" aria-describedby="descHelp" placeholder="Enter description"></textarea>
                          <small id="descHelp" class="form-text text-muted">Enter your produto's description</small>

                          <label for="buyPrice">Produto Cost</label>
                          <input v-model="produto.buyPrice" type="text" class="form-control" id="buyPrice" aria-describedby="buyPriceHelp" placeholder="Enter the buying price">
                          <small id="buyPriceHelp" class="form-text text-muted">Enter your produto's cost</small>

                          <label for="sellPrice">Produto Price</label>
                          <input v-model="produto.sellPrice" type="text" class="form-control" id="sellPrice" aria-describedby="sellPriceHelp" placeholder="Enter name">
                          <small id="sellPriceHelp" class="form-text text-muted">Enter your produto's selling price</small>

                          <label for="unit">Produto Unit</label>
                          <input v-model="produto.unit" type="text" class="form-control" id="unit" aria-describedby="unitHelp" placeholder="Enter unit">
                          <small id="unitHelp" class="form-text text-muted">Enter your produto's unit</small>

                          <label for="quantity">Produto Quantity</label>
                          <input v-model="produto.quantity" type="text" class="form-control" id="quantity" aria-describedby="quantityHelp" placeholder="Enter quantity">
                          <small id="quantityHelp" class="form-text text-muted">Enter your produto's quantity</small>

                        </div>
                      </form>
                       <button class="btn btn-primary" v-if="!this.produto.pk" @click="createProduto()" ><span v-if="!creating">Create</span><span v-if="creating">Creating... Please wait </span></button>
                       <button class="btn btn-primary" v-if="this.produto.pk" @click="updateProduto()" ><span v-if="!updating">Update</span><span v-if="updating">Updating... Please wait </span></button>
                       <button class="btn btn-primary"  @click="newProduto()" >New..</button>

                    </div>
                </div>
            </div>
        </div>

</template>

</template>

<script>
/* eslint-disable */
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



import {APIService} from '../http/APIService';


const apiService = new APIService();

export default {
  name: 'ProdutoCreate',
  components: {
  },
  data() {
    return {
      showCreateMessage: false,
      showUpdateMessage: false,
      showError: false,
      produto: {},
      produtos: '',
      creating: false,
      updating: false
    };
  }, 
  methods: {
    hideMessage(){
      this.showCreateMessage = false;
      this.showUpdateMessage = false;
      this.showError = false;
    },
    createProduto(){
      console.log('create produto' + JSON.stringify(this.produto));
      this.creating = true;
      apiService.createProduto(this.produto).then((result)=>{
          console.log(result);
          // success 
          if(result.status === 201){
            this.produto = result.data;
            this.showCreateMessage = true;
            
            
          }
            sleep(1000).then(() => {
               this.creating = false;
            })          
      },(error)=>{
        this.showError = true;
            sleep(1000).then(() => {
               this.creating = false;
            })
      });
    },
    updateProduto(){
      this.updating = true;
      console.log('update produto' + JSON.stringify(this.produto));
      apiService.updateProduto(this.produto).then((result)=>{
          console.log(result);
          // success 
          if(result.status === 200){
            //this.produto = {};
            this.showUpdateMessage = true;
            sleep(1000).then(() => {
               this.updating = false;
            })
            
          }
          
      },(error)=>{
        this.showError = true;
        sleep(1000).then(() => {
               this.updating = false;
        })        
      });
    },
    newProduto(){
      this.produto = {};
    }
    
  },
  mounted() {
    
    if(this.$route.params.pk){
      console.log(this.$route.params.pk)
      apiService.getProduto(this.$route.params.pk).then((produto)=>{
        this.produto = produto;
      })
    }
  },
}
</script>
<style scoped>
.aform{
  margin-left:  auto;
  width: 60%;
}
</style>
