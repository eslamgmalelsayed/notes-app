import { defineStore } from 'pinia'
import { useStoreAuth } from './storeAuth'
import { 
  collection, onSnapshot,
  doc , addDoc, deleteDoc, updateDoc,
  query, orderBy  } from "firebase/firestore"
import { db } from '@/js/firebase'
let notescollectionRef
let noteCollectionQuery
let getNotesSnapshot = null
export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
        notes : [],
        notesLoaded : false
    }
  },
  actions: {
    init(){
      const storeAuth = useStoreAuth()
      notescollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      noteCollectionQuery = query(notescollectionRef, orderBy('date','desc'));
      this.getNotes()
    },
    // get notes
      async getNotes(){
        this.notesLoaded = false

        if(getNotesSnapshot) getNotesSnapshot()

        getNotesSnapshot = onSnapshot(noteCollectionQuery, (querySnapshot) => {
            let notes = []
            querySnapshot.forEach((doc) => {
              let note = {
                  id : doc.id,
                  content : doc.data().content,
                  date : doc.data().date
                }
                notes.push(note)
            })
            this.notes = notes
            this.notesLoaded = true
          }, error => {
            console.log('error', error.message)
          })
      },
      // clear notes
      clearNotes(){
        this.notes = []
      },
    // add
    async addNote(newNoteContent){
        let currentDate = new Date().getTime()
        let date = currentDate.toString()
      
         await addDoc(notescollectionRef, {
          content : newNoteContent,
          date
        })

    },
    // delete
    async deleteNote(id) {
            await deleteDoc(doc(notescollectionRef, id))
    },
    //  edit
    async updateNote(id,content) {
      // let index = this.notes.findIndex(note => note.id === id)
      // this.notes[index].content = content
        await updateDoc(doc(notescollectionRef, id), {
          content
        })
    }
  },
  getters : {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id)[0].content
      }
    },
    // notes count
    totalnotesCount : (state) => {
      return state.notes.length
    },
    totalCharactersCount : (state) => {
      let count = 0
      state.notes.forEach((note) => {
        count += note.content.length
      })
      return count
    }
  }
})
