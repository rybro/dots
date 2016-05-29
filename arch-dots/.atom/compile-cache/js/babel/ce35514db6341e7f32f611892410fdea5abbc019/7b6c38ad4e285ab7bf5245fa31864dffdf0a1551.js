function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _atom = require('atom');

'use babel';

module.exports = {
  config: {
    executablePath: {
      type: 'string',
      'default': _path2['default'].join(__dirname, '..', 'node_modules', 'jshint', 'bin', 'jshint'),
      description: 'Path of the `jshint` node script'
    },
    lintInlineJavaScript: {
      type: 'boolean',
      'default': false,
      description: 'Lint JavaScript inside `<script>` blocks in HTML or PHP files.'
    },
    disableWhenNoJshintrcFileInPath: {
      type: 'boolean',
      'default': false,
      description: 'Disable linter when no `.jshintrc` is found in project.'
    },
    lintJSXFiles: {
      title: 'Lint JSX Files',
      type: 'boolean',
      'default': false
    },
    jshintFileName: {
      type: 'string',
      'default': '.jshintrc',
      description: 'jshint file name'
    }
  },

  activate: function activate() {
    var _this = this;

    require('atom-package-deps').install('linter-jshint');
    this.scopes = ['source.js', 'source.js-semantic'];
    this.subscriptions = new _atom.CompositeDisposable();
    this.subscriptions.add(atom.config.observe('linter-jshint.executablePath', function (executablePath) {
      _this.executablePath = executablePath;
    }));
    this.subscriptions.add(atom.config.observe('linter-jshint.disableWhenNoJshintrcFileInPath', function (disableWhenNoJshintrcFileInPath) {
      _this.disableWhenNoJshintrcFileInPath = disableWhenNoJshintrcFileInPath;
    }));

    this.subscriptions.add(atom.config.observe('linter-jshint.jshintFileName', function (jshintFileName) {
      _this.jshintFileName = jshintFileName;
    }));

    var scopeJSX = 'source.js.jsx';
    this.subscriptions.add(atom.config.observe('linter-jshint.lintJSXFiles', function (lintJSXFiles) {
      _this.lintJSXFiles = lintJSXFiles;
      if (lintJSXFiles) {
        _this.scopes.push(scopeJSX);
      } else {
        if (_this.scopes.indexOf(scopeJSX) !== -1) {
          _this.scopes.splice(_this.scopes.indexOf(scopeJSX), 1);
        }
      }
    }));

    var scopeEmbedded = 'source.js.embedded.html';
    this.subscriptions.add(atom.config.observe('linter-jshint.lintInlineJavaScript', function (lintInlineJavaScript) {
      _this.lintInlineJavaScript = lintInlineJavaScript;
      if (lintInlineJavaScript) {
        _this.scopes.push(scopeEmbedded);
      } else {
        if (_this.scopes.indexOf(scopeEmbedded) !== -1) {
          _this.scopes.splice(_this.scopes.indexOf(scopeEmbedded), 1);
        }
      }
    }));
  },

  deactivate: function deactivate() {
    this.subscriptions.dispose();
  },

  provideLinter: function provideLinter() {
    var _this2 = this;

    var Helpers = require('atom-linter');
    var Reporter = require('jshint-json');

    return {
      name: 'JSHint',
      grammarScopes: this.scopes,
      scope: 'file',
      lintOnFly: true,
      lint: _asyncToGenerator(function* (textEditor) {
        var results = [];
        var filePath = textEditor.getPath();
        var fileContents = textEditor.getText();
        var parameters = ['--reporter', Reporter, '--filename', filePath];

        var configFile = yield Helpers.findCachedAsync(_path2['default'].dirname(filePath), _this2.jshintFileName);

        if (configFile) {
          parameters.push('--config', configFile);
        } else if (_this2.disableWhenNoJshintrcFileInPath) {
          return results;
        }

        if (_this2.lintInlineJavaScript && textEditor.getGrammar().scopeName.indexOf('text.html') !== -1) {
          parameters.push('--extract', 'always');
        }
        parameters.push('-');

        var result = yield Helpers.execNode(_this2.executablePath, parameters, { stdin: fileContents });
        var parsed = undefined;
        try {
          parsed = JSON.parse(result);
        } catch (_) {
          console.error('[Linter-JSHint]', _, result);
          atom.notifications.addWarning('[Linter-JSHint]', { detail: 'JSHint return an invalid response, check your console for more info' });
          return results;
        }

        for (var entry of parsed.result) {
          if (!entry.error.id) {
            continue;
          }

          var error = entry.error;
          var errorType = error.code.substr(0, 1);
          var errorLine = error.line > 0 ? error.line - 1 : 0;
          var range = undefined;

          // TODO: Remove workaround of jshint/jshint#2846
          if (error.character === null) {
            range = Helpers.rangeFromLineNumber(textEditor, errorLine);
          } else {
            var character = error.character > 0 ? error.character - 1 : 0;
            var line = errorLine;
            var buffer = textEditor.getBuffer();
            var maxLine = buffer.getLineCount();
            // TODO: Remove workaround of jshint/jshint#2894
            if (errorLine >= maxLine) {
              line = maxLine;
            }
            var maxCharacter = buffer.lineLengthForRow(line);
            // TODO: Remove workaround of jquery/esprima#1457
            if (character > maxCharacter) {
              character = maxCharacter;
            }
            range = Helpers.rangeFromLineNumber(textEditor, line, character);
          }

          results.push({
            type: errorType === 'E' ? 'Error' : errorType === 'W' ? 'Warning' : 'Info',
            html: '<a href="http://jslinterrors.com/' + error.code + '">' + error.code + '</a> - ' + error.reason,
            filePath: filePath,
            range: range
          });
        }
        return results;
      })
    };
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J5YW4vLmF0b20vcGFja2FnZXMvbGludGVyLWpzaGludC9saWIvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O29CQUlpQixNQUFNOzs7O29CQUNhLE1BQU07O0FBTDFDLFdBQVcsQ0FBQTs7QUFTWCxNQUFNLENBQUMsT0FBTyxHQUFHO0FBQ2YsUUFBTSxFQUFFO0FBQ04sa0JBQWMsRUFBRTtBQUNkLFVBQUksRUFBRSxRQUFRO0FBQ2QsaUJBQVMsa0JBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO0FBQzlFLGlCQUFXLEVBQUUsa0NBQWtDO0tBQ2hEO0FBQ0Qsd0JBQW9CLEVBQUU7QUFDcEIsVUFBSSxFQUFFLFNBQVM7QUFDZixpQkFBUyxLQUFLO0FBQ2QsaUJBQVcsRUFBRSxnRUFBZ0U7S0FDOUU7QUFDRCxtQ0FBK0IsRUFBRTtBQUMvQixVQUFJLEVBQUUsU0FBUztBQUNmLGlCQUFTLEtBQUs7QUFDZCxpQkFBVyxFQUFFLHlEQUF5RDtLQUN2RTtBQUNELGdCQUFZLEVBQUU7QUFDWixXQUFLLEVBQUUsZ0JBQWdCO0FBQ3ZCLFVBQUksRUFBRSxTQUFTO0FBQ2YsaUJBQVMsS0FBSztLQUNmO0FBQ0Qsa0JBQWMsRUFBRTtBQUNkLFVBQUksRUFBRSxRQUFRO0FBQ2QsaUJBQVMsV0FBVztBQUNwQixpQkFBVyxFQUFFLGtCQUFrQjtLQUNoQztHQUNGOztBQUVELFVBQVEsRUFBQSxvQkFBRzs7O0FBQ1QsV0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3JELFFBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUUsb0JBQW9CLENBQUMsQ0FBQTtBQUNqRCxRQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFBO0FBQzlDLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxN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LEdBQUcsU0FBUyxLQUFLLEdBQUcsR0FBRyxTQUFTLEdBQUcsTUFBTTtBQUMxRSxnQkFBSSx3Q0FBc0MsS0FBSyxDQUFDLElBQUksVUFBSyxLQUFLLENBQUMsSUFBSSxlQUFVLEtBQUssQ0FBQyxNQUFNLEFBQUU7QUFDM0Ysb0JBQVEsRUFBUixRQUFRO0FBQ1IsaUJBQUssRUFBTCxLQUFLO1dBQ04sQ0FBQyxDQUFBO1NBQ0g7QUFDRCxlQUFPLE9BQU8sQ0FBQTtPQUNmLENBQUE7S0FDRixDQUFBO0dBQ0Y7Q0FDRixDQUFBIiwiZmlsZSI6Ii9ob21lL3J5YW4vLmF0b20vcGFja2FnZXMvbGludGVyLWpzaGludC9saWIvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbi8qIEBmbG93ICovXG5cbmltcG9ydCBQYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcblxudHlwZSBMaW50ZXIkUHJvdmlkZXIgPSBPYmplY3RcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbmZpZzoge1xuICAgIGV4ZWN1dGFibGVQYXRoOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGRlZmF1bHQ6IFBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdub2RlX21vZHVsZXMnLCAnanNoaW50JywgJ2JpbicsICdqc2hpbnQnKSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnUGF0aCBvZiB0aGUgYGpzaGludGAgbm9kZSBzY3JpcHQnXG4gICAgfSxcbiAgICBsaW50SW5saW5lSmF2YVNjcmlwdDoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ0xpbnQgSmF2YVNjcmlwdCBpbnNpZGUgYDxzY3JpcHQ+YCBibG9ja3MgaW4gSFRNTCBvciBQSFAgZmlsZXMuJ1xuICAgIH0sXG4gICAgZGlzYWJsZVdoZW5Ob0pzaGludHJjRmlsZUluUGF0aDoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICBkZXNjcmlwdGlvbjogJ0Rpc2FibGUgbGludGVyIHdoZW4gbm8gYC5qc2hpbnRyY2AgaXMgZm91bmQgaW4gcHJvamVjdC4nXG4gICAgfSxcbiAgICBsaW50SlNYRmlsZXM6IHtcbiAgICAgIHRpdGxlOiAnTGludCBKU1ggRmlsZXMnLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGpzaGludEZpbGVOYW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgIGRlZmF1bHQ6ICcuanNoaW50cmMnLFxuICAgICAgZGVzY3JpcHRpb246ICdqc2hpbnQgZmlsZSBuYW1lJ1xuICAgIH1cbiAgfSxcblxuICBhY3RpdmF0ZSgpIHtcbiAgICByZXF1aXJlKCdhdG9tLXBhY2thZ2UtZGVwcycpLmluc3RhbGwoJ2xpbnRlci1qc2hpbnQnKVxuICAgIHRoaXMuc2NvcGVzID0gWydzb3VyY2UuanMnLCAnc291cmNlLmpzLXNlbWFudGljJ11cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItanNoaW50LmV4ZWN1dGFibGVQYXRoJywgZXhlY3V0YWJsZVBhdGggPT4ge1xuICAgICAgdGhpcy5leGVjdXRhYmxlUGF0aCA9IGV4ZWN1dGFibGVQYXRoXG4gICAgfSkpXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoJ2xpbnRlci1qc2hpbnQuZGlzYWJsZVdoZW5Ob0pzaGludHJjRmlsZUluUGF0aCcsXG4gICAgICAgIGRpc2FibGVXaGVuTm9Kc2hpbnRyY0ZpbGVJblBhdGggPT4ge1xuICAgICAgICAgIHRoaXMuZGlzYWJsZVdoZW5Ob0pzaGludHJjRmlsZUluUGF0aCA9IGRpc2FibGVXaGVuTm9Kc2hpbnRyY0ZpbGVJblBhdGhcbiAgICAgICAgfVxuICAgICAgKVxuICAgIClcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLWpzaGludC5qc2hpbnRGaWxlTmFtZScsIGpzaGludEZpbGVOYW1lID0+IHtcbiAgICAgIHRoaXMuanNoaW50RmlsZU5hbWUgPSBqc2hpbnRGaWxlTmFtZVxuICAgIH0pKVxuXG4gICAgY29uc3Qgc2NvcGVKU1ggPSAnc291cmNlLmpzLmpzeCdcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKGF0b20uY29uZmlnLm9ic2VydmUoJ2xpbnRlci1qc2hpbnQubGludEpTWEZpbGVzJywgbGludEpTWEZpbGVzID0+IHtcbiAgICAgIHRoaXMubGludEpTWEZpbGVzID0gbGludEpTWEZpbGVzXG4gICAgICBpZiAobGludEpTWEZpbGVzKSB7XG4gICAgICAgIHRoaXMuc2NvcGVzLnB1c2goc2NvcGVKU1gpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zY29wZXMuaW5kZXhPZihzY29wZUpTWCkgIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5zY29wZXMuc3BsaWNlKHRoaXMuc2NvcGVzLmluZGV4T2Yoc2NvcGVKU1gpLCAxKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkpXG5cbiAgICBjb25zdCBzY29wZUVtYmVkZGVkID0gJ3NvdXJjZS5qcy5lbWJlZGRlZC5odG1sJ1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLWpzaGludC5saW50SW5saW5lSmF2YVNjcmlwdCcsXG4gICAgICBsaW50SW5saW5lSmF2YVNjcmlwdCA9PiB7XG4gICAgICAgIHRoaXMubGludElubGluZUphdmFTY3JpcHQgPSBsaW50SW5saW5lSmF2YVNjcmlwdFxuICAgICAgICBpZiAobGludElubGluZUphdmFTY3JpcHQpIHtcbiAgICAgICAgICB0aGlzLnNjb3Blcy5wdXNoKHNjb3BlRW1iZWRkZWQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuc2NvcGVzLmluZGV4T2Yoc2NvcGVFbWJlZGRlZCkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3Blcy5zcGxpY2UodGhpcy5zY29wZXMuaW5kZXhPZihzY29wZUVtYmVkZGVkKSwgMSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApKVxuICB9LFxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKVxuICB9LFxuXG4gIHByb3ZpZGVMaW50ZXIoKTogTGludGVyJFByb3ZpZGVyIHtcbiAgICBjb25zdCBIZWxwZXJzID0gcmVxdWlyZSgnYXRvbS1saW50ZXInKVxuICAgIGNvbnN0IFJlcG9ydGVyID0gcmVxdWlyZSgnanNoaW50LWpzb24nKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdKU0hpbnQnLFxuICAgICAgZ3JhbW1hclNjb3BlczogdGhpcy5zY29wZXMsXG4gICAgICBzY29wZTogJ2ZpbGUnLFxuICAgICAgbGludE9uRmx5OiB0cnVlLFxuICAgICAgbGludDogYXN5bmMgKHRleHRFZGl0b3IpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdXG4gICAgICAgIGNvbnN0IGZpbGVQYXRoID0gdGV4dEVkaXRvci5nZXRQYXRoKClcbiAgICAgICAgY29uc3QgZmlsZUNvbnRlbnRzID0gdGV4dEVkaXRvci5nZXRUZXh0KClcbiAgICAgICAgY29uc3QgcGFyYW1ldGVycyA9IFsnLS1yZXBvcnRlcicsIFJlcG9ydGVyLCAnLS1maWxlbmFtZScsIGZpbGVQYXRoXVxuXG4gICAgICAgIGxldCBjb25maWdGaWxlID0gYXdhaXQgSGVscGVycy5maW5kQ2FjaGVkQXN5bmMoUGF0aC5kaXJuYW1lKGZpbGVQYXRoKSwgdGhpcy5qc2hpbnRGaWxlTmFtZSlcblxuICAgICAgICBpZiAoY29uZmlnRmlsZSkge1xuICAgICAgICAgIHBhcmFtZXRlcnMucHVzaCgnLS1jb25maWcnLCBjb25maWdGaWxlKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlzYWJsZVdoZW5Ob0pzaGludHJjRmlsZUluUGF0aCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saW50SW5saW5lSmF2YVNjcmlwdCAmJlxuICAgICAgICAgIHRleHRFZGl0b3IuZ2V0R3JhbW1hcigpLnNjb3BlTmFtZS5pbmRleE9mKCd0ZXh0Lmh0bWwnKSAhPT0gLTFcbiAgICAgICAgKSB7XG4gICAgICAgICAgcGFyYW1ldGVycy5wdXNoKCctLWV4dHJhY3QnLCAnYWx3YXlzJylcbiAgICAgICAgfVxuICAgICAgICBwYXJhbWV0ZXJzLnB1c2goJy0nKVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IEhlbHBlcnMuZXhlY05vZGUoXG4gICAgICAgICAgdGhpcy5leGVjdXRhYmxlUGF0aCwgcGFyYW1ldGVycywgeyBzdGRpbjogZmlsZUNvbnRlbnRzIH1cbiAgICAgICAgKVxuICAgICAgICBsZXQgcGFyc2VkXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcGFyc2VkID0gSlNPTi5wYXJzZShyZXN1bHQpXG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdbTGludGVyLUpTSGludF0nLCBfLCByZXN1bHQpXG4gICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFdhcm5pbmcoJ1tMaW50ZXItSlNIaW50XScsXG4gICAgICAgICAgICB7IGRldGFpbDogJ0pTSGludCByZXR1cm4gYW4gaW52YWxpZCByZXNwb25zZSwgY2hlY2sgeW91ciBjb25zb2xlIGZvciBtb3JlIGluZm8nIH1cbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHNcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgcGFyc2VkLnJlc3VsdCkge1xuICAgICAgICAgIGlmICghZW50cnkuZXJyb3IuaWQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZXJyb3IgPSBlbnRyeS5lcnJvclxuICAgICAgICAgIGNvbnN0IGVycm9yVHlwZSA9IGVycm9yLmNvZGUuc3Vic3RyKDAsIDEpXG4gICAgICAgICAgY29uc3QgZXJyb3JMaW5lID0gZXJyb3IubGluZSA+IDAgPyBlcnJvci5saW5lIC0gMSA6IDBcbiAgICAgICAgICBsZXQgcmFuZ2VcblxuICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB3b3JrYXJvdW5kIG9mIGpzaGludC9qc2hpbnQjMjg0NlxuICAgICAgICAgIGlmIChlcnJvci5jaGFyYWN0ZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJhbmdlID0gSGVscGVycy5yYW5nZUZyb21MaW5lTnVtYmVyKHRleHRFZGl0b3IsIGVycm9yTGluZSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNoYXJhY3RlciA9IGVycm9yLmNoYXJhY3RlciA+IDAgPyBlcnJvci5jaGFyYWN0ZXIgLSAxIDogMFxuICAgICAgICAgICAgbGV0IGxpbmUgPSBlcnJvckxpbmVcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHRleHRFZGl0b3IuZ2V0QnVmZmVyKClcbiAgICAgICAgICAgIGNvbnN0IG1heExpbmUgPSBidWZmZXIuZ2V0TGluZUNvdW50KClcbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB3b3JrYXJvdW5kIG9mIGpzaGludC9qc2hpbnQjMjg5NFxuICAgICAgICAgICAgaWYgKGVycm9yTGluZSA+PSBtYXhMaW5lKSB7XG4gICAgICAgICAgICAgIGxpbmUgPSBtYXhMaW5lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtYXhDaGFyYWN0ZXIgPSBidWZmZXIubGluZUxlbmd0aEZvclJvdyhsaW5lKVxuICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHdvcmthcm91bmQgb2YganF1ZXJ5L2VzcHJpbWEjMTQ1N1xuICAgICAgICAgICAgaWYgKGNoYXJhY3RlciA+IG1heENoYXJhY3Rlcikge1xuICAgICAgICAgICAgICBjaGFyYWN0ZXIgPSBtYXhDaGFyYWN0ZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJhbmdlID0gSGVscGVycy5yYW5nZUZyb21MaW5lTnVtYmVyKHRleHRFZGl0b3IsIGxpbmUsIGNoYXJhY3RlcilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogZXJyb3JUeXBlID09PSAnRScgPyAnRXJyb3InIDogZXJyb3JUeXBlID09PSAnVycgPyAnV2FybmluZycgOiAnSW5mbycsXG4gICAgICAgICAgICBodG1sOiBgPGEgaHJlZj1cImh0dHA6Ly9qc2xpbnRlcnJvcnMuY29tLyR7ZXJyb3IuY29kZX1cIj4ke2Vycm9yLmNvZGV9PC9hPiAtICR7ZXJyb3IucmVhc29ufWAsXG4gICAgICAgICAgICBmaWxlUGF0aCxcbiAgICAgICAgICAgIHJhbmdlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0c1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19
//# sourceURL=/home/ryan/.atom/packages/linter-jshint/lib/main.js
