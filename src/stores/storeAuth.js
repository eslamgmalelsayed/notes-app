import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import { useStoreNotes } from './storeNotes';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth';


export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user : {}
    }
  },
  actions: {
      init(){
        const storeNotes = useStoreNotes()
        onAuthStateChanged(auth,(user) => {
          if(user){
            this.user.id = user.uid,
            this.user.email = user.email
            this.router.push('/')
            storeNotes.init()

          }else{
            this.user = {}
            this.router.replace('/auth')
            storeNotes.clearNotes()
          }
        })
      },
      // register
      registerUser(credintials){
        createUserWithEmailAndPassword(auth, credintials.email, credintials.password).then((userCredential) => {
          const user = userCredential.user
        }).catch((error) => {
          console.log('error register',error.message)
        })
      },

      // login
      loginuser(credintials){
        signInWithEmailAndPassword(auth, credintials.email, credintials.password).then((userCredential) => {
          const user = userCredential.user;
        }).catch((error) => {
          console.log('error login',error.message)
        })
      },

      // logout
      logoutUser(){
          signOut(auth).then(() => {
        }).catch((error) => {
          console.log('error logout',error.message)
        })
      },
    }

})
