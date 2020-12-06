// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome-czd',
  template: {
    Post: {
      path: '/post/:id',
      component: './src/template/post.vue'
    }
  },
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://39.108.190.133:1337',
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['blog', 'user', 'follower', 'following', 'project'],
        // singleTypes: ['impressum'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        loginData: {
          identifier: 'admin',
          password: 'czd2436'
        }
      }
    }
  ]
}
