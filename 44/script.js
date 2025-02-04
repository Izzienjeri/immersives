const canvas = document.getElementById("mandalaCanvas");
const ctx = canvas.getContext("2d");
const generateButton = document.getElementById("generateButton");

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function drawMirroredShape(
  x,
  y,
  angle,
  levelRadius,
  outerRadius,
  level,
  levels,
  triangleBaseLength,
  triangleHeight
) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const lineLength = 20;

  if (level === levels - 1) {
    const tipX = centerX + outerRadius * Math.cos(angle);
    const tipY = centerY + outerRadius * Math.sin(angle);
    const base1X =
      centerX + (outerRadius - triangleHeight) * Math.cos(angle - Math.PI / 2);
    const base1Y =
      centerY + (outerRadius - triangleHeight) * Math.sin(angle - Math.PI / 2);
    const base2X =
      centerX + (outerRadius - triangleHeight) * Math.cos(angle + Math.PI / 2);
    const base2Y =
      centerY + (outerRadius - triangleHeight) * Math.sin(angle + Math.PI / 2);

    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(base1X, base1Y);
    ctx.lineTo(base2X, base2Y);
    ctx.closePath();
    ctx.stroke();

    const mirroredTipX = centerX - (tipX - centerX);
    const mirroredBase1X = centerX - (base1X - centerX);
    const mirroredBase2X = centerX - (base2X - centerX);

    ctx.beginPath();
    ctx.moveTo(mirroredTipX, tipY);
    ctx.lineTo(mirroredBase1X, base1Y);
    ctx.lineTo(mirroredBase2X, base2Y);
    ctx.closePath();
    ctx.stroke();
  } else {
    const endX1 =
      centerX + (levelRadius + lineLength) * Math.cos(angle - Math.PI / 2);
    const endY1 =
      centerY + (levelRadius + lineLength) * Math.sin(angle - Math.PI / 2);
    const endX2 =
      centerX + (levelRadius + lineLength) * Math.cos(angle + Math.PI / 2);
    const endY2 =
      centerY + (levelRadius + lineLength) * Math.sin(angle + Math.PI / 2);

    if (
      Math.sqrt(Math.pow(endX1 - centerX, 2) + Math.pow(endY1 - centerY, 2)) <
        outerRadius &&
      Math.sqrt(Math.pow(endX2 - centerX, 2) + Math.pow(endY2 - centerY, 2)) <
        outerRadius
    ) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX1, endY1);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX2, endY2);
      ctx.stroke();

      const mirroredX = centerX - (x - centerX);
      const mirroredEndX1 = centerX - (endX1 - centerX);
      const mirroredEndX2 = centerX - (endX2 - centerX);

      ctx.beginPath();
      ctx.moveTo(mirroredX, y);
      ctx.lineTo(mirroredEndX1, endY1);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mirroredX, y);
      ctx.lineTo(mirroredEndX2, endY2);
      ctx.stroke();
    }
  }
}
function drawMandala() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) * 0.8;
  const numberOfLines = Math.floor(Math.random() * 20 + 20);
  const levels = Math.floor(Math.random() * 5 + 3);
  const lineWidth = Math.random() * 1 + 0.5;
  ctx.lineWidth = lineWidth;
  const drawOuterCircle = Math.random() > 0.5;
  const triangleBaseLength = 20;
  const triangleHeight = 20;

  for (let level = 0; level < levels; level++) {
    const levelRadius = radius * ((level + 1) / levels);
    ctx.strokeStyle = generateRandomColor();

    for (let i = 0; i < numberOfLines; i++) {
      const angle = (i / numberOfLines) * 2 * Math.PI;
      const startX = centerX + levelRadius * Math.cos(angle);
      const startY = centerY + levelRadius * Math.sin(angle);

      const outerRadius = radius;
      drawMirroredShape(
        startX,
        startY,
        angle,
        levelRadius,
        outerRadius,
        level,
        levels,
        triangleBaseLength,
        triangleHeight
      );
    }
  }

  if (drawOuterCircle) {
    ctx.strokeStyle = generateRandomColor();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

drawMandala();
setInterval(drawMandala, 60 * 1000);
generateButton.addEventListener("click", drawMandala);
