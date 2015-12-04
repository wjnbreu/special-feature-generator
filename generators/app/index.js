'use strict';

var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var yosay = require('yosay');

module.exports = generators.Base.extend({


  // -------------------------------------------------
  //
  // Init Base
  // 
  // -------------------------------------------------
  
  constructor: function(){
    var testLocal;

    generators.Base.apply(this, arguments);


    this.option('babel', {
      desc: 'Use Babel',
      type: Boolean,
      defaults: true
    });

  },


  // -------------------------------------------------
  //
  // Init
  // 
  // -------------------------------------------------
  
  initializing: function(){
    this.pkg = require('../../package.json');
  },


  // -------------------------------------------------
  //
  // Prompts
  // 
  // -------------------------------------------------
  
  askFor: function(){
    var done = this.async();

    this.log(yosay('Hey there friend. Out of the box I include Browserify, Gulp + Headroom.js'));


    var prompts = [
      {
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [
          {
            name: 'Sass',
            value: 'includeSass',
            checked: true
          },
          {
            name: 'Jade',
            value: 'includeJade',
            checked: true
          },
          {
            name: 'Modernizr',
            value: 'includeModernizr',
            checked: false
          }
        ]
      },

      {
        type: 'confirm',
        name: 'includeJquery',
        message: 'Would you like to include jQuery?',
        default: true
      }
    ];

    // ------------------------------------------------
    // Ask
    //
    
    this.prompt(prompts, function(answers){
      var features = answers.features;

      function hasFeature(feat){
        return features && features.indexOf(feat) !== -1;
      }

      this.includeSass = hasFeature('includeSass');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includeJQuery = answers.includeJQuery;


      done();

    }.bind(this));
  },


  // -------------------------------------------------
  //
  // Write Files
  // 
  // -------------------------------------------------
  writing: {

    // ------------------------------------------------
    // Gulp
    //
    
    gulpfile: function(){

      this.fs.copyTpl(
        this.templatePath('_Gulpfile.js'),
        this.destinationPath('Gulpfile.js'),
        //options
        {
          pkg: this.pkg,
          includeSass: this.includeSass,
          includeModernizr: this.includeModernizr,
          useBabel: this.options['babel']
        }
      );
    },

    // ------------------------------------------------
    // Package.JSON
    //
    
    packageJSON: function(){

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        //options
        {
          includeSass: this.includeSass,
          includeModernizr: this.includeModernizr,
          includeJQuery: this.includeJQuery,
          useBabel: this.options['babel']
        }
      );
    },

    // ------------------------------------------------
    // Gitignore
    //
    git: function(){
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );
    },


    // ------------------------------------------------
    // Editor config
    //
    editorConfig: function(){
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );

    },


    // ------------------------------------------------
    // Scripts
    //
    scripts: function(){
      this.fs.copy(
        this.templatePath('main.js'),
        this.destinationPath('app/scripts/main.js')
      );
    },


    // ------------------------------------------------
    // Styles
    //
    styles: function(){
      var stylesheet;

      if (this.includeSass){
        stylesheet = 'main.scss';
      }

      else{
        stylesheet = 'main.css';
      }


      this.fs.copyTpl(
        this.templatePath(stylesheet),
        this.destinationPath('app/styles/' + stylesheet)
      );
    },



    // ------------------------------------------------
    // HTML
    //
    html: function(){

      var entry;

      if (this.includeJade){
        entry = 'index.jade';
      }

      else{
        entry = 'index.html';
      }

      this.fs.copyTpl(
        this.templatePath(entry),
        this.destinationPath('app/' + entry),
        {
          includeModernizr: this.includeModernizr
        }
      );
    },


    // ------------------------------------------------
    // Icons
    //
    icons: function(){

      this.fs.copy(
        this.templatePath('favicon.ico'),
        this.destinationPath('app/favicon.ico')
      );

      this.fs.copy(
        this.templatePath('icons'),
        this.destinationPath('app/icons')
      );
    },


    // ------------------------------------------------
    // Robots
    //
    robots: function(){
      this.fs.copy(
        this.templatePath('robots.txt'),
        this.destinationPath('app/robots.txt')
      );
    },


    // ------------------------------------------------
    // Misc
    //
    misc: function(){
      mkdirp('app/images');
      mkdirp('app/fonts');
    }
    
    
  },



  // -------------------------------------------------
  //
  // Install Deps
  // 
  // -------------------------------------------------
  
  install: function(){
    this.npmInstall();
  },


  // -------------------------------------------------
  //
  // Signoff
  // 
  // -------------------------------------------------
  
  end: function(){
    console.log('YO, all done');
  }

});


