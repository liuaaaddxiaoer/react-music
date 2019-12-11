export default {
  storage: {

    clear() {
      localStorage.clear()
    },

    setItem(key, value) {
      localStorage.setItem(key, value)
    },

    removeItem(key) {
      localStorage.removeItem(key)
    },

    getItem(key) {
      return localStorage.getItem(key)
    }
  }
}