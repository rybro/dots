(function() {
  var ChildProcess, exportsCommand;

  console.log(process.env);

  ChildProcess = require('child_process');

  exportsCommand = process.env.SHELL + " -lc export";

  ChildProcess.exec(exportsCommand, function(error, stdout, stderr) {
    var definition, key, value, _i, _len, _ref, _ref1, _results;
    _ref = stdout.trim().split('\n');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      definition = _ref[_i];
      _ref1 = definition.split('=', 2), key = _ref1[0], value = _ref1[1];
      _results.push(process.env[key] = value);
    }
    return _results;
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvcnlhbi8uYXRvbS9wYWNrYWdlcy9zY3JpcHQtcnVubmVyL2V4YW1wbGVzL2Vudmlyb25tZW50LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUVBO0FBQUEsTUFBQSw0QkFBQTs7QUFBQSxFQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBTyxDQUFDLEdBQXBCLENBQUEsQ0FBQTs7QUFBQSxFQUVBLFlBQUEsR0FBZSxPQUFBLENBQVEsZUFBUixDQUZmLENBQUE7O0FBQUEsRUFLQSxjQUFBLEdBQWlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBWixHQUFvQixhQUxyQyxDQUFBOztBQUFBLEVBUUEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsY0FBbEIsRUFBa0MsU0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixNQUFoQixHQUFBO0FBQ2pDLFFBQUEsdURBQUE7QUFBQTtBQUFBO1NBQUEsMkNBQUE7NEJBQUE7QUFDQyxNQUFBLFFBQWUsVUFBVSxDQUFDLEtBQVgsQ0FBaUIsR0FBakIsRUFBc0IsQ0FBdEIsQ0FBZixFQUFDLGNBQUQsRUFBTSxnQkFBTixDQUFBO0FBQUEsb0JBQ0EsT0FBTyxDQUFDLEdBQUksQ0FBQSxHQUFBLENBQVosR0FBbUIsTUFEbkIsQ0FERDtBQUFBO29CQURpQztFQUFBLENBQWxDLENBUkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/ryan/.atom/packages/script-runner/examples/environment.coffee
