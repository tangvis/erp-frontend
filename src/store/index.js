import getters from "./getters"
import user from "./modules/user"
import app from "./modules/app"
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Create the store instance using Vuex 4 syntax
const store = createStore({
    modules: {
        app,
        user,
    },
    getters,
    plugins: [createPersistedState({
        paths: ['user', 'app'] // Persist the user module
    })],
})

export default store