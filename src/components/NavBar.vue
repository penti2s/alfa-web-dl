<template>
    <div>
        <v-app-bar color="deep-purple accent-4" dense dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Alfa Web</v-toolbar-title>

            <v-spacer></v-spacer>


            <v-toolbar-title>{{ email }}</v-toolbar-title>

            <v-btn icon>
                <v-icon
                    v-if="login"
                    @click="logOut"
                >mdi-logout-variant</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
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
    created() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
            console.log("User is signed in");
            console.log(user)
            this.login = true
            this.email = user.email
        } else {
        // No user is signed in.
        }
    },
}
</script>

<style>
</style>