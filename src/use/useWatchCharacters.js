import { watch } from "vue"
// watch characters
export function useWatchCharacters( valueToWatch, maxChars = 100 ) {
watch(valueToWatch,(newValue) => {
    if ( newValue.length === maxChars ) {
        console.log("sadfasdfs")
    }
})
}