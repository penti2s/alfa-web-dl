<template>
    <v-main>
        <div class="d-flex justify-center align-center">
            <h2 class="text-center text-h3">Administracion</h2>
            <v-btn @click="overlay = !overlay" depressed color="primary">
                Crear Curso
            </v-btn>

            <v-dialog :z-index="zIndex" :value="overlay" opacity="0">
                <v-card elevation="2" class="py-10">
                    <v-form class="mx-15" ref="form" v-model="valid" lazy-validation>
                        <p class="text-h5 my-12">Agregando Curso</p>
                        <v-text-field v-model="form.name" :counter="30" :rules="nameRules" label="Nombre del curso"
                            required>
                        </v-text-field>

                        <v-text-field v-model="form.image" :counter="10000" :rules="imageRules" label="URL de la imagen"
                            required></v-text-field>

                        <v-text-field v-model="form.cupos" :counter="15" :rules="cuposRules" label="Cupos del curso"
                            required></v-text-field>

                        <v-text-field v-model="form.inscritos" :counter="15" :rules="inscritosRules"
                            label="Inscritos en el curso" required></v-text-field>

                        <v-text-field v-model="form.duracion" :counter="15" :rules="duracionRules"
                            label="Duracion del curso" required></v-text-field>

                        <v-text-field v-model="form.codigo" :counter="15" :rules="codigoRules"
                            label="Codigo del curso" required></v-text-field>



                        <v-text-field v-model="form.costo" :counter="15" :rules="costoRules" label="Costo del curso"
                            required></v-text-field>



                        <v-textarea v-model="form.descripcion" :rules="descripcionRules" outlined name="input-7-4"
                            label="Descripcion" required></v-textarea>



                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="createClass()">
                            Crear Clase
                        </v-btn>

                        <v-btn class="white--text" color="error" @click="overlay = false">
                            Cancelar
                        </v-btn>
                    </v-form>
                </v-card>
            </v-dialog>
        </div>
        <Table ></Table>
    </v-main>
</template>

<script>
import Table from '@/components/Table.vue'
import { db } from '@/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { mapActions } from 'vuex';
export default {
    name: 'Admin-view',
    components: {
        Table
    },
    data() {
        return {
            overlay: false,
            zIndex: 0,
            valid: false,
            form: {
                name: '',
                image: '',
                cupos: '',
                inscritos: '',
                duracion: '',
                date: '',
                costo: '',
                descripcion: '',
                codigo: '',
            },
            menu: '',
            nameRules: [
                v => !!v || 'Nombre es requerido',
                v => (v && v.length <= 30) || 'Nombre tiene que tener menos de 10 caracteres',
            ],
            imageRules: [
                v => !!v || 'Imagen es requerida',
                v => (v && v.length <= 10000) || 'Imagen tiene que tener menos de 100 caracteres',
            ],
            cuposRules: [
                v => !!v || 'Cupos es requerido',
            ],
            inscritosRules: [
                v => !!v || 'Inscritos es requerido',
            ],
            costoRules: [
                v => !!v || 'Costo es requerido',
            ],
            descripcionRules: [
                v => !!v || 'Descripcion es requerida',
            ],
            duracionRules: [
                v => !!v || 'Duracion es requerida',
            ],
            codigoRules: [
                v => !!v || 'Codigo es requerido',
            ],
        }
    },
    methods: {
        ...mapActions(['fetchClass']),
        async createClass() {
            this.$refs.form.validate()
            var today = new Date();
            var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+ today.getFullYear();
            this.form.date = date
            if (!this.valid) return //no es valido y funcion se cierra

            try {
                await addDoc(collection(db, 'class'), this.form)
                this.fetchClass()
                this.overlay = false
                this.form = {
                    name: '',
                    image: '',
                    cupos: '',
                    inscritos: '',
                    duracion: '',
                    date: '',
                    costo: '',
                    descripcion: '',
                    codigo: '',
                }
            }catch (error) {
                console.log(error)
            }
        },
    },
}
</script>

<style>
</style>