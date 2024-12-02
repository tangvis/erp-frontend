
const app = {
    state: {
        sidebar_drawer: true,
        customizer_drawer: false,
        mini_sidebar: false,
        fontTheme: 'Roboto',
        inputBg: false
    },

    mutations: {
        TOGGLE_SIDEBAR_DRAWER(state) {
            state.sidebar_drawer = !state.sidebar_drawer;
        },
        SET_MINI_SIDEBAR(state, value) {
            state.mini_sidebar = value;
        },
        SET_CUSTOMIZER_DRAWER(state, value) {
            state.customizer_drawer = value;
        },
        SET_FONT_THEME(state, value) {
            state.fontTheme = value;
        },
        SET_INPUT_BG(state, value) {
            state.inputBg = value;
        }
    },

    actions: {
        toggleSidebarDrawer({ commit }) {
            commit('TOGGLE_SIDEBAR_DRAWER');
        },
        setMiniSidebar({ commit }, value) {
            commit('SET_MINI_SIDEBAR', value);
        },
        setCustomizerDrawer({ commit }, value) {
            commit('SET_CUSTOMIZER_DRAWER', value);
        },
        setFontTheme({ commit }, value) {
            commit('SET_FONT_THEME', value);
        },
        setInputBg({ commit }, value) {
            commit('SET_INPUT_BG', value);
        }
    }
}

export default app