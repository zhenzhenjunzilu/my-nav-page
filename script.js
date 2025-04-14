
const path = window.location.pathname.replace('/', '');
if (path === 'config') {
  renderConfigPage();
} else {
  renderHomePage();
}

function renderHomePage() {
  document.getElementById("app").innerHTML = `
    <div class="sidebar"><h2>📌 我的导航</h2><ul id="category-list"></ul></div>
    <div class="main"><div id="link-section"></div></div>`;

  fetch("links.json")
    .then(res => res.json())
    .then(data => {
      const count = JSON.parse(localStorage.getItem("clickCounts") || "{}");
      const recommended = [];
      for (const cat in data) {
        data[cat].forEach(site => {
          site.clicks = count[site.url] || 0;
          recommended.push(site);
        });
      }
      recommended.sort((a, b) => b.clicks - a.clicks);
      data = { "推荐": recommended.slice(0, 6), ...data };

      const categoryList = document.getElementById("category-list");
      const linkSection = document.getElementById("link-section");

      Object.keys(data).forEach((category) => {
        const li = document.createElement("li");
        li.textContent = category;
        li.onclick = () => showCategory(category);
        categoryList.appendChild(li);

        const section = document.createElement("div");
        section.className = "section";
        section.id = "section-" + category;

        const title = document.createElement("div");
        title.className = "section-title";
        title.textContent = category;
        section.appendChild(title);

        const cards = document.createElement("div");
        cards.className = "cards";

        data[category].forEach((site) => {
          const card = document.createElement("div");
          card.className = "card";
          card.onclick = () => {
            count[site.url] = (count[site.url] || 0) + 1;
            localStorage.setItem("clickCounts", JSON.stringify(count));
            window.open(site.url, "_blank");
          };

          const icon = document.createElement("img");
          icon.src = site.icon;
          card.appendChild(icon);

          const name = document.createElement("div");
          name.className = "card-title";
          name.textContent = site.name;
          card.appendChild(name);

          const desc = document.createElement("div");
          desc.className = "card-desc";
          desc.textContent = site.desc;
          card.appendChild(desc);

          cards.appendChild(card);
        });

        section.appendChild(cards);
        linkSection.appendChild(section);
      });

      function showCategory(cat) {
        document.querySelectorAll(".section").forEach(s => s.style.display = "none");
        document.getElementById("section-" + cat).style.display = "block";
      }
      const firstCat = Object.keys(data)[0];
      if (firstCat) showCategory(firstCat);
    });
}

function renderConfigPage() {
  const password = prompt("请输入密码：");
  if (password !== "admin123") {
    document.getElementById("app").innerHTML = "<p>密码错误，无法访问配置页。</p>";
    return;
  }

  document.getElementById("app").innerHTML = `
    <div class="config-page">
      <h2>导航配置编辑器</h2>
      <textarea id="json-editor" style="width: 100%; height: 400px;"></textarea>
      <br />
      <button onclick="saveJSON()">保存配置</button>
    </div>`;

  fetch("links.json")
    .then(res => res.text())
    .then(txt => {
      document.getElementById("json-editor").value = txt;
    });
}

function saveJSON() {
  const data = document.getElementById("json-editor").value;
  const blob = new Blob([data], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "links.json";
  link.click();
}
