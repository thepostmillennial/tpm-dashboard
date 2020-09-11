<template>
  <div class="view members member">
    <a-layout class="max-width-900" v-if="member">
      <a-page-header
        title="Member Details"
        :sub-title="`${member.display_name ? member.display_name : ''} (${member.username})`"
        @back="() => $router.push('/members')"
      >
        <a-descriptions size="small" :column="2" bordered>
          <a-descriptions-item label="Member ID"> {{ member._id }} </a-descriptions-item>
          <a-descriptions-item label="Stripe ID">
            <a :href="`https://dashboard.stripe.com/customers/${member.stripe_customer_id}`" target="_blank">
              {{ member.stripe_customer_id }}</a
            >
          </a-descriptions-item>
          <a-descriptions-item label="Created At"> {{ member.created_at | moment('lll') }} </a-descriptions-item>
          <a-descriptions-item label="Updated At" v-if="member.updated_at">
            {{ member.updated_at | moment('lll') }}
          </a-descriptions-item>
        </a-descriptions>
      </a-page-header>

      <a-layout-content class="p-4 d-flex flex-column flex-md-row">
        <div class="sider p-4 d-flex flex-column align-items-center" style="gap: 0.5rem">
          <a-avatar :size="120" :src="member.avatar_url" shape="square" icon="user" />
          <span>{{ member.name + ' ' + member.lastname }}</span>
          <span>{{ member.username }}</span>
          <span>{{ member.email }}</span>

          <a
            class="btn btn-primary btn-sm d-flex align-items-center"
            :href="`https://dashboard.stripe.com/customers/${member.stripe_customer_id}`"
            target="_blank"
          >
            <i class="icmn-credit-card"></i>
            <span class="pl-1">Stripe Profile</span>
          </a>
        </div>
        <a-form-model class="p-3 flex-grow-1 border rounded" :model="member" v-bind="config">
          <!-- Authentication -->
          <a-form-model-item label="Authentication" required>
            <a-input-group compact>
              <a-input v-model="member.username" style="width: 50%" placeholder="Username" />
              <a-input v-model="member.password" style="width: 50%" placeholder="Password" type="password" />
            </a-input-group>
          </a-form-model-item>

          <!-- Name -->
          <a-form-model-item label="Name/Lastname">
            <a-input-group compact>
              <a-input v-model="member.name" style="width: 50%" placeholder="Name" />
              <a-input v-model="member.lastname" style="width: 50%" placeholder="Last Name" />
            </a-input-group>
          </a-form-model-item>

          <!-- Display Name -->
          <a-form-model-item label="Display Name">
            <a-input v-model="member.display_name" placeholder="Display Name" />
          </a-form-model-item>

          <!-- Email -->
          <a-form-model-item label="Email" required>
            <a-input v-model="member.email" placeholder="Email" />
          </a-form-model-item>

          <!-- Phone -->
          <a-form-model-item label="Phone">
            <a-input-group compact>
              <a-input v-model="member.phone" style="width: 50%" placeholder="Number" />
              <a-input v-model="member.extension" style="width: 50%" placeholder="Extension" />
            </a-input-group>
          </a-form-model-item>

          <!-- Location -->
          <a-form-model-item label="Location">
            <a-input v-model="member.location" />
          </a-form-model-item>

          <!-- Address -->
          <a-form-model-item label="Address">
            <a-input v-model="member.address" />
          </a-form-model-item>

          <!-- Primary Language -->
          <a-form-model-item label="Primary Language">
            <a-input-group>
              <a-select v-model="member.locale" default-value="en-US" style="width: 100%">
                <a-select-option value="en-US"> English (U.S) </a-select-option>
                <a-select-option value="fr-FR"> French (France) </a-select-option>
              </a-select>
            </a-input-group>
          </a-form-model-item>

          <!-- Bio -->
          <a-form-model-item label="Bio">
            <a-input v-model="member.bio" type="textarea" :rows="4" />
          </a-form-model-item>

          <!-- Note -->
          <a-form-model-item label="Note">
            <a-input v-model="member.note" type="textarea" :rows="4" />
          </a-form-model-item>

          <!-- Roles/Permissions -->
          <a-form-model-item label="Roles/Permissions">
            <a-input-group compact>
              <a-select mode="tags" v-model="member.roles" default-value="regular" style="width: 50%">
                <a-select-option value="superadmin"> Superadmin </a-select-option>
                <a-select-option value="admin"> Admin </a-select-option>
                <a-select-option value="editor"> Editor </a-select-option>
                <a-select-option value="visitor"> Visitor </a-select-option>
                <a-select-option value="regular"> Regular </a-select-option>
              </a-select>

              <a-select mode="tags" v-model="member.permissions" default-value="default" style="width: 50%">
                <a-select-option value="all"> All </a-select-option>
                <a-select-option value="default"> Default </a-select-option>
              </a-select>
            </a-input-group>
          </a-form-model-item>

          <!-- Status -->
          <a-form-model-item label="Status" prop="status">
            <a-select v-model="member.systems.status" default-value="active" style="width: 50%">
              <a-select-option value="pending"> Pending </a-select-option>
              <a-select-option value="active"> Active </a-select-option>
              <a-select-option value="inactive"> Inactive </a-select-option>
              <a-select-option value="baned"> Baned </a-select-option>
            </a-select>
          </a-form-model-item>

          <!-- Active -->
          <a-form-model-item label="Active" prop="active">
            <a-switch v-model="member.active" />
          </a-form-model-item>

          <!-- Actions -->
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="update"> Update </a-button>
            <a-button style="margin-left: 10px" @click="$router.push('/system/users')"> Cancel </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-layout-content>
      <a-layout-footer> {{ member }}</a-layout-footer>
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
      member: null,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      options,
    }
  },
  computed: {
    config() {
      return {
        layout: 'vertical',
      }
    },
  },
  methods: {
    async update() {
      if (this.member) {
        const member = await store.dispatch('members/updateMember', this.member)
        if (member) {
          this.member = member
          this.$message.success(`Member ${member.username} has been updated successfully!`)
        } else {
          this.$message.error('Oops, The member update failed!')
        }
      }
    },
  },
  async created() {
    this.member = await store.dispatch('members/fetchMemberById', this.$route.params.id)
  },
}
</script>

<style lang="scss" scoped></style>
