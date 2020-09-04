<template>
  <div class="view contributions reminders">
    <div class="page">
      <div class="header">
        <h2>Contributions Reminders</h2>
      </div>
      <div class="content">
        <div class="card">
          <div class="card-header card-header-flex">
            <div class="d-flex flex-column justify-content-center mr-auto">
              <h5 class="mb-0">
                Reminders List
                <span :key="$store.getters['contributions/meta'].total" class="animated fadeIn"
                  >({{ $store.getters['contributions/meta'].total }})</span
                >
              </h5>
            </div>
            <div class="d-flex flex-column justify-content-center">
              <a class="btn btn-primary" href="javascript: void(0);">New Reminder</a>
            </div>
          </div>
          <div class="card-body">
            <a-table
              size="small"
              :loading="$store.getters['contributions/loading']"
              :columns="columns"
              :dataSource="reminders"
              :rowKey="(record, index) => record._id"
              :customRow="rowClick"
              :scroll="{ x: 1000, y: '100%' }"
              :pagination="pagination"
              @change="change"
            >
              <span slot="method" slot-scope="reminder">
                <a-tag color="#87d068"> {{ reminder.method | capitalize }} </a-tag>
              </span>

              <span slot="sent" slot-scope="reminder"
                ><span class="dot" :class="{ active: reminder.sent }"></span>
              </span>

              <span slot="type" slot-scope="type">
                <a-tag color="#108ee9"> {{ type | capitalize }} </a-tag>
              </span>

              <span slot="method" slot-scope="reminder">
                <a-tag color="#87d068"> {{ reminder.method | capitalize }} </a-tag>
              </span>

              <span slot="phone" slot-scope="phone">
                <span> {{ phone ? phone : 'N/A' }} </span>
              </span>

              <span slot="next_reminder_date" slot-scope="date">
                <span> {{ date | moment('ll') }} </span>
              </span>

              <span slot="created_at" slot-scope="date">
                <span> {{ date | moment('ll') }} </span>
              </span>

              <span slot="expiry_date" slot-scope="date">
                <span> {{ date | moment('ll') }} </span>
              </span>
              >
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'

export default {
  async beforeRouteEnter(to, from, next) {
    await store.dispatch('contributions/fetchReminders')
    next()
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },
  data() {
    return {
      columns: [
        {
          title: 'Sent',
          key: 'sent',
          width: '80px',
          align: 'center',
          filters: [
            {
              text: 'Yes',
              value: 'true',
            },
            {
              text: 'No',
              value: 'false',
            },
          ],
          filterMultiple: false,
          onFilter: (sent, reminders) => {
            if ('sent' in reminders) {
              return sent === reminders.sent ? 'true' : 'false'
            } else {
              return 'false'
            }
          },
          scopedSlots: { customRender: 'sent' },
        },
        {
          title: 'Reminder Type',
          dataIndex: 'type',
          key: 'type',
          width: '160px',
          sorter: (a, b) => {
            if (a.type && b.type) {
              return a.type.localeCompare(b.type)
            }
            return 0
          },
          scopedSlots: { customRender: 'type' },
        },
        {
          title: 'Method',
          key: 'method',
          width: '80px',
          align: 'center',
          scopedSlots: { customRender: 'method' },
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: '200px',
          sorter: (a, b) => {
            return a.email.localeCompare(b.email)
          },
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
          sorter: (a, b) => {
            if (a.phone && b.phone) return a.phone.localeCompare(b.phone)
            return 0
          },
          scopedSlots: { customRender: 'phone' },
        },
        {
          title: 'Reminder Date',
          dataIndex: 'next_reminder_date',
          key: 'next_reminder_date',
          sorter: (a, b) => {
            const ta = new Date(a.next_reminder_date)
            const tb = new Date(b.next_reminder_date)
            return ta === tb ? 0 : ta > tb ? 1 : -1
          },
          defaultSortOrder: 'descend',
          scopedSlots: { customRender: 'next_reminder_date' },
        },
        {
          title: 'Created At',
          dataIndex: 'created_at',
          key: 'created_at',
          sorter: (a, b) => {
            const ta = new Date(a.created_at)
            const tb = new Date(b.created_at)
            return ta === tb ? 0 : ta > tb ? 1 : -1
          },
          defaultSortOrder: 'descend',
          scopedSlots: { customRender: 'created_at' },
        },
        {
          title: 'Expiry',
          dataIndex: 'expiry_date',
          key: 'expiry_date',
          sorter: (a, b) => {
            const ta = new Date(a.expiry_date)
            const tb = new Date(b.expiry_date)
            return ta === tb ? 0 : ta > tb ? 1 : -1
          },
          defaultSortOrder: 'descend',
          scopedSlots: { customRender: 'expiry_date' },
        },
      ],
    }
  },
  methods: {
    rowClick: (record) => ({
      on: {
        click: (e) => router.push({ name: 'member-detail', params: { id: record._id } }),
      },
    }),
    change: (pagination, filters, sorter) => {
      store.dispatch('contributions/setRemindersQuery', { pagination, filters, sorter })
    },
  },
  computed: {
    reminders: () => store.getters['contributions/reminders'],
    pagination: () => store.getters['contributions/pagination'],
  },
  mounted() {
    // console.log(this.reminders)
  },
  destroyed() {
    store.dispatch('contributions/init')
  },
}
</script>

<style lang="scss" scoped>
.contributions.reminders {
  .status {
    border: none;
    text-transform: capitalize;
    background: #666;
    color: #fff;
    &.active {
      background: #00b44b;
    }
  }
  .dot {
    display: inline-block;
    height: 0.86rem;
    width: 0.86rem;
    background: #666;
    border-radius: 20px;
    vertical-align: middle;
    position: relative;
    top: -2px;

    &.active {
      background: #00b44b;
    }
  }
}
</style>
