<template>
    <div>
        <div class="user_navigation elevation-2">
            <div class="logo">
                <router-link :to="{ name: 'main' }">
                    <img
                        :src="require('../../assets/logo_ru.png')"
                        width="200"
                    />
                </router-link>
            </div>
            <div class="links">
                <!-- <router-link class="link" :to="{ name: 'deps' }">
                    Телефонный справочник
                </router-link> -->
            </div>
            <v-spacer></v-spacer>
            <v-row>
                <v-col cols="" class="d-flex align-center ml-6">
                    <slot name="search"></slot>
                </v-col>
            </v-row>
        </div>
        <v-container>
            <div class="main_page pa-5">
                <div class="block_title">Внутренние сервисы</div>
                <div class="main_navbar">
                    <div
                        class="tile_block"
                        v-for="(item, index) in tiles"
                        :key="index"
                    >
                        <div
                            :class="[item.color, 'tile_card pa-6 elevation-1']"
                            v-ripple
                        >
                            <v-icon x-large>{{ "mdi-" + item.icon }}</v-icon>
                        </div>
                        <div class="tile_title">{{ item.title }}</div>
                    </div>
                </div>

                <div class="news_block">
                    <div class="block_title">Новости</div>
                    <v-row>
                        <v-col
                            cols="2"
                            v-for="(item, index) in news"
                            :key="index"
                        >
                            <div class="news_card elevation-1" v-ripple>
                                <img
                                    class="news_img"
                                    src="../../assets/img_placeholder.jpg"
                                    alt=""
                                />
                                <div class="news_title">
                                    {{ item.title }}
                                </div>
                                <div class="news_subtitle">
                                    <div class="news_date">19.10.2021 г.</div>
                                    <div class="news_time">10:45</div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",

    data: () => ({
        tiles: [
            {
                title: "Персональный кабинет",
                icon: "account",
                color: "indigo lighten-4",
                link: "",
            },
            {
                title: "Телефонный справочник",
                icon: "deskphone",
                color: "teal lighten-4",
                link: "",
            },
            {
                title: "Планировщик",
                icon: "format-list-checks",
                color: "blue lighten-4",
                link: "",
            },
            {
                title: "ELMA",
                icon: "file-document-multiple",
                color: "orange lighten-4",
                link: "",
            },
            {
                title: "Чат",
                icon: "message-text",
                color: "purple lighten-4",
                link: "",
            },

            {
                title: "Защита прав сотрудников",
                icon: "shield-account",
                color: "brown lighten-4",
                link: "",
            },
            {
                title: "Обучающие ресурсы",
                icon: "school",
                color: "deep-orange lighten-4",
                link: "",
            },
            {
                title: "Справки",
                icon: "text-box-search",
                color: "light-blue lighten-4",
                link: "",
            },
            {
                title: "О банке",
                icon: "bank",
                color: "green lighten-4",
                link: "",
            },
        ],
        news: [
            {
                title: "Новость супер пупер важная, прочитайте срочно!",
                img: "",
                link: "",
            },
            {
                title: "Новость супер пупер важная, прочитайте срочно!",
                img: "",
                link: "",
            },
            {
                title: "Новость супер пупер важная, прочитайте срочно!",
                img: "",
                link: "",
            },
            {
                title: "Новость супер пупер важная, прочитайте срочно!",
                img: "",
                link: "",
            },
            {
                title: "Новость супер пупер важная, прочитайте срочно!",
                img: "",
                link: "",
            },
        ],
    }),
};
</script>

<style lang="scss" scoped>
.main_navbar {
    display: flex;
    align-items: flex-start;
    gap: 30px;
}

.tile_block {
    display: flex;
    flex-direction: column;
    width: 100px;
    align-items: center;
    justify-content: center;
}

.tile_card {
    width: 100px;
    height: 100px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    transition: 0.2s;
    cursor: pointer;
    flex-direction: column;

    &:hover {
        background-color: #b2dfdb;

        .theme--light.v-icon {
            color: #000;
        }
    }
}

.tile_title {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    margin-top: 6px;
    user-select: none;
}

.news_block {
    // display: flex;
    margin-top: 28px;
    // flex-wrap: wrap;
    // gap: 30px;
}
.block_title {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 15px;
}

.news_card {
    cursor: pointer;
    // width: 375px;
    max-height: 500px;
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid #eee;

    &:hover {
        .news_title {
            color: #1b5e20;
        }
    }
}

.news_img {
    object-fit: cover;
    width: 100%;
    height: 180px;
    display: block;
}

.news_title {
    font-size: 20px;
    font-weight: 600;
    padding: 12px 16px;
    line-height: 25px;
    transition: 0.2s;
    letter-spacing: 0.01px;
    min-height: 50px;
}

.news_subtitle {
    display: flex;
    padding: 12px 16px;
    font-size: 12px;
    font-weight: 500;
    color: grey;
    user-select: none;

    & .news_date {
        margin-right: 10px;
    }
}

.user_navigation {
    // height: 56px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 24px;
    max-height: 75px;

    & .logo {
        width: 200px;
    }

    & .links {
        display: flex;
        margin-left: 24px;
        & .link {
            // background-color: red;
            margin-left: 10px;
            padding: 12px;
            color: #4f5d73;
            font-size: 16px;
            font-weight: 700;
            overflow: hidden;
            transition: all 400ms;
            border-radius: 3px;

            &:hover {
                background-color: rgba(134, 134, 134, 0.11);
            }
        }
    }

    & .settings {
        margin-left: auto;
        display: flex;

        & .setting-link {
            display: flex;
            align-items: center;
            margin-left: 4px;
            padding: 12px;
            color: #4f5d73;
            font-size: 16px;
            font-weight: 700;
            overflow: hidden;
            transition: all 400ms;
            border-radius: 3px;

            &:hover {
                background-color: rgba(134, 134, 134, 0.11);
            }
        }
    }
}
</style>