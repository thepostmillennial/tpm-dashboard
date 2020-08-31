<template>
  <div class="view system user">
    <a-layout v-if="user">
      <a-layout-header>
        <a-page-header
          title="User Details"
          :sub-title="`${user.display_name ? user.display_name : ''} (${user.username})`"
          @back="() => $router.push('/system/users')"
        />
      </a-layout-header>
      <a-layout-content class="border-top rounded d-flex flex-column flex-md-row">
        <div class="sider border-right p-3 d-flex flex-column align-items-center" style="gap: 0.5rem">
          <a-avatar :size="180" :src="user.avatar" shape="square" />
          <span>{{ user.name + ' ' + user.lastname }}</span>
          <span>{{ user.username }}</span>
          <span>{{ user.email }}</span>
          <a-tag color="#108ee9"> <i class="fe fe-clock"></i> {{ user.created_at | moment('lll') }} </a-tag>
          <a-tag color="#87d068"> <i class="fe fe-refresh-cw"></i> {{ user.updated_at | moment('lll') }} </a-tag>
        </div>
        <a-form-model class="p-3 flex-grow-1" :model="user" :label-col="labelCol" :wrapper-col="wrapperCol">
          <!-- User ID -->
          <a-form-model-item label="User ID">
            <span class="text-primary"> {{ user._id }} </span>
          </a-form-model-item>

          <!-- Authentication -->
          <a-form-model-item label="Authentication">
            <a-input-group compact>
              <a-input v-model="user.username" style="width: 50%" placeholder="Username" />
              <a-input v-model="user.password" style="width: 50%" placeholder="Password" type="password" />
            </a-input-group>
          </a-form-model-item>

          <!-- Name -->
          <a-form-model-item label="Name/Lastname">
            <a-input-group compact>
              <a-input v-model="user.name" style="width: 50%" placeholder="Name" />
              <a-input v-model="user.lastname" style="width: 50%" placeholder="Last Name" />
            </a-input-group>
          </a-form-model-item>

          <!-- Display Name -->
          <a-form-model-item label="Display Name">
            <a-input v-model="user.display_name" placeholder="Display Name" />
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

          <!-- Department/Job Title -->
          <a-form-model-item label="Department/Job Title">
            <a-input-group compact>
              <a-select v-model="user.department" default-value="tech" style="width: 50%">
                <a-select-option
                  v-for="department in options['DEPARTMENT']"
                  :key="department.key"
                  :value="department.key"
                >
                  {{ department.name }}
                </a-select-option>
              </a-select>

              <a-select v-model="user.job_title" default-value="officer" style="width: 50%">
                <a-select-option v-for="job_title in options['JOB_TITLES']" :key="job_title.key" :value="job_title.key">
                  {{ job_title.name }}
                </a-select-option>
              </a-select>
            </a-input-group>
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
            <a-input v-model="user.bio" type="textarea" :rows="4" />
          </a-form-model-item>

          <!-- Note -->
          <a-form-model-item label="Note">
            <a-input v-model="user.note" type="textarea" />
          </a-form-model-item>

          <!-- Roles/Permissions -->
          <a-form-model-item label="Roles/Permissions">
            <a-input-group compact>
              <a-select mode="tags" v-model="user.roles" default-value="tech" style="width: 50%">
                <a-select-option value="superadmin"> Superadmin </a-select-option>
                <a-select-option value="admin"> Admin </a-select-option>
                <a-select-option value="editor"> Editor </a-select-option>
                <a-select-option value="visitor"> Visitor </a-select-option>
              </a-select>

              <a-select mode="tags" v-model="user.permissions" default-value="tech" style="width: 50%">
                <a-select-option value="all"> All </a-select-option>
                <a-select-option value="default"> Default </a-select-option>
                <a-select-option value="content"> Content </a-select-option>
                <a-select-option value="users"> Users </a-select-option>
              </a-select>
            </a-input-group>
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
      <!-- <a-layout-footer> {{ user }}</a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script>
import store from '@/store'
import options from '@/options'

export default {
  data() {
    return {
      mode: 'new',
      user: null,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      options,
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
    if (this.$route.params.username === 'new') {
      this.mode = 'new'
      this.user = {}
    } else {
      this.mode = 'edit'
      this.user = await store.dispatch('users/fetchUserByUsername', this.$route.params.username)
    }
  },
}
</script>

<style lang="scss" scoped></style>
