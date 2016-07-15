let diffControls = document.querySelector(".controls__difficulty"),
	mainBoxesList = document.querySelector(".main-boxes__list"),
	customBoxes = document.querySelector(".controls--num-of-boxes"),
	stopButton = document.querySelector(".controls--stop-game"),
	score = document.querySelector(".main-content__score"),
	timer = document.querySelector(".main-content__timer");

let generateList = (function() {

	return {

		clearChildrenLi : function(){
			while(mainBoxesList.firstChild){
				mainBoxesList.removeChild(mainBoxesList.firstChild);
			}
		},

		generateBoxes : function(num) {

			this.clearChildrenLi();

			for(let i = 0; i < num; i++){
				let li = document.createElement("li");
				mainBoxesList.appendChild(li)
			}
		},

		customBoxes : function(){
			customBoxes.addEventListener("keyup", function() {
				generateList.generateBoxes(customBoxes.value);
			});
		}

	}

})();

generateList.generateBoxes(customBoxes.value);
generateList.customBoxes();