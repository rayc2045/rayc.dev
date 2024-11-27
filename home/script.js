"use strict";

const { log, warm } = console,
  { hostname } = location,
  preventDefault = (e) => e.preventDefault();
document.addEventListener("selectstart", preventDefault);
document.addEventListener("dragstart", preventDefault);
document.addEventListener("contextmenu", preventDefault);

const time = new Time(),
  updateTime = () => {
    time.update();
    select("#date").textContent = time.date;
    select("#year").textContent = time.date.split(",").at(-1).trim();
    setTimeout(updateTime, 60_000 - time.second * 1000);
  };
updateTime();

selectAll("[parallax]").forEach((el) => scrollTranslateY(el));

const portfolio = select("#portfolio");
if (!portfolio.innerHTML.trim())
  (async () => {
    const works = await loadData("/data/works.json");
    portfolio.innerHTML = works
      .map((work, idx) => {
        const { title, description, link } = work,
          imageName = title.toLowerCase().replaceAll(" ", "_");
        return `
          <article>
            <div>
              <a
                href="${link.website}"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="View ${title} project"
              >
                <picture class="noise gray">
                  <source srcset="/assets/images/portfolio/${imageName}.avif" type="image/avif">
                  <source srcset="/assets/images/portfolio/${imageName}.webp" type="image/webp">
                  <img src="/assets/images/portfolio/${imageName}.jpg" alt="${imageName}" loading="lazy">
                </picture>
              </a>
            </div>
            <div>
              <header>
                <span class="index">${String(works.length - idx).padStart(2, "0")}</span>
                <h3>${title}</h3>
              </header>
              <p>${description} | ${
                link.github
                  ? `<a href="${link.github}" target="_blank" rel="noreferrer noopener">
                    view on GitHub
                  </a>`
                  : `<a href="${link.website}" target="_blank" rel="noreferrer noopener">
                    visit website
                  </a>`
              }</p>
            </div>
          </article>
        `.trim();
      })
      .join("");
  })();

const form = select("form"),
  textarea = select("textarea", form);
resizeElementHeight(textarea);
textarea.addEventListener("input", (e) => resizeElementHeight(e.target));
window.addEventListener("resize", () => resizeElementHeight(textarea));

const inputs = [...selectAll("input", form), textarea],
  requiredInputs = inputs.filter((el) => el.classList.contains("required")),
  formContainer = select("#form-container"),
  successsMessage = select("#success-message"),
  animateFieldset = (input) => {
    const fieldset = input.closest("fieldset");
    if (fieldset.classList.contains("animate")) return;
    fieldset.classList.add("animate");
    setTimeout(() => fieldset.classList.remove("animate"), 1000);
  },
  checkform = () => {
    for (const input of requiredInputs) {
      if (
        !input.value.trim() ||
        (input.type === "email" &&
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value))
      ) {
        const legend = select("legend", input.closest("fieldset"));
        if (!isInView(legend)) legend.scrollIntoView({ block: "center" });
        input.value = "";
        input.focus();
        animateFieldset(input);
        return false;
      }
    }
    return true;
  },
  handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkform()) return;
    try {
      if (hostname !== "127.0.0.1" && hostname !== "localhost") {
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(e.target)).toString(),
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      }
      inputs.forEach((el) => (el.value = ""));
      formContainer.setAttribute("hidden", "true");
      successsMessage.removeAttribute("hidden");
    } catch (error) {
      log(error);
    }
  };
form.addEventListener("submit", handleSubmit);
watchElement("#contact", (entry) => {
  if (!entry.isIntersecting && formContainer.hasAttribute("hidden")) {
    formContainer.removeAttribute("hidden");
    successsMessage.setAttribute("hidden", "true");
  }
});

const loader = select("#loader");
loader.addEventListener("animationend", function () {
  this.remove();
  watchElement([...selectAll(".gray"), select("footer .heart")], (entry) => {
    entry.isIntersecting
      ? entry.target.classList.add("animate")
      : entry.target.classList.remove("animate");
  });
  document.body.removeAttribute("style");
  document.body.addEventListener("pointerdown", (e) => {
    if (
      !e.target.closest("input") &&
      !e.target.closest("textarea") &&
      !e.target.closest("button") &&
      !e.target.closest("a")
    )
      appendRipple(e);
  });
});
window.addEventListener("load", () => {
  scrollTo({ top: 0 });
  setTimeout(() => loader.classList.add("animate"), 500);
});

if (hostname === "127.0.0.1" || hostname === "localhost") {
  const deviceSize = document.createElement("div");
  setStyle(deviceSize, {
    position: "fixed",
    left: "10px",
    top: "10px",
    fontFamily: "monospace",
    fontSize: "24px",
    fontWeight: "700",
    color: "royalblue",
    pointerEvents: "none",
  });
  const updateDeviceSize = () => {
    deviceSize.textContent = `${window.innerWidth}x${window.innerHeight}`;
  };
  updateDeviceSize();
  window.addEventListener("resize", updateDeviceSize);
  document.body.appendChild(deviceSize);
}

log("👋 Hi! Welcome to my site.");
