import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
     state: {
        apiUrl: 'http://localhost:8000/api/',
        msg:''
     },
     mutations: {
        SET_MSG(state, msg) {
            state.msg = msg;
        },
     },
     getters: {
         getApiUrl(state) {
             return state.apiUrl;
         },
         getMsg(state) {
             return state.msg;
         }
     },
     actions: {

     }
});

