"use strict";
ConexaoSolidaria.iniciarNavegacao = function () {
// Menu principal e submenu
const navegacao = document.querySelector(
  'nav[aria-label="Navegação principal"]'
);

if (navegacao) {
  const botaoMenu = navegacao.querySelector(".menu-toggle");
  const menuPrincipal = document.getElementById("menu-principal");
  const botaoSubmenu = navegacao.querySelector(".submenu-toggle");
  const submenu = document.getElementById("submenu-ajudar");
  const telaGrande = window.matchMedia("(min-width: 768px)");

  function definirSubmenu(aberto) {
    submenu.hidden = !aberto;
    botaoSubmenu.setAttribute("aria-expanded", String(aberto));
  }

  function definirMenu(aberto) {
    menuPrincipal.hidden = !aberto;
    botaoMenu.setAttribute("aria-expanded", String(aberto));

    if (!aberto) {
      definirSubmenu(false);
    }
  }

  function ajustarNavegacao() {
    const focoAnterior = document.activeElement;

    definirSubmenu(false);
    botaoMenu.hidden = telaGrande.matches;
    definirMenu(telaGrande.matches);

    // Evita manter o foco em elementos que ficaram ocultos.
    if (telaGrande.matches && focoAnterior === botaoMenu) {
      menuPrincipal.querySelector("a").focus();
    } else if (
      !telaGrande.matches &&
      menuPrincipal.contains(focoAnterior)
    ) {
      botaoMenu.focus();
    } else if (submenu.contains(focoAnterior)) {
      botaoSubmenu.focus();
    }
  }

  botaoMenu.addEventListener("click", () => {
    definirMenu(menuPrincipal.hidden);
  });

  botaoSubmenu.addEventListener("click", () => {
    definirSubmenu(submenu.hidden);
  });

  navegacao.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape") return;

    if (!submenu.hidden) {
      definirSubmenu(false);
      botaoSubmenu.focus();
    } else if (!telaGrande.matches && !menuPrincipal.hidden) {
      definirMenu(false);
      botaoMenu.focus();
    }
  });

  document.addEventListener("click", (evento) => {
    if (!navegacao.contains(evento.target)) {
      definirSubmenu(false);

      if (!telaGrande.matches) {
        definirMenu(false);
      }
    }
  });

  navegacao.addEventListener("click", (evento) => {
    if (!evento.target.closest("a")) return;

    definirSubmenu(false);

    if (!telaGrande.matches) {
      definirMenu(false);
    }
  });

  telaGrande.addEventListener("change", ajustarNavegacao);
  ajustarNavegacao();
}


  return function fecharMenus() {
    const submenu = document.getElementById("submenu-ajudar");
    const menu = document.getElementById("menu-principal");
    submenu.hidden = true;
    navegacao.querySelector(".submenu-toggle").setAttribute("aria-expanded", "false");
    if (!window.matchMedia("(min-width: 768px)").matches) {
      menu.hidden = true;
      navegacao.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
    }
  };
};
