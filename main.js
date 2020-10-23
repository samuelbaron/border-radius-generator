//html elements
const pxButton = document.querySelector(".px");
const percentButton = document.querySelector(".percent");
const emButton = document.querySelector(".em");
const copyButton = document.querySelector(".copy");
const topLeft = document.querySelector(".top-left");
const topRight = document.querySelector(".top-right");
const bottomLeft = document.querySelector(".bottom-left");
const bottomRight = document.querySelector(".bottom-right");
const css = document.querySelector(".css-syntax");

//global variables
let activeUnit = "";
const values = ["0", "0", "0", "0"];

//reload function
window.onload = () => {
  switch (Cookies.get("unit")) {
    case "px": {
      percentButton.classList.remove("activeBtn");
      emButton.classList.remove("activeBtn");
      pxButton.classList.add("activeBtn");
      activeUnit = "px";
      break;
    }
    case "percent": {
      pxButton.classList.remove("activeBtn");
      emButton.classList.remove("activeBtn");
      percentButton.classList.add("activeBtn");
      activeUnit = "percent";
      break;
    }
    case "em": {
      pxButton.classList.remove("activeBtn");
      percentButton.classList.remove("activeBtn");
      emButton.classList.add("activeBtn");
      activeUnit = "em";
      break;
    }
  }
};

//alerts function
const alerts = (type) => {
  switch (type) {
    case "noUnit": {
      swal("You have to choose a unit first", "", "error");
      break;
    }
    case "wrongCharacter": {
      swal("You entered wrong character", "", "error");
      break;
    }
    case "copied": {
      swal("Copied to Clipboard", "", "success");
      break;
    }
    case "emptyArea": {
      swal("It's empty. Choose a unit and enter values first", "", "info");
      break;
    }
  }
};

//update view function
const updateView = (position, value) => {
  const box = document.querySelector(".box");
  switch (activeUnit) {
    case "px": {
      values[position] = value;
      css.innerText = `border-radius: ${values[0]}px ${values[1]}px ${values[2]}px ${values[3]}px`;
      box.style.borderRadius = `${values[0]}px ${values[1]}px ${values[2]}px ${values[3]}px`;
      break;
    }
    case "percent": {
      values[position] = value;
      css.innerText = `border-radius: ${values[0]}% ${values[1]}% ${values[2]}% ${values[3]}%`;
      box.style.borderRadius = `${values[0]}% ${values[1]}% ${values[2]}% ${values[3]}%`;
      break;
    }
    case "em": {
      values[position] = value;
      css.innerText = `border-radius: ${values[0]}em ${values[1]}em ${values[2]}em ${values[3]}em`;
      box.style.borderRadius = `${values[0]}em ${values[1]}em ${values[2]}em ${values[3]}em`;
      break;
    }
  }
};

//check input function
const checkInput = (position, event) => {
  let value = event.target.value;
  if (value !== "") {
    if (!value.match(/^-?\d+$/)) {
      alerts("wrongCharacter");
      event.target.value = "";
      return 0;
    }
  }
  updateView(position, value, event);
};

//copy to clipboard function
const copyToClipboard = () => {
  if (css.innerText.includes(`Choose`)) {
    alerts("emptyArea");
    return;
  }
  const el = document.createElement("textarea");
  el.value = css.innerText;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  alerts("copied");
};

//Interval (transforms view of css syntax every 0.5s)
window.setInterval(() => {
  for (let i = 0; i < values.length; i++) {
    if (values[i] === "") {
      values[i] = "0";
      if (activeUnit === "px") {
        css.innerText = `border-radius: ${values[0]}px ${values[1]}px ${values[2]}px ${values[3]}px`;
      }
      if (activeUnit === "percent") {
        css.innerText = `border-radius: ${values[0]}% ${values[1]}% ${values[2]}% ${values[3]}%`;
      }
      if (activeUnit === "em") {
        css.innerText = `border-radius: ${values[0]}em ${values[1]}em ${values[2]}em ${values[3]}em`;
      }
    }
  }
}, 500);

//Listeners
pxButton.addEventListener("click", () => {
  Cookies.set("unit", "px");
  location.reload();
});
percentButton.addEventListener("click", () => {
  Cookies.set("unit", "percent");
  location.reload();
});
emButton.addEventListener("click", () => {
  Cookies.set("unit", "em");
  location.reload();
});
copyButton.addEventListener("click", () => {
  copyToClipboard();
});
topLeft.addEventListener("keyup", function () {
  if (activeUnit === "") {
    alerts("noUnit");
  }
  checkInput(0, event);
});
topRight.addEventListener("keyup", function () {
  if (activeUnit === "") {
    alerts("noUnit");
  }
  checkInput(1, event);
});
bottomLeft.addEventListener("keyup", function () {
  if (activeUnit === "") {
    alerts("noUnit");
  }
  checkInput(2, event);
});
bottomRight.addEventListener("keyup", function () {
  if (activeUnit === "") {
    alerts("noUnit");
  }
  checkInput(3, event);
});