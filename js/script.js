var water = document.getElementById("water"),
    waterCanvas = water.getContext('2d'),
    brushRadius = (water.width / 100) * 5,
    img = new Image();

if (brushRadius < 50) { brushRadius = 50 }

img.onload = function () {
    waterCanvas.drawImage(img, 0, 0, water.width, water.height);
}

img.src = './img/1.jpg';

function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}

function getBrushPos(xRef, yRef) {
    var waterRect = water.getBoundingClientRect();
    return {
        x: Math.floor((xRef - waterRect.left) / (waterRect.right - waterRect.left) * water.width),
        y: Math.floor((yRef - waterRect.top) / (waterRect.bottom - waterRect.top) * water.height)
    };
}

function drawDot(mouseX, mouseY) {
    waterCanvas.beginPath();
    waterCanvas.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
    waterCanvas.fillStyle = '#000';
    waterCanvas.globalCompositeOperation = "destination-out";
    waterCanvas.fill();
}

water.addEventListener("mousemove", function (e) {
    var brushPos = getBrushPos(e.clientX, e.clientY);
    var leftBut = detectLeftButton(e);
    if (leftBut == 1) {
        drawDot(brushPos.x, brushPos.y);
    }
}, false);

water.addEventListener("touchmove", function (e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
        var brushPos = getBrushPos(touch.pageX, touch.pageY);
        drawDot(brushPos.x, brushPos.y);
    }
}, false);