asynctest(
  'browser.tinymce.plugins.autolink.CharMapPluginTest',
  [
    'ephox.agar.api.Pipeline',
    'ephox.mcagar.api.LegacyUnit',
    'tinymce.plugins.charmap.Plugin',
    'ephox.mcagar.api.TinyLoader'
  ],
  function (Pipeline, LegacyUnit, Plugin, TinyLoader) {
    var success = arguments[arguments.length - 2];
    var failure = arguments[arguments.length - 1];
    var suite = LegacyUnit.createSuite();

    suite.test('Replace characters by array', function (editor) {
      editor.settings.charmap = [
        [65, 'Latin A'],
        [66, 'Latin B']
      ];

      LegacyUnit.deepEqual(editor.plugins.charmap.getCharMap(), [
        [65, 'Latin A'],
        [66, 'Latin B']
      ]);
    });

    suite.test('Replace characters by function', function (editor) {
      editor.settings.charmap = function () {
        return [
          [65, 'Latin A fun'],
          [66, 'Latin B fun']
        ];
      };

      LegacyUnit.deepEqual(editor.plugins.charmap.getCharMap(), [
        [65, 'Latin A fun'],
        [66, 'Latin B fun']
      ]);
    });

    suite.test('Append characters by array', function (editor) {
      editor.settings.charmap = [
        [67, 'Latin C']
      ];

      editor.settings.charmap_append = [
        [65, 'Latin A'],
        [66, 'Latin B']
      ];

      LegacyUnit.deepEqual(editor.plugins.charmap.getCharMap(), [
        [67, 'Latin C'],
        [65, 'Latin A'],
        [66, 'Latin B']
      ]);
    });

    suite.test('Append characters by function', function (editor) {
      editor.settings.charmap = [
        [67, 'Latin C']
      ];

      editor.settings.charmap_append = function () {
        return [
          [65, 'Latin A fun'],
          [66, 'Latin B fun']
        ];
      };

      LegacyUnit.deepEqual(editor.plugins.charmap.getCharMap(), [
        [67, 'Latin C'],
        [65, 'Latin A fun'],
        [66, 'Latin B fun']
      ]);
    });

    suite.test('Insert character', function (editor) {
      var lastEvt;

      editor.on('insertCustomChar', function (e) {
        lastEvt = e;
      });

      editor.plugins.charmap.insertChar('A');
      LegacyUnit.equal(lastEvt.chr, 'A');
    });

    TinyLoader.setup(function (editor, onSuccess, onFailure) {
      Pipeline.async({}, suite.toSteps(editor), onSuccess, onFailure);
    }, {
      plugins: 'charmap',
      indent: false
    }, success, failure);
  }
);