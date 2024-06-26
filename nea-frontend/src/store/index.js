import {defineStore} from 'pinia'
import {jwtDecode} from "jwt-decode";

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
        message: null,
        callback: null
    }),
    getters: {
        isUserAuth: (state) => state.token != null,
        isAdmin: (state) => jwtDecode(state.token).roles.includes('ROLE_ADMIN'),
        getUserEmail: (state) => jwtDecode(state.token).sub,
        getMessage: (state) => state.message,
        isMessageActive: (state) => state.message != null
    },
    actions: {
        logout() {
            this.token = null
        },
        updateToken(token) {
            this.token = token
        },
        updateMessage(message, callback) {
            this.message = message
            this.callback = callback
        },
        clearMessage() {
            this.message = null
            if (this.callback) {
                this.callback()
                this.callback = null;
            }
        }
    }
})
