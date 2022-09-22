<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar class="bg-grey-10">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu" 
        />

        <q-toolbar-title> Monster Hunter Database </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <drawer-menu-item name="Games" to="/games"></drawer-menu-item>
        <drawer-menu-item name="Monsters" to="/monsters"></drawer-menu-item>
        <q-btn color="purple q-mr-md" to="/addmonster">Add monster</q-btn>
        <q-btn color="purple" to="/login">Login</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-10">
      <q-list class="text-white">
        <q-item-label header>Menu</q-item-label>
        <drawer-menu-item type="sidebar" iconName="home" name="Home" to="/"></drawer-menu-item>
        <expanding-menu iconName="sports_esports" label="Games"></expanding-menu>
        <expanding-menu iconName="sports_esports" label="Monsters"></expanding-menu>
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- :key="$route.fullPath" change le component actif en fonction de l'url -->
      <router-view :key="$route.fullPath"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import DrawerMenuItem from "@/components/DrawerMenuItem.vue";
import ExpandingMenu from "./components/ExpandingMenu.vue";

export default {
  name: "LayoutDefault",

  components: {
    DrawerMenuItem,
    ExpandingMenu
},

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>
