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

var s = new Session("Uchi\'s", ["Read Book optimistic", "Study Ds happy", "Tell me Story"], 3);
s.addTask("Study");
s.populateTasks(["Study Java", "Practice DS", "Study Math"]);
console.log(s.showTask(1));
console.log(s.showSessionTasks());
console.log(s.getNumOfSessionTasks());
console.log(s.sessionOutCome());
