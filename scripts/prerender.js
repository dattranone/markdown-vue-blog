/* eslint-disable */

const path = require('path')
const SitePrerender = require('site-prerender')
const blogList = require('../public/data/blog-list.json')


;(async () => {
  // TODO: configuration
  const routes = blogList.reduce((prev, curr) => {
    prev.push(`/blog/${curr.id}`)
    return prev
  }, [
    '/',
    '/about'
  ])

  const sp = new SitePrerender({
    staticPath: path.join(__dirname, '../dist'),
    outputFolder: path.join(__dirname, '../output'),
    routes,
  })

  await sp.init()
  await sp.start()
  await sp.close()
})()
