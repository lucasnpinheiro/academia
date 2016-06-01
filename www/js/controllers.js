angular.module('starter.controllers', ['ngStorage'])

        .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});


        })

        .controller('QrCodeCtrl', function ($scope, $cordovaBarcodeScanner, $localStorage) {

            $scope.$storage = $localStorage.$default({
                list: []
            });

            $scope.total = 0;

            $scope.reset = function () {
                delete $scope.$storage.list;
                $scope.$storage.list = [];
                $scope.total = 0;
            }

            $scope.text = null;
            $scope.cancelled = true;
            $scope.format = null;
            $scope.error = null;
            $scope.success = null;

            $scope.abrir = function (text) {
                window.open(text, '_system');
            }

            $scope.scanBarcode = function () {
                $cordovaBarcodeScanner.scan().then(function (imageData) {
                    $scope.text = imageData.text;
                    $scope.cancelled = imageData.cancelled;
                    $scope.format = imageData.format;
                    $scope.success = JSON.stringify(imageData);

                    $scope.$storage.list.push({
                        text: imageData.text,
                        format: imageData.format,
                        cancelled: imageData.cancelled
                    });
                    
                    $scope.total = 1;

                }, function (error) {
                    $scope.error = JSON.stringify(error);
                });
            };
        })
