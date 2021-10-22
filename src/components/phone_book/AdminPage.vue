<template>
  <v-row>
    <v-col cols="3">
      <branches-block
        class="p_fixed"
        @getNestedEntities="getNestedEntities"
      ></branches-block>
    </v-col>
    <v-col class="phone_book_content">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <div>
        <div
          v-for="(dep, index) in data"
          :key="index"
          v-show="getEmpCount(dep)"
        >
          <div class="phone_main__header">
            {{ dep.NAME }} (кол-во сотрудников -
            <span class="primary--text ml-1"> {{ getEmpCount(dep) }} </span>)
            <v-spacer />
            <v-switch v-model="edit" label="Редактировать"></v-switch>
          </div>
          <div class="cs_header" v-if="index == 0">
            <v-row>
              <v-col class="cs_header__heading"> Фото </v-col>
              <v-col class="cs_header__heading" cols="5"> ФИО </v-col>
              <v-col class="cs_header__heading" cols="3"> Должность </v-col>
              <v-col class="cs_header__heading" cols="2"> Контакты </v-col>
              <v-col class="cs_header__heading"> Статус </v-col>
            </v-row>
          </div>
          <div
            v-for="(emp, index) in employees.filter(
              (item) => item.DEPARTMENT_CODE == dep.ID
            )"
            :key="index"
            class="cs_row_card elevation-1"
          >
            <!-- :to="{ name: 'phone-emp', params: { id: emp._id } }" -->
            <v-row no-gutters class="ma-0">
              <v-col class="cs_row_card__item">
                <img
                  src="http://10.10.12.50/ubsp_test/avatar.php?uid=714"
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
                @click="editDialog(emp)"
                >{{ emp.EXT }}</v-col
              >
              <v-col class="cs_row_card__item text-center">
                <span class="success--text" v-if="emp.STATUS_CODE == 2">
                  Работает
                </span>
                <span class="orange--text" v-if="emp.STATUS_CODE == 5">
                  Декретный отпуск
                </span>
              </v-col>
            </v-row>
          </div>
          <div
            v-if="
              employees.filter((item) => item.DEPARTMENT_CODE == dep.ID)
                .length == 0
            "
            class="cs_row_card"
          >
            <v-row no-gutters class="ma-0">
              <v-col class="cs_row_card__item"> Нет сотрудников </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-col>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5"> Редактирование записи </v-card-title>
        <v-card-text>
          <v-text-field
            label="Новый вн. номер телефона"
            required
            v-model="newExt.ext"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="updateExt()">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import BranchesBlock from "./includes/BranchesBlock.vue";

export default {
  name: "DepPage",
  components: {
    BranchesBlock,
  },
  data: () => ({
    overlay: false,
    show: true,
    edit: false,
    dialog: false,
    newExt: {
      ext: null,
      _id: null,
    },
    branches: [],
    regions: [],
    entities: [],
    dep: {},
    employees: [
      {
        _id: "id",
        ID: 1,
        FIRST_NAME: "Test",
        FAMILY: "Test",
        PATRONYMIC: "Test",
        STATUS_CODE: 1,
        POST_CODE: 1,
        DEPARTMENT_CODE: 819,
      },
    ],
    data: [],
    deps_id: [],
    posts: [],
  }),
  created: function () {
    this.getPosts();
    this.getNestedEntities({ ID: 1, NAME: ".", mfo: ["00444"] });
  },
  watch: {
    $route(from, to) {
      if (to !== from) {
        this.scrollToTop();
      }
    },
  },
  methods: {
    editDialog(emp) {
      if (this.edit == true) {
        this.newExt.ext = emp.EXT;
        this.newExt._id = emp._id;
        this.dialog = true;
      }
    },
    updateExt() {
      axios
        .post("/editExt", this.newExt)
        .then((response) => {
            if(response.status == 200){
                this.employees.forEach(emp => {
                    if(emp._id == this.newExt._id) {
                        emp.EXT = this.newExt.ext;
                        this.$forceUpdate();
                        this.newExt = {}
                        this.dialog = false
                    }
                })
            }
        });
    },
    getEmpCount(dep) {
      return this.employees.filter((item) => item.DEPARTMENT_CODE == dep.ID)
        .length;
    },
    getNestedEntities(item) {
      this.overlay = true;
      axios
        .get("/nestedEntities", {
          params: {
            ID: item.ID,
          },
        })
        .then((response) => {
          this.data = [item, ...response.data.flat(5)];
          this.entitiesIDs = this.data.map((item) => item.ID);

          axios
            .get("/personal", {
              params: {
                DEPARTMENT_CODE: {
                  $in: this.entitiesIDs,
                },
                BRANCH: item.BRANCH,
              },
            })
            .then((response) => {
              this.employees = response.data;
              console.log(this.employees);
            });

          console.log(this.data);
        })
        .finally(() => {
          this.scrollToTop();
          this.overlay = false;
        });
    },
    getPostName(id) {
      return this.posts.length > 0 && id
        ? this.posts.filter((item) => item.ID == id)[0]["NAME"]
        : "";
    },
    getPosts() {
      axios.get("/posts").then((response) => {
        this.posts = response.data;
      });
    },
    getDepsId() {
      this.deps_id = this.findChild(this.entities, this.$route.params.id).flat(
        5
      );

      this.deps_id.unshift(this.$route.params.id);

      this.data = this.entities.filter((item) =>
        this.deps_id.includes(item.ID)
      );
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    findChild: (items, ID = null, link = "PARENTCODE") => {
      let result = items.filter((item) => {
        return item[link] === ID;
      });
      result = result.map((item) => {
        return [item.ID, this.findChild(items, item.ID)];
      });
      return result;
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.p_fixed {
  position: sticky;
}

.phone_book_content {
  max-height: 100vh;
  overflow-y: scroll;
}

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

.pos-relative {
  position: relative;
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

  // -webkit-box-shadow: 0px 15px 30px -5px rgba(0, 0, 0, 0.11);
  // box-shadow: 0px 15px 30px -5px rgba(0, 0, 0, 0.11);
  border-radius: 5px;
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    & .item_img {
      height: 44px;
      transition: 0.2s;

      &:hover {
        transform: scale(2.5);
      }
    }
  }
}
</style>