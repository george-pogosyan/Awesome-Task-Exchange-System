import { defineStore } from "pinia";
import { User } from "~~/types";

export const useUserStore = defineStore("user", {
  state: (): { user: User; } => ({
    user: null
  }),
  actions: {
    clearUser() {
      this.user = null;
    },
    setUser(user: User) {
      this.user = user;
    },
  },
});
