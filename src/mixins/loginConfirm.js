export default {
  methods: {
    loginConfirm () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时此刻需要您先登录喔~',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => { })
        return true
      }
      return false
    },
    // 新
    loginConfirmAPI (data) {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时此刻需要您先登录喔~',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(() => {
          this.$router.push({
            path: '/login',
            query: {
              backUrl: data
            }
          })
        }).catch(() => { })
        return true
      }
      return false
    }
  }
}
