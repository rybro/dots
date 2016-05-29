(function() {
  var ShellEnvironment;

  ShellEnvironment = require('shell-environment');

  ShellEnvironment.loginEnvironment((function(_this) {
    return function(error, environment) {
      if (environment) {
        return console.log(environment);
      } else {
        return console.log(error);
      }
    };
  })(this));

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvcnlhbi8uYXRvbS9wYWNrYWdlcy9zY3JpcHQtcnVubmVyL2V4YW1wbGVzL3NoZWxsLWVudmlyb25tZW50LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUVBO0FBQUEsTUFBQSxnQkFBQTs7QUFBQSxFQUFBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSxtQkFBUixDQUFuQixDQUFBOztBQUFBLEVBRUEsZ0JBQWdCLENBQUMsZ0JBQWpCLENBQWtDLENBQUEsU0FBQSxLQUFBLEdBQUE7V0FBQSxTQUFDLEtBQUQsRUFBUSxXQUFSLEdBQUE7QUFDOUIsTUFBQSxJQUFHLFdBQUg7ZUFDSSxPQUFPLENBQUMsR0FBUixDQUFZLFdBQVosRUFESjtPQUFBLE1BQUE7ZUFHSSxPQUFPLENBQUMsR0FBUixDQUFZLEtBQVosRUFISjtPQUQ4QjtJQUFBLEVBQUE7RUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxDLENBRkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/ryan/.atom/packages/script-runner/examples/shell-environment.coffee
