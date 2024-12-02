<script setup>
import { ref } from 'vue';

// dropdown imports
import ProfileDD from './ProfileDD.vue';
import Searchbar from './SearchBarPanel.vue';
import Logo from '@/components/logo/Logo.vue'
import { useStore } from "vuex";

const showSearch = ref(false);
const searchbox = () => {
  showSearch.value = !showSearch.value;
}
const store = useStore();
const setMiniBar = () => {
  store.dispatch("setMiniSidebar", !store.getters.isMiniSidebarActive)
}
const setSideDrawer = () => {
  store.dispatch("toggleSidebarDrawer")
}
</script>

<template>
  <v-app-bar elevation="0" height="80">
    <v-btn class="hidden-md-and-down text-secondary" color="lightsecondary" icon rounded="sm" variant="flat"
      @click.stop="setMiniBar" size="small">
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <v-btn class="hidden-lg-and-up text-secondary ms-3" color="lightsecondary" icon rounded="sm" variant="flat"
      @click.stop="setSideDrawer" size="small">
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <!-- search mobile -->
    <v-btn class="hidden-lg-and-up text-secondary ml-3" color="lightsecondary" icon rounded="sm" variant="flat"
      size="small" @click="searchbox">
      <SearchIcon size="17" stroke-width="1.5" />
    </v-btn>

    <v-sheet v-if="showSearch" class="search-sheet v-col-12">
      <Searchbar :closesearch="searchbox" />
    </v-sheet>

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->
    <v-sheet class="mx-3 v-col-3 v-col-xl-2 v-col-lg-4 d-none d-lg-block">
      <Searchbar />
    </v-sheet>

    <!---/Search part -->

    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn text-primary" color="lightprimary" variant="flat" rounded="pill" v-bind="props">
          <v-avatar size="30" class="mr-2 py-2">
            <Logo />
          </v-avatar>
          <SettingsIcon stroke-width="1.5" />
        </v-btn>
      </template>
      <v-sheet rounded="md" width="300" elevation="12">
        <ProfileDD />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>
