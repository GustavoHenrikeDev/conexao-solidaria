"use strict";

ConexaoSolidaria.iniciarRoteador = function (fecharMenus) {
  const alvo = document.getElementById("conteudo");
  const status = document.getElementById("status-navegacao");
  const titulos = {
    inicio: "Início",
    projetos: "Projetos",
    cadastro: "Cadastro"
  };
  // Guarda apenas nós em memória: não grava dados no navegador nem no servidor.
  // Ao voltar ao cadastro, os campos e seus eventos continuam funcionando.
  const telas = new Map();

  function interpretarHash() {
    const resultado = /^#\/(inicio|projetos|cadastro)(?:\/(contribuicao|voluntariado))?$/.exec(location.hash);
    if (!resultado) return null;
    const [, rota, secao] = resultado;
    if (secao && rota !== "projetos") return null;
    return { rota, secao };
  }

  function renderizarRota() {
    const destino = interpretarHash();
    if (!destino) {
      // Corrige hashes vazios/desconhecidos sem acrescentar uma entrada inválida.
      history.replaceState(null, "", "#/inicio");
      return renderizarRota();
    }

    const { rota, secao } = destino;
    const modal = document.getElementById("modal-cadastro");
    if (modal?.open) modal.close();
    fecharMenus();

    const primeiraVisita = !telas.has(rota);
    if (primeiraVisita) {
      const fragmento = ConexaoSolidaria.criarTela(rota);
      telas.set(rota, [...fragmento.childNodes]);
    }

    // Remove a tela anterior e insere os nós da rota, sem substituir main.
    // Assim, cabeçalho e rodapé permanecem e o Grid existente é preservado.
    alvo.replaceChildren(...telas.get(rota));

    if (rota === "cadastro" && primeiraVisita) {
      ConexaoSolidaria.iniciarFormulario();
      ConexaoSolidaria.iniciarPreferencias();
      ConexaoSolidaria.iniciarModal();
    }

    document.title = `Conexão Solidária | ${titulos[rota]}`;
    document.querySelectorAll("[data-pagina]").forEach(link => {
      if (link.dataset.pagina === rota) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    const foco = (secao && document.getElementById(secao)) || alvo.querySelector("h1");
    if (foco) {
      foco.setAttribute("tabindex", "-1");
      foco.focus({ preventScroll: true });
    }
    if (secao && foco) {
      foco.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
    status.textContent = `Página ${titulos[rota]} carregada.`;
  }

  document.addEventListener("click", evento => {
    // Mantém Ctrl/Cmd+clique, botão do meio e abertura em nova aba nativos.
    if (evento.defaultPrevented || evento.button !== 0 || evento.ctrlKey ||
        evento.metaKey || evento.shiftKey || evento.altKey) return;
    const link = evento.target.closest("a");
    if (!link || link.hasAttribute("download") ||
        (link.target && link.target !== "_self")) return;

    if (link.classList.contains("pular-conteudo")) {
      evento.preventDefault();
      alvo.focus();
      return;
    }

    if (!link.hasAttribute("data-rota")) return;
    const hash = link.getAttribute("href");
    if (!hash?.startsWith("#/")) return;
    evento.preventDefault();
    if (location.hash === hash) {
      renderizarRota();
    } else {
      // Cria uma entrada de histórico e dispara hashchange.
      location.hash = hash;
    }
  });

  // Inclui links, hashes digitados e os botões Voltar/Avançar.
  window.addEventListener("hashchange", renderizarRota);
  renderizarRota();
};
