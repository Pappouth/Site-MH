<template>
    <div class="q-pa-md row q-col-gutter-lg">
        <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12" v-for="monster in monsters" :key="monster.id">
            <list-card :name="monster.m_name" :to="'/monsters/'+monster.m_name" type="monster" :monsterToDelete="monster.m_id" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ListCard from '@/components/ListCard.vue'

export default {
    name: "AllMonstersView",
    components: { ListCard },
    data() {
        return {
            monsters: [],
            isLoading: false
        }
    },
    methods: {
        toggleLoading() {
            this.isLoading = !this.isLoading;
        },
        loadMonsters() {
            this.isLoading = true;
            axios
                .get("/api/monsters")
                .then((monsters) => {
                    this.monsters = monsters.data
                })
                .catch((error) => console.log(error))
                .finally(this.isLoading= false)
        }
    },
    mounted() {
        this.loadMonsters();
    }
}
</script>