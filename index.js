var postcss = require('postcss');

// list of all plugins
var processors = [
  {
    plugin: require('autoprefixer'),
    namespace: 'autoprefixer',
    defaults: {}
  },
  {
    plugin: require('postcss-import'),
    namespace: 'import',
    defaults: {}
  },
  {
    plugin: require('postcss-mixins'),
    namespace: 'mixins',
    defaults: {}
  },
  {
    plugin: require('postcss-advanced-variables'),
    namespace: 'variables',
    defaults: {}
  },
  {
    plugin: require('postcss-custom-media'),
    namespace: 'media',
    defaults: {}
  },
  {
    plugin: require('postcss-media-minmax'),
    namespace: 'minmax',
    defaults: {}
  },
  {
    plugin: require('postcss-calc'),
    namespace: 'calc',
    defaults: {}
  },
  {
    plugin: require('postcss-color-function'),
    namespace: 'color',
    defaults: {}
  },
  {
    plugin: require('postcss-nesting'),
    namespace: 'nesting',
    defaults: {}
  },
  {
    plugin: require('postcss-nested'),
    namespace: 'nested',
    defaults: {}
  },
  {
    plugin: require('postcss-property-lookup'),
    namespace: 'lookup',
    defaults: {
      logLevel: 'warn'
    }
  },
  {
    plugin: require('postcss-selector-matches'),
    namespace: 'matches',
    defaults: {}
  },
  {
    plugin: require('postcss-selector-not'),
    namespace: 'not',
    defaults: {}
  },
  {
    plugin: require('postcss-fontpath'),
    namespace: 'fontpath',
    defaults: {}
  },
  {
    plugin: require('postcss-reporter'),
    namespace: 'reporter',
    defaults: {}
  }
];

// load all plugins
module.exports = postcss.plugin('msops-css', function load(opt) {
  var instance = postcss();
  var options = opt || {};

  // for each plugin
  processors.forEach(function process(processor) {
    var namespaceOptions = processor.namespace in options ? options[processor.namespace] : options;
    var processorOptions = {};

    Object.keys(processor.defaults).forEach(function processDefaults(key) {
      processorOptions[key] = processor.defaults[key];
    });

    Object.keys(namespaceOptions).forEach(function processNamespace(key) {
      processorOptions[key] = namespaceOptions[key];
    });

    if (namespaceOptions && !processorOptions.disable) {
      instance.use(processor.plugin(processorOptions));
    }
  });

  return instance;
});
