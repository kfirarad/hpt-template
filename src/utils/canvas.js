const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => reject(console.log(`load ${url} fail`));
    img.src = url;
  });
};

const draw = (ctx, src, x, y) => {
  return loadImage(src).then((img) => {
    ctx.drawImage(img, x, y);
  });
};

const createCanvas = (homeLogo, awayLogo, homeScore, awayScore) => {
  const canvas = document.querySelector("canvas");
  const layer1 = canvas.getContext("2d");
  layer1.clearRect(0, 0, canvas.width, canvas.height);
  layer1.font = "italic 102px Rubik";
  layer1.fillStyle = "#fff";
  document.fonts
    .load("italic 102px Rubik")
    .then(() => draw(layer1, "./assets/bg.png", 0, 0))
    .then(() =>
      Promise.all([
        draw(layer1, "./assets/ft-bg.png", 203, 292),
        draw(layer1, "./assets/right.png", 899, 474),
        draw(layer1, "./assets/left.png", 0, 569),
        draw(layer1, "./assets/vs.png", 471, 583)
      ])
    )
    .then(() =>
      Promise.all([
        draw(layer1, "./assets/ft.png", 118, 311, 2),
        //Logo Home
        draw(layer1, `./assets/${homeLogo}`, 205, 513, 2),
        //Logo Away
        draw(layer1, `./assets/${awayLogo}`, 644, 513, 2)
      ])
    )
    .then(() => {
      finalScore(homeScore, awayScore);
    })
    .then(download);
};

function finalScore(home, away) {
  const layer1 = document.querySelector("canvas").getContext("2d");
  layer1.fillText(home, 44, 685);
  //Away Score
  layer1.fillText(away, 950, 590);
}

function download() {
  const canvas = document.querySelector("canvas");
  canvas.toBlob(function (blob) {
    var newImg = document.createElement("img"),
      url = URL.createObjectURL(blob);

    newImg.onload = function () {
      // no longer need to read the blob so it's revoked
      URL.revokeObjectURL(url);
    };

    newImg.src = url;
    document.body.appendChild(newImg);
    canvas.style.display = "none";
  });
}

export { createCanvas };
