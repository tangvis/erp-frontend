
<template>
  <v-card class="pa-3 pt-5 mx-auto" width="350">
    <v-card-title class="text-center">
      
    </v-card-title>
    <v-card-item>
      <v-form ref="myForm" @submit.prevent="handleLogin">
        <v-text-field
          variant="solo"
          v-model="email"
          type="email"
          :readonly="loading"
          :rules="[required, emailRule]"
          class="mb-2"
          label="Email"
          prepend-inner-icon="mdi-email"
          clearable
        />
        <v-text-field
          variant="solo"
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          label="Password"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-key"
          type="password"
          clearable
        />
        <v-checkbox
          v-model="remember"
          label="Remember Me"
          color="red-darken-1"
          hide-details=""
        >
        </v-checkbox>

        <v-btn
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Login
        </v-btn>
      </v-form>
    </v-card-item>
    <!-- <v-card-action> </v-card-action> -->
  </v-card>

  <!-- dialog -->
  <v-dialog
    v-model="dialog"
    max-width="400"
    max-height="300"
    transition="dialog-transition"
  >
    <v-card class="pt-1">
      <v-card-title class="d-flex align-center p-flex">
        <v-icon color="red" class="mr-2">mdi-alert</v-icon>
        <div class="text-h6 text-medium-emphasis">Login Failed</div>
      </v-card-title>

      <v-divider></v-divider>

      <!-- Dynamic text content -->
      <v-card-text class="error">
        {{ error }}
      </v-card-text>

      <v-divider></v-divider>

      <!-- Actions -->
      <v-card-actions>
        <v-btn class="ms-auto" color="success" @click="dialog = false">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup(props, context) {
    // refs
    const error = ref(null);
    const email = ref("");
    const password = ref("");
    const remember = ref("false");
    const store = useStore();
    const router = useRouter();
    const dialog = ref(false);
    const loading = ref(false);
    const myForm = ref(null);
    const required = (value) => !!value || "This field is required.";
    const emailRule = (value) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value) || "Invalid email format.";
    };

    const handleLogin = () => {
      myForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
          loading.value = true;
          store
            .dispatch("user/login", {
              email: email.value,
              password: password.value,
            })
            .then(() => {
              loading.value = false;
              router.push("/chatroom");
            })
            .catch((err) => {
              loading.value = false;
              error.value = err;
              dialog.value = true;
            });
        }
      });
    };

    return {
      email,
      password,
      handleLogin,
      error,
      remember,
      dialog,
      loading,
      required,
      emailRule,
      myForm,
    };
  },
};
</script>
  
  <style>
</style>