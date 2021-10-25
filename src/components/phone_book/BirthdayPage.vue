<template>
    <div class="phone_main">
        <div>
            <div class="phone_main__header">
                Отмечают день рождение:
                <img src="../../assets/party.png" class="emoji" alt="" /><img
                    src="../../assets/birthday-cake.png"
                    class="emoji"
                    alt=""
                />
            </div>
            <v-row>
                <v-col cols="3" v-for="(item, index) in today" :key="index">
                    <div class="phone_card elevation-1">
                        <img
                            :src="getSrc(item.PIC)"
                            :alt="item.FIRST_NAME"
                            class="phone_card__img"
                        />
                        <div class="phone_card__info">
                            <div class="info_name">
                                {{
                                    item.FAMILY +
                                    " " +
                                    item.FIRST_NAME +
                                    " " +
                                    item.PATRONYMIC
                                }}
                            </div>
                            <div class="info_dep">
                                {{ getEntsName(item.DEPARTMENT_CODE) }}
                            </div>
                            <div class="info_post">
                                {{ getPostName(item.POST_CODE) }}
                            </div>
                            <div class="info_phone">
                                Тел.:
                                <span class="info_phone__inner">{{
                                    item.EXT
                                }}</span>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
        <div>
            <div class="phone_main__header">
                Завтра:
                <img src="../../assets/confetti.png" class="emoji" alt="" /><img
                    src="../../assets/gift.png"
                    class="emoji"
                    alt=""
                />
            </div>
            <v-row>
                <v-col cols="3" v-for="(item, index) in tomorrow" :key="index">
                    <div class="phone_card elevation-1">
                        <img
                            :src="getSrc(item.PIC)"
                            :alt="item.FIRST_NAME"
                            class="phone_card__img"
                        />
                        <div class="phone_card__info">
                            <div class="info_name">
                                {{
                                    item.FAMILY +
                                    " " +
                                    item.FIRST_NAME +
                                    " " +
                                    item.PATRONYMIC
                                }}
                            </div>
                            <div class="info_dep">
                                {{ getEntsName(item.DEPARTMENT_CODE) }}
                            </div>
                            <div class="info_post">
                                {{ getPostName(item.POST_CODE) }}
                            </div>
                            <div class="info_phone">
                                Тел.:
                                <span class="info_phone__inner">{{
                                    item.EXT
                                }}</span>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "BirthdayPage",
    components: {},
    data: () => ({
        show: true,
        branches: [],
        regions: [],
        entities: [],
        today: [],
        tomorrow: [],
        posts: [],
    }),
    created: function () {
        this.getPosts();
        this.getEnts();
        this.getBirthdays();
    },
    methods: {
        getSrc(id){
            return "http://10.10.12.50/ubsp_test/avatar.php?uid=" + id
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
        getBirthdays() {
            axios.get("/birthday").then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.today = response.data.today;
                    this.tomorrow = response.data.tomorrow;
                }
            });
        },
        getPosts() {
            axios.get("/posts").then((response) => {
                this.posts = response.data;
            });
        },
        getEnts() {
            axios.get("/entities-full").then((response) => {
                this.entities = response.data;
                console.log(this.entities);
            });
        },
        getPostName(id) {
            return this.posts.length > 0 && id
                ? this.posts.filter((item) => item.ID == id)[0]["NAME"]
                : "";
        },
        getEntsName(id) {
            if (this.entities.length > 0 && id) {
                let item = this.entities.filter((item) => item.ID == id);
                console.log(item, id);
                return item.length ? item[0]["NAME"] : "";
            }
            return "";
        },
    },
    computed: {},
};
</script>

<style lang="scss">
</style>