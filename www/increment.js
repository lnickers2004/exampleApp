angular.module('increment', [])
.directive('increment', [function () {
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
       scope: {
         item:"=item",
         property:"@propertyName",
         restful:"@restful",
         method:"@methodName"
       }, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
       restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function ($scope, iElm, iAttrs, controller) {
        var button = angular.element("<button>").text("+");
        button.addClass("btn btn-primary btn-xs");
        iElm.append(button);
        button.on("click", function () {
          $scope.$apply(function () {
            $scope.item[$scope.property]++;
            if ($scope.restful) {
              // call the action to persist the canges to the server
              $scope.item[$scope.method]();
            }
          });
        });
      }
    };
  }]);