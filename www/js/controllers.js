
angular.module('starter.controllers', ['rzModule', 'ui.bootstrap', 'firebase'])

.controller('ListController',['$scope', '$stateParams', '$http', '$firebaseObject', '$rootScope', '$firebaseArray', '$state', function($scope, $stateParams, $state, $http, $firebaseObject, $firebaseArray, $rootScope){
          var listData = new Firebase("https://blinding-inferno-5276.firebaseio.com/");
          $scope.report = $firebaseArray(listData); 
}]);

app.controller('ListChildController',['$scope', '$stateParams', '$http', '$firebaseObject', '$rootScope', '$firebaseArray', '$state', function($scope, $stateParams, $state, $http, $firebaseObject, $firebaseArray, $rootScope){
    var listData = new Firebase("https://blinding-inferno-5276.firebaseio.com/");
    $scope.report = $firebaseArray(listData); 
    $rootScope.data = [];
    listData.on("child_added", function(snapshot) {
        var allData = snapshot.val();
        var mydata = allData;
        $rootScope.data.push(mydata);        
        var timeId = $stateParams.aId;
        
        getProfileDetails(timeId);
        
        console.log($rootScope.data);
    
        function getProfileDetails(timeId)
        {
            for(var i=0; i<$rootScope.data.length; i++)
                {
                    var thisDetail = $rootScope.data[i];
                    if(thisDetail.Time == timeId)
                    {
                        $scope.profileDetails = thisDetail;
                    }  
                }
        }
    }); 
          $scope.report = $firebaseArray(listData);
        $scope.whichartist = $stateParams.aId; 
}]);

// Camera controller REMOVE 'APP' IF ERROR
app.controller('MainCtrl', function(Camera, $cordovaCapture, $sce, $scope, $firebaseObject, $rootScope, $firebaseArray, $timeout, $uibModal, $ionicLoading) {

        //Buttons
        $scope.lowbuttonStyle = "button-calm";
        $rootScope.tide = "Low";
        $scope.low = function() {
                $scope.lowbuttonStyle = "button-calm";
                $scope.midbuttonStyle = "button-clear";
                $scope.highbuttonStyle = "button-clear";
                $rootScope.tide = "Low";
            }
        $scope.midbuttonStyle = "button-clear";
        $scope.mid = function() {
                $scope.midbuttonStyle = "button-calm";
                $scope.lowbuttonStyle = "button-clear";
                $scope.highbuttonStyle = "button-clear";
                $rootScope.tide = "Mid";
            }
        $scope.highbuttonStyle = "button-clear";
        $scope.high = function() {
                $scope.highbuttonStyle = "button-calm";
                $scope.lowbuttonStyle = "button-clear";
                $scope.midbuttonStyle = "button-clear";
                $rootScope.tide = "High";
            }
        $scope.badbuttonStyle = "button-clear";
        $scope.bad = function() {
                $scope.badbuttonStyle = "button-calm";
                $scope.goodbuttonStyle = "button-clear";
                $scope.epicbuttonStyle = "button-clear";
                $rootScope.rating = "Bad";
            }
        $scope.goodbuttonStyle = "button-clear";
        $scope.good = function() {
                $scope.goodbuttonStyle = "button-calm";
                $scope.badbuttonStyle = "button-clear";
                $scope.epicbuttonStyle = "button-clear";
                $rootScope.rating = "Good";
            }
        $scope.epicbuttonStyle = "button-calm";
        $rootScope.rating = "Epic";
        $scope.epic = function() {
                $scope.epicbuttonStyle = "button-calm";
                $scope.badbuttonStyle = "button-clear";
                $scope.goodbuttonStyle = "button-clear";
                $rootScope.rating = "Epic";
            }
            //Sliders  
        $scope.sliderCrowd = {
            minValue: 20,
            maxValue: 80,
            options: {
                floor: 0,
                ceil: 100,
                step: 1
            }
        };
        $scope.sliderWave = {
            minWaveValue: 2,
            maxWaveValue: 4,
            options: {
                floor: 0,
                ceil: 20,
                step: 1
            }
        };
        // toggles
        $scope.langToggle = {
            summer: true,
            winter: false
        }
     $scope.value = false;
     $rootScope.wetsuit = "Winter"
            $scope.toggleChangeWinter = function() {
                if ($scope.value == false) {
                    $scope.value = true;
                    $rootScope.wetsuit = "Summer"
                } else
                    $scope.value = false;
                $rootScope.wetsuit = "Winter"
            };
            $scope.toggleChangeSummer = function() {
                if ($scope.value == false) {
                    $scope.value = true;
                    $rootScope.wetsuit = "Winter"
                } else
                    $scope.value = false;
                    $rootScope.wetsuit = "Summer"
            };
        $scope.getPhoto = function() {
            var options = {
                quality: 100,
                allowEdit: true,
                targetWidth: 300,
                targetHeight: 300,
                destinationType: navigator.camera.DestinationType.DATA_URL,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            
            Camera.getPicture(options).then(function(imageURI) {
                console.log(imageURI);
                $rootScope.cameraPic = imageURI;
                $rootScope.hasPic = "button-calm";
                $rootScope.hasGallery = "button-calm"
                $rootScope.galleryPic = null;

            }, function(err) {
                console.err(err);
            });
        };

        $scope.chooseMedia = function(mediaType) {

            switch (mediaType) {
                case 'photo':
                    mediaType = navigator.camera.MediaType.PICTURE;
                    break;
                default:
                    mediaType = navigator.camera.MediaType.ALLMEDIA;
                    break;
            }
            var options = {
                quality: 100,
                targetWidth: 500,
                targetHeight: 500,
                destinationType: navigator.camera.DestinationType.DATA_URL,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: navigator.camera.EncodingType.JPEG,
                mediaType: mediaType,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            Camera.getPicture(options).then(function(mediaURI) {

                console.log('Media URI ' + mediaURI);
                $rootScope.galleryPic = mediaURI;
                $rootScope.hasGallery = "button-calm";
                $rootScope.hasPic = "button-calm";
                $rootScope.cameraPic = null;

                $scope.photoPreview = "";
                if (mediaType == navigator.camera.MediaType.PICTURE) {

                    $scope.photoPreview = $sce.trustAsResourceUrl(mediaURI);

                }
            }, function(err) {
                console.log('ERRO ' + err);
            });
        }
        $scope.pushData = function() {
            var myData = new Firebase('https://blinding-inferno-5276.firebaseio.com/');
            var geocoder = new google.maps.Geocoder();
            $scope.comments = document.getElementById("theNotes").value;
            $scope.crowdMin = document.getElementById("crowdValMin").value;
            $scope.crowdMax = document.getElementById("crowdValMax").value;
            $scope.waveMin = document.getElementById("waveValMin").value;
            $scope.waveMax = document.getElementById("waveValMax").value;
            
            if (typeof $rootScope.galleryPic == 'string'){
                    $rootScope.uploadImage = $rootScope.galleryPic;
                } else {
                    $rootScope.uploadImage = $rootScope.cameraPic;
                }
            
            geocoder.geocode({
                'address': $scope.myAddress
            }, handleResults);

            function handleResults(results, status) {

                // What type of thing we passed in (myAddress)
                console.log(results[0].types[0]);

                $scope.latty = results[0].geometry.location.lat();
                $scope.longy = results[0].geometry.location.lng();
                
                $scope.firstLocation = $scope.myAddress.split(",")[0];
                $scope.secondLocation = $scope.myAddress.split(",")[1];
                $scope.finalLocation = $scope.firstLocation.concat(", ",$scope.secondLocation);
                
                //Upload data to Firebase
                var usersRef = myData.child($scope.finalLocation);

                usersRef.update({
                    myLocation: $scope.finalLocation,
                    Lat: $scope.latty,
                    Long: $scope.longy,
                    Time: Firebase.ServerValue.TIMESTAMP,
                    Note: $scope.comments,
                    CrowdMax: $scope.crowdMax,
                    CrowdMin: $scope.crowdMin,
                    WaveMax: $scope.waveMax,
                    WaveMin: $scope.waveMin,
                    Rating: $rootScope.rating,
                    Tide: $rootScope.tide,
                    Wetsuit: $rootScope.wetsuit,
                    Picture: 'data:image/png;base64,' + $rootScope.cameraPic,
                    image: 'data:image/png;base64,' + $rootScope.uploadImage
                });
            }

        }
    })
    // Map controller
    .controller('mapsCtrl', function($scope, $state, $cordovaGeolocation, $firebaseObject, $rootScope, $firebaseArray, $ionicLoading) {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        }); 
/*
        $scope.getTargetLocation = function() {
            return localStorage.getItem("targetLocation");
        };
*/
        var latLng = new google.maps.LatLng(53.418995, -4.0996304);
        var mapOptions = {
            center: latLng,
            zoom: 5,
            navigationControl: false,
            streetViewControl: false,
            disableDefaultUI: true,
            styles: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}],
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $rootScope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        google.maps.event.addListenerOnce($rootScope.map, 'idle', function() {

            //Download data from Firebase
            var myData = new Firebase('https://blinding-inferno-5276.firebaseio.com/');
            $scope.mapReport = $firebaseArray(myData); 
            myData.on("child_added", function(snapshot) {
                var newy = snapshot.val();
                var myIcon = {
                    scaledSize: new google.maps.Size(80, 80),
                    url: 'js/markershad.png',
                    anchor: new google.maps.Point(30,80)
                };

                $rootScope.theImage = newy.image;
                $rootScope.theLocation = newy.myLocation;
                console.log($rootScope.theLocation);
                $rootScope.time = newy.Time;
                $rootScope.allData = newy;
                
                //Create new marker from downloaded coords    
                var marker = new google.maps.Marker({
                    position: {
                        lat: newy.Lat,
                        lng: newy.Long
                    },
                    map: $rootScope.map,
                    animation: google.maps.Animation.DROP,
                    icon: myIcon,
                    optimized: false
                });
                $ionicLoading.hide();
              
                var myoverlay = new google.maps.OverlayView();
                myoverlay.draw = function() {
                    this.getPanes().markerLayer.id = 'markerLayer';
                };
                myoverlay.setMap($rootScope.map);

                //Populate infoWindow with relevant location data    
                var contentwindow = '<div><br/></div><div style="background-color: #fff;text-align: center; height: 50px;padding-top: 15px;font-weight:700;font-size: 17px;color: #ffc03f;"><i class="icon ion-ios-location"></i><a style="color:#2F3D4C;" href="#/places"> ' + newy.myLocation + '</a></div>' + '<div style="margin-left: 6%;"><img src="' + newy.image + '" style="width: 100%;"/><div>' + '<div style="margin-left:0%;background-color: #fff;padding-bottom:15px;font-weight:700; color:#2F3D4C;"><img id="epicInfoShaka" src="templates/img/shaka.png" /><span id="surfInfoRating">The surf is ' + newy.Rating + '!</span></div>';
                
                infowindow = new google.maps.InfoWindow({
                    content: contentwindow,
                    pixelOffset: new google.maps.Size(0, 5)
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(contentwindow);
                    infowindow.open($rootScope.map, marker);
                });
            });

        });

    });
/*
function setLocation(loc) {
    localStorage.setItem("targetLocation", loc);
}
*/