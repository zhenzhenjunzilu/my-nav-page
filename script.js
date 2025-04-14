
fetch('links.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('nav-container');
        Object.keys(data).forEach(category => {
            const section = document.createElement('div');
            section.className = 'category';
            section.innerHTML = `<h2>${category}</h2>`;
            data[category].forEach(link => {
                const a = document.createElement('a');
                a.className = 'link-card';
                a.href = link.url;
                a.target = '_blank';
                a.innerText = link.name;
                section.appendChild(a);
            });
            container.appendChild(section);
        });
    });
