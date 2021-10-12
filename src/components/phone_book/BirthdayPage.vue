<template>
    <div>
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
                <v-col cols="4" v-for="(index, item) in 3" :key="index">
                    <div class="phone_card elevation-1">
                        <img
                            src="../../assets/bg-login-img2.jpg"
                            :alt="item"
                            class="phone_card__img"
                        />
                        <div class="phone_card__info">
                            <div class="info_name">Big Russian Boss</div>
                            <div class="info_dep">Department of bosses</div>
                            <div class="info_post">Boss</div>
                            <div class="info_phone">
                                Тел.:
                                <span class="info_phone__inner">13-10</span> /
                                (71) 148-00-00
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
                <v-col cols="4" v-for="(index, item) in 3" :key="index">
                    <div class="phone_card elevation-1">
                        <img
                            src="../../assets/bg-login-img2.jpg"
                            :alt="item"
                            class="phone_card__img"
                        />
                        <div class="phone_card__info">
                            <div class="info_name">Big Russian Boss</div>
                            <div class="info_dep">Department of bosses</div>
                            <div class="info_post">Boss</div>
                            <div class="info_phone">
                                Тел.:
                                <span class="info_phone__inner">13-10</span> /
                                (71) 148-00-00
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
    }),
    created: function () {
        this.getBranches();
        this.getEntities();
        // console.log(this.entities);
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
            // axios
            //     .get("/phone_structure")
            //     .then((response) => {
            //         console.log("here",response.data);
            //         // this.entities = response.data.filter((item) => {
            //         //     if (item.PARENTCODE == null) {
            //         //         return item;
            //         //     }
            //         // });
            //         // console.log(this.entities);
            //     });
        },
    },
    computed: {},
};
</script>

<style lang="scss">
</style>