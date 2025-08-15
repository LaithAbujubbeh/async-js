const colors = document.getElementById("colors");
const span = document.getElementById("span");
const colorSelect = document.getElementById("color-select");
const selectMode = document.getElementById("select-mode");
const btn = document.getElementById("btn");
const wrapper = document.getElementById("wrapper");

let mode = "";

const baseURL = "https://www.thecolorapi.com/scheme?";

function isLightColor(rgbString) {
  const [r, g, b] = rgbString.match(/\d+/g).map(Number);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 120;
}

let bg = "";
let selectedColor = "";
let test = "";

function getMode() {
  return selectMode.value;
}
btn.addEventListener("click", function () {
  let mode = getMode();
  let hex = getColor();

  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}`)
    .then((res) => res.json())
    .then((data) => {
      render(data.colors);
    });
});

function render(arr) {
  let html = ``;
  arr.map((color, index) => {
    html += `
        <div class="color" style="background-color:${
          color.hex.value
        } ;" id="color-${index}">
        <span id="span" ${
          isLightColor(color.rgb.value)
            ? "style= 'color : #000'"
            : "style= 'color : #fff'"
        }>${color.hex.value}</span>
        </div>
        
        
        `;
  });
  colors.innerHTML = html;
}

function getColor() {
  selectedColor = colorSelect.value;

  test = selectedColor.replace("#", "");

  return test;
}
