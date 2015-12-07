# generator-rbma-feature [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Small generator that scaffolds out RBMA special feature

## Installation

First, install [Yeoman](http://yeoman.io) and generator-rbma-feature using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-rbma-feature
```

Then make a directory, cd into it, and generate your new project:

```bash
yo rbma-feature
```

##Options
More options will be included shortly, but as of now, this generator comes with:
- Gulp for building
- Browserify for bundling
- Sass for styles (actually SCSS)
- Bourbon for mixins
- Babel for ES6
- Headroom.js for RBMA nav
- Async cuz it helps
- Jade for views (can be disabled in favor of vanilla HTML when scaffolding)
- JQuery (can also be disabled when scaffolding)


##Additional Packages
Can be installed using npm (ie d3, three, browser-request, etc). They will be packaged up via browserify

###But I Want to Use Non-NPM packages?!
No problem. But you still need to let browserify know about it. Just set the shim in `package.json` file and include the JS from a CDN in the `index.html/jade` file, or add to the `lib` directory. Then `require('some-thing')` like normal.

## License

MIT © [RDS]()


[npm-image]: https://badge.fury.io/js/generator-rbma-feature.svg
[npm-url]: https://npmjs.org/package/generator-rbma-feature
[travis-image]: https://travis-ci.org/rbma/generator-rbma-feature.svg?branch=master
[travis-url]: https://travis-ci.org/rbma/generator-rbma-feature
[daviddm-image]: https://david-dm.org/rbma/generator-rbma-feature.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/rbma/generator-rbma-feature
[coveralls-image]: https://coveralls.io/repos/rbma/generator-rbma-feature/badge.svg
[coveralls-url]: https://coveralls.io/r/rbma/generator-rbma-feature
