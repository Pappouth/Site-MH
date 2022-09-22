<template>
    <q-card square bordered class="my-card q-pa-lg shadow-1">
        <q-form v-on:submit="login()">
            <q-card-section class="q-gutter-md">
                <q-input square filled clearable v-model="username" type="text" label="Login" color="purple" />
                <q-input square filled clearable v-model="password" type="password" label="Password" color="purple" />
            </q-card-section>
            <q-card-section class="q-px-md">
                <q-btn method="post" color="purple" size="lg" class="full-width" label="Login" type="submit" value="Login" />
            </q-card-section>
            <q-card-section class="q-px-md">
                <p>{{ error }}</p>
            </q-card-section>
        </q-form>
    </q-card>
</template>

<script>
import axios from 'axios';

export default {
    name: "LoginCard",
    data() {
        return {
            username: "",
            password: "",
            error: ""
        }
    },    
    methods: {
        login() {
            const loginInfo = { username: this.username, password: this.password };
            axios
                .post("/api/login", loginInfo)
                .then((res) => {
                    if (res.status == 200)
                        this.$router.push("/");
                    if (res.status == 400){
                        this.error = "Invalid login";
                        console.log(this.error);
                    }
                });
            console.log(this.username, this.password);
        }
    }
}
</script>