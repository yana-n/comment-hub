<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { useAuthNotifications } from "@/composables/useAuthNotifications";

const { user, logout, authError, authSuccess } = useAuth();

useAuthNotifications(authError, authSuccess);

const handleLogout = async () => await logout();
</script>

<template>
 <button v-if="user" class="link" @click="handleLogout">Log Out</button>
 <router-link v-else class="link" :to="{ name: 'SignIn' }">Log In</router-link>
</template>

<style scoped lang="scss">
.link {
 cursor: pointer;
 color: var(--accent-color) !important;
 transition: opacity .3s ease-in-out;
 font-size: var(--size-xxs);

 &:hover {
  opacity: 0.7;
 }
}

button {
 padding: 0;
 border: none;
 outline: none;
 background: none;
}
</style>
