// Preenche nomes e data em qualquer página
document.querySelectorAll("[data-casal]").forEach(el => {
  el.innerHTML = `${CASAMENTO.noiva} <span>e</span> ${CASAMENTO.noivo}`;
});
document.querySelectorAll("[data-iniciais]").forEach(el => {
  el.textContent = `${CASAMENTO.noiva[0]} e ${CASAMENTO.noivo[0]}`;
});
const dataCasamento = new Date(CASAMENTO.data);
document.querySelectorAll("[data-data]").forEach(el => {
  el.textContent = dataCasamento.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
});

// Contagem regressiva (página inicial)
const contagem = document.getElementById("contagem");
if (contagem) {
  const atualizar = () => {
    const diff = Math.max(0, dataCasamento - new Date());
    const d = Math.floor(diff / 864e5);
    const h = Math.floor(diff / 36e5) % 24;
    const m = Math.floor(diff / 6e4) % 60;
    const s = Math.floor(diff / 1e3) % 60;
    contagem.innerHTML = [[d, "dias"], [h, "horas"], [m, "min"], [s, "seg"]]
      .map(([n, t]) => `<div><strong>${n}</strong><small>${t}</small></div>`).join("");
  };
  atualizar();
  setInterval(atualizar, 1000);
}

// Lista de presentes
const grade = document.getElementById("grade-presentes");
if (grade) {
  const moeda = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const filtros = document.getElementById("filtros");
  const categorias = ["Todos", ...new Set(PRESENTES.map(p => p.categoria))];

  filtros.innerHTML = categorias.map((c, i) =>
    `<button class="${i === 0 ? "ativo" : ""}" data-cat="${c}">${c}</button>`).join("");

  const render = cat => {
    grade.innerHTML = PRESENTES
      .filter(p => cat === "Todos" || p.categoria === cat)
      .map(p => {
        const ehImagem = /\.(png|jpe?g|webp|gif)$/i.test(p.icone);
        const icone = ehImagem ? `<img src="${p.icone}" alt="${p.nome}">` : p.icone;
        return `
          <article class="presente">
            <div class="icone">${icone}</div>
            <div class="corpo">
              <h3>${p.nome}</h3>
              <span class="preco">${moeda(p.valor)}</span>
              <button class="botao" data-nome="${p.nome}" data-valor="${p.valor}">Presentear</button>
            </div>
          </article>`;
      }).join("");
  };
  render("Todos");

  filtros.addEventListener("click", e => {
    if (!e.target.dataset.cat) return;
    filtros.querySelectorAll("button").forEach(b => b.classList.remove("ativo"));
    e.target.classList.add("ativo");
    render(e.target.dataset.cat);
  });

  // Modal Pix
  const modal = document.getElementById("modal-pix");
  document.getElementById("pix-chave").textContent = CASAMENTO.chavePix;
  document.getElementById("pix-titular").textContent = CASAMENTO.nomePix;

  grade.addEventListener("click", e => {
    const b = e.target.closest("button[data-nome]");
    if (!b) return;
    document.getElementById("pix-presente").textContent = b.dataset.nome;
    document.getElementById("pix-valor").textContent = moeda(Number(b.dataset.valor));
    modal.classList.add("aberto");
  });
  modal.addEventListener("click", e => {
    if (e.target === modal || e.target.classList.contains("fechar")) modal.classList.remove("aberto");
  });

  document.getElementById("copiar-pix").addEventListener("click", async e => {
    try {
      await navigator.clipboard.writeText(CASAMENTO.chavePix);
      e.target.textContent = "Chave copiada! ✓";
    } catch {
      e.target.textContent = "Copie a chave acima";
    }
    setTimeout(() => (e.target.textContent = "Copiar chave Pix"), 2500);
  });
}

// Confirmação de presença -> abre o WhatsApp com a mensagem pronta
const form = document.getElementById("form-rsvp");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(form);
    const vai = f.get("presenca") === "sim";
    let msg = `Olá! Aqui é *${f.get("nome")}*.\n`;
    msg += vai
      ? `✅ Confirmo minha presença no casamento!\nTotal de pessoas: ${f.get("pessoas")}`
      : `❌ Infelizmente não poderei comparecer ao casamento.`;
    if (f.get("recado")) msg += `\n\nRecado: ${f.get("recado")}`;
    window.open(`https://wa.me/${CASAMENTO.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  });
}
