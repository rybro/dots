(function() {
  var ScriptRunner;

  ScriptRunner = require('../lib/script-runner');

  describe("ScriptRunner", function() {
    var activationPromise, workspaceElement;
    activationPromise = null;
    workspaceElement = null;
    beforeEach(function() {
      workspaceElement = atom.views.getVew(atom.workspace);
      return activationPromise = atom.packages.activatePackage('script-runner');
    });
    return describe("when the script-runner:toggle event is triggered", function() {
      return it("attaches and then detaches the view", function() {
        expect(workspaceElement.find('.script-runner')).not.toExist();
        atom.commands.dispatch(workspaceElement('script-runner:toggle'));
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          expect(workspaceElement.find('.script-runner')).toExist();
          atom.commands.dispatch(workspaceElement('script-runner:toggle'));
          return expect(workspaceElement.find('.script-runner')).not.toExist();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvcnlhbi8uYXRvbS9wYWNrYWdlcy9zY3JpcHQtcnVubmVyL3NwZWMvc2NyaXB0LXJ1bm5lci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxZQUFBOztBQUFBLEVBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxzQkFBUixDQUFmLENBQUE7O0FBQUEsRUFPQSxRQUFBLENBQVMsY0FBVCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsUUFBQSxtQ0FBQTtBQUFBLElBQUEsaUJBQUEsR0FBb0IsSUFBcEIsQ0FBQTtBQUFBLElBQ0EsZ0JBQUEsR0FBbUIsSUFEbkIsQ0FBQTtBQUFBLElBR0EsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFYLENBQWtCLElBQUksQ0FBQyxTQUF2QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLGVBQTlCLEVBRlg7SUFBQSxDQUFYLENBSEEsQ0FBQTtXQU9BLFFBQUEsQ0FBUyxrREFBVCxFQUE2RCxTQUFBLEdBQUE7YUFDM0QsRUFBQSxDQUFHLHFDQUFILEVBQTBDLFNBQUEsR0FBQTtBQUN4QyxRQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxJQUFqQixDQUFzQixnQkFBdEIsQ0FBUCxDQUErQyxDQUFDLEdBQUcsQ0FBQyxPQUFwRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBSUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUFBLENBQWlCLHNCQUFqQixDQUF2QixDQUpBLENBQUE7QUFBQSxRQU1BLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLGtCQURjO1FBQUEsQ0FBaEIsQ0FOQSxDQUFBO2VBU0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILFVBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLElBQWpCLENBQXNCLGdCQUF0QixDQUFQLENBQStDLENBQUMsT0FBaEQsQ0FBQSxDQUFBLENBQUE7QUFBQSxVQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBQSxDQUFpQixzQkFBakIsQ0FBdkIsQ0FEQSxDQUFBO2lCQUVBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxJQUFqQixDQUFzQixnQkFBdEIsQ0FBUCxDQUErQyxDQUFDLEdBQUcsQ0FBQyxPQUFwRCxDQUFBLEVBSEc7UUFBQSxDQUFMLEVBVndDO01BQUEsQ0FBMUMsRUFEMkQ7SUFBQSxDQUE3RCxFQVJ1QjtFQUFBLENBQXpCLENBUEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/ryan/.atom/packages/script-runner/spec/script-runner-spec.coffee
