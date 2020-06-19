const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}
const actions = {
  // user login
  login({ commit }, userInfo) {
    // 这个就是登录那边调用的方法 this.$store.dispatch('user/login', this.loginForm)
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 这里调用src/api/user.js的login
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // 设置token
        commit('SET_TOKEN', data.token)
        // 设置cookies,这里调用的是src/utils/auth.js文件的setToken方法
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户个人信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
		// 这里后端返回信息进行修改
        const { userName, avatar } = data

        commit('SET_NAME', userName)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户登录系统
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}