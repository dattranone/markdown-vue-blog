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
const _ = require('lodash');

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

const getTags = ($) => {
  try {
    const tagText = $('.language-tags').first().text();
    return tagText
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => !!tag);
  } catch (error) {
    return []
  }
}

(async () => {
  const blogList = [];
  const tagList = {};
  const dataDir = path.join(__dirname, '../public/data')
  const blogMdDir = path.join(dataDir, '/blog');
  const dir = fs.opendirSync(blogMdDir);

  for await (let file of dir) {
    const name = file.name;
    const id = name.replace('.md', '');
    const mdFileDir = path.join(blogMdDir, name);
    const content = fs.readFileSync(mdFileDir, 'utf-8');
    const parsedResult = md.render(content);
    const $ = cheerio.load(parsedResult);

    const title = getTitle($);
    console.log('check', parsedResult);
    const summary = getSummary($);
    const tags = getTags($);

    if (title) {
      blogList.push({
        id: name.replace('.md', ''),
        title,
        summary,
      })

      tags.forEach((tag) => {
        const existedTag = _.get(tagList, tag, []);
        existedTag.push({
          id,
          title,
          summary,
        });
        tagList[tag] = existedTag;
      });
    }
  }

  const blogListDir = path.join(dataDir, 'blog-list.json');
  const tagListDir = path.join(dataDir, 'tag-list.json');
  fs.writeFileSync(blogListDir, JSON.stringify(blogList));
  fs.writeFileSync(tagListDir, JSON.stringify(tagList));
})()
