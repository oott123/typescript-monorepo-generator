import Generator = require('yeoman-generator')

class ReactGenerator extends Generator {
  writing() {
    this.fs.copyTpl(this.templatePath('**/*'), this.destinationPath(`packages/${this.args[0]}`), {
      appName: this.args[0],
    })
    this.fs.copyTpl(this.templatePath('**/.*'), this.destinationPath(`packages/${this.args[0]}`), {
      appName: this.args[0],
    })
  }
  install() {
    // pass
  }
}

module.exports = ReactGenerator
