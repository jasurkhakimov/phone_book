<template>
    <div class="phone_main">
        <div class="p_relative">
            <div class="phone_main__block full_height elevation-1">
                <v-list dense>
                    <v-overlay
                        :absolute="true"
                        :value="ents.length > 0 ? false : true"
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
                            @click="br(branch.MFO)"
                        >
                            <template v-slot:activator>
                                <v-list-item-content
                                    :title="branch.NAME + '-' + branch.MFO"
                                >
                                    <v-list-item-title class="primary--text">
                                        ({{ branch.MFO }})
                                        {{ spliceBranchName(branch.NAME) }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item
                                v-for="(ent, index) in branchEnts"
                                :key="index"
                                @click="
                                    $emit('getNestedEntities', {
                                        ...ent,
                                        BRANCH: branch.MFO,
                                    })
                                "
                            >
                                <v-list-item-title>
                                    {{ ent.NAME }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list-group>
                    </v-list-item-group>
                </v-list>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "MainPage",
    components: {},
    data: () => ({
        branches: [],
        ents: [],
        branchEnts: [],
    }),
    created: function () {
        this.getBranches();
        this.getEnts();
    },
    methods: {
        br(branch) {
            this.branchEnts = this.ents
                .filter((item) => {
                    return item.mfo.includes(branch);
                })
                .sort(this.compare);
        },
        getBranches() {
            axios.get("/branches").then((response) => {
                this.branches = response.data.filter((item) => {
                    if (item.STATUS == 1) {
                        return item;
                    }
                });
            });
        },
        getEnts() {
            axios.get("/ents").then((response) => {
                this.ents = response.data.map((item) => {
                    return {
                        ID: item.ID,
                        NAME: item.NAME,
                        mfo: this.getUnique(item.PER),
                    };
                });
            });
        },
        getUnique(arr) {
            return [...new Set(arr.map((item) => item.BRANCH))];
        },
        spliceBranchName(name) {
            name = name.split(" ");
            name.splice(2, 4);
            return name.join(" ");
        },
        compare(a, b) {
            if (a.ID < b.ID) {
                return -1;
            }
            if (a.ID > b.ID) {
                return 1;
            }
            return 0;
        },
    },
    computed: {},
};
</script>

<style lang="scss">
</style>