(function() {
  var ChildProcess, ConfigObserver, ScriptRunner, ScriptRunnerProcess, ScriptRunnerView, ShellEnvironment;

  ConfigObserver = require('atom').ConfigObserver;

  ScriptRunnerProcess = require('./script-runner-process');

  ScriptRunnerView = require('./script-runner-view');

  ChildProcess = require('child_process');

  ShellEnvironment = require('shell-environment');

  ScriptRunner = (function() {
    function ScriptRunner() {}

    ScriptRunner.prototype.commandMap = [
      {
        scope: '^source\\.coffee',
        command: 'coffee'
      }, {
        scope: '^source\\.js',
        command: 'node'
      }, {
        scope: '^source\\.ruby',
        command: 'ruby'
      }, {
        scope: '^source\\.python',
        command: 'python'
      }, {
        scope: '^source\\.go',
        command: 'go run'
      }, {
        scope: '^text\\.html\\.php',
        command: 'php'
      }, {
        scope: 'Shell Script (Bash)',
        command: 'bash'
      }, {
        path: 'spec\\.coffee$',
        command: 'jasmine-node --coffee'
      }, {
        path: '\\.sh$',
        command: 'bash'
      }
    ];

    ScriptRunner.prototype.destroy = function() {
      return this.killAllProcesses();
    };

    ScriptRunner.prototype.activate = function() {
      this.runners = [];
      this.runnerPane = null;
      return atom.commands.add('atom-workspace', {
        'run:script': (function(_this) {
          return function(event) {
            return _this.run();
          };
        })(this),
        'run:terminate': (function(_this) {
          return function(event) {
            return _this.stop();
          };
        })(this)
      });
    };

    ScriptRunner.prototype.killProcess = function(runner, detach) {
      if (detach == null) {
        detach = false;
      }
      if (runner != null) {
        if (runner.process != null) {
          runner.process.stop('SIGTERM');
          if (detach) {
            runner.process.detach();
            return runner.process = null;
          }
        }
      }
    };

    ScriptRunner.prototype.killAllProcesses = function(detach) {
      var runner, _i, _len, _ref, _results;
      if (detach == null) {
        detach = false;
      }
      _ref = this.runners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        runner = _ref[_i];
        if (runner.process != null) {
          runner.process.stop('SIGTERM');
          if (detach) {
            runner.process.detach();
            _results.push(runner.process = null);
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    ScriptRunner.prototype.createRunnerView = function(editor) {
      var runner;
      if (this.pane == null) {
        this.pane = atom.workspace.getActivePane().splitRight();
        this.pane.onDidDestroy((function(_this) {
          return function() {
            _this.killAllProcesses(true);
            return _this.pane = null;
          };
        })(this));
        this.pane.onWillDestroyItem((function(_this) {
          return function(evt) {
            var runner;
            runner = _this.getRunnerBy(evt.item);
            return _this.killProcess(runner, true);
          };
        })(this));
      }
      runner = this.getRunnerBy(editor, 'editor');
      if (runner == null) {
        runner = {
          editor: editor,
          view: new ScriptRunnerView(editor.getTitle()),
          process: null
        };
        this.runners.push(runner);
      } else {
        runner.view.setTitle(editor.getTitle());
      }
      return runner;
    };

    ScriptRunner.prototype.run = function() {
      var cmd, editor, path, runner;
      editor = atom.workspace.getActiveTextEditor();
      if (editor == null) {
        return;
      }
      path = editor.getPath();
      cmd = this.commandFor(editor);
      if (cmd == null) {
        alert("Not sure how to run '" + path + "' :/");
        return false;
      }
      runner = this.createRunnerView(editor);
      this.killProcess(runner, true);
      this.pane.activateItem(runner.view);
      runner.view.clear();
      return ShellEnvironment.loginEnvironment((function(_this) {
        return function(error, environment) {
          if (environment) {
            return runner.process = ScriptRunnerProcess.run(runner.view, cmd, environment, editor);
          } else {
            throw new Error(error);
          }
        };
      })(this));
    };

    ScriptRunner.prototype.stop = function() {
      var runner;
      if (!this.pane) {
        return;
      }
      runner = this.getRunnerBy(this.pane.getActiveItem());
      return this.killProcess(runner);
    };

    ScriptRunner.prototype.commandFor = function(editor) {
      var firstLine, method, path, scope, _i, _len, _ref;
      firstLine = editor.lineTextForBufferRow(0);
      if (firstLine.match('^#!')) {
        return firstLine.substr(2);
      }
      path = editor.getPath();
      scope = editor.getRootScopeDescriptor().scopes[0];
      _ref = this.commandMap;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        method = _ref[_i];
        if (method.fileName && (path != null)) {
          if (path.match(method.path)) {
            return method.command;
          }
        } else if (method.scope) {
          if (scope.match(method.scope)) {
            return method.command;
          }
        }
      }
    };

    ScriptRunner.prototype.getRunnerBy = function(attr_obj, attr_name) {
      var runner, _i, _len, _ref;
      if (attr_name == null) {
        attr_name = 'view';
      }
      _ref = this.runners;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        runner = _ref[_i];
        if (runner[attr_name] === attr_obj) {
          return runner;
        }
      }
      return null;
    };

    return ScriptRunner;

  })();

  module.exports = new ScriptRunner;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvcnlhbi8uYXRvbS9wYWNrYWdlcy9zY3JpcHQtcnVubmVyL2xpYi9zY3JpcHQtcnVubmVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxtR0FBQTs7QUFBQSxFQUFDLGlCQUFrQixPQUFBLENBQVEsTUFBUixFQUFsQixjQUFELENBQUE7O0FBQUEsRUFFQSxtQkFBQSxHQUFzQixPQUFBLENBQVEseUJBQVIsQ0FGdEIsQ0FBQTs7QUFBQSxFQUdBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSxzQkFBUixDQUhuQixDQUFBOztBQUFBLEVBS0EsWUFBQSxHQUFlLE9BQUEsQ0FBUSxlQUFSLENBTGYsQ0FBQTs7QUFBQSxFQU1BLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSxtQkFBUixDQU5uQixDQUFBOztBQUFBLEVBUU07OEJBQ0o7O0FBQUEsMkJBQUEsVUFBQSxHQUFZO01BQ1Y7QUFBQSxRQUFDLEtBQUEsRUFBTyxrQkFBUjtBQUFBLFFBQTRCLE9BQUEsRUFBUyxRQUFyQztPQURVLEVBRVY7QUFBQSxRQUFDLEtBQUEsRUFBTyxjQUFSO0FBQUEsUUFBd0IsT0FBQSxFQUFTLE1BQWpDO09BRlUsRUFHVjtBQUFBLFFBQUMsS0FBQSxFQUFPLGdCQUFSO0FBQUEsUUFBMEIsT0FBQSxFQUFTLE1BQW5DO09BSFUsRUFJVjtBQUFBLFFBQUMsS0FBQSxFQUFPLGtCQUFSO0FBQUEsUUFBNEIsT0FBQSxFQUFTLFFBQXJDO09BSlUsRUFLVjtBQUFBLFFBQUMsS0FBQSxFQUFPLGNBQVI7QUFBQSxRQUF3QixPQUFBLEVBQVMsUUFBakM7T0FMVSxFQU1WO0FBQUEsUUFBQyxLQUFBLEVBQU8sb0JBQVI7QUFBQSxRQUE4QixPQUFBLEVBQVMsS0FBdkM7T0FOVSxFQU9WO0FBQUEsUUFBQyxLQUFBLEVBQU8scUJBQVI7QUFBQSxRQUErQixPQUFB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

//# sourceURL=/home/ryan/.atom/packages/script-runner/lib/script-runner.coffee
