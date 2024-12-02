<script setup>
const props = defineProps({
  title: String
});
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
  <v-card variant="flat">
    <v-card-item>
      <v-card-title class="text-18">{{ props.title }}</v-card-title>
    </v-card-item>
    <v-divider></v-divider>
    
    <!-- Search Form Slot -->
    <v-card-text>
      <slot />
    </v-card-text>
    
    <!-- Footer Slot -->
    <v-card-actions class="py-2">
      <slot name="footer" />
    </v-card-actions>
    
    <!-- Table Slot -->
    <v-divider></v-divider>
    <v-card-text>
      <slot name="table" />
    </v-card-text>
  </v-card>
</template>
