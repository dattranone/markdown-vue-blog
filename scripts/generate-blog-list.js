/* eslint-disable */

// This script is to
// - Read the list of markdown files in /public/data/blog
// - Parse the markdown file into HTML
// - Get the first <h1> to serve as title, first <p> as the summary
// - Save the list in to /public/data/blog-list.json


const path = require('path');
const fs = require('fs');
const MarkdownIt = require('markdown-it');
const cheerio = require('cheerio');

const md = new MarkdownIt();

const getTitle = ($) => {
  try {
    return $('h1').first().text();
  } catch {
    return null
  }
}

const getSummary = ($) => {
  try {
    return $('p').first().text();
  } catch {
    return ''
  }
}

(async () => {
  const list = [];
  const dataDir = path.join(__dirname, '../public/data')
  const blogMdDir = path.join(dataDir, '/blog');
  const dir = fs.opendirSync(blogMdDir);

  for await (let file of dir) {
    const name = file.name;
    const mdFileDir = path.join(blogMdDir, name);
    const content = fs.readFileSync(mdFileDir, 'utf-8');
    const parsedResult = md.render(content);
    const $ = cheerio.load(parsedResult);

    const title = getTitle($);
    const summary = getSummary($);

    if (title) {
      list.push({
        id: name.replace('.md', ''),
        title,
        summary,
      })
    }
  }

  const blogListDir = path.join(dataDir, 'blog-list.json');
  fs.writeFileSync(blogListDir, JSON.stringify(list));
})()
