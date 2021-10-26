<template>
    <div>
        <div>
            <div class="cs_card" v-if="Object.keys(emp).length">
                <v-row class="ma-0">
                    <v-col class="cs_card__item" cols="1">
                        <img
                            :src="getSrc(emp.PIC)"
                            alt=""
                            class="item_img"
                        />
                    </v-col>
                    <v-col class="cs_card__item column">
                        <div class="item_name">
                            {{
                                emp.FAMILY +
                                " " +
                                emp.FIRST_NAME +
                                " " +
                                emp.PATRONYMIC
                            }}
                        </div>
                        <div class="item_point">
                            {{ getEntsName(emp.DEPARTMENT_CODE) != '.' ? getEntsName(emp.DEPARTMENT_CODE)  : 'Руководство'  }}
                        </div>
                        <div class="item_point">
                            {{ getPostName(emp.POST_CODE) }}
                        </div>
                        <div class="item_point">
                            Телефон:
                            <span class="primary--text item_phone">
                                {{ emp.EXT }}
                            </span>
                        </div>
                        <div class="item_point">
                            <!-- Дата рождения: {{ $store.getters.parseDate(emp.BIRTHDAY) }} -->
                        </div>
                        <div class="item_point">
                            Статус:
                            <span
                                v-if="emp.STATUS_CODE == 2"
                                class="success--text"
                            >
                                Работает
                            </span>
                            <span
                                v-if="emp.STATUS_CODE == 4"
                                class="error--text"
                            >
                                Уволен
                            </span>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                Нет данных по этому сотруднику
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
// import { Base64 } from "js-base64";

export default {
    name: "DepPage",
    components: {},
    data: () => ({
        show: true,
        branches: [],
        regions: [],
        entities: [],
        dep: "",
        emp: {},
        data: [],
        deps_id: [],
        posts: [],
    }),
    created() {
        this.getPosts();
        this.getEnts();
        this.getData();
    },
    watch: {
        $route() {
            this.getData();
        },
    },
    methods: {
        getPosts() {
            axios.get("/posts").then((response) => {
                this.posts = response.data;
            });
        },
        getEnts() {
            axios.get("/entities-full").then((response) => {
                this.entities = response.data;
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
                return item.length ? item[0]["NAME"] : "";
            }
            return "";
        },
        getSrc(id) {
            return `http://10.10.12.50/ubsp_test/index.php?module=Phones&file=index_phone&prefix=phones_profile&act=img&uids=${id}&rand=204`
        },
        getData() {
            console.log(this.$route.params.id);
            axios
                .get("/personal", {
                    params: {
                        _id: this.$route.params.id,
                    },
                })
                .then((response) => {
                    
                    if (response.data.length === 1) {
                        this.emp = response.data[0];
                    }
                });
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

.cs_card {
    margin-bottom: 8px;
    padding: 12px;
    background-color: #fff;
    -webkit-box-shadow: 0px 15px 30px -5px rgba(0, 0, 0, 0.11);
    box-shadow: 0px 15px 30px -5px rgba(0, 0, 0, 0.11);
    border-radius: 5px;
    &__item {
        display: flex;
        align-items: center;

        &.column {
            align-items: start;
            flex-direction: column;
            & .item_point {
                margin-bottom: 12px;
            }
        }

        & .item_img {
            width: 100%;
            // height: 115px;
        }

        & .item_phone {
            text-decoration: underline;
        }

        & .item_name {
            font-weight: bold;
            font-size: 28px;
            margin-bottom: 12px;
        }
    }
}
</style>