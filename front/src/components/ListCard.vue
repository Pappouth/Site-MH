<template>
    <q-card>
        <q-card-section>
            <!-- <q-img src="../assets/logo.png" style="height: 100px; width: 100px" /> -->
            <!-- <div class="text-h4">{{ name }}</div> -->
            <q-item class="text-h4 justify-center text-center" :to="to">{{ name }}</q-item>
            <q-btn v-if="type == 'monster'" flat dense round aria-label="Menu" icon="close" v-on:click="deleteMonster(monsterToDelete)" />
        </q-card-section>
    </q-card>
</template>

<script>
import axios from "axios";

export default {
    name: "ListCard",
    props: { type: String, name: String, to: String, monsterToDelete: Number },
    methods: {
        deleteMonster(monsterId) {
            axios
                .delete(`/api/delete/monster/${monsterId}`)
                .then(() => { this.$router.push("/monsters") })
            ;
        }
    }
}
</script>