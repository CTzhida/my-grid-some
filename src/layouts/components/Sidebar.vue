<template>
  <div>
    <el-card shadow="never">
      <el-menu :default-active="active" @select="onSelect">
        <el-menu-item v-for="item in constantRouterMap" v-if="item.meta&&item.meta.type=='user'&&(token||!item.meta.LoginRequired)&&(!mini||!item.meta.mini)"
          :key="item.path" :index="item.path">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </el-menu>
    </el-card>
    <el-card shadow="never" style="margin-top: 20px;text-align: center">
      <div v-if="!token" style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
        <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token未绑定&nbsp;&nbsp;
        <el-button type="text" @click="openTokenDialog">绑定</el-button>
      </div>
      <div v-if="token" style="font-size: 0.9rem;line-height: 1.5;color: #303133;">
        <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token已绑定&nbsp;&nbsp;
        <el-button type="text" @click="cancellation">注销</el-button>
      </div>
      <div style="margin-top: 10px;text-align: left">
        <el-alert
          title="Token获取"
          type="info"
          description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md"
          :closable="false">
        </el-alert>
      </div>
    </el-card>
    <!-- <token-dialog ref="tokenDialog"></token-dialog> -->
  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  // import { constantRouterMap } from '@/router'
  // import TokenDialog from '@/views/common/TokenDialog'
  export default {
    components: {
      // TokenDialog
    },
    data() {
      return {
        token: '',
        mini: false,
        constantRouterMap: [{
          path: '/user/new',
          redirect: '/user/new/main',
          meta: {
            type: "user",
            icon: 'el-icon-star-off',
            title: '最新动态'
          },
          children: [
            {
                path: 'main',
                meta: { title: '最新动态' }
            }
          ]
        }, {
          path: '/user/social',
          redirect: '/user/social/main',
          meta: {
            type: "user",
            icon: 'el-icon-mobile-phone',
            title: '社交圈'
          },
          children: [
            {
                path: 'main',
                meta: { title: '社交圈' }
            },
            {
                path: 'details/:name',
                meta: { title: '用户资料' }
            }
          ]
        }, {
          path: '/user/blog',
          redirect: '/user/blog/main',
          meta: {
            type: "user",
            icon: 'el-icon-edit-outline',
            title: '博客列表'
          },
          children: [
            {
              path: 'main',
              meta: { title: '博客列表' }
            },
            {
              path: 'add',
              meta: { title: '发表博客' }
            },
            {
              path: 'edit/:id',
              meta: { title: '编辑博客' }
            },
            {
              path: 'details/:id',
              meta: { title: '博客详情' }
            }
          ]
        }, {
          path: '/user/project',
          redirect: '/user/project/main',
          meta: {
            type: "user",
            icon: 'el-icon-service',
            title: '开源项目'
          },
          children: [
            {
              path: 'main',
              meta: { title: '项目列表' }
            },
            {
              path: 'details/:name',
              meta: { title: '项目详情' }
            }
          ]
        }, {
          path: '/user/helper',
          redirect: '/user/helper/main',
          meta: {
            type: "user",
            icon: 'el-icon-printer',
            title: '使用帮助',
            mini: true
          },
          children: [
            {
              path: 'main',
              meta: { title: '使用帮助' }
            }
          ]
        }, {
          path: '/user/readme',
          redirect: '/user/readme/main',
          meta: {
            type: "user",
            icon: 'el-icon-document',
            title: 'README.md'
          },
          children: [
            {
              path: 'main',
              meta: { title: 'README.md' }
            }
          ]
        }, {
          path: '/user/configure',
          redirect: '/user/configure/main',
          meta: {
            type: "user",
            icon: 'el-icon-setting',
            title: '系统配置',
            LoginRequired: true
          },
          children: [
            {
              path: 'main',
              meta: { title: '系统配置' }
            }
          ]
        }, {
          path: "/404", 
        }, {
          path: '/',
          redirect: '/user/new',
        }],
        active: "",
        parentUrl: "",
        menuList: []
      }
    },
    computed: {
          
    },
    mounted() {
      let arr = this.$route.path.split("/")
      this.active = "/" + arr[1] + "/" + arr[2]
    },
    methods: {
      onSelect(index) {
        this.$router.push(index)
      },
      openTokenDialog() {
        this.$refs.tokenDialog.open(() => {
          
        })
      },
      cancellation() {
        this.$store.dispatch("Cancellation")
      }
  }
}
</script>