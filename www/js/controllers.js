angular.module('app.controllers', ['timer']).controller('page1Ctrl', function($scope, $ionicBackdrop, $ionicPopup, $timeout) {

	$scope.appear = false;
	$scope.startBtn = true;
	$scope.jamie = {};
	$scope.jamie.value = 12345;

	$scope.startTimer = function() {
		console.log('starting timer...');
		//$scope.time = "25:00";
		$scope.$broadcast('timer-start');
		$scope.startBtn = false;
		//$scope.$broadcast('timer-addCDSeconds', 6000);

	}

	$scope.stopTimer = function() {
		console.log('stopping timer...');
		//$scope.time = "25:00";
		$scope.$broadcast('timer-stop');
		$scope.startBtn = true;
		//$scope.$broadcast('timer-addCDSeconds', 6000);

	}

	$scope.goJamie = function() {
		console.log('---jamie input', $scope.jamie);
	}

	$scope.timeValue = {};
	$scope.timeValueSeconds = {};

	$scope.timeValue.value = 1500 / 60;
	$scope.timeValueSeconds.value = 1500;

	$scope.pauseTimer = function() {
		console.log('---pauseTImer');
		$scope.$broadcast('timer-stop');
		$scope.appear = true;
		//$scope.$broadcast('timer-addCDSeconds', 6000);

	}

	$scope.$on('timer-stopped', function(event, data) {
		console.log('Timer Stopped - data = ', data);
		console.log('Timer Stopped - data.millis = ', data.millis);

		$scope.timeValueSeconds.value = data.millis / 1000;
		$scope.timeValue.value = Math.floor($scope.timeValueSeconds.value / 60);

	});

	$scope.timerInput = function(e) {
		//console.log("BLUR EVENT: ", $event);
		console.log('--bluringthis mofo');
		console.log(e);
		//$scope.$broadcast('timer-reset');

		$scope.timeValueSeconds.value = $scope.timeValue.value * 60;
		console.log("timeValueSeconds: ", $scope.timeValueSeconds.value);
		console.log("timevalue: ", $scope.timeValue.value);

		$scope.$broadcast('timer-set-countdown-seconds', $scope.timeValueSeconds.value);

		//$scope.$broadcast('timer-add-cd-seconds', $scope.timeValue);
		//$scope.$broadcast('timer-start');
		$scope.appear = false;

	}

	$scope.showhide = function(result) {

		console.log(result);

		if (result) {
			return true;
		}
		return false;
	}

	$scope.showAlert = function() {

		$timeout(function() {
			var alertPopup = $ionicPopup.alert({
				title : 'Don\'t eat that!',
				template : 'Well done<br /><br/>Now take a break'
			});

			//alertPopup.close(); //close the popup after 3 seconds for some reason
		}, 0);

		$timeout(function() {
			//alertPopup.close(); //close the popup after 3 seconds for some reason
		}, 3000);
	};

	$scope.finished = function() {
		console.log('timer finsihed');
		//document.getElementById('audio').play()
		// $ionicPopup.alert({
		//   title: 'Don\'t eat that!',
		//   template: 'It might taste good'
		// });
		$scope.showAlert();
	}
	// An alert dialog
	// An alert dialog

	// A confirm dialog
	$scope.showConfirm = function() {
		var confirmPopup = $ionicPopup.confirm({
			title : 'Consume Ice Cream',
			template : 'Are you sure you want to eat this ice cream?'
		});

		confirmPopup.then(function(res) {
			if (res) {
				console.log('You are sure');
			} else {
				console.log('You are not sure');
			}
		});
	};
	$scope.goals = $scope.goals ? $scope.goals : [];

	$scope.addGoal = function() {
		$scope.goals.push("");
	};

	$scope.addSession = function(sessionName, arrayOfGoals, duration) {
		console.log(sessionName);
		console.log(arrayOfGoals);
		console.log(duration);
		$scope.session = Session(sessionName, arrayOfGoals, duration);
	};
	//$scope.showConfirm();

})
