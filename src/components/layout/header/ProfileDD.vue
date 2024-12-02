<template>
  <!-- ---------------------------------------------- -->
  <!-- profile DD -->
  <!-- ---------------------------------------------- -->
  <div class="pa-5">
    <h4 class="mb-n1">Good Morning, <span class="font-weight-regular">John Doe</span></h4>
    <span class="text-subtitle-2 text-medium-emphasis">Project admin</span>

    <v-divider></v-divider>

    <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 180px">
      <v-list class="mt-3">
        <v-list-item color="secondary" rounded="md">
          <template v-slot:prepend>
            <settings-icon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Account Settings</v-list-item-title>
        </v-list-item>

        <v-list-item color="secondary" rounded="md">
          <template v-slot:prepend>
            <UserIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Social Profile</v-list-item-title>

          <template v-slot:append>
            <v-chip color="warning" class="text-white" text="02" variant="flat" size="small" />
          </template>
        </v-list-item>

        <v-list-item @click="handleLogout" color="secondary" rounded="md">
          <template v-slot:prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
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
      store.dispatch('logout')
        .then(() => {
          router.push('/login')
        })
        .catch(() => console.log('logout error'))
    }
    return { handleLogout, isAuthenticated, userInfo, formattedLoginTime, elapsedTime }
  },
};
</script>
