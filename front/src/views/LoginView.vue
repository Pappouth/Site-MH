<template>
    <q-page class="row justify-center items-center">
        <login-card />
    </q-page>
</template>

<script>
import LoginCard from "@/components/LoginCard.vue";

export default {
    name: "LoginView",
    components: { LoginCard }
}
</script>