import { FetchOptions } from "ohmyfetch"
import { defaultsDeep } from 'lodash'
import { LoginInfo, Task, User } from "~~/types"
import { COOKIE_KEYS } from "~~/utils/constants"

export default function useApi() {
  const authToken = useCookie(COOKIE_KEYS.AUTH_TOKEN)
  const { public: { apiUrl } } = useRuntimeConfig()

  function fetch<T = unknown>(url: string, options: FetchOptions = {}): Promise<T> {
    const defaultOpts: FetchOptions = {
      baseURL: apiUrl,
      headers: {
        Authorization: authToken.value ? `Bearer ${authToken.value}` : ''
      }
    }

    return $fetch(url, defaultsDeep(defaultOpts, options))
  }

  async function login(params: { email: string, password: string }): Promise<LoginInfo> {
    const result = await fetch<LoginInfo>('/auth/login', {
      method: 'POST',
      body: params
    })

    authToken.value = result.accessToken

    return result
  }

  async function register(params: { email: string, password: string, role: string }): Promise<void> {
    await fetch('/auth/register', {
      method: 'POST',
      body: params,

    })
  }

  async function fetchUserData(): Promise<User> {
    return await fetch<User>('auth')
  }

  async function getAllTasks(): Promise<Task[]> {
    return await fetch<Task[]>('/tasks')
  }

  async function createTask(task: { name: string, description: string }): Promise<Task> {
    return await fetch<Task>('/tasks', { method: 'POST', body: task })
  }

  async function reshufleTasks() {
    return await fetch('/tasks/reshufle-tasks', { method: 'POST' })
  }

  async function finishTask(id: string) {
    await fetch(`/tasks/finish-task/${id}`, { method: 'POST' })
  }

  return {
    login,
    register,
    fetchUserData,
    getAllTasks,
    createTask,
    reshufleTasks,
    finishTask
  }
}