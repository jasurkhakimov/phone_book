<template>
    <div class="phone_main">
        <v-row>
            <v-col cols="3" class="p_relative">
                <div class="phone_main__block full_height elevation-1">
                    <v-list dense>
                        <v-overlay
                            :absolute="true"
                            :value="entities.length > 0 ? false : true"
                        >
                            <v-progress-circular
                                indeterminate
                                size="32"
                            ></v-progress-circular>
                        </v-overlay>
                        <v-list-item-group>
                            <v-list-group
                                no-action
                                v-for="(branch, index) in branches"
                                :key="index"
                            >
                                <template v-slot:activator>
                                    <v-list-item-content
                                        :title="branch.NAME + '-' + branch.MFO"
                                    >
                                        <v-list-item-title
                                            class="primary--text"
                                        >
                                            {{ branch.NAME }} - {{ branch.MFO }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                
                            </v-list-group>
                        </v-list-item-group>
                    </v-list>
                </div>
            </v-col>
            <v-col>
                <router-view class="view"></router-view>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "MainPage",
    components: {},
    data: () => ({
        show: true,
        branches: [],
        regions: [],
        entities: [],
    }),
    created: function () {
        this.getBranches();
        this.getEntities();
    },
    methods: {
        getBranches() {
            axios.get("/branches").then((response) => {
                this.branches = response.data.filter((item) => {
                    if (item.STATUS == 1) {
                        return item;
                    }
                });
            });
        },
        getEntities() {
            axios
                .get("/phone_structure", {
                    params: {},
                })
                .then((response) => {
                    // console.log(typeof JSON.parse(response.data));
                    this.entities = response.data;
                    // this.entities = response.data.filter((item) => {
                        
                    //     if (item.PARENTCODE == 0) {
                    //         console.log(item.PARENTCODE);
                    //     return item;
                    //     }
                    // });
                });
        },
    },
    computed: {},
};
</script>

<style lang="scss">
</style>