<template>
    <v-container>
        <v-row justify="center">
            <v-col md="5">
                <h2> Registro </h2>
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
                        @click="register"
                    > Registro </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
    name: 'register-form',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        register(){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                // Signed in
                userCredential.user;
                this.$router.push('/')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                //const errorMessage = error.message;
                console.log(errorCode)
                // ..
            });
        }
    },
}
</script>

<style>

</style>