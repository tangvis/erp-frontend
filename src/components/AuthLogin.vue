<template>
  <h2 class="text-h2 text-center my-4 mb-8">Sign in with Email address</h2>
  <v-form ref="myForm" @submit.prevent="handleLogin" class="mt-7 loginForm">
    <v-text-field v-model="email" :rules="[required, emailRule]" label="Email Address" class="mt-4 mb-8"
      density="comfortable" hide-details="auto" variant="outlined" color="primary" @input="validateForm"></v-text-field>
    <v-text-field v-model="password" label="Password" density="comfortable" :rules="[required]" variant="outlined"
      color="primary" hide-details="auto" :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPW ? 'text' : 'password'" @click:append="showPW = !showPW" class="pwdInput"
      @input="validateForm"></v-text-field>

    <div class="d-sm-flex align-center mt-2 mb-7 mb-sm-0">
      <v-checkbox v-model="remember" label="Remember me?" color="primary" class="ms-n2" hide-details></v-checkbox>
      <!-- <div class="ml-auto">
        <a href="javascript:void(0)" class="text-primary text-decoration-none"
          >Forgot password?</a
        >
      </div> -->
    </div>
    <v-btn color="secondary" :loading="loading" block class="mt-2" variant="flat" size="large" :disabled="!isFormValid"
      type="submit">
      Sign In</v-btn>
    <div v-if="error" class="mt-2">
      <v-alert color="error">{{ error }}</v-alert>
    </div>
  </v-form>
  <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/" class="mt-2 text-capitalize mr-n2">Don't Have an account?</v-btn>
  </div>
</template>


<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { watch } from "vue";
export default {
  setup() {
    // refs
    const error = ref(null);
    const email = ref("");
    const password = ref("");
    const remember = ref("false");
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);
    const myForm = ref(null);
    const showPW = ref(false);
    const isFormValid = ref(false);
    const required = (value) => !!value || "This field is required.";
    const emailRule = (value) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value) || "Invalid email format.";
    }

    const validateForm = () => {
      if (myForm.value) {
        myForm.value?.validate().then(({ valid: isValid }) => {
          isFormValid.value = isValid; // Update form validity state
        });
      }
    }

    onMounted(() => {
      const rememberedData = localStorage.getItem('rememberKey');
      if (rememberedData) {
        try {
          const data = JSON.parse(rememberedData);
          // Check if data contains the required properties
          if (data && data.email) {
            email.value = data.email;
            remember.value = true;
          }
        } catch (error) {
          console.error('Error parsing remembered data:', error);
          // Optionally clear the local storage if it's corrupted
          localStorage.removeItem('rememberKey');
        }
      }
    })

    // Watch email and password for changes and validate form
    watch([email, password], () => {
      validateForm();
    });

    const handleLogin = () => {
      myForm.value?.validate().then(({ valid: isValid }) => {
        if (isValid) {
          if (remember.value) {
            localStorage.setItem("rememberKey", JSON.stringify({
              email: email.value,
            }));
          } else {
            localStorage.removeItem("rememberKey");
          }
          loading.value = true;
          store
            .dispatch("login", {
              email: email.value,
              password: password.value,
            })
            .then(() => {
              loading.value = false;
              router.push("/");
            })
            .catch((err) => {
              loading.value = false;
              error.value = err;
            })
        }
      })
    }

    return {
      email,
      password,
      handleLogin,
      error,
      remember,
      loading,
      required,
      emailRule,
      myForm,
      showPW,
      isFormValid,
      validateForm,
    };
  },
};
</script>


<style lang="scss">
.custom-devider {
  border-color: rgba(0, 0, 0, 0.08) !important;
}

.googleBtn {
  border-color: rgba(0, 0, 0, 0.08);
  margin: 30px 0 20px 0;
}

.outlinedInput .v-field {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: none;
}

.orbtn {
  padding: 2px 40px;
  border-color: rgba(0, 0, 0, 0.08);
  margin: 20px 15px;
}

.pwdInput {
  position: relative;

  .v-input__append {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>