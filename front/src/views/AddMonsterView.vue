<template>
    <q-form>
        <q-input v-model="monsterName" color="purple" type="text" label="Name" />
        <q-select v-model="monsterSize" :options="size" color="purple" label="Size : 0 = petit / 1 = grand" />
        <!-- <q-select v-model="monsterType" :options="info[2]" color="purple" label="Type" /> -->
        <!-- <q-input color="purple" type="text" label="Description" /> -->
        <!-- <q-input color="purple" type="text" label="Games" /> -->
        <!-- <q-input color="purple" type="text" label="Elements" /> -->
        <!-- <q-input color="purple" type="text" label="Ailments" /> -->
        <!-- <q-input color="purple" type="text" label="Weaknesses" /> -->

        <q-btn color="purple" label="Add monster" v-on:click="postMonster()" />
    </q-form>
</template>

<script>
import axios from "axios"

export default {
    name: "AddMonsterView",
    data() {
        return {
            info: [],
            size: [0, 1],
            monsterName: "",
            monsterSize: "",
            error: ""
            // monsterType: ""
        }
    },
    methods: {
        loadInfo() {
            axios
                .get("/api/info")
                .then((monsters) => {
                    this.info = monsters.data;
                })
                .catch((error) => console.log(error))
                .finally(this.isLoading= false)
        },
        postMonster() {
            const monsterInfo = { name: this.monsterName, size: this.monsterSize };
            axios.post("/api/addmonster", monsterInfo)
                .then(() =>{
                    this.$router.push("/monsters");
                })
        }
    },
    mounted() {
        this.loadInfo();
    }
}
</script>