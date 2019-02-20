<!DOCTYPE html>
<html>
<head>
	<title>Draw Pictures</title>
</head>
<body>
<canvas id="canvas" width="32" height="44" background="transparent"></canvas>
<script src="http://hongru.github.io/proj/canvas2image/canvas2image.js"></script>
<script type="text/javascript">
function addTextToImage(imagePath, text) {
    var circle_canvas = document.getElementById("canvas");
    var context = circle_canvas.getContext("2d");

    // Draw Image function
    var img = new Image();
    img.src = imagePath;
    img.onload = function () {
        context.drawImage(img, 0, 12);
        context.lineWidth = 1;
        context.fillStyle = "#CC00FF";
        context.lineStyle = "#ffff00";
        context.font = "12px sans-serif";
        context.fillText(text, 0, 12);
    };
    Canvas2Image.saveAsPNG(circle_canvas);
}
addTextToImage("images/favicon-32x32.png", "$1.45");



</script>
</body>
</html>