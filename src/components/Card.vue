<template>
    <div class="d-flex flex-wrap flex-row  justify-center " >
        <div class="mx-5 my-10" v-for="(curso, index) in data" :key="index">
            <v-card width="400">
                <v-img height="200px" :src="curso.image">
                    <v-app-bar flat color="rgba(0, 0, 0, 0)">
                        <v-spacer></v-spacer>
                    </v-app-bar>
                </v-img>

                <v-card-text>
                    <h3 class="ma-4">{{ curso.name }}</h3>
                    <div class="font-weight-bold ml-8 mb-2">
                        Informacion
                    </div>

                    <v-timeline align-top dense>
                        <v-timeline-item small>
                            <div>
                                Costo : {{ curso.costo }}
                            </div>                            
                            <div>
                                Duracion : {{ curso.duracion }}
                            </div>
                        </v-timeline-item>
                    </v-timeline>

                    <v-timeline align-top dense>
                        <v-timeline-item small>
                            <div>
                                Cupos : {{ curso.cupos }}
                            </div>
                            <div>
                                Completados: {{ curso.cupos - curso.inscritos > 0 ? 'Disponibles' : 'Completado' }}
                            </div>
                        </v-timeline-item>
                    </v-timeline>

                    <v-timeline align-top dense>
                        <v-timeline-item small>
                            <div>
                                Fecha de registro : {{ curso.date }}
                            </div>
                        </v-timeline-item>
                    </v-timeline>

                    <v-timeline align-top dense>
                        <v-timeline-item small>
                            <div>
                                Descripcion : {{ curso.descripcion }}
                            </div>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card-list',
    data: () => ({
        messages: [
            {
                from: 'You',
                message: `Sure, I'll see you later.`,
                time: '10:42am',
                color: 'deep-purple lighten-1',
            },
            {
                from: 'John Doe',
                message: 'Yeah, sure. Does 1:00pm work?',
                time: '10:37am',
                color: 'green',
            },
            {
                from: 'You',
                message: 'Did you still want to grab lunch today?',
                time: '9:47am',
                color: 'deep-purple lighten-1',
            },
        ],
    }),
    props: {
        tittle: String,
        data: Array
    },
    computed: {

    }
}
</script>

<style>
</style>