let img = '';
let input;
let save_button;

function setup() {
  canvas = createCanvas(1000, 1000);
  canvas.drop(gotFile); // ドラッグ＆ドロップされた画像を取得

  pixelDensity(1); // 解像度を変えたい場合は、ここをいじる
  background(0);

  textSize(30);
  fill(255, 0, 0);

  // 操作用のGUIの作成

  input = createFileInput(gotFile);
  input.position(width * 0.35, height * 0.1);
  input.size(150, 300);
  save_button = createButton("-- S A V E --");
  save_button.position(width * 0.55, height * 0.1);
  save_button.size(100, 30);
  save_button.mousePressed(save_file);

  textSize(width / 25);
  textAlign(CENTER, CENTER);
  fill(255);
  text("ファイルボタンまたはクリック&ドロップで画像選択", width / 2, height / 4);
  text("--SAVE--ボタンで画像の保存", width / 2, height / 3);
}

function draw() {
    if (img) {
      background(255);
      // canvasの大きさを画像の大きさに変更
      resizeCanvas(img.width, img.height);

      for (let i = 0; i < width; i++) {
        let color = img.get(i, width-i);
        stroke(color);
        line(i, 0, i, height);
      }
      for (let j = 0; j < height; j++) {
        let color2 = img.get(height-j, j);
        //blendMode(OVERLAY);
        stroke(color2);
        line(0, j, width, j);
      }
    }
}

function gotFile(file) {
  img = loadImage(file.data, '');
}

// inputから投稿したファイルの処理
function handleFile(file) {
  print(file);
  if (file.type === "image") {
    img = createImg(file.data, "");
    img.hide();
  } else {
    img = null;
  }
}

function save_file() {
    saveCanvas("myImage", "png");
}
