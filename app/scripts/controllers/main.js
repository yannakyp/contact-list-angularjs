'use strict';

angular.module('ikyApp')
  .controller('MainCtrl', function ($scope) {
    $scope.addresses = [ {
        firstname: 'Yanna ',
        lastname: 'Kyprianou',
        postcode: 'nw5 3hp'
    }
    ];

        $scope.addAddress = function() {
            $scope.addresses.push($scope.contact);
            $scope.contact = undefined;
        };

        $scope.editAddress = function() {
            $scope.addresses[$scope.editIndex] = $scope.contact;
            $scope.contact = undefined;
            $scope.editMode = false;
            $scope.editIndex = undefined;
        };

        $scope.populateEditAddress = function(address) {
            $scope.editMode = true;
            $scope.contact = angular.copy(address);
            $scope.editIndex = $scope.addresses.indexOf(address);
        };

        $scope.deleteAddress = function(address) {
            $scope.addresses.splice($scope.addresses.indexOf(address), 1);
        }

  })
    .filter('startsWith', function() {
        return function(addresses, filterLetters) {
            var letterBlocks = {
                'AE' : ['A', 'B', 'C', 'D' , 'E'],
                'FK' : ['F', 'G', 'H', 'I' , 'J', 'K'],
                'LP' : ['L', 'M', 'N', 'O', 'P'],
                'QV' : ['Q' , 'R', 'S', 'T', 'U', 'V'],
                'WZ' : ['W', 'X', 'Y','Z']
            };

            if (!filterLetters || filterLetters == 'ALL' ) {
                return addresses;
            }

            var arrayToReturn = [];
            addresses.forEach(function(address) {
                var letters = letterBlocks[filterLetters];
                letters.forEach(function(letter) {
                    if ((address.firstname.toUpperCase().indexOf(letter) === 0 ||
                        address.lastname.toUpperCase().indexOf(letter) === 0) &&
                        arrayToReturn.indexOf(address) === -1) {
                        arrayToReturn.push(address);
                    }
                })
            });

            return arrayToReturn;
        }
    });
