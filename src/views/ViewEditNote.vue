<template>

         <AddEditNote
         v-model="noteContent"
         bgColor="link"
         placeholder="Edit note"
         ref="addEditNoteRef"
         label="Edit Note"
        >
            <template #buttons>
                <button
                @click="$router.back()"
                        class="button is-link is-light mr-2">                        
                        Cancel
                </button>
                 <button
                 @click="handleSaveClicked"
                        :disabled="!noteContent"
                        class="button is-link has-background-link">                        
                        Save Note
                </button>
             </template>
        </AddEditNote>

</template>

<script setup>
// imports
import AddEditNote from '../components/notes/AddEditNote.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStoreNotes } from '../stores/storeNotes';
import { ref } from 'vue';
// store
const storeNotes = useStoreNotes()
// route
const route = useRoute()
const router = useRouter()
// note
const noteContent = ref('')
noteContent.value = storeNotes.getNoteContent(route.params.id)
// save 
const handleSaveClicked = () => {
        storeNotes.updateNote(route.params.id, noteContent.value)
        router.push('/')
        }
</script>