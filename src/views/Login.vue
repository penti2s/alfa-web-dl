<template>
    <v-container>
        <v-row justify="center">
            <v-col md="5">
                <h2> Login </h2>
                <v-form>
                    <v-text-field
                        type="email" 
                        placeholder="Email"
                        label="Email"
                        single-line
                        solo
                        v-model="email"
                    ></v-text-field>

                    <v-text-field
                        type="password" 
                        placeholder="Password"
                        label="Password"
                        single-line
                        solo
                        v-model="password"
                    ></v-text-field>
                    <v-btn
                        class="float-right"
                        elevation="2"
                        outlined
                        rounded
                        text
                        @click="login"
                    > Ingresar </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth'
export default {
    name: 'login-form',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login(){
            const auth = getAuth()
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then(() => {
                    alert('logeado con exito')
                    this.$router.push('/')
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
}
</script>

<style>

</style>