<template>
  <div class="view system user">
    <a-layout v-if="user">
      <a-layout-header>
        <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          title="User Details"
          :sub-title="`${user.display_name ? user.display_name : ''} (ID: ${user._id})`"
          @back="() => $router.push('/system/users')"
        />
      </a-layout-header>
      <a-layout class="mt-5">
        <a-layout-sider>
          <a-space align="center" direction="vertical">
            <a-avatar :size="165" :src="user.avatar" />
            <span>{{ user.name }}</span>
            <span>{{ user.username }}</span>
            <span>{{ user.email }}</span>
          </a-space>
          <div class="profile d-flex flex-column align-items-center justify-content-center"></div>
        </a-layout-sider>
        <a-layout-content>
          <a-form-model :model="user" :label-col="labelCol" :wrapper-col="wrapperCol" compact>
            <!-- Authentication -->
            <a-form-model-item label="Authentication">
              <a-input-group compact>
                <a-input v-model="user.username" style="width: 50%" placeholder="Username" />
                <a-input v-model="user.password" style="width: 50%" placeholder="Password" />
              </a-input-group>
            </a-form-model-item>

            <!-- Name -->
            <a-form-model-item label="Name/Lastname">
              <a-input-group compact>
                <a-input v-model="user.name" style="width: 50%" placeholder="Name" />
                <a-input v-model="user.lastname" style="width: 50%" placeholder="Last Name" />
              </a-input-group>
            </a-form-model-item>

            <!-- Email -->
            <a-form-model-item label="Email">
              <a-input v-model="user.email" placeholder="Email" />
            </a-form-model-item>

            <!-- Phone -->
            <a-form-model-item label="Phone">
              <a-input-group compact>
                <a-input v-model="user.phone" style="width: 50%" placeholder="Number" />
                <a-input v-model="user.extension" style="width: 50%" placeholder="Extension" />
              </a-input-group>
            </a-form-model-item>

            <!-- Department -->
            <a-form-model-item label="Department">
              <a-input-group>
                <a-select v-model="user.department" default-value="tech" style="width: 100%">
                  <a-select-option value="admin"> Administration </a-select-option>
                  <a-select-option value="tech"> Technology </a-select-option>
                  <a-select-option value="editorial"> Editorial </a-select-option>
                </a-select>
              </a-input-group>
            </a-form-model-item>

            <!-- Job Title -->
            <a-form-model-item label="Job Title">
              <a-input v-model="user.job_title" />
            </a-form-model-item>

            <!-- Location -->
            <a-form-model-item label="Location">
              <a-input v-model="user.location" />
            </a-form-model-item>

            <!-- Address -->
            <a-form-model-item label="Address">
              <a-input v-model="user.address" />
            </a-form-model-item>

            <!-- Bio -->
            <a-form-model-item label="Bio">
              <a-input v-model="user.bio" type="textarea" />
            </a-form-model-item>

            <!-- Note -->
            <a-form-model-item label="Note">
              <a-input v-model="user.note" type="textarea" />
            </a-form-model-item>

            <!-- Active -->
            <a-form-model-item label="Active" prop="active">
              <a-switch v-model="user.active" />
            </a-form-model-item>

            <!-- Actions -->
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="update"> Update </a-button>
              <a-button style="margin-left: 10px" @click="$router.push('/system/users')"> Cancel </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-layout-content>
      </a-layout>
      <a-layout-footer> {{ user }}</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import store from '@/store'

export default {
  async beforeRouteEnter(to, from, next) {
    if (to.params.username) {
      const user = await store.dispatch('users/fetchUserByUsername', to.params.username)
      next((vm) => {
        vm.user = user
      })
    }
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      user: null,
    }
  },
  methods: {
    async update() {
      if (this.user) {
        const user = await store.dispatch('users/updateUser', this.user)
        if (user) {
          this.user = user
          this.$message.success(`User ${user.username} has been updated successfully!`)
        } else {
          this.$message.error('Oops, The user update failed!')
        }
      }
    },
  },
  async created() {
    if (!this.user) {
      this.user = await store.dispatch('users/fetchUserByUsername', this.$route.params.username)
    }
  },
}
</script>

<style lang="scss" scoped></style>
