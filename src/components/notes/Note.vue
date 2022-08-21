<template>
        <div class="card mb-4">
            <div class="card-content">
                <div class="content">
                     {{ note.content }}
                     <div class="columns has-text-grey-light mt-2">
                        <small class="column"> {{dateFormatted}} </small>
                        <small class="column has-text-right">{{ characterLength }}</small>
                     </div>
                </div>
            </div>
            <footer class="card-footer">
                <RouterLink
                  class="card-footer-item" 
                  :to=" `/edit/${note.id}` ">Edit
                  </RouterLink>
                <a
                  @click.prevent="modals.deleteNote = true"
                  class="card-footer-item"  
                  href="#">Delete</a
                >
            </footer>
            <ModalDeleteNoteVue
                v-if="modals.deleteNote"
                v-model="modals.deleteNote"
                :noteId = "note.id"
            />
        </div>

</template>

<script setup>
// imports
    import { computed, reactive } from 'vue';
    import { useStoreNotes } from '../../stores/storeNotes'
    import ModalDeleteNoteVue from './ModalDeleteNote.vue';
    import { useDateFormat } from '@vueuse/core'
    //  store notes
    const storeNotes = useStoreNotes()
    // date format
    const dateFormatted = computed(() => {
        let date = new Date(parseInt(props.note.date))
        return useDateFormat(date, 'YYYY-MM-DD HH:mm').value
    })
    // props
   const props = defineProps({
        note: {
            type: Object,
            required : true
        }
    })    
    // length
    const characterLength = computed(() => {
        let length = props.note.content.length
        let description = length > 1 ? 'characters' : 'character'
        return ` ${length} ${description} `
    })
    // modal to delete
    const modals = reactive({
        deleteNote : false
    })
</script>