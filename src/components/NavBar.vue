<template>
    <div>
        <v-app-bar color="deep-purple accent-4" dense dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Alfa Web</v-toolbar-title>

            <v-spacer></v-spacer>

                <v-btn v-if="login"  color="transparent" outlined>
                    
                    <router-link style="text-decoration: none"  to="/"> Home |</router-link>
                </v-btn>
                <v-btn v-if="login"  color="transparent" outlined>
                    
                    <router-link style="text-decoration: none"  to="/admin"> Admin |</router-link>
                </v-btn>

                <v-toolbar-title v-if="login">{{ email }}</v-toolbar-title>
                <v-btn
                    v-if="login" 
                    icon>
                        <v-icon
                            @click="logOut"
                        >mdi-logout-variant</v-icon>
                </v-btn>
                <v-btn
                    class="mr-5"
                    v-else
                    icon>
                        <router-link v-if="'/login'==getCurrentUrl"   style="text-decoration: none" to="/Register">Registro</router-link>
                        <router-link v-else   style="text-decoration: none" to="/login">Login</router-link>
                </v-btn>

        </v-app-bar>
    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
    name: 'nav-bar',
    data() {
        return {
            login: false,
            email: '',
        }
    },
    methods: {
        logOut(){
            const auth = getAuth();
            signOut(auth).then(() => {
            // Sign-out successful.
                this.$router.push('/login')
            }).catch((error) => {
            // An error happened.
                console.log(error)
            });
        }
    },  
    computed: {
        getCurrentUrl(){
            return this.$route.path
        }
    },
    created() {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
            this.login = true
            this.email = user.email
        } else {
        // No user is signed in.
        }
    },
}
</script>

<style scoped>
    a{
        color: blue;
    }
</style>
