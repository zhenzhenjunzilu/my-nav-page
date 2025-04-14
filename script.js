
fetch("links.json")
  .then((res) => res.json())
  .then((data) => {
    const categoryList = document.getElementById("category-list");
    const linkSection = document.getElementById("link-section");

    Object.keys(data).forEach((category, index) => {
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

        const link = document.createElement("a");
        link.href = site.url;
        link.textContent = "访问";
        link.target = "_blank";
        card.appendChild(link);

        cards.appendChild(card);
      });

      section.appendChild(cards);
      linkSection.appendChild(section);
    });

    function showCategory(cat) {
      document.querySelectorAll(".section").forEach(s => s.style.display = "none");
      document.getElementById("section-" + cat).style.display = "block";
    }

    // 默认显示第一个分类
    const firstCat = Object.keys(data)[0];
    if (firstCat) showCategory(firstCat);
  });
