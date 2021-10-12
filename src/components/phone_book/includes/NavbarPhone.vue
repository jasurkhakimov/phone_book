<template>
    <div class="navbar-user">
        <div class="logo">
            <router-link :to="{ name: 'birthday' }">
                <img :src="require('../../../assets/logo_ru.png')" width="200" />
            </router-link>
        </div>
        <div class="links">
            <router-link class="link" :to="{ name: 'birthday' }">
                Телефонный справочник
            </router-link>
        </div>
        <v-spacer></v-spacer>
        <v-row>
            <v-col cols="" class="d-flex align-center ml-6">
                <slot name="search"></slot>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "NavBarPhone",
    props: {},
    mounted() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.navbar-user {
    // height: 56px;
    background-color: #fff;
    display: flex;
    align-items: center;
    -webkit-box-shadow: 0px 15px 30px -5px rgba(0, 0, 0, 0.11);
    box-shadow: 0px 15px 30px -5px rgba(0, 0, 0, 0.11);
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