angular.module('exampleApp', ['increment','ngResource'])
  .constant('baseUrl', "http://localhost:2403/products/")
  .controller('defaultCtrl', ['$scope','$http','$resource','baseUrl', function ($scope, $http, $resource, baseUrl ) {
    $scope.products = [];
    $scope.displayMode = "list";
    $scope.currentProduct = null;

    $scope.productsResource = $resource(baseUrl + ":id",{id:"@id"},
      // define a custom create action that uses post
    {create:{method:"POST"},save:{method:"PUT"}}); // change save to use PUT since
                                                    // post was default

    $scope.listProducts = function(){
        $scope.products = $scope.productsResource.query();
    };

    $scope.deleteProduct = function (product) {
      product.$delete().then(function () {
        $scope.products.splice($scope.products.indexOf(product), 1);
      });
    };

    $scope.createProduct = function (product) {

      var prod = new $scope.productsResource(product);


        //prod.$save().then(function (newProduct) {  //default save action
        prod.$create().then(function(newProduct){  //using custom action for fun ;-)
        $scope.products.push(newProduct);
        $scope.displayMode = "list";
      });
    };

    $scope.updateProduct = function (product) {
      $http.put(baseUrl + product.id, product).success(function (modifiedProduct) {
        product.$save();
        $scope.displayMode = "list";
      });
    };

    $scope.editOrCreateProduct = function (product) {
      $scope.currentProduct =
        product ? product : {};
      //alert("current product: " + JSON.stringify(product, null,4))
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

    $scope.cancelEdit = function () {
      if ($scope.currentProduct && $scope.currentProduct.$get) {
        $scope.currentProduct.$get();
        alert("cancelled");
      }
      $scope.currentProduct = {};
      $scope.displayMode = "list";
    };

    // initially list products when the controller is created
    $scope.listProducts();
  }]);
