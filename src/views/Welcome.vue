<script setup>
import VerticalSidebarVue from '@/components/layout/vertical-sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from '@/components/layout/header/VerticalHeader.vue';
import FooterPanel from '@/components/layout/FooterPanel.vue'
// import { useStore } from "vuex";

// const store = useStore();
// const setCustomerDrawer = () => {
//   store.dispatch("setCustomizerDrawer", !store.getters.isCustomizerOpen)
// }
</script>

<template>
  <v-locale-provider>
    <v-app :theme="PurpleTheme" :class="['PurpleTheme', 'Roboto', 'inputWithbg', 'horizontalLayout']">
      <!-- <Customizer /> -->
      <VerticalSidebarVue />
      <VerticalHeaderVue />

      <v-main>
        <v-container fluid class="page-wrapper">
          <div>
            <RouterView />
            <!-- <div>
            <RouterView />
            <v-btn class="customizer-btn" size="large" icon variant="flat" color="secondary"
              @click.stop="setCustomerDrawer">
              <SettingsIcon class="icon" />
            </v-btn>
          </div> -->
          </div>
        </v-container>
        <v-container fluid class="pt-0">
          <div class="">
            <FooterPanel />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>

<style scoped>
.page-wrapper {
  position: relative;
  z-index: 1; /* Ensures container 1 is above */
}
</style>