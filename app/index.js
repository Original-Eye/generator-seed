'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SeedGenerator = module.exports = function SeedGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  //testing the location of stuff
  this.AssetPath = 'client';

};

util.inherits(SeedGenerator, yeoman.generators.Base);

SeedGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'applicationName',
    message: 'What is the name of this appication?',
  }];

  this.prompt(prompts, function (props) {
    this.applicationName = props.applicationName;

    cb();
  }.bind(this));
};

SeedGenerator.prototype.folders = function folders() {
  this.mkdir('build');
};

SeedGenerator.prototype.app = function app() {

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('client/index.html', 'client/index.html');
  this.template('client/js/app.js', 'client/js/app.js');
  this.template('client/js/controllers/login.js', 'client/js/controllers/login.js');
  this.template('client/js/controllers/main.js', 'client/js/controllers/main.js');
  this.template('client/views/login.html', 'client/views/login.html');
  this.template('client/views/main.html', 'client/views/main.html');
  //don't want to template this as it's got lots of variables templated for the grunt file itself.
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  //client directory and contents
  this.directory('client/css', 'client/css');
  this.directory('client/fonts', 'client/fonts');
  this.directory('client/images', 'client/images');
  this.directory('client/views', 'client/views');
  this.directory('server', 'server');
  this.directory('scripts', 'scripts');
  this.directory('test', 'test');

};


SeedGenerator.prototype.projectfiles = function projectfiles() {
  this.template('editorconfig', '.editorconfig');
  this.template('jshintrc', '.jshintrc');
  this.template('_bowerrc', '.bowerrc');
};
