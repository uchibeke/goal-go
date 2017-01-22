function Session(name, goalsArray, timeInHrs) {
	this.name = name;
	this.sessionGoals = goalsArray;
	this.numTasks = timeInHrs * 2;
	this.tasks = [];
	this.currentTask = 0;
}

Session.prototype = {
	constructor : Session,
	// Can Add one task.
	addTask : function(taskToAdd) {
		this.tasks.push(taskToAdd)
	},
	// With ng-repeat use the this.numTasks var to pupulate
	populateTasks : function(arrOfTasks) {
		for (var i = 0; i < arrOfTasks.length; i++) {
			this.addTask(arrOfTasks[i]);
			console.log(arrOfTasks[i]);
		}
	},
	getNumOfSessionTasks : function() {
		return this.numTasks;
	},
	getName : function() {
		return this.name;
	},
	getSessionGoals : function() {
		return this.sessionGoals;
	},
	sessionOutCome : function() {
		return this.analyized(this.sessionGoals);
	},
	showTask : function(index) {
		var task = this.tasks.length > 0 ? this.tasks[index] : "NON";
		return this.name + " has task |" + task + "| at place " + index;
	},
	showSessionTasks : function() {
		var allTasks = this.tasks.length > 0 ? this.tasks.join(", ") : "No Task";
		return this.tasks.length + " tasks: " + allTasks;
	},
	analyized : function(goals) {
		var totalScore = 0;
		var scoredwords = [];
		for (var i = 0; i < goals.length; i++) {
			var itemsInWord = goals[i].split(" ");
			for (var j = 0; j < itemsInWord.length; j++) {
				var word = itemsInWord[j].toLowerCase();
				if (affin.hasOwnProperty(word)) {
					var score = affin[word];
					console.log(word, score);
					totalScore += Number(score);
					scoredwords.push(word + ': ' + score + ' ');
				}
			}
		}
		return {
			score : totalScore,
			scoredwords: scoredwords
		};
	}
}