<template>
    <div class="q-pa-md row q-col-gutter-lg">
        <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12" v-for="game in games" :key="game.id">
            <list-card :name="game.g_name" :to="'/games/'+game.g_name" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ListCard from '@/components/ListCard.vue'

export default {
    name: "AllGamesView",
    components: { ListCard },
    data() {
        return {
            games: [],
            isLoading: false
        }
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
                    this.games = games.data
                })
                .catch((error) => console.log(error))
                .finally(this.isLoading= false)
        }
    },
    mounted() {
        this.loadGames();
    }
}
</script>