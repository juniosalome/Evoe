<template>
    <main role="main">
      <div class="jumbotron">
        <h1>Evoe</h1>
        <p class="lead">Teste Evoe</p>
      </div>

    <h4 v-if="!authenticated">
      Voce nao esta logado <a class="btn btn-primary" @click="auth.login()">Log In</a>
    </h4>
    <h4 >

    </h4>
  <div v-if="authenticated" class="card col-sm-10 offset-sm-4" style="width: 20rem;">
  <img class="card-img-top" v-bind:src="profile.picture" alt="profile image">
  <div class="card-block">
    <h4 class="card-title">{{profile.nickname}}</h4>
      Bem vindo: {{profile.name}}
  </div>
</div>

    </main>

</template>

<script>
/* eslint-disable */
  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
    data(){

        return {
          access_token: localStorage.getItem('access_token'),
          id_token: localStorage.getItem('id_token'),
          profile: {}
        }
    },
    methods:{
      getUserProfile(){
        this.auth.getUserProfile((err, profile)=> {
          if(err) return null;
          console.log(profile);
          this.profile = profile;
        });
      }
    },

  mounted(){
    this.getUserProfile();
  }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>