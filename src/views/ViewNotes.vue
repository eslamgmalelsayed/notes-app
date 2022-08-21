<template>
    <div class="notes">    
        <AddEditNote
         v-model="newNote"
         placeholder="Add a new note"
         ref="addEditNoteRef"
        >
            <template #buttons>
                <button
                        @click="addNote"
                        :disabled="!newNote"
                        class="button is-link has-background-success">
                        Add New Note
                </button>
             </template>

        </AddEditNote>
            <progress
             v-if=" !storeNotes.notesLoaded "
              class="progress is-small is-success"
              max="100"
            />
            <template v-else >
            <Note
                v-for=" note in storeNotes.notes"
                :key="note.id"
                :note="note"
             />      
            </template>
            <div class="has-text-centered is-size-4 has-text-grey-light is-family-monospace py-6"
            v-if=" !storeNotes.notes.length ">
                No Notes here yet...
            </div>
            
    </div>
</template>

<script setup>
// imports
import  Note  from "../components/notes/Note.vue"
import  AddEditNote  from "../components/notes/AddEditNote.vue"
import { useStoreNotes } from '../stores/storeNotes'
import { ref } from 'vue';
import { useWatchCharacters } from '../use/useWatchCharacters'
//  store notes
const storeNotes = useStoreNotes()
// notes
const newNote = ref('')
const addEditNoteRef = ref(null)
// add note
const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addEditNoteRef.value.focusTextarea()
}
// watch characters
useWatchCharacters(newNote)

</script>