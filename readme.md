


This repo produces the documentation at [trivial-js.org](https://www.trivial-js.org).

## Updating the docs
Documentation is built by Vitepress, full documentation is available at [Vitepress.dev](https://vitepress.dev)

Start the dev server locally:
```
nvm use 18.16.0
npm install
npm run docs:dev
```

### Adding a page to the sidebar
1. Make a Markdown file ending in `.md` file in `/docs`
2. Edit the **sidebar** section of `/docs/.vitepress/config.ts`

### How to contribute

1. Fork it ( https://github.com/solid-adventure/trivial-docs/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request