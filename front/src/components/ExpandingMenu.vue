<template>
  <q-expansion-item v-if="label.toLowerCase() == 'games'" :content-inset-level="0.5" :label="label" :icon="iconName">
    <drawer-menu-item
      v-for="game in games"
      :key="game.id"
      :name="game.g_name"
      :to="'/games/'+game.g_name" />
  </q-expansion-item>
  <q-expansion-item v-else-if="label.toLowerCase() == 'monsters'" :content-inset-level="0.5" :label="label" :icon="iconName">
    <drawer-menu-item
      v-for="monster in monsters"
      :key="monster.id"
      :name="monster.m_name"
      :to="'/monsters/'+monster.m_name" />
  </q-expansion-item>
</template>

<script>
import DrawerMenuItem from "@/components/DrawerMenuItem.vue";
import axios from "axios";

export default {
  name: "ExpandingMenu",
  props: { type: String, label: String, iconName: String},
  components: {
    DrawerMenuItem
  },
  data() {
    return {
      monsters: [],
      games: [],
      isLoading: false
    };
  },
  methods: {
    toggleLoading() {
      this.isLoading = !this.isLoading;
    },
    loadGames() {
      this.isLoading = true;
      axios
        .get("/api/games")
        .then((games) => {
          this.games = games.data;
        })
        .catch((error) => console.error(error))
        .finally(() => (this.isLoading = false));
    },
    loadMonsters() {
      this.isLoading = true;
      axios
        .get("/api/monsters")
        .then((monsters) => {
          this.monsters = monsters.data;
        })
        .catch((error) => console.error(error))
        .finally(() => (this.isLoading = false));
    }
  },
  mounted() {
    this.loadGames();
    this.loadMonsters();
  }
}
</script>