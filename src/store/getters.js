const getters = {
    isAuthenticated: state => state.user.isAuthenticated,
    userInfo: state => ({
        id: state.user.id,
        username: state.user.username,
        email: state.user.email,
        avatar: state.user.avatar,
        loginTime: state.user.loginTime,
        roles: state.user.roles,
    }),
    // Additional getters for customizer properties
    isSidebarOpen: state => state.app.sidebar_drawer,
    isCustomizerOpen: state => state.app.customizer_drawer,
    isMiniSidebarActive: state => state.app.mini_sidebar,
    currentFontTheme: state => state.app.fontTheme,
    inputBg: state => state.app.inputBg
}

export default getters