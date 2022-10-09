import { defineNuxtPlugin, addRouteMiddleware, useCookie, navigateTo } from '#app'
import { useUserStore } from '~~/stores/use-user-store'
import { COOKIE_KEYS } from '~~/utils/constants'

export default defineNuxtPlugin(() => {
  addRouteMiddleware('global-test', async (to, from) => {
    if (to.fullPath === '/' || to.fullPath === '/register') return true

    const { fetchUserData } = useApi()
    const authToken = useCookie(COOKIE_KEYS.AUTH_TOKEN);
    const userStore = useUserStore();
    if (!authToken.value) {
      return await navigateTo("/login");
    }

    try {
      let localUser = userStore.user
      if (!localUser)
        localUser = await fetchUserData()
      if (userStore?.setUser)
        userStore.setUser(localUser)

      return true;
    } catch (error) {
      console.error(error)
      return await navigateTo("/");
    }
  }, { global: true })
})