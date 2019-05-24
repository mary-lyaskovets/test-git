const game = {};
game.grid = document.querySelector("section");
game.reset = document.querySelector("section .reset");
game.div = document.querySelectorAll("section div");
game.winner = document.querySelector(".winner");
game.click_count = 1;
game.click_player = [];
game.field = [];
game.stop = false;

game.utils = {};
game.utils.methods = {};

game.utils.methods.markupDiv = function () {
	let j = -1,
		i = 0;
	for(let k=0;k < game.div.length; k++) {
		if(k%3 === 0) j++;
		i = k%3;

		if(!game.field[j]) game.field[j] = [];
		 
		game.field[j][i] = 0;

		if(!game.div[k].getAttribute(i)) game.div[k].setAttribute('i',i);
		if(!game.div[k].getAttribute(j)) game.div[k].setAttribute('j',j);
		i++;
	}
};


game.utils.methods.handleBox = function(event) {
	
	if(event.target.tagName === "DIV") {

		if(game.stop) return;

		let el = event.target;

		if(el.classList.contains('checked')) return alert('This field already checked'); 

		let player = game.click_count % 2 ? 0 : 1,
			class_name = game.click_count % 2 ? 'x' : 'o';

		let i = parseInt(el.getAttribute('i')),
			j = parseInt(el.getAttribute('j'));

		game.click_player[player] = Math.ceil(game.click_count / 2);

		game.field[j][i] = game.click_count % 2 ? -1 : 1;
		
		el.classList.add('checked');
		el.classList.add(class_name);

		if(game.click_player[player] > 2) {
			game.utils.methods.moves(player);
		}
		game.click_count++;

		if(game.click_count > 9) {
			game.utils.methods.resetGame();
			document.body.classList.add('disabled');
			game.utils.methods.showWinner('Nobody win :-(');
			return;
		}
	}
};

game.utils.methods.moves = function(player) {
	let j = -1,
		i = 0;

	for(let k=0; k < game.div.length; k++) {

		if(k%3 === 0) j++;
		i = k%3;

		let i_next  = i+1;
		let i_last  = i+2;
		let j_next  = j+1;
		let j_last  = j+2;
		
		if(game.div[k] !== 0 && i >= 0 && i <= 2 && j >= 0 && j <= 2 && (
			/*vartical*/(j_last <=2 && game.field[i][j] && game.field[i][j_next] && game.field[i][j_last] && Math.abs(game.field[i][j] + game.field[i][j_next] + game.field[i][j_last]) === 3) ||
			/*horrizontal*/(i_last <=2 && game.field[i][j] && game.field[i_next][j] && game.field[i_last][j] && Math.abs(game.field[i][j] + game.field[i_next][j] + game.field[i_last][j]) === 3) ||
			/*diagonal*/(i_last <=2 && j_last <=2 && game.field[i][j] && game.field[i_next][j_next] && game.field[i_last][j_last] && Math.abs(game.field[i][j] + game.field[i_next][j_next] + game.field[i_last][j_last]) === 3) ||
			/*diagonal*/(i_last <=2 && j_last <=2 && game.field[i][j_last] && game.field[i_next][j_next] && game.field[i_last][j] && Math.abs(game.field[i][j_last] + game.field[i_next][j_next] + game.field[i_last][j]) === 3)
		)) {
			game.utils.methods.showWinner('Winner: player ' + player);
			game.stop = true;
		} else {
			i++;
		}
	}

	if (game.stop) {
		document.body.classList.add('disabled');
		return;
	}

};

game.utils.methods.showWinner = function(txt) {
	game.winner.innerHTML = txt;
};

game.utils.methods.resetGame = function() {
	game.div.forEach(function(element) {
		element.removeAttribute('class');
	});
	document.body.removeAttribute('class');
	game.stop = false;
	game.click_count = 1;
	game.click_player = [];
	game.field = [];
	game.utils.methods.markupDiv();
};

game.utils.methods.markupDiv();

game.grid.addEventListener("click", game.utils.methods.handleBox);
game.reset.addEventListener("click", game.utils.methods.resetGame);


