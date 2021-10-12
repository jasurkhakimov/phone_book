<template>
    <v-row>
        <v-col cols="3">
            <main-page-layout></main-page-layout>
        </v-col>
        <v-col>
            <div v-if="!data.length">
                <v-btn
                    color="primary"
                    class="white--text"
                    :to="{
                        name: 'phone-birthday',
                    }"
                >
                    Обновить
                    <v-icon small class="ml-2"> mdi-reload </v-icon>
                </v-btn>
            </div>
            <div v-else>
                <div v-for="(dep, index) in data" :key="index">
                    <div class="phone_main__header">
                        {{ dep.NAME }} (кол-во сотрудников - &nbsp;
                        <span class="primary--text ml-1">
                            {{
                                employees.filter(
                                    (item) => item.DEPARTMENT_CODE == dep.ID
                                ).length
                            }} </span
                        >)
                    </div>
                    <div class="cs_header" v-if="index == 0">
                        <v-row>
                            <v-col class="cs_header__heading"> Фото </v-col>
                            <v-col class="cs_header__heading" cols="5">
                                ФИО
                            </v-col>
                            <v-col class="cs_header__heading" cols="3">
                                Должность
                            </v-col>
                            <v-col class="cs_header__heading" cols="2">
                                Контакты
                            </v-col>
                            <v-col class="cs_header__heading"> Статус </v-col>
                        </v-row>
                    </div>
                    <router-link
                        v-for="(emp, index) in employees.filter(
                            (item) => item.DEPARTMENT_CODE == dep.ID
                        )"
                        :key="index"
                        class="cs_row_card"
                        :to="{ name: 'phone-emp', params: { id: emp._id } }"
                    >
                        <v-row no-gutters class="ma-0">
                            <v-col class="cs_row_card__item">
                                <img
                                    src="../../assets/bg-login-img2.jpg"
                                    alt=""
                                    class="item_img"
                                />
                            </v-col>
                            <v-col class="cs_row_card__item" cols="5">
                                <div class="item_name">
                                    {{
                                        emp.FAMILY +
                                        " " +
                                        emp.FIRST_NAME +
                                        " " +
                                        (emp.PATRONYMIC ? emp.PATRONYMIC : "")
                                    }}
                                </div>
                            </v-col>
                            <v-col class="cs_row_card__item" cols="3">{{
                                getPostName(emp.POST_CODE)
                            }}</v-col>
                            <v-col
                                class="cs_row_card__item primary--text"
                                cols="2"
                                >13-27</v-col
                            >
                            <v-col class="cs_row_card__item">
                                <span
                                    class="success--text"
                                    v-if="emp.STATUS_CODE == 2"
                                >
                                    Активный
                                </span>
                            </v-col>
                        </v-row>
                    </router-link>
                    <div
                        v-if="
                            employees.filter(
                                (item) => item.DEPARTMENT_CODE == dep.ID
                            ).length == 0
                        "
                        class="cs_row_card"
                    >
                        <v-row no-gutters class="ma-0">
                            <v-col class="cs_row_card__item">
                                Нет сотрудников
                            </v-col>
                        </v-row>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import axios from "axios";
import { Base64 } from "js-base64";
import MainPageLayout from "./layout/MainPageLayout.vue";

export default {
    name: "DepPage",
    components: {
        MainPageLayout,
    },
    data: () => ({
        show: true,
        branches: [],
        regions: [],
        entities: [],
        dep: {},
        employees: [],
        data: [],
        deps_id: [],
        posts: [],
    }),
    created: function () {
        this.getData();
    },
    watch: {
        $route(from, to) {
            if (to !== from) {
                this.getData();
                this.scrollToTop();
            }
        },
    },
    methods: {
        getPostName(id) {
            return this.posts.length > 0 && id
                ? this.posts.filter((item) => item.ID == id)[0]["NAME"]
                : "";
        },
        getData() {
            console.log("I am here.......");
            axios.get("/entities").then((response) => {
                console.log("I am here....... entities");
                this.entities = response.data;
                axios.get("/posts").then((response) => {
                    console.log("I am here....... posts");
                    this.posts = response.data;

                    this.getDepsId();

                    let data = {
                        ID: 1,
                        FIRST_NAME: 1,
                        FAMILY: 1,
                        PATRONYMIC: 1,
                        STATUS_CODE: 1,
                        POST_CODE: 1,
                        DEPARTMENT_CODE: 1,
                    };

                    let params = Base64.encode(
                        JSON.stringify({
                            query: {
                                DEPARTMENT_CODE: { $in: this.deps_id },
                                STATUS_CODE: { $ne: 4 },
                                BRANCH: this.$route.params.mfo,
                            },
                            body: data,
                        })
                    );

                    axios
                        .get("/personal", { params: { data: params } })
                        .then((response) => {
                            this.employees = response.data;
                        });
                });
            });
        },
        getDepsId() {
            this.deps_id = this.$store.getters
                .findChild(this.entities, this.$route.params.id)
                .flat(5);

            this.deps_id.unshift(this.$route.params.id);

            this.data = this.entities.filter((item) =>
                this.deps_id.includes(item.ID)
            );
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
    },
    computed: {},
};
</script>

<style lang="scss" scoped>
.cs_header {
    padding: 0 16px;
    &__heading {
        display: flex;
        justify-content: center;
        font-family: Roboto;
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        color: #4f5d73;
    }
    margin-bottom: 12px;
}

.v-application a {
    color: inherit !important;
}

.cs_row_card {
    display: block;
    margin-bottom: 8px;
    padding: 8px 12px;
    background-color: #fff;
    transition: 0.2s;

    &:hover {
        background-color: #e8f5e9;
    }

    -webkit-box-shadow: 0px 15px 30px -5px rgba(0, 0, 0, 0.11);
    box-shadow: 0px 15px 30px -5px rgba(0, 0, 0, 0.11);
    border-radius: 5px;
    &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        & .item_img {
            height: 55px;
        }
    }
}
</style>