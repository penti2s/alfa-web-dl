import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase/firebase.js'
import {collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    class: [],
  },
  getters: {
  },
  mutations: {
    ADD_CLASS(state, payload) {
      state.class.push({
        id: payload.id,
        name: payload.data().name,
        image: payload.data().image,
        descripcion: payload.data().descripcion,
        costo: payload.data().costo,
        cupos: payload.data().cupos,
        date: payload.data().date,
        duracion: payload.data().duracion,
        inscritos: payload.data().inscritos,
      })
    },
    RESET_CLASS(state) {
      state.class = [];
    }, 
    EDIT_CLASS() {
      console.log('edit')
    },
  },
  actions: {
    async fetchClass({commit}){
      let querySnapShot = await getDocs(collection(db,'class'))
      commit('RESET_CLASS')
      querySnapShot.forEach((doc)=>{
        commit('ADD_CLASS',doc)
        //console.log(doc.id,'=>',doc.data())
      }
      )
    },
    async editClass({commit}, payload){
      // Add a new document with a generated id
      const classRef = doc(db, "class", payload.id);
      const data = {
        name: payload.name,
        image: payload.image,
        descripcion: payload.descripcion,
        costo: payload.costo,
        cupos: payload.cupos,
        date: payload.date,
        duracion: payload.duracion,
        inscritos: payload.inscritos,
      }
      await setDoc(classRef, data);
      commit('EDIT_CLASS', payload)
    },
    async deleteClass({commit}, payload){
      const classRef = doc(db, "class", payload.id);
      await deleteDoc(classRef)
      commit('EDIT_CLASS', payload)
    }
  },
  modules: {
  }
})
