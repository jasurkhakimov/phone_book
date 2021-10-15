<template>
    <div class="wrapper_user">
        <NavbarPhone>
            <template v-slot:search>
                <!-- <v-autocomplete
                    v-model="model"
                    :items="items"
                    :loading="isLoading"
                    :search-input.sync="search"
                    hide-no-data
                    hide-selected
                    hide-details
                    item-text=""
                    item-value="FIRST_NAME"
                    placeholder="Поиск"
                    return-object
                    outlined
                    dense
                >
                    <template v-slot:item="{ item }">
                        <v-list-item-avatar
                            color="indigo"
                            class="headline font-weight-light white--text"
                        >
                            {{ item._source.FAMILY.charAt(0) }}
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item._source.FIRST_NAME }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                </v-autocomplete>
                <v-btn @click="search">
                    search
                </v-btn> -->
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="search_text"
                            @keypress="search_method(search_text)"
                            @focus="(items = []), (search_text = null)"
                            label="Поиск по сотруднику"
                            v-bind="attrs"
                            v-on="on"
                            hide-details
                            dense
                            outlined
                            type="text"
                            clearable
                            class="white"
                            autocomplete="_username___"
                        ></v-text-field>
                    </template>
                    <div class="search_list">
                        <v-list>
                            <div v-if="!items.length">
                                <v-list-item>
                                    Введите Ф.И.О сотрудника
                                </v-list-item>
                            </div>
                            <v-subheader v-else
                                >Найдено: {{ items.length }}</v-subheader
                            >
                            <v-list-item
                                v-for="(item, index) in items"
                                :key="index"
                                :to="{
                                    name: 'phone-emp',
                                    params: { id: item._id },
                                }"
                            >
                                <v-list-item-avatar
                                    color="indigo"
                                    class="
                                        headline
                                        font-weight-light
                                        white--text
                                    "
                                >
                                    {{ item._source.FAMILY.charAt(0) }}
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{
                                        item._source.FAMILY +
                                        " " +
                                        item._source.FIRST_NAME +
                                        " " +
                                        item._source.PATRONYMIC
                                    }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-menu>
            </template>
        </NavbarPhone>
        <div class="main_user_container p-24">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
            <!-- <router-view></router-view> -->
        </div>
    </div>
</template>

<script>
import NavbarPhone from "../includes/NavbarPhone.vue";
import axios from "axios";

export default {
    name: "PhoneBookLayout",
    components: {
        NavbarPhone,
    },
    data: () => ({
        show: true,
        search_text: null,
        items: [],
    }),
    methods: {
        search_method(val) {
            this.isLoading = true;

            if (val && val.length > 2) {
                axios
                    .get("/search", {
                        params: {
                            q: val,
                            size: 10,
                            space: "all",
                        },
                    })
                    .then((response) => {
                        this.items = response.data.hits.hits;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => (this.isLoading = false));
            }
        },
    },
    computed: {},
};
</script>

<style lang="scss">
html {
    overflow: scroll;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}

.main_user_container {
    // padding-top: 20px;
    min-height: 90vh;
    background-color: #f5f5f5;
    & .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }

    & .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    &.p-24 {
        padding: 24px;
    }

    .phone_main {
        .p_relative {
            position: relative;
        }

        .full_height {
            position: sticky;
            top: 24px;
        }

        .p-24 {
            padding: 24px;
        }

        &__block {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            padding: 0;
            border-radius: 6px;
            max-height: 90vh;
            overflow: auto;
            // border: 0.5px solid #dadada;
            // margin: 12px;
        }

        &__header {
            font-weight: 500;
            font-size: 18px;
            line-height: 28px;
            margin: 16px;
            color: #686868;
            display: flex;
            align-items: center;
            & .emoji {
                display: block;
                width: 36px;
                margin-left: 15px;
            }
        }

        & .phone_card {
            display: flex;
            background-color: #fff;
            padding: 24px;
            border-radius: 6px;
            transition: 0.4s;
            // border: 0.5px solid #dadada;
            // -webkit-box-shadow: 0px 15px 30px -5px rgba(0, 0, 0, 0.11);
            // box-shadow: 0px 15px 30px -5px rgba(0, 0, 0, 0.11);

            &__img {
                width: 85px;
                height: 100%;
            }

            &__info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 15px;
                font-size: 16px;
                color: #686868;
                margin-bottom: 8px;

                &:nth-last-child(-n + 1) {
                    margin-bottom: 0;
                }

                & .info_name {
                    font-weight: 500;
                    font-size: 18px;
                    color: #4f5d73;
                }

                & .info_phone {
                    color: #4f5d73;

                    &__inner {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
</style>