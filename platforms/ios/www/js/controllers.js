
angular.module('starter.controllers', ['rzModule', 'ui.bootstrap'])
    //var app = angular.module('upload',['firebase']);


// Camera controller
.controller('MainCtrl', function(Camera, $cordovaCapture, $sce, $scope, $firebaseObject, $rootScope, $firebaseArray, $timeout, $uibModal, $ionicLoading) {

        //Buttons
        $scope.ratingBtn = function(event) {
            $scope.rating = event.target.id;
        }
        $scope.tideBtn = function(event) {
            $rootScope.tide = event.target.id;
        }
        $scope.buttonStyle = "button-dark";
        $scope.start = function() {
                $scope.buttonStyle = "button-calm";
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
                $rootScope.galleryPic = "";

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
                quality: 120,
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
                $rootScope.cameraPic = "";

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

            geocoder.geocode({
                'address': $scope.myAddress
            }, handleResults);

            function handleResults(results, status) {

                // What type of thing we passed in (myAddress)
                console.log(results[0].types[0]);

                $scope.latty = results[0].geometry.location.lat();
                $scope.longy = results[0].geometry.location.lng();

                //Upload data to Firebase
                var usersRef = myData.child($scope.myAddress);

                usersRef.update({
                    myLocation: $scope.myAddress,
                    Lat: $scope.latty,
                    Long: $scope.longy,
                    Time: Firebase.ServerValue.TIMESTAMP,
                    Note: $scope.comments,
                    CrowdMax: $scope.crowdMax,
                    CrowdMin: $scope.crowdMin,
                    WaveMax: $scope.waveMax,
                    WaveMin: $scope.waveMin,
                    //Rating: $scope.rating,
                    Tide: $rootScope.tide,
                    //Wetsuit: $scope.wetsuit,
                    //Picture: $rootScope.cameraPic,
                    image: 'data:image/png;base64,' + $rootScope.galleryPic
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

        $scope.getTargetLocation = function() {
            return localStorage.getItem("targetLocation");
        };

        var latLng = new google.maps.LatLng(51.418995, -3.0996304);
        var mapOptions = {
            center: latLng,
            zoom: 6,
            navigationControl: false,
            streetViewControl: false,
            disableDefaultUI: true,

            styles: [{
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#d3d3d3"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "color": "#808080"
                }, {
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#b3b3b3"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }, {
                    "weight": 1.8
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#d7d7d7"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#ebebeb"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#a7a7a7"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#efefef"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#696969"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#737373"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#d6d6d6"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {}, {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#dadada"
                }]
            }],
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $rootScope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        google.maps.event.addListenerOnce($rootScope.map, 'idle', function() {
            /*  var icon = {
                url: 'http://i.imgur.com/OmHU3Wr.png', // url
                anchor: new google.maps.Point(40, 40) // anchor
                };*/
            //Download data from Firebase
            var myData = new Firebase('https://blinding-inferno-5276.firebaseio.com/');
            myData.on("child_added", function(snapshot) {
                var newy = snapshot.val()
                var myIcon = {
                    scaledSize: new google.maps.Size(75, 90),
                    url: newy.image,
                    anchor: new google.maps.Point(40, 40)
                };

                //$rootScope.thePic = newy.Picture;
                $rootScope.theImage = newy.image;
                $rootScope.theLocation = newy.myLocation;

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
                /*
                            var relData = new Firebase('https://blinding-inferno-5276.firebaseio.com/' + newy.myLocation);
                            relData.on("child_added", function(snapshot) {
                                var newRepo = snapshot.val()
                                console.log(newRepo.myLocation);
                            });
                */

                var myoverlay = new google.maps.OverlayView();
                myoverlay.draw = function() {
                    this.getPanes().markerLayer.id = 'markerLayer';
                };
                myoverlay.setMap($rootScope.map);

                //Populate infoWindow with relevant location data    
                var contentwindow = '<a href="#/report" class="button button-icon icon icon-right ion-ios-arrow-right" onClick="setLocation(\'' + newy.myLocation + '\')">' + newy.myLocation + '</a>';
                //            alert(contentwindow);
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

function setLocation(loc) {
    localStorage.setItem("targetLocation", loc);
}