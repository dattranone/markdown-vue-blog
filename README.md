# markdown-vue-blog

## Basic idea

This is a very basic blog wrriten in VueJS
- The content is written in markdown format
- To write a new blog, we create a new `.md` file in `public/data/blog` folder
- To generate the blog list from the file above, we use script `npm run generate-blog-list`, which generate a blog list in JSON format `public/data/blog-list.json`

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Markdown format rules

#### Title
Use a `h1` tag for title
```
# this is the title
```

#### Tags
to add tags to blog, use block quote which `tags` as a language.

```
```tags
tag1, tag2, tag3
```
```
