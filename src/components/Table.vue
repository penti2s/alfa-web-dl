<template>
    <div>
        <v-data-table :headers="headers" :items="this.class" sort-by="calories" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field v-model="editedItem.name" label="nombre"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field v-model="editedItem.image" label="imagen"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field v-model="editedItem.cupos" label="Cupos"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field v-model="editedItem.duracion" label="Duracion"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field v-model="editedItem.costo" label="Costo">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-textarea v-model="editedItem.descripcion" outlined name="input-7-4"
                                                label="Descripcion"></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Estas seguro de eliminar este curso?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Table-view',
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'Curso',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Cupos', value: 'cupos' },
                { text: 'Inscritos', value: 'inscritos' },
                { text: 'Duracion', value: 'duracion' },
                { text: 'Costo', value: 'costo' },
                { text: 'Fecha de registro', value: 'date' },
                { text: 'Terminado', value: 'actions', sortable: false },
            ],
            editedIndex: -1,
            editedItem: {
                id: '',
                name: '',
                image: '',
                cupos: '',
                duracion: '',
                costo: '',
                descripcion: '',
                date: ''
            },
            defaultItem: {
                id: '',
                name: '',
                image: '',
                cupos: '',
                duracion: '',
                costo: '',
                descripcion: '',
                date: ''
            },
        }
    },
    computed: {
        ...mapState(['class']),
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.fetchClass()
    },

    methods: {
        ...mapActions(['fetchClass', 'editClass', 'deleteClass']),
        editItem(item) {
            this.editedIndex = this.class.indexOf(item)
            this.editedItem = Object.assign({}, item)
            console.log(this.editedItem)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.class.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.class.splice(this.editedIndex, 1)
            this.deleteClass(this.editedItem)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.class[this.editedIndex], this.editedItem)
                this.editClass(this.editedItem)
            } else {
                this.class.push(this.editedItem)
            }
            this.close()
        },
    },
}

</script>

<style>
</style>