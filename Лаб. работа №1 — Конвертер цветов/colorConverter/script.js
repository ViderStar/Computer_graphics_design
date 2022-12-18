const colorPicker = new iro.ColorPicker(".main-color-block", {
  width: 120,
  color: "rgb(255, 255, 255)",
  borderWidth: 1,
  borderColor: "#fff",
  activeHandleRadius: 8,
});
const btnPick = document.querySelector(".pick");
const mainSelect = document.querySelector(".main-color-select");
const color2Select = document.querySelector(".color-2");
const color3Select = document.querySelector(".color-3");
const copy2Btn = document.querySelector(".copy-2");
const copy3Btn = document.querySelector(".copy-3");
const colorText2 = document.querySelector(".color-text-2");
const colorText3 = document.querySelector(".color-text-3");
const mainBlock = document.querySelector(".main-color-block");
const color2Block = document.querySelector(".color-2-block");
const color3Block = document.querySelector(".color-3-block");
const mainInput1 = document.querySelector(".main-input-1");
const mainInput2 = document.querySelector(".main-input-2");
const mainInput3 = document.querySelector(".main-input-3");
const mainInput4 = document.querySelector(".main-input-4");
const label1 = document.querySelector(".label-1");
const label2 = document.querySelector(".label-2");
const label3 = document.querySelector(".label-3");
const label4 = document.querySelector(".label-4");
const colorPickerB = document.querySelector(".main-color-block");
let mainChange = true;

/* Начальные данные */

mainInput1.value = colorPicker.color.rgb["r"];
mainInput2.value = colorPicker.color.rgb["g"];
mainInput3.value = colorPicker.color.rgb["b"];
color2Block.style.backgroundColor = colorPicker.color.rgbString;
color3Block.style.backgroundColor = colorPicker.color.rgbString;

/* Копирование текста с 2-го и 3-го цветов */

copy2Btn.addEventListener("click", () => {
  navigator.clipboard.writeText(colorText2.value);
  alert("Код " + color2Select.value + " скопирован в буфер обмена.");
  navigator.clipboard.writeText(colorText2.value);
});

copy3Btn.addEventListener("click", () => {
  navigator.clipboard.writeText(colorText3.value);
  alert("Код " + color3Select.value + " скопирован в буфер обмена.");
  navigator.clipboard.writeText(colorText3.value);
});

/* Изменение main */

function changeMainInputs() {
  switch (mainSelect.value) {
    case "rgb":
      mainInput1.value = colorPicker.color.rgb["r"];
      mainInput2.value = colorPicker.color.rgb["g"];
      mainInput3.value = colorPicker.color.rgb["b"];
      break;
    case "hex":
      mainInput1.value = colorPicker.color.hexString;
      break;
    case "cmyk":
      let cmykArr = rgbToCmyk(
        colorPicker.color.rgb["r"],
        colorPicker.color.rgb["g"],
        colorPicker.color.rgb["b"]
      );
      mainInput1.value = cmykArr[0];
      mainInput2.value = cmykArr[1];
      mainInput3.value = cmykArr[2];
      mainInput4.value = cmykArr[3];
      break;
    case "xyz":
      let xyzArr = rgbToCmyk(
        colorPicker.color.rgb["r"],
        colorPicker.color.rgb["g"],
        colorPicker.color.rgb["b"]
      );
      mainInput1.value = xyzArr[0];
      mainInput2.value = xyzArr[1];
      mainInput3.value = xyzArr[2];
      break;
    case "lab":
      let labArr = rgbToLab(
        colorPicker.color.rgb["r"],
        colorPicker.color.rgb["g"],
        colorPicker.color.rgb["b"]
      );
      mainInput1.value = labArr[0];
      mainInput2.value = labArr[1];
      mainInput3.value = labArr[2];
      break;
    case "hsv":
      let hsvArr = rgbToHsv(
        colorPicker.color.rgb["r"],
        colorPicker.color.rgb["g"],
        colorPicker.color.rgb["b"]
      );
      mainInput1.value = hsvArr[0];
      mainInput2.value = hsvArr[1];
      mainInput3.value = hsvArr[2];
      break;
    case "hsl":
      mainInput1.value = colorPicker.color.hsv["h"];
      mainInput2.value = colorPicker.color.hsv["s"];
      mainInput3.value = colorPicker.color.hsv["v"];
      break;
  }
}

colorPicker.on("color:change", function () {
  if (mainChange) {
    changeMainInputs();
  }

  change2ndModel();
  change3ndModel();
  mainChange = true;
});

btnPick.addEventListener("click", () => {
  mainChange = false;
  switch (mainSelect.value) {
    case "rgb":
      if (isRgb(mainInput1.value, mainInput2.value, mainInput3.value)) {
        colorPicker.color.rgb = {
          r: mainInput1.value,
          g: mainInput2.value,
          b: mainInput3.value,
        };
      }
      break;
    case "hex":
      if (isHex(mainInput1.value)) {
        colorPicker.color.hexString = mainInput1.value;
      }
      break;
    case "cmyk":
      if (
        isCmyk(
          mainInput1.value,
          mainInput2.value,
          mainInput3.value,
          mainInput4.value
        )
      ) {
        let rgbArr = cmykToRgb(
          mainInput1.value,
          mainInput2.value,
          mainInput3.value,
          mainInput4.value
        );
        colorPicker.color.rgb = {
          r: rgbArr[0],
          g: rgbArr[1],
          b: rgbArr[2],
        };
      }
      break;
    case "xyz":
      if (isXyz(mainInput1.value, mainInput2.value, mainInput3.value)) {
        let rgbArr = xyzToRgb(
          mainInput1.value,
          mainInput2.value,
          mainInput3.value
        );
        colorPicker.color.rgb = {
          r: rgbArr[0],
          g: rgbArr[1],
          b: rgbArr[2],
        };
      }
      break;
    case "lab":
      if (isLab(mainInput1.value, mainInput2.value, mainInput3.value)) {
        let rgbArr = labToRgb(
          mainInput1.value,
          mainInput2.value,
          mainInput3.value
        );
        colorPicker.color.rgb = {
          r: rgbArr[0],
          g: rgbArr[1],
          b: rgbArr[2],
        };
      }
      break;
    case "hsv":
      if (isHsv(mainInput1.value, mainInput2.value, mainInput3.value)) {
        let rgbArr = hsvToRgb(
          mainInput1.value,
          mainInput2.value,
          mainInput3.value
        );
        colorPicker.color.rgb = {
          r: rgbArr[0],
          g: rgbArr[1],
          b: rgbArr[2],
        };
      }
      break;
    case "hsl":
      if (isHsl(mainInput1.value, mainInput2.value, mainInput3.value)) {
        colorPicker.color.hsl = {
          h: mainInput1.value,
          s: mainInput2.value,
          l: mainInput3.value,
        };
      }
      break;
  }

  change2ndModel();
  change3ndModel();
});

mainSelect.addEventListener("change", () => {
  changeMainInput(mainSelect.value);
});

/* Изменение букав у Input */

function changeMainInput(codeName) {
  switch (codeName) {
    case "rgb":
      label1.innerHTML = "R";
      label2.innerHTML = "G";
      label3.innerHTML = "B";
      label4.innerHTML = "";
      mainInput1.disabled = false;
      mainInput1.value = colorPicker.color.rgb["r"];
      mainInput2.disabled = false;
      mainInput2.value = colorPicker.color.rgb["g"];
      mainInput3.disabled = false;
      mainInput3.value = colorPicker.color.rgb["b"];
      mainInput4.disabled = true;
      mainInput4.value = "";
      break;
    case "hex":
      label1.innerHTML = "";
      label2.innerHTML = "";
      label3.innerHTML = "";
      label4.innerHTML = "";
      mainInput1.disabled = false;
      mainInput1.value = colorPicker.color.hexString;
      mainInput2.disabled = true;
      mainInput3.disabled = true;
      mainInput4.disabled = true;
      mainInput2.value = "";
      mainInput3.value = "";
      mainInput4.value = "";
      break;
    case "cmyk":
      label1.innerHTML = "C";
      label2.innerHTML = "M";
      label3.innerHTML = "Y";
      label4.innerHTML = "K";
      let cmykArr = rgbToCmyk(
        colorPicker.color.rgb["r"],
        colorPicker.color.rgb["g"],
        colorPicker.color.rgb["b"]
      );
      mainInput1.disabled = false;
      mainInput1.value = cmykArr[0];
      mainInput2.disabled = false;
      mainInput2.value = cmykArr[1];
      mainInput3.disabled = false;
      mainInput3.value = cmykArr[2];
      mainInput4.disabled = false;
      mainInput4.value = cmykArr[3];
      break;
    case "xyz":
      label1.innerHTML = "X";
      label2.innerHTML = "Y";
      label3.innerHTML = "Z";
      label4.innerHTML = "";
      mainInput1.disabled = false;
      mainInput2.disabled = false;
      mainInput3.disabled = false;
      mainInput4.disabled = true;
      let xyzArr = rgbToCmyk(
        colorPicker.color.rgb["r"],
        colorPicker.color.rgb["g"],
        colorPicker.color.rgb["b"]
      );
      mainInput1.value = xyzArr[0];
      mainInput2.value = xyzArr[1];
      mainInput3.value = xyzArr[2];
      mainInput4.value = "";
      break;
    case "lab":
      label1.innerHTML = "L";
      label2.innerHTML = "A";
      label3.innerHTML = "B";
      label4.innerHTML = "";
      mainInput1.disabled = false;
      mainInput2.disabled = false;
      mainInput3.disabled = false;
      mainInput4.disabled = true;
      let labArr = rgbToLab(
        colorPicker.color.rgb["r"],
        colorPicker.color.rgb["g"],
        colorPicker.color.rgb["b"]
      );
      mainInput1.value = labArr[0];
      mainInput2.value = labArr[1];
      mainInput3.value = labArr[2];
      mainInput4.value = "";
      break;
    case "hsv":
      label1.innerHTML = "H";
      label2.innerHTML = "S";
      label3.innerHTML = "V";
      label4.innerHTML = "";
      mainInput1.disabled = false;
      mainInput2.disabled = false;
      mainInput3.disabled = false;
      mainInput4.disabled = true;
      let hsvArr = rgbToHsv(
        colorPicker.color.rgb["r"],
        colorPicker.color.rgb["g"],
        colorPicker.color.rgb["b"]
      );
      mainInput1.value = hsvArr[0];
      mainInput2.value = hsvArr[1];
      mainInput3.value = hsvArr[2];
      mainInput4.value = "";
      break;
    case "hsl":
      label1.innerHTML = "H";
      label2.innerHTML = "S";
      label3.innerHTML = "L";
      label4.innerHTML = "";
      mainInput1.disabled = false;
      mainInput2.disabled = false;
      mainInput3.disabled = false;
      mainInput4.disabled = true;
      mainInput1.value = colorPicker.color.hsv["h"];
      mainInput2.value = colorPicker.color.hsv["s"];
      mainInput3.value = colorPicker.color.hsv["v"];
      mainInput4.value = "";
  }
}

/* Изменение 2 и 3 модели */

color2Select.addEventListener("change", () => {
  let arrRgb = [
    colorPicker.color.rgb["r"],
    colorPicker.color.rgb["g"],
    colorPicker.color.rgb["b"],
  ];
  switch (color2Select.value) {
    case "rgb":
      colorText2.value = colorPicker.color.rgbString;
      break;
    case "hex":
      colorText2.value = colorPicker.color.hexString;
      break;
    case "cmyk":
      colorText2.value = rgbToCmyk(...arrRgb).join("%, ") + "%";
      break;
    case "xyz":
      colorText2.value = rgbToXyz(...arrRgb).join(", ");
      break;
    case "lab":
      colorText2.value = rgbToLab(...arrRgb).join(", ");
      break;
    case "hsv":
      colorText2.value =
        rgbToHsv(mainInput1.value, mainInput2.value, mainInput3.value)[0] +
        ", " +
        rgbToHsv(mainInput1.value, mainInput2.value, mainInput3.value)[1] +
        "%, " +
        rgbToHsv(mainInput1.value, mainInput2.value, mainInput3.value)[2] +
        "%";
      break;
    case "hsl":
      colorText2.value =
        colorPicker.color.hsl["h"] +
        ", " +
        colorPicker.color.hsl["s"] +
        "%, " +
        colorPicker.color.hsl["l"] +
        "%";
  }
});

color3Select.addEventListener("change", () => {
  let arrRgb = [
    colorPicker.color.rgb["r"],
    colorPicker.color.rgb["g"],
    colorPicker.color.rgb["b"],
  ];
  switch (color3Select.value) {
    case "rgb":
      colorText3.value = colorPicker.color.rgbString;
      break;
    case "hex":
      colorText3.value = colorPicker.color.hexString;
      break;
    case "cmyk":
      colorText3.value = rgbToCmyk(...arrRgb).join("%, ") + "%";
      break;
    case "xyz":
      colorText3.value = rgbToXyz(...arrRgb).join(", ");
      break;
    case "lab":
      colorText3.value = rgbToLab(...arrRgb).join(", ");
      break;
    case "hsv":
      colorText3.value =
        rgbToHsv(mainInput1.value, mainInput2.value, mainInput3.value)[0] +
        ", " +
        rgbToHsv(mainInput1.value, mainInput2.value, mainInput3.value)[1] +
        "%, " +
        rgbToHsv(mainInput1.value, mainInput2.value, mainInput3.value)[2] +
        "%";
      break;
    case "hsl":
      colorText3.value =
        colorPicker.color.hsl["h"] +
        ", " +
        colorPicker.color.hsl["s"] +
        "%, " +
        colorPicker.color.hsl["l"] +
        "%";
  }
});

function change2ndModel() {
  color2Block.style.backgroundColor = colorPicker.color.rgbString;
  color2Select.dispatchEvent(new Event("change"));
}

function change3ndModel() {
  color3Block.style.backgroundColor = colorPicker.color.rgbString;
  color3Select.dispatchEvent(new Event("change"));
}

colorText2.addEventListener("change", () => {
  mainChange = false;
  switch (color2Select.value) {
    case "rgb":
      let rgb = colorText2.value.split(",");
      rgb[0] = Number(rgb[0].split("(")[1]);
      rgb[1] = Number(rgb[1]);
      rgb[2] = Number(rgb[2].split(")")[0]);

      if (isRgb(...rgb)) {
        color2Block.style.backgroundColor = colorText2.value;
      }
      break;
    case "hex":
      if (isHex(colorText2.value)) {
        color2Block.style.backgroundColor = colorText2.value;
      }
      break;
    case "cmyk":
      let cmyk = (colorText2.value + ",")
        .split("%,")
        .map((elem) => Number(elem));
      cmyk = cmyk.slice(0, 4);
      if (isCmyk(...cmyk)) {
        cmyk = cmykToRgb(...cmyk);
        color2Block.style.backgroundColor =
          "rgb(" + cmykToRgb(...rgbToCmyk(...cmyk)).join(", ") + ")";
      }
      break;
    case "xyz":
      let xyz = colorText2.value.split(",").map((elem) => Number(elem));
      if (isXyz(...xyz)) {
        xyz = xyzToRgb(...xyz);
        color2Block.style.backgroundColor =
          "rgb(" + xyzToRgb(...rgbToXyz(...xyz)).join(", ") + ")";
      }
      break;
    case "lab":
      let lab = colorText2.value.split(",").map((elem) => Number(elem));
      if (isLab(...lab)) {
        lab = labToRgb(...lab);
        color2Block.style.backgroundColor =
          "rgb(" + labToRgb(...rgbToLab(...lab)).join(", ") + ")";
      }
      break;
    case "hsv":
      let hsv = colorText2.value.split(",");
      hsv = [hsv[0], hsv[1].split("%")[0], hsv[2].split("%")[0]].map((elem) =>
        Number(elem)
      );
      if (isHsv(...hsv)) {
        hsv = hsvToRgb(...hsv);
        color2Block.style.backgroundColor =
          "rgb(" + hsvToRgb(...rgbToHsv(...hsv)).join(", ") + ")";
      }
      break;
    case "hsl":
      let hsl = colorText2.value.split(",");
      hsl = [hsl[0], hsl[1].split("%")[0], hsl[2].split("%")[0]].map((elem) =>
        Number(elem)
      );
      if (isHsl(...hsl)) {
        hsl = hsvToRgb(...hsl);
        color2Block.style.backgroundColor =
          "rgb(" + hsvToRgb(...rgbToHsv(...hsl)).join(", ") + ")";
      }
      break;
  }
});

colorText3.addEventListener("change", () => {
  mainChange = false;
  switch (color3Select.value) {
    case "rgb":
      let rgb = colorText3.value.split(",");
      rgb[0] = Number(rgb[0].split("(")[1]);
      rgb[1] = Number(rgb[1]);
      rgb[2] = Number(rgb[2].split(")")[0]);

      if (isRgb(...rgb)) {
        color3Block.style.backgroundColor = colorText3.value;
      }
      break;
    case "hex":
      if (isHex(colorText3.value)) {
        color3Block.style.backgroundColor = colorText3.value;
      }
      break;
    case "cmyk":
      let cmyk = (colorText3.value + ",")
        .split("%,")
        .map((elem) => Number(elem));
      cmyk = cmyk.slice(0, 4);
      if (isCmyk(...cmyk)) {
        cmyk = cmykToRgb(...cmyk);
        color3Block.style.backgroundColor =
          "rgb(" + cmykToRgb(...rgbToCmyk(...cmyk)).join(", ") + ")";
      }
      break;
    case "xyz":
      let xyz = colorText3.value.split(",").map((elem) => Number(elem));
      if (isXyz(...xyz)) {
        xyz = xyzToRgb(...xyz);
        color3Block.style.backgroundColor =
          "rgb(" + xyzToRgb(...rgbToXyz(...xyz)).join(", ") + ")";
      }
      break;
    case "lab":
      let lab = colorText3.value.split(",").map((elem) => Number(elem));
      if (isLab(...lab)) {
        lab = labToRgb(...lab);
        color3Block.style.backgroundColor =
          "rgb(" + labToRgb(...rgbToLab(...lab)).join(", ") + ")";
      }
      break;
    case "hsv":
      let hsv = colorText3.value.split(",");
      hsv = [hsv[0], hsv[1].split("%")[0], hsv[2].split("%")[0]].map((elem) =>
        Number(elem)
      );
      if (isHsv(...hsv)) {
        hsv = hsvToRgb(...hsv);
        color3Block.style.backgroundColor =
          "rgb(" + hsvToRgb(...rgbToHsv(...hsv)).join(", ") + ")";
      }
      break;
    case "hsl":
      let hsl = colorText3.value.split(",");
      hsl = [hsl[0], hsl[1].split("%")[0], hsl[2].split("%")[0]].map((elem) =>
        Number(elem)
      );
      if (isHsl(...hsl)) {
        hsl = hsvToRgb(...hsl);
        color3Block.style.backgroundColor =
          "rgb(" + hsvToRgb(...rgbToHsv(...hsl)).join(", ") + ")";
      }
      break;
  }
});

/* Конвертеры */

function rgbToCmyk(r, g, b) {
  r = r / 255;
  g = g / 255;
  b = b / 255;
  let k = 1 - Math.max(r, Math.max(g, b));

  let c = (1 - r - k) / (1 - k);
  let m = (1 - g - k) / (1 - k);
  let y = (1 - b - k) / (1 - k);

  return [
    Math.round(c * 100) | 0,
    Math.round(m * 100) | 0,
    Math.round(y * 100) | 0,
    Math.round(k * 100) | 0,
  ];
}

function fXyz(x) {
  return x >= 0.04045 ? ((x + 0.055) / 1.055) ** 2.4 : x / 12.92;
}

function rgbToXyz(r, g, b) {
  let a = [fXyz(r / 255) * 100, fXyz(g / 255) * 100, fXyz(b / 255) * 100];

  return [
    Math.round((0.412453 * a[0] + 0.35758 * a[1] + 0.180423 * a[2]) * 100) /
      100,
    Math.round((0.212671 * a[0] + 0.71516 * a[1] + 0.072169 * a[2]) * 100) /
      100,
    Math.round(
      ((0.019334 * a[0] + 0.119193 * a[1] + 0.950227 * a[2]) * 100) / 100
    ),
  ];
}

function fLab(x) {
  return x >= 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
}

function rgbToLab(r, g, b) {
  let xyz = rgbToXyz(r, g, b);
  return [
    Math.round((116 * fLab(xyz[1] / 100) - 16) * 100) / 100,
    Math.round(500 * (fLab(xyz[0] / 95.047) - fLab(xyz[1] / 100)) * 100) / 100,
    Math.round(200 * (fLab(xyz[1] / 100) - fLab(xyz[2] / 108.883)) * 100) / 100,
  ];
}

function rgbToHsv(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  let d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
}

function hexToRgb(c) {
  var bigint = parseInt(c.split("#")[1], 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [Math.round(r), Math.round(g), Math.round(b)];
}

function cmykToRgb(c, m, y, k) {
  c /= 100;
  m /= 100;
  y /= 100;
  k /= 100;
  let r = 255 * (1 - c) * (1 - k);
  let g = 255 * (1 - m) * (1 - k);
  let b = 255 * (1 - y) * (1 - k);

  return [Math.round(r), Math.round(g), Math.round(b)];
}

function fXyzRgb(x) {
  return x >= 0.0031308 ? (1.055 * x) ** (1 / 2.4) - 0.055 : 12.92 * x;
}

function xyzToRgb(x, y, z) {
  let a = [
    (3.2406 * x - 1.5372 * y - 0.4986 * z) / 100,
    (-0.9689 * x + 1.8758 * y + 0.0415 * z) / 100,
    (0.0557 * x - 0.204 * y + 1.057 * z) / 100,
  ];

  return [
    Math.round(fXyzRgb(a[0]) * 255),
    Math.round(fXyzRgb(a[1]) * 255),
    Math.round(fXyzRgb(a[2]) * 255),
  ];
}

function fLabRgb(x) {
  return x >= 0.008856 ? x ** 3 : (x - 16 / 116) / 7.787;
}

function labToRgb(l, a, b) {
  let xyz = [
    Math.round(fLabRgb(a / 500 + (l + 16) / 116) * 100),
    Math.round(fLabRgb((l + 16) / 116) * 95.047),
    Math.round(fLabRgb((l + 16) / 116 - b / 200) * 108.883),
  ];
  return xyzToRgb(...xyz);
}

function hsvToRgb(h, s, v) {
  h /= 360;
  s /= 100;
  v /= 100;
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/* Валидаторы */

function isRgb(r, g, b) {
  if (0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255) {
    return true;
  }
  alert(
    "Неверно введены данные: значения в RGB должны быть не меньше 0 и не больше 255."
  );
  return false;
}

function isHex(str) {
  str = String(str);
  let tempArray = str.substring(1).split("");
  let flag = false;

  tempArray.forEach((elem) => {
    if (
      !(
        (0 <= elem && elem <= 9) ||
        ("a" <= elem && "f" <= elem) ||
        ("A" <= elem && "F" <= elem)
      )
    ) {
      flag = true;
    }
  });

  if (str.charAt(0) !== "#" || str.length !== 7 || flag) {
    alert("Неверно введены данные: кодировка Hex имеет вид #123456");
    return false;
  }
  return true;
}

function isCmyk(c, m, y, k) {
  if (
    0 <= c &&
    c <= 100 &&
    0 <= m &&
    m <= 100 &&
    0 <= y &&
    y <= 100 &&
    0 <= k &&
    k <= 100
  ) {
    return true;
  }
  alert(
    "Неверно введены данные: значения в CMYK должны быть не меньше 0% и не больше 100%."
  );
  return false;
}

function isXyz(x, y, z) {
  if (0 <= x && x <= 95.047 && 0 <= y && y <= 100 && 0 <= z && z <= 108.883) {
    return true;
  }
  alert(
    "Неверно введены данные: валидные значения 0 <= x <= 95.047, 0 <= y <= 100, 0 <= z <= 108.883."
  );
  return false;
}

function isLab(l, a, b) {
  if (0 <= l && l <= 100 && -128 <= a && a <= 128 && -128 <= b && b <= 128) {
    return true;
  }
  alert(
    "Неверно введены данные: валидные значения 0 <= L <= 100, -128 <= y <= 128, -128 <= z <= 128."
  );
  return false;
}

function isHsv(h, s, v) {
  if (0 <= h && h <= 360 && 0 <= s && s <= 100 && 0 <= v && v <= 100) {
    return true;
  }
  alert(
    "Неверно введены данные: валидные значения 0 <= H <= 360, 0 <= s <= 100, 0 <= v <= 100."
  );
  return false;
}

function isHsl(h, s, l) {
  if (0 <= h && h <= 360 && 0 <= s && s <= 100 && 0 <= l && l <= 100) {
    return true;
  }
  alert(
    "Неверно введены данные: валидные значения 0 <= H <= 360, 0 <= s <= 100, 0 <= l <= 100."
  );
  return false;
}
