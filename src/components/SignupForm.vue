<template>
  <form @submit.prevent="handleSignUp">
    <input
      type="text"
      placeholder="display name"
      v-model="displayName"
      required
    />
    <input type="email" placeholder="email" v-model="email" required />
    <input type="password" placeholder="password" v-model="password" required />
    <div class="error">{{ error }}</div>

    <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup(props, context) {
    // refs
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref(null);

    const store = useStore();

    const handleSignUp = () => {
      // signup(email.value, password.value, displayName.value)
      //   .then(() => {
      //     context.emit("signup");
      //   })
      //   .catch((err) => {
      //     error.value = err;
      //   });
      store
        .dispatch("user/signup", {
          email: email.value,
          password: password.value,
          username: displayName.value,
        })
        .then(() => context.emit("signup"))
        .catch((err) => (error.value = err))
    }

    return { displayName, email, password, handleSignUp, error }
  },
};
</script>

<style>
</style>