(function() {
  var Convert, ScriptRunnerView, ScrollView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ScrollView = require('atom-space-pen-views').ScrollView;

  Convert = require('ansi-to-html');

  module.exports = ScriptRunnerView = (function(_super) {
    __extends(ScriptRunnerView, _super);

    atom.deserializers.add(ScriptRunnerView);

    ScriptRunnerView.deserialize = function(_arg) {
      var footer, header, output, title, view;
      title = _arg.title, header = _arg.header, output = _arg.output, footer = _arg.footer;
      view = new ScriptRunnerView(title);
      view._header.html(header);
      view._output.html(output);
      view._footer.html(footer);
      return view;
    };

    ScriptRunnerView.content = function() {
      return this.div({
        "class": 'script-runner',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.h1('Script Runner');
          _this.div({
            "class": 'header'
          });
          _this.pre({
            "class": 'output'
          });
          return _this.div({
            "class": 'footer'
          });
        };
      })(this));
    };

    function ScriptRunnerView(title) {
      ScriptRunnerView.__super__.constructor.apply(this, arguments);
      atom.commands.add('div.script-runner', 'run:copy', (function(_this) {
        return function() {
          return _this.copyToClipboard();
        };
      })(this));
      this.convert = new Convert({
        escapeXML: true
      });
      this._header = this.find('.header');
      this._output = this.find('.output');
      this._footer = this.find('.footer');
      this.setTitle(title);
    }

    ScriptRunnerView.prototype.serialize = function() {
      return {
        deserializer: 'ScriptRunnerView',
        title: this.title,
        header: this._header.html(),
        output: this._output.html(),
        footer: this._footer.html()
      };
    };

    ScriptRunnerView.prototype.copyToClipboard = function() {
      return atom.clipboard.write(window.getSelection().toString());
    };

    ScriptRunnerView.prototype.getTitle = function() {
      return "Script Runner: " + this.title;
    };

    ScriptRunnerView.prototype.setTitle = function(title) {
      this.title = title;
      return this.find('h1').html(this.getTitle());
    };

    ScriptRunnerView.prototype.clear = function() {
      this._output.html('');
      this._header.html('');
      return this._footer.html('');
    };

    ScriptRunnerView.prototype.append = function(text, className) {
      var span;
      span = document.createElement('span');
      span.innerHTML = this.convert.toHtml([text]);
      span.className = className || 'stdout';
      return this._output.append(span);
    };

    ScriptRunnerView.prototype.header = function(text) {
      return this._header.html(text);
    };

    ScriptRunnerView.prototype.footer = function(text) {
      return this._footer.html(text);
    };

    return ScriptRunnerView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvcnlhbi8uYXRvbS9wYWNrYWdlcy9zY3JpcHQtcnVubmVyL2xpYi9zY3JpcHQtcnVubmVyLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxzQkFBUixFQUFkLFVBQUQsQ0FBQTs7QUFBQSxFQUNBLE9BQUEsR0FBVSxPQUFBLENBQVEsY0FBUixDQURWLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osdUNBQUEsQ0FBQTs7QUFBQSxJQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIsZ0JBQXZCLENBQUEsQ0FBQTs7QUFBQSxJQUVBLGdCQUFDLENBQUEsV0FBRCxHQUFjLFNBQUMsSUFBRCxHQUFBO0FBQ1osVUFBQSxtQ0FBQTtBQUFBLE1BRGMsYUFBQSxPQUFPLGNBQUEsUUFBUSxjQUFBLFFBQVEsY0FBQSxNQUNyQyxDQUFBO0FBQUEsTUFBQSxJQUFBLEdBQVcsSUFBQSxnQkFBQSxDQUFpQixLQUFqQixDQUFYLENBQUE7QUFBQSxNQUNBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBYixDQUFrQixNQUFsQixDQURBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBYixDQUFrQixNQUFsQixDQUZBLENBQUE7QUFBQSxNQUdBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBYixDQUFrQixNQUFsQixDQUhBLENBQUE7QUFJQSxhQUFPLElBQVAsQ0FMWTtJQUFBLENBRmQsQ0FBQTs7QUFBQSxJQVNBLGdCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxlQUFQO0FBQUEsUUFBd0IsUUFBQSxFQUFVLENBQUEsQ0FBbEM7T0FBTCxFQUEyQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ3pDLFVBQUEsS0FBQyxDQUFBLEVBQUQsQ0FBSSxlQUFKLENBQUEsQ0FBQTtBQUFBLFVBQ0EsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLFFBQVA7V0FBTCxDQURBLENBQUE7QUFBQSxVQUVBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxRQUFQO1dBQUwsQ0FGQSxDQUFBO2lCQUdBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxRQUFQO1dBQUwsRUFKeUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEzQyxFQURRO0lBQUEsQ0FUVixDQUFBOztBQWdCYSxJQUFBLDBCQUFDLEtBQUQsR0FBQTtBQUNYLE1BQUEsbURBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixtQkFBbEIsRUFBdUMsVUFBdkMsRUFBbUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsZUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuRCxDQUZBLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxPQUFELEdBQWUsSUFBQSxPQUFBLENBQVE7QUFBQSxRQUFDLFNBQUEsRUFBVyxJQUFaO09BQVIsQ0FKZixDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxJQUFELENBQU0sU0FBTixDQUxYLENBQUE7QUFBQSxNQU1BLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLElBQUQsQ0FBTSxTQUFOLENBTlgsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsSUFBRCxDQUFNLFNBQU4sQ0FQWCxDQUFBO0FBQUEsTUFRQSxJQUFDLENBQUEsUUFBRCxDQUFVLEtBQVYsQ0FSQSxDQURXO0lBQUEsQ0FoQmI7O0FBQUEsK0JBMkJBLFNBQUEsR0FBVyxTQUFBLEdBQUE7YUFDVDtBQUFBLFFBQUEsWUFBQSxFQUFjLGtCQUFkO0FBQUEsUUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBRFI7QUFBQSxRQUVBLE1BQUEsRUFBUSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBQSxDQUZSO0FBQUEsUUFHQSxNQUFBLEVBQVEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQUEsQ0FIUjtBQUFBLFFBSUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFBLENBSlI7UUFEUztJQUFBLENBM0JYLENBQUE7O0FBQUEsK0JBa0NBLGVBQUEsR0FBaUIsU0FBQSxHQUFBO2FBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFmLENBQXFCLE1BQU0sQ0FBQyxZQUFQLENBQUEsQ0FBcUIsQ0FBQyxRQUF0QixDQUFBLENBQXJCLEVBRGU7SUFBQSxDQWxDakIsQ0FBQTs7QUFBQSwrQkFxQ0EsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUNQLGlCQUFBLEdBQWlCLElBQUMsQ0FBQSxNQURYO0lBQUEsQ0FyQ1YsQ0FBQTs7QUFBQSwrQkF3Q0EsUUFBQSxHQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTLEtBQVQsQ0FBQTthQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sSUFBTixDQUFXLENBQUMsSUFBWixDQUFpQixJQUFDLENBQUEsUUFBRCxDQUFBLENBQWpCLEVBRlE7SUFBQSxDQXhDVixDQUFBOztBQUFBLCtCQTRDQSxLQUFBLEdBQU8sU0FBQSxHQUFBO0FBQ0wsTUFBQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxFQUFkLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsRUFBZCxDQURBLENBQUE7YUFFQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxFQUFkLEVBSEs7SUFBQSxDQTVDUCxDQUFBOztBQUFBLCtCQWlEQSxNQUFBLEdBQVEsU0FBQyxJQUFELEVBQU8sU0FBUCxHQUFBO0FBQ04sVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBUCxDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsU0FBTCxHQUFpQixJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsQ0FBZ0IsQ0FBQyxJQUFELENBQWhCLENBRGpCLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxTQUFMLEdBQWlCLFNBQUEsSUFBYSxRQUY5QixDQUFBO2FBR0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULENBQWdCLElBQWhCLEVBSk07SUFBQSxDQWpEUixDQUFBOztBQUFBLCtCQXVEQSxNQUFBLEdBQVEsU0FBQyxJQUFELEdBQUE7YUFDTixJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxJQUFkLEVBRE07SUFBQSxDQXZEUixDQUFBOztBQUFBLCtCQTBEQSxNQUFBLEdBQVEsU0FBQyxJQUFELEdBQUE7YUFDTixJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxJQUFkLEVBRE07SUFBQSxDQTFEUixDQUFBOzs0QkFBQTs7S0FENkIsV0FKL0IsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/ryan/.atom/packages/script-runner/lib/script-runner-view.coffee
