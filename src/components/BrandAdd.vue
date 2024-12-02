<script>
import { ref, computed } from 'vue';
import { addBrand } from '@/api/brand';

export default {
  setup(props, { emit }) {
    const error = ref('');
    const success = ref(false);
    const continueAdding = ref(false);
    const addBrandLoading = ref(false);
    const brandName = ref('');

    const isDisabled = computed(() => {
      return !brandName.value.trim();
    });

    const resetForm = () => {
      brandName.value = '';
      error.value = null;
    };

    const handleAddBrand = () => {
      if (!brandName.value.trim()) {
        error.value = 'Brand name is required';
        return;
      }

      addBrandLoading.value = true;

      addBrand({ name: brandName.value.trim() })
        .then(() => {
          success.value = true
          setTimeout(() => {
            success.value = false;
          }, 2000);
          resetForm();
          if (!continueAdding.value) {
            emit('brandAdded');
            emit('closeDialog');
          }
        })
        .catch((err) => {
          error.value = err || 'Failed to add brand';
          // Auto hide after 3 seconds
          setTimeout(() => {
            error.value = null;
          }, 2000);
        })
        .finally(() => {
          addBrandLoading.value = false;
        });
    };

    const handleClose = () => {
      if (continueAdding.value) {
        // If continue adding was enabled, trigger list refresh before closing
        emit('brandAdded');
      }
      emit('closeDialog');
    };

    return {
      error,
      success,
      continueAdding,
      addBrandLoading,
      brandName,
      isDisabled,
      addBrand: handleAddBrand,
      handleClose
    }
  }
}
</script>

<template>
  <v-card elevation="0">
    <v-card-text class="pb-4">
      <v-row>
        <!-- Header -->
        <v-col sm="12" cols="12">
          <div class="d-flex align-center">
            <h4>Add Brand</h4>
            <v-btn icon size="small" class="ml-auto" elevation="0" @click="handleClose">
              <xIcon size="16" />
            </v-btn>
          </div>
        </v-col>

        <!-- Input Field -->
        <v-col sm="12" cols="12">
          <v-text-field v-model="brandName" label="Brand Name" required variant="outlined" color="primary" hide-details
            @keyup.enter="addBrand"></v-text-field>
        </v-col>

        <!-- Error Alert -->
        <v-col sm="12" class="py-0" cols="12">
          <v-slide-y-transition>
            <v-alert v-if="error" closable @click:close="error = null" type="error" variant="tonal" class="ma-0 pa-3">
              <h5 class="text-h5 text-capitalize">error</h5>
              <div>{{ error }}</div>
            </v-alert>
          </v-slide-y-transition>
        </v-col>

        <!-- Success Alert -->
        <v-col class="py-0" sm="12" cols="12">
          <v-slide-y-transition>
            <v-alert v-if="success" type="success" closable @click:close="success = false" variant="tonal"
              class="ma-0 pa-3">
              <h5 class="text-h5 text-capitalize">success</h5>
              <div>Brand added</div>
            </v-alert>
          </v-slide-y-transition>
        </v-col>

        <!-- Submit Button -->
        <v-col sm="12" cols="12">
          <div class="d-flex">
            <v-switch density="compact" aria-label="switch" color="primary" v-model="continueAdding" hide-details
              inset></v-switch>
            <span class="text-body-1 text-medium-emphasis my-3 ml-1">
              Continue Adding
            </span>
            <v-btn :loading="addBrandLoading" :disabled="isDisabled" elevation="0" color="primary" class="ml-auto mt-1"
              @click="addBrand">
              Add
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
