import Generator = require('yeoman-generator')

class ProjectGenerator extends Generator {
  writing() {
    this.fs.copyTpl(this.templatePath('**/*'), this.destinationPath('.'), { appName: this.appname })
    this.fs.copyTpl(this.templatePath('**/.*'), this.destinationPath('.'), { appName: this.appname })
    this.fs.copyTpl(this.templatePath('.vscode'), this.destinationPath('.vscode'), { appName: this.appname })
    this.config.save()
  }
  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true,
    })
  }
}

module.exports = ProjectGenerator
