/* eslint-disable */

const path = require('path')
const SitePrerender = require('site-prerender')
const blogList = require('../public/data/blog-list.json')
const tagList = require('../public/data/tag-list.json')

;(async () => {
  // TODO: configuration
  const defaultRoutes = [
    '/',
    '/about',
    '/app-cute-bunny-privacy'
  ]
  const blogListRoutes = blogList.map(item => `/blog/${item.id}`)
  const tagListRoutes = Object.keys(tagList).map(item => `/tag/${item}`)

  const routes = [
    ...defaultRoutes,
    ...blogListRoutes,
    ...tagListRoutes,
  ]


  const sp = new SitePrerender({
    staticPath: path.join(__dirname, '../dist'),
    outputFolder: path.join(__dirname, '../output'),
    routes,
  })

  await sp.init()
  await sp.start()
  await sp.close()
})()
