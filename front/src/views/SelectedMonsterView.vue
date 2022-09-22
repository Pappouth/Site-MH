<template>
  <p class="q-pa-md text-h3" >{{ monsterName }}</p>
  <!-- <h1>{{ monster.m_name }}</h1> -->
  
  <!-- <div class="q-pa-md row q-gutter-md"> -->
  <div class="q-pa-md row q-col-gutter-lg">
    <div class="col">
      <q-card>
        <q-card-section v-for="game in monster[1]" :key="game.id">
          <div class="text-h4">{{ game.g_name }}</div>
          <div class="text-h6">{{ game.mg_monster_icon }} {{ game.mg_monster_description }}</div>
          <!-- <q-item class="text-h4">{{ game.g_name }}</q-item>
          <q-item class="text-h6">{{ game.mg_monster_icon }} {{ game.mg_monster_description }}</q-item> -->
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
      <q-card>
        <q-card-section>
          <div class="text-h4">Monster Class</div>
          <div v-for="info in monster[2]" :key="info.id" class="text-h6">{{ info.t_name }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h4">Size</div>
          <div v-for="info in monster[0]" :key="info.id" class="text-h6">{{ getMonsterSize(info.m_is_large) }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h4">Elements</div>
          <div v-for="info in monster[3]" :key="info.id" class="text-h6">{{ info.e_name }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h4">Ailments</div>
          <div v-for="info in monster[4]" :key="info.id" class="text-h6">{{ info.a_name }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-h4">Weaknesses</div>
          <div v-for="info in monster[5]" :key="info.id" class="text-h6">{{ info.w_name }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SelectedMonsterView",
  data() {
    return {
      monster: [],
      isLoading: false,
      monsterName: this.$route.params.name
    };
  },
  methods: {
    toggleLoading() {
      this.isLoading = !this.isLoading;
    },
    loadMonster() {
      this.isLoading = true;
      axios
        .get(`/api/monsters/${this.monsterName}`)
        .then((monster) => {
          this.monster = monster.data;
          if (this.monster[0].length <= 0)
            this.$router.push("/404");
        })
        .catch((error) => console.error(error))
        .finally(() => (this.isLoading = false));
    },
    getMonsterSize(size) {
      if (size) return "Large";
      return "Small";
    }
  },
  mounted() {
    this.loadMonster();
  }
}
</script>