import {
  MainHtmlCompiler,
  TemplateHtmlCompiler,
  StaticHtmlCompiler,
  utils,
} from 'meteor/static-html-compiler';

class TemplateCacheCompiler extends TemplateHtmlCompiler {
  compileContents(file, contents) {
    const templateUrl = file.getTemplateUrl();
    const template = utils.clean(contents);

    return `
    var templateUrl = '${templateUrl}';
    angular.module('angular-templates').run(['$templateCache', function($templateCache) {
      $templateCache.put(templateUrl, "${template}");
    }]);
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = templateUrl;
    }`;
  }
}

Plugin.registerCompiler({
  extensions: ['html']
}, () => new StaticHtmlCompiler(new MainHtmlCompiler, new TemplateCacheCompiler));
