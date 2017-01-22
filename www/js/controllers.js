angular.module('app.controllers', ['timer', 'ngStorage']).controller('page1Ctrl', function($scope, $ionicBackdrop, $ionicPopup, $timeout, $localStorage) {

	var storage = Storage;

	$scope.$storage = $localStorage.$default({
		ticket : ""
	});
	console.log($scope.$storage);
	var ss = $scope.$storage;
	
	// Store data with local storage so that it persists across sessions
	ss = ss ? ss : {};

	$scope.appear = false;
	$scope.startBtn = true;
	$scope.jamie = {};
	$scope.jamie.value = 12345;

	$scope.startTimer = function() {
		for (var i = 0; i < ss.session.numTasks; i++) {
			console.log('starting timer...');
			//$scope.time = "25:00";
			$scope.$broadcast('timer-start');
			$scope.startBtn = false;
			//$scope.$broadcast('timer-addCDSeconds', 6000);
			ss.session.numTasks--;
		}
	};
	console.log(ss.session.numTasks);

	$scope.stopTimer = function() {
		console.log('stopping timer...');
		//$scope.time = "25:00";
		$scope.$broadcast('timer-stop');
		$scope.startBtn = true;
		//$scope.$broadcast('timer-addCDSeconds', 6000);

	};

	$scope.goJamie = function() {
		console.log('---jamie input', $scope.jamie);
	};

	$scope.timeValue = {};
	$scope.timeValueSeconds = {};

	$scope.timeValue.value = 1500 / 60;
	var durationOfTask = 5;
	$scope.timeValueSeconds.value = durationOfTask;
	// $scope.timeValueSeconds.value = 1500; // 25 mins

	$scope.pauseTimer = function() {
		console.log('---pauseTImer');
		$scope.$broadcast('timer-stop');
		$scope.appear = true;
		//$scope.$broadcast('timer-addCDSeconds', 6000);

	};

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

	};

	$scope.showhide = function(result) {

		console.log(result);

		if (result) {
			return true;
		}
		return false;
	};

	$scope.showAlert = function() {
		$scope.showPopup();
	};

	$scope.finished = function() {
		console.log('timer finsihed');
		//document.getElementById('audio').play()
		// $ionicPopup.alert({
		//   title: 'Don\'t eat that!',
		//   template: 'It might taste good'
		// });
		$scope.showAlert();
	};

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

	ss.goals = ss.goals ? ss.goals : [];

	$scope.addGoal = function() {
		ss.goals.push("");
	};

	$scope.addSession = function(sessionName, arrayOfGoals, duration) {
		ss.session = new Session(sessionName, arrayOfGoals, duration);
	};

	//$scope.showConfirm();

	// Triggered on a button click, or some other target
	$scope.showPopup = function() {
		$scope.data = {};

		var myPopup = $ionicPopup.show({
			title : 'REST TIME',
			template : 'Time to rest'
		});

		document.getElementById('audio').play();

		$timeout(function() {
			// Reset after task
			$scope.startBtn = true;
			document.getElementById('audio').play();
			myPopup.close();
		}, restTime);
	};

	// 5 mins wait
	var restTime = 1000;
	//5 * 60 * 1000;
});
