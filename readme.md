


This repo produces the documentation at [trivial-js.org](trivial-js.org).

## Updating the docs
Documentation is built by Vitepress, full documentation is available at [Vitepress.dev](https://vitepress.dev)

Start the dev server locally:
```
nvm use 18.16.0
npm run docs:dev
```

### Adding a page to the sidebar
1. Make a Markdown file ending in `.md` file in `/docs`
2. Edit the **sidebar** section of `/docs/.vitepress/config.ts`

