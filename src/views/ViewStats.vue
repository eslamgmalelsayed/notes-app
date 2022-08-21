<template>
    <div class="stats">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>value</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>number of notes</td>
                    <td> {{ storeNotes.totalnotesCount }} </td>
                </tr>
                 <tr>
                    <td>number of characters (of all notes)</td>
                    <td> {{ storeNotes.totalCharactersCount }} </td>
                </tr>
            </tbody>
        </table>
        <input 
            v-model="loveNoteBalls"
            class="input"
            type="text"
            maxlength="50"
            placeholder="Do You Love Noteballs"
            v-autofocus
        >
    </div>
</template>
<script setup>
    // imports
    import { ref } from 'vue'
    import { useStoreNotes } from '../stores/storeNotes'
    import {vAutofocus} from '../directives/vAutofocus'
    import { useWatchCharacters } from '../use/useWatchCharacters'
    // store
    const storeNotes = useStoreNotes()
    // love noteballs
    const loveNoteBalls = ref('')
    useWatchCharacters(loveNoteBalls,50)
</script>