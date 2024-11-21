function select(node, parent = document) {
  return parent.querySelector(node);
}

function selectAll(node, parent = document) {
  return [...parent.querySelectorAll(node)];
}

function setStyle(selector, style) {
  const elements = Array.isArray(selector)
    ? selector
    : typeof selector === "string"
      ? selectAll(selector)
      : [selector];
  if (!elements.length) return warn("No elements matched the selector.");
  if (!style) return elements.forEach((el) => el.removeAttribute("style"));
  if (typeof style === "string")
    return elements.forEach((el) => (el.style = style));
  elements.forEach((el) => {
    for (const prop in style) el.style[prop] = style[prop];
  });
}

function isInView(el) {
  const elTop = Math.floor(el.getBoundingClientRect().top);
  const elBottom = Math.floor(el.getBoundingClientRect().bottom);
  return elTop < window.innerHeight && elBottom >= 0;
}

function isFullyInView(el) {
  const elTop = Math.floor(el.getBoundingClientRect().top);
  const elBottom = Math.floor(l.getBoundingClientRect().bottom);
  return elTop >= 0 && elBottom <= window.innerHeight;
}

function watchElement(
  selector,
  callback,
  option = { root: null, threshold: 0.1 },
) {
  const targets = Array.isArray(selector)
    ? selector
    : typeof selector === "string"
      ? selectAll(selector)
      : [selector];
  if (!targets.length) return warn("No elements matched the selector.");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => callback(entry, observer));
  }, option);
  targets.forEach((target) => observer.observe(target));
  return observer;
}

function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

function resizeElementHeight(el) {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

function scrollTranslateY(el) {
  const {
    velocity = "5",
    duration = "0.6s",
    ease = "cubic-bezier(0, 0.3, 0.6, 1)",
  } = el.dataset;
  el.style.transition = `transform ${duration} ${ease}`;
  el.style.willChange = "transform";
  const updateTransform = (scrollY) => {
    const v = velocity === "0" ? 1 : Number(velocity),
      moveValue = (scrollY * v) / 35.5;
    el.style.transform = `translateY(${moveValue}px)`;
  };
  let ticking = false;
  const onScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        updateTransform(scrollY);
        ticking = false;
      });
    }
  };
  updateTransform(window.scrollY || document.documentElement.scrollTop);
  window.addEventListener("scroll", onScroll);
}

function appendRipple(e, option = {}) {
  const { target = document.body, duration = 1.5 } = option,
    ripple = document.createElement("div"),
    offset = window.innerWidth * (window.innerWidth < 640 ? 0.5 : 0.25);
  setStyle(ripple, {
    position: "fixed",
    left: `${e.clientX - offset}px`,
    top: `${e.clientY - offset}px`,
    width: window.innerWidth < 640 ? "100vw" : "50vw",
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    transformOrigin: "50% 50%",
    pointerEvents: "none",
    animation: `expand ${duration}s ease-out forwards`,
  });
  ripple.addEventListener("animationend", function () {
    this.remove();
  });
  target.appendChild(ripple);
}

function getPercent(num1, num2, fixedNum = 0) {
  return Number(((num1 / num2) * 100).toFixed(fixedNum));
}

async function loadData(api, options = {}) {
  const { type = "json" } = options,
    validTypes = ["json", "text", "blob"];
  return new Promise(async (resolve, reject) => {
    if (!validTypes.includes(type))
      return reject(new Error(`Unsupported type: ${type}`));
    try {
      const res = await fetch(api);
      if (!res.ok)
        return reject(new Error(`HTTP error! status: ${res.status}`));
      const data = await res[type]();
      resolve(data);
    } catch (error) {
      error("Failed to load data:", error);
      reject(error);
    }
  });
}

class Time {
  constructor() {
    this.now = new Date();
  }
  get second() {
    return this.now.getSeconds();
  }
  get date() {
    return this.now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  update() {
    this.now = new Date();
  }
}
