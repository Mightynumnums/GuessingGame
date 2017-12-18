
function generateWinningNumber() {
	return Math.floor(Math.random() * 100 + 1);
}

function shuffle(arr){
	var counter = arr.length -1;
	for (var i = counter; i > 0; i--) {
		var randomIndex = Math.floor(Math.random() * (i + 1));
		var tempArr = arr[i];
		arr[i] = arr[randomIndex];
		arr[randomIndex] = tempArr;
	}
	return arr
}

var Game = function() {
	this.playersGuess = null;
	this.winningNumber = generateWinningNumber();
	this.pastGuesses = [];
}

Game.prototype.difference = function(){
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower  = function() {
	if (this.playersGuess < this.winningNumber){
		return true;
	}
	return false;
}

Game.prototype.playersGuessSubmission = function(guess) {
	if (typeof guess !== 'number' || guess < 1 || guess > 100){
		throw "That is an invalid guess.";
	}
	this.playersGuess = guess;
	return this.checkGuess();
}


Game.prototype.checkGuess = function(){
	if (this.playersGuess === this.winningNumber){
		return 'You Win!';
	}
	else {
		if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
			return 'You have already guessed that number.';
		}
		else {
			this.pastGuesses.push(this.playersGuess);
			if (this.pastGuesses.length === 5){
				return 'You Lose.';
			}
			else {
				var diff = this.difference();

				if (diff < 10){
					return  'You\'re burning up!';
				} else if (diff < 25){
					return 'You\'re lukewarm.';
				} else if (diff < 50){
					return 'You\'re a bit chilly.';
				} else {
					return 'You\'re ice cold!';
				} 
			}
		}
	}
}

function newGame() {
	return new Game();
}


Game.prototype.provideHint = function() {
	var hintArr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
	return shuffle(hintArr);

}






