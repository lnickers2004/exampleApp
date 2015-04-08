angular.module('exampleApp', [])
  .constant('baseUrl', "http://localhost:2403/products/")
  .controller('defaultCtrl', ['$scope','$http','baseUrl', function ($scope, $http, baseUrl ) {
    $scope.products = [];
    $scope.displayMode = "list";
    $scope.currentProduct = null;

    $scope.listProducts = function(){
      $http.get(baseUrl).success(function (data) {
        $scope.products = data;
      });
    };

    //$scope.deleteProduct = function (product) {
    //  $http( {method:'DELETE', url:baseUrl + product.id}).success(function () {
    //    $scope.products.splice($scope.products.indexOf(product), 1);
    //  });
    //};

    $scope.deleteProduct = function (product) {
      $http.delete(baseUrl + product.id).success(function () {
        $scope.products.splice($scope.products.indexOf(product),1);
      });
    };

    $scope.createProduct = function (product) {
      $http.post(baseUrl, product).success(function (newProduct) {
        $scope.products.push(newProduct);
        $scope.displayMode = "list";
      });
    };

    $scope.updateProduct = function (product) {
      $http.put(baseUrl + product.id, product).success(function (modifiedProduct) {
        //update the local copy
        for (var i = 0; i < $scope.products.length; i++) {
          if ($scope.products[i].id == modifiedProduct.id) {
            $scope.products[i] = modifiedProduct;
            break;
          }
        }
        $scope.displayMode = "list";
      });
    };

    $scope.editOrCreateProduct = function (product) {
      $scope.currentProduct =
        product ? angular.copy(product) : {};
      $scope.displayMode = "edit";
    };

    $scope.saveEdit = function (product) {
      if (angular.isDefined(product.id)) {
        $scope.updateProduct(product);
      }
      else{
        $scope.createProduct(product);
      }
    };

    $scope.CancelEdit = function () {
      $scope.currentProduct = {};
      $scope.displayMode = "list";
    };

    // initially list products when the controller is created
    $scope.listProducts();
  }]);
