<template>
    <p class="q-pa-md text-h3" >{{ gameName }}</p>
    <!-- <div class="q-pa-md row q-col-gutter-lg">
        <div clas="col" v-for="monster in game" :key="monster.id">
            <list-card :name="monster.m_name" :to="'/monster/'+monster.m_name" />
        </div>
    </div> -->
    <div class="q-pa-md row q-col-gutter-lg">
        <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12" v-for="monster in game" :key="monster.id">
            <list-card :name="monster.m_name" :to="'/monsters/'+monster.m_name" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ListCard from "@/components/ListCard.vue";

export default {
  name: "SelectedGameView",
  components: { ListCard },
  data() {
    return {
        game: [],
        isLoading: false,
        gameName: this.$route.params.name
    }
  },
  methods: {
    toggleLoading() {
        this.isLoading = !this.isLoading;
    },
    loadGame() {
    this.isLoading = true;
    axios
        .get(`/api/games/${this.gameName}`)
        .then((game) => {
            this.game = game.data
            if (this.game.length <= 0)
                this.$router.push("/404");
        })
        .catch((error) => console.error(error))
        .finally(() => (this.isLoading = false));
    }
    },
    mounted() {
        this.loadGame();
    }
}
</script>