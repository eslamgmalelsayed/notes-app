<template>
    
    <nav 
    class="navbar is-success" 
    role="navigation" 
    aria-label="main navigation">
    <div class="container is-max-desktop px-2">
    <div class="navbar-brand">
        <RouterLink 
         :to="{name : 'ViewNotes'}"
        class="navbar-item is-size-4 is-family-monospace">
            Noteballs
        </RouterLink>

        <a
        @click.prevent="showMobileNav = !showMobileNav"
        ref = 'navbarBurgerRef' 
          class="navbar-burger"
          :class=" { 'is-active' : showMobileNav } "
          aria-expanded="false"
          aria-label="menu"
          data-target="navbarBasicExample"
          role="button"
        >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class=" { 'is-active' : showMobileNav } "
      ref="navbarMenuRef"
    >
        <div class="navbar-start">
            <button
            v-if="storeAuth.user.id "
              @click="logout"
              class="button is-small is-info ml-2 mt-3"
            >
                Log out {{ storeAuth.user.email }}
            </button>
        </div>
        <div class="navbar-end">
            <RouterLink
                @click="showMobileNav = false"
                  :to="{name:'ViewNotes'}"
                  class="navbar-item"
                  active-class="is-active"
                >                Home
            </RouterLink>
            <RouterLink
                @click="showMobileNav = false"
              :to="{name:'ViewStats'}"
              class="navbar-item"
              active-class="is-active"
            >
                stats
            </RouterLink>
        </div>
    </div>

    </div>
    </nav>

</template>
<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '../../stores/storeAuth';
import { useRouter } from 'vue-router';
// route
    const router = useRouter()
// store
const storeAuth = useStoreAuth()
    // mob nav
    const showMobileNav = ref(false)
    // close nav menu outside
    const navbarMenuRef = ref(null)
    const navbarBurgerRef = ref(null)
     onClickOutside(navbarMenuRef, () => {
        showMobileNav.value = false},
        {
            ignore : [navbarBurgerRef]
        }
     )
    //  log out
    const logout = ()  => {
        showMobileNav.value = false
        storeAuth.logoutUser()
        router.replace('/auth')
    }
   
</script>

<style>
 @media (max-width: 1023px) {
    .navbar-menu{
        position: absolute;
        width: 100%;
        left: 0;
    }
 }
</style>