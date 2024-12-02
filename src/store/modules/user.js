import { logIn, signUp, logOut } from '@/api/user';
import { removeSession } from '@/utils/cookies';

const user = {
    state : {
        isAuthenticated: false,
        username: '',
        email: '',
        avatar: '',
        loginTime: 0,
        id: 0
    },
    mutations : {
        SET_USERINFO: (state, userInfo) => {
            state.id = userInfo.id
            state.username = userInfo.username
            state.email = userInfo.email
            state.loginTime = userInfo.login_time
        },
        SET_LOGIN: (state) => {
            state.isAuthenticated = true
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        CLEAR_USER_INFO(state) {
            state.isAuthenticated = false;
            state.username = '';
            state.email = '';
            state.avatar = '';
            state.loginTime = 0;
            state.id = 0;
            state.roles = [];
        },
    },
    actions: {
        // 注册
        signup({ commit }, userInfo) {
            const email = userInfo.email.trim()
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                signUp({ email: email, username: username, password: userInfo.password }).then(response => {
                    commit('SET_USERINFO', response)
                    commit('SET_LOGIN')
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登录
        login({ commit }, userInfo) {
            const email = userInfo.email.trim()
            return new Promise((resolve, reject) => {
                logIn({ email: email, password: userInfo.password }).then(response => {
                    commit('SET_USERINFO', response)
                    commit('SET_LOGIN')
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                logOut()
                    .then(() => {
                        commit('CLEAR_USER_INFO')
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        // 前端 登出
        frontLogOut({ commit }) {
            return new Promise(resolve => {
                commit('CLEAR_USER_INFO')
                removeSession()
                resolve()
            })
        }
    }
}


export default user