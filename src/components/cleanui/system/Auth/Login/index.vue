<template>
  <div>
    <div class="text-center mb-5">
      <div class="logo">
        <img src="/resources/images/tpm-logo.svg" alt="TPM Logo">
      </div>
      <h1 class="mt-2 mb-5">
        <strong>Welcome to {{ settings.logo }}</strong>
      </h1>
      <p>The Administration Dashboard for The Post Millennial</p>
    </div>
    <div class="card" :class="$style.container">
      <div class="text-dark font-size-24 mb-3">
        <strong>Sign in to your account</strong>
      </div>
      <a-form class="mb-4" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            placeholder="Email/Username"
            v-decorator="[
              'identity',
              {
                rules: [{ required: true, message: 'Please input your Username/Email!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            placeholder="Password"
            type="password"
            v-decorator="['password', { rules: [{ required: true, message: 'Please input your Password!' }] }]"
          />
        </a-form-item>
        <a-button type="primary" htmlType="submit" size="large" class="text-center w-100" :loading="loading">
          <strong>Sign in</strong>
        </a-button>
      </a-form>
      <router-link to="/auth/forgot-password" class="kit__utils__link font-size-16">Forgot Password?</router-link>
    </div>
    <div class="text-center pt-2 mb-auto">
      <span class="mr-2">Don't have an account?</span>
      <router-link to="/auth/register" class="kit__utils__link font-size-16">Sign up</router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'CuiLogin',
  computed: {
    ...mapState(['settings']),
    loading() {
      return this.$store.state.user.loading
    },
  },
  data: function () {
    return {
      form: this.$form.createForm(this),
    }
  },
  methods: {
    changeAuthProvider(value) {
      this.$store.commit('CHANGE_SETTING', { setting: 'authProvider', value })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) this.$store.dispatch('user/LOGIN', { payload: values })
      })
    },
  },
}
</script>
<style lang="scss" module>
@import '@/components/cleanui/system/Auth/style.module.scss';
</style>
