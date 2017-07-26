'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the majestic ' + chalk.red('generator-bower-component') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'component_name',
      message: 'Your project name',
      default: this.appname // Default to current folder name
    }, {
      type: 'input',
      name: 'author',
      message: 'Author of project',
      default: this.appname // Default to current folder name
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    var files = ['.eslintrc', 'bower.json', 'gulpfile.js', 'package.json', 'README.md', 'version.txt', 'config', 'npm-gulp-tasks', 'scss', 'src', 'test'];
    var i;
    for (i = 0; i < files.length; i++) {
      this.fs.copyTpl(
        this.templatePath(files[i]),
        this.destinationPath(files[i]),
        {data: this.props}
      );
    }
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  install() {
    // This.npmInstall();
    this.runInstall('bower');
  }
};
