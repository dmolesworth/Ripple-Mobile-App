var app = angular.module('upload',['firebase']);

app.controller("sendData", function($scope, $firebaseObject, $rootScope, $firebaseArray) {
var myData = new Firebase('https://blinding-inferno-5276.firebaseio.com/');
 /*$scope.pushData = function() {
//Geocoding the address  
var geocoder = new google.maps.Geocoder();  

geocoder.geocode( {'address': $scope.myAddress}, handleResults);
    
function handleResults(results, status)
{

// What type of thing we passed in (myAddress)
    console.log(results[0].types[0]); 
    
        $scope.latty = results[0].geometry.location.lat();
        $scope.longy = results[0].geometry.location.lng();  

        /*myData.push($scope.user.value);
                myData.push($scope.wave.value);
                myData.push($scope.direction.value);
                myData.push($scope.wind.value);

        console.log($scope.latty,$scope.longy);
//Send Data
        var usersRef = myData.child($scope.myAddress);
        usersRef.update({
            myLocation: $scope.myAddress,
            Lat: $scope.latty,
            Long: $scope.longy,
            Image: mediaURI,
            
        });

        console.log("UPLOADED / DOWNLOADED");
//Get Data
        /*myData.on("child_added", function(snapshot, prevChildKey) {
        var newy = snapshot.val()  
          //var LatLng = new google.maps.LatLng(newy.Lat, newy.Long);
          //console.log(LatLng);
        });      
    };
}
      $scope.user= {
        min:0,
        max:100,
        value: 50
      }   
      
       if($rootScope.$notes!== null)
        {
            myData.push($rootScope.$notes);
        }  
      $rootScope.$notes = null;
      $scope.placeNotes = function(tempNotes)
      {  
        $rootScope.$notes = tempNotes;  
      }*/
}); 
