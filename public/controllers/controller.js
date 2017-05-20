var myApp = angular.module('myApp',['ui.bootstrap']);
myApp.controller("AppCtrl",['$scope','$http', 
	function($scope,$http){
		$scope.getArtists = function(val) {
		    return $http.get('https://api.spotify.com/v1/search?q='+val+'&type=artist').then(successCallBack, errorCallback);
		 };
		 $scope.search = function(){
		 	$scope.albums =  [];
		 	$http.get('https://api.spotify.com/v1/artists/'+$scope.id+'/albums?limit=50').then(successAlbumsSearch, errorAlbumsSearch);
		 	return;
		 }
		 $scope.onSelect = function(item, model, label){
		 	$scope.id = item.id;
		 }
		 $scope.getAlbumImg = function(idx){
		 	console.log('hi hi');
		 	return $scope.albums[idx].images[0].url;
		 }
		function successCallBack(res){
			return res.data.artists.items;
		}
		function errorCallback(err){
			console.log(err);
		}
		function successAlbumsSearch(res){
			var items = res.data.items;
			for(var i=0; i<items.length; i++){
				$scope.albums.push($http.get('https://api.spotify.com/v1/albums/'+items[i].id));
			}
			Promise.all($scope.albums).then(function(res){
					$scope.$apply(function(){
						for(var i=0;i<res.length;i++){
						$scope.albums[i] = res[i].data;
						}
					});
					return res;
				},
				function(err){
					console.log(err);
				});
			return res;
		}
		function errorAlbumsSearch(err){
			console.log(err);
		}
		function successInfoSearch(res){
			console.log(res.data);
			return res.data;
		}
		function errorInfoSearch(err){
			console.log(err);
		}
}]);