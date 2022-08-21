<template>
    <div class="auth">
        <div class="tabs is-centered">
            <ul>
                <li :class="{'is-active' : !register}">
                    <a @click.prevent=" register = false ">Login</a>
                    </li>
                <li :class="{'is-active' : register}">
                    <a @click.prevent=" register = true " >Register</a>
                    </li>
            </ul>
        </div>
        <div class="card auth-form">
        <div class="card-content">
            <div class="title has-text-centered">
                {{ formTitle }}
            </div>
            <!-- <p v-if="errorLogin">please make sure you entered the correct email and password</p> -->
            <form @submit.prevent="onSubmit">


                    <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input
                      v-model="credentials.email"
                      class="input"
                      placeholder="e.g. alexsmith@gmail.com"
                      type="email"
                    >
                </div>
                </div>

                <div class="field">
                <label class="label">password</label>
                <div class="control">
                    <input
                      v-model="credentials.password"
                      class="input"
                      placeholder="Enter a password"
                      type="password"
                    >
                </div>
            </div>


                <div class="field is-grouped is-grouped-right">
                    <p class="control">
                        <button class="button is-primary">
                        {{ formTitle }}
                        </button>
                    </p>
                </div>

            </form>

           

        </div>
</div>
    </div>
</template>
<script setup>
    // imports
    import { ref, computed, reactive } from 'vue';
    import { useStoreAuth } from '../stores/storeAuth'
    import { useRouter } from 'vue-router';
    const router = useRouter()
    // store
    const storeAuth = useStoreAuth()

    //  login register
    const register = ref(false)
    const formTitle = computed( () => {
        return register.value ? 'Register' : 'Login'
    })


    // credentials
    const credentials = reactive({
        email : '',
        password : ''
    })

    // onSubmit
    const onSubmit = () => {
        if( !credentials.email || !credentials.password ){
            console.log('error')
        } else{
            if(register.value){
                storeAuth.registerUser(credentials)
                register.value = false
            } else{
                storeAuth.loginuser(credentials)
            }
        }
    }
</script>

<style>
    .auth-form{
        margin: 0 auto;
        max-width: 400px;
    }
</style>