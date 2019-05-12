window.onload = function(e){ 
   var xhr = new XMLHttpRequest();
	xhr.open("GET", "/recipes");
	xhr.addEventListener("load", function(){
		var response = xhr.responseText;
		var array = response.split(',');

		var recipe_select_dropdown = document.getElementById("recipe_select");

		for(var i in array){
			var value = array[i];
			var name = value.substr(0, value.lastIndexOf('.'));
			
			var opt = document.createElement('option');
			opt.value = value;
		    opt.innerHTML = name;

		    recipe_select_dropdown.appendChild(opt);
		}
	});
	xhr.send();
}

function view(){
	var receipe_selected = document.getElementById("recipe_select").value;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/recipes/"+receipe_selected);
	xhr.addEventListener("load", function(){
		var response = xhr.responseText;
		console.log(JSON.parse(response));
		var recipe = JSON.parse(response);
		document.getElementById("duration").value = recipe.duration;
		
		var ingredients = recipe.ingredients;
		var ingredientsString = "";
		for(var i=0; i< ingredients.length; i++){	
			ingredientsString += ingredients[i] + "\n";
		}
		document.getElementById("ingredients").value = ingredientsString;

		var steps = recipe.directions;
		var stepsString = "";
		for(var i=0; i< ingredients.length; i++){	
			stepsString += steps[i] + "\n";
		}
		document.getElementById("steps").value = stepsString;

		var notes = recipe.notes;
		document.getElementById("notes").value = notes;

	});
	xhr.send();
	return true;
}

function formSubmit(){
	return false;
}

function doSubmit(){
	var receipe_selected = document.getElementById("recipe_select").value;
	var xhr = new XMLHttpRequest();

	var recipe = {};
	recipe.name = receipe_selected;
	recipe.duration = document.getElementById("duration").value;
	recipe.ingredients = document.getElementById("ingredients").value;
	recipe.steps = document.getElementById("steps").value;

	xhr.open("post", JSON.stringify(recipe));
	xhr.addEventListener("load", function(){
		var response = xhr.responseText;
		console.log(JSON.parse(response));
	});
	xhr.send();
	return true;
}