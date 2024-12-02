<template>
  <nav>
    <div v-if="isAuthenticated">
      <p>Hey there...</p>
      <p class="email">Currently logged in as {{ userInfo.username }}</p>
      <p>Logged in at: {{ formattedLoginTime }}</p>
      <p>Time logged in: {{ elapsedTime }}</p>
    </div>
    <button @click="handleLogout">Logout</button>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useElapsedTime from "@/composables/useElapsedTime"
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    
    
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    const userInfo = computed(() => store.getters.userInfo)
    const { formattedLoginTime, elapsedTime } = useElapsedTime(userInfo.value.loginTime)

    // const { elapsedTimeFunc } = useElapsedTime()
    
    // const { formattedLoginTime, elapsedTime } = elapsedTimeFunc(userInfo.loginTime);

    const handleLogout = () => {
      store.dispatch('user/logout')
      .then(() => {
        router.push('/')
      })
      .catch(() => console.log('logout error'))
    }
    return { handleLogout, isAuthenticated, userInfo, formattedLoginTime, elapsedTime }
  },
};
</script>

<style>
</style>