let startButton = document.querySelector(".controls--start-game"),
	allBoxes = document.querySelector(".main-boxes__list").children;

let gameLogic = (function() {


	let level = 4000,
		intervalLoop,
		startGame = false;	
		scoreCounter = 0,
		setTime = 30,
		setTimeInterval = null;


	return {

		clearAllClasses : function(){
			for(let i = 0; i < allBoxes.length; i++){
				allBoxes[i].removeAttribute("class");
			}
		},

		setDifficulty : function(){
			diffControls.addEventListener("change", function() {
				if(this.value === "Easy"){
					level = 4000;
				}

				if(this.value === "Normal"){
					level = 2000;
				}

				if(this.value === "Hard"){
					level = 1000;
				}

			});
		},

		setTimer : function(){
			setTimeInterval = setInterval(function() {
				if(setTime === 1){
					clearInterval(setTimeInterval);
					clearInterval(intervalLoop);
					stopButton.click();
				}
				setTime--;
				timer.innerHTML = "Time: " + setTime;
			}, 1000);
		},

		boxesLogic : function(){

			let box = allBoxes[Math.floor(Math.random() * allBoxes.length)];
				box.className = "activeBox";

			intervalLoop = setInterval(gameLogic.boxesLoop, level)
		},

		boxesLoop : function(){
			gameLogic.clearAllClasses();
			let box = allBoxes[Math.floor(Math.random() * allBoxes.length)];
			box.className = "activeBox"
		},

		hasClass : function(element, cls){
			return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		},

		setClickOnBoxes : function(){

			$(allBoxes).on("click", function() {
				if($(this).hasClass("activeBox")){
					scoreCounter = scoreCounter + 1;
					score.innerHTML = "Score: " + scoreCounter;
					gameLogic.boxesLoop();
				}else{
					scoreCounter = scoreCounter - 1;
					score.innerHTML = "Score: " + scoreCounter;
				}
			});

		},

		startGame : function(){
			startButton.addEventListener("click", function() {
				gameLogic.boxesLogic();
				startGame = true;
				this.setAttribute("disabled", "disabled");
				gameLogic.setTimer();
				setTime = 30;
				timer.innerHTML = "Time: " + setTime;
				if(startGame){
					if(scoreCounter > 0){
						scoreCounter = 0;
						score.innerHTML = "Score: " + scoreCounter;
					}
					gameLogic.setClickOnBoxes();
				}
			});

		},

		preventFormSubmit : function(){
			$(".main-headline__controls").on("submit", function(e){
				e.preventDefault();
			})
		},

		stopGame : function(){
			stopButton.addEventListener("click", function() {
				gameLogic.clearAllClasses();
				clearInterval(intervalLoop);
				startButton.removeAttribute("disabled", "disabled");
				startGame = false;
				$(allBoxes).unbind().click();
				clearInterval(setTimeInterval)
				setTime = 1;

			});
		}

	}

})();

gameLogic.startGame();
gameLogic.setDifficulty();
gameLogic.stopGame();
gameLogic.preventFormSubmit();