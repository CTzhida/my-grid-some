<template>
  <Layout>
     <div>
    <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px">
      <el-tabs v-model="activeTab" type="card" @tab-click="onSelect">
        <el-tab-pane :label="'粉丝 '+followersTotal" name="followers" style="padding: 5px">
          <div v-loading="followers.loading">
            <div v-if="followers.list.length">
              <el-row style="min-height: 200px; ">
                <el-col v-for="(item,index) in followers.list" :span="8" :key="'followers'+index" style="padding: 10px">
                  <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                    <i class="el-icon-star-off"/>&emsp;
                    <a style=" text-decoration:none;cursor:pointer" @click="$router.push(`/user/social/details/${item.node.name}`)">{{ item.node.name }}</a>
                    <br>
                    <i class="el-icon-message"/>&emsp;
                    <a :href="item.node.htmlUrl" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</a>
                    <br>
                    <img :src="item.node.avatarUrl" style="width: 100%;border-radius:5px;margin-top: 5px">
                  </el-card>
                </el-col>
              </el-row>
              <div style="text-align: center;margin-top: 10px">
                <el-pagination
                  :current-page.sync="followers.query.page"
                  :page-size="followers.query.pageSize"
                  :total="followers.query.pageNumber*followers.query.pageSize"
                  background
                  layout="prev, pager, next"
                  @current-change="onSelect"/>
              </div>
            </div>
            <div v-else style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center">
              <font style="font-size: 30px;color:#dddddd ">
                <b>(￢_￢) 没有一个粉丝</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'关注 '+followingTotal" name="following" style="padding: 5px">
          <div v-loading="following.loading">
            <div v-if="following.list.length">
              <el-row style="min-height: 200px; ">
                <el-col v-for="(item,index) in following.list" :span="8" :key="'following'+index" style="padding: 10px">
                  <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                    <i class="el-icon-star-off"/>&emsp;
                    <a style=" text-decoration:none;cursor:pointer" @click="$router.push(`/user/social/details/${item.node.name}`)">{{ item.node.name }}</a>
                    <br>
                    <i class="el-icon-message"/>&emsp;
                    <a :href="item.node.htmlUrl" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</a>
                    <br>
                    <img :src="item.node.avatarUrl" style="width: 100%;border-radius:5px;margin-top: 5px">
                  </el-card>
                </el-col>
              </el-row>
              <div style="text-align: center;margin-top: 10px">
                <el-pagination
                  :current-page.sync="following.query.page"
                  :page-size="following.query.pageSize"
                  :total="following.query.pageNumber*following.query.pageSize"
                  background
                  layout="prev, pager, next"
                  @current-change="onSelect"/>
              </div>
            </div>
            <div v-else style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center">
              <font style="font-size: 30px;color:#dddddd ">
                <b>(￢_￢) 还没有关注一个人</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
  </Layout>
</template>
<page-query>
query {
  followers: allStrapiFollower {
    edges {
      node {
        id
        name
        htmlUrl
        avatarUrl
      }
    }
    totalCount
  }
  followings: allStrapiFollowing {
    edges {
      node {
        id
        name
        htmlUrl
        avatarUrl
      }
    }
    totalCount
  }
}

</page-query>
<script>
// import { mapGetters } from 'vuex'
// import UserApi from '@/api/user'

export default {
  data() {
    return {
      activeTab: 'followers',
      followersTotal: 0,
      followingTotal: 0,
      followers: {
        query: {
          page: 1,
          pageSize: 9,
          pageNumber: 1
        },
        loading: false,
        list: []
      },
      following: {
        query: {
          page: 1,
          pageSize: 9,
          pageNumber: 1
        },
        loading: false,
        list: []
      }
    }
  },
  computed: {
    
    // ...mapGetters([
    //   'githubUsername',
    //   'followersTotal',
    //   'followingTotal'
    // ])
  },
  mounted() {
    // this.onSelect()
    console.log(this.$page.followings)
    this.followers.list = this.$page.followers.edges
    this.followersTotal = this.$page.followers.totalCount
    this.following.list = this.$page.followings.edges
    this.followingTotal = this.$page.followings.totalCount
  },
  methods: {
    onSelect() {
      switch (this.activeTab) {
        case 'followers':
          this.listFollowers()
          break
        case 'following':
          this.listFollowing()
          break
        default:
          break
      }
    },
    listFollowers() {
      this.followers.loading = true
      const a = this.followers.query.page * this.followers.query.pageSize
      const startIndex = (this.followers.query.page - 1) * this.followers.query.pageSize
      const endIndex = a > this.followersTotal ? this.followersTotal : a
      this.followers.list = this.followers.list.slice(startIndex, endIndex)
      this.followers.loading = false
    },
    listFollowing() {
      this.following.loading = true
      const a = this.following.query.page * this.following.query.pageSize
      const startIndex = (this.following.query.page - 1) * this.following.query.pageSize
      const endIndex = a > this.followingTotal ? this.followingTotal : a
      this.following.list = this.following.list.slice(startIndex, endIndex)
      this.following.loading = false
    }
  }
}
</script>
