var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return this.greeting;
    };
    return Greeter;
})();
;
var greeter = new Greeter("Hello, world!");
console.log(greeter.greet());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvcnlhbi8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvZXhhbXBsZXMvZ3JlZXRlci50cyIsInNvdXJjZXMiOlsiL2hvbWUvcnlhbi8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvZXhhbXBsZXMvZ3JlZXRlci50cyJdLCJuYW1lcyI6WyJHcmVldGVyIiwiR3JlZXRlci5jb25zdHJ1Y3RvciIsIkdyZWV0ZXIuZ3JlZXQiXSwibWFwcGluZ3MiOiJBQUFBLElBQU0sT0FBTztJQUNYQSxTQURJQSxPQUFPQSxDQUNRQSxRQUFnQkE7UUFBaEJDLGFBQVFBLEdBQVJBLFFBQVFBLENBQVFBO0lBQUlBLENBQUNBO0lBQ3hDRCx1QkFBS0EsR0FBTEE7UUFDRUUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7SUFDdkJBLENBQUNBO0lBQ0hGLGNBQUNBO0FBQURBLENBQUNBLEFBTEQsSUFLQztBQUFBLENBQUM7QUFFRixJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUUzQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgR3JlZXRlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBncmVldGluZzogc3RyaW5nKSB7IH1cbiAgZ3JlZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JlZXRpbmc7XG4gIH1cbn07XG5cbnZhciBncmVldGVyID0gbmV3IEdyZWV0ZXIoXCJIZWxsbywgd29ybGQhXCIpO1xuXG5jb25zb2xlLmxvZyhncmVldGVyLmdyZWV0KCkpO1xuIl19
//# sourceURL=/home/ryan/.atom/packages/script/examples/greeter.ts
