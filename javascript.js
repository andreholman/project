for (var i = objects.length - 1; i >= 0; i--) {
	if (objects[i].y > innerHeight + objects[i].radius) {
		objects.splice(objects[i], 1);
	}
	if (distance(objects[i].x, objects[i].y, mouse.x, mouse.y) <= 20 + objects[i].radius) {

		document.getElementById("endgame").innerHTML = "Game over! <a href='file:///Users/holman/Desktop/Webapps/Collab/index.html'>REPLAY</a>";
		document.getElementById("main").style.cursor = "crosshair";
		clearInterval(timer)
	}
}
