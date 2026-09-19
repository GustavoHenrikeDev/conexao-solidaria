"use strict";

const formulario = document.getElementById("form-cadastro");

if (formulario) {
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");
  const nascimento = document.getElementById("nascimento");
  const botao = document.getElementById("botao-cadastro");
  const mensagem = document.getElementById("mensagem-cadastro");

  // Remove tudo que não for algarismo e limita a quantidade.
  function apenasNumeros(valor, limite) {
    return valor.replace(/\D/g, "").slice(0, limite);
  }

  function formatarCPF(valor) {
    return apenasNumeros(valor, 11)
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  }

  function formatarCEP(valor) {
    return apenasNumeros(valor, 8)
      .replace(/^(\d{5})(\d)/, "$1-$2");
  }

  function formatarTelefone(valor) {
    const numeros = apenasNumeros(valor, 11);

    if (!numeros) return "";
    if (numeros.length <= 2) return `(${numeros}`;

    const ddd = numeros.slice(0, 2);
    const numero = numeros.slice(2);
    const tamanhoPrefixo = numeros.length === 11 ? 5 : 4;

    if (numero.length <= tamanhoPrefixo) {
      return `(${ddd}) ${numero}`;
    }

    return `(${ddd}) ${numero.slice(0, tamanhoPrefixo)}-${numero.slice(tamanhoPrefixo)}`;
  }

  function aplicarMascara(campo, formatador) {
    campo.addEventListener("input", () => {
      campo.value = formatador(campo.value);
    });
  }

  aplicarMascara(cpf, formatarCPF);
  aplicarMascara(telefone, formatarTelefone);
  aplicarMascara(cep, formatarCEP);

  // Define a data máxima usando o calendário local.
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  nascimento.max = `${ano}-${mes}-${dia}`;

  // Impede campos obrigatórios preenchidos apenas com espaços.
  const camposTexto = formulario.querySelectorAll('input[type="text"]');

  function validarTexto(campo) {
    const somenteEspacos =
      campo.required &&
      campo.value.length > 0 &&
      campo.value.trim().length === 0;

    campo.setCustomValidity(
      somenteEspacos ? "Preencha este campo com um texto válido." : ""
    );
  }

  camposTexto.forEach((campo) => {
    campo.addEventListener("input", () => validarTexto(campo));
  });

  // Apaga a confirmação anterior quando algum dado é alterado.
  formulario.addEventListener("input", () => {
    mensagem.textContent = "";
  });

  formulario.addEventListener("change", () => {
    mensagem.textContent = "";
  });

  function validarCadastro() {
    // Também formata valores preenchidos automaticamente.
    cpf.value = formatarCPF(cpf.value);
    telefone.value = formatarTelefone(telefone.value);
    cep.value = formatarCEP(cep.value);

    camposTexto.forEach(validarTexto);
    mensagem.textContent = "";

    // Exibe os avisos nativos de required, pattern, type e limites.
    if (!formulario.reportValidity()) {
      return;
    }

    mensagem.textContent =
      "Os campos atendem às regras de preenchimento desta demonstração. " +
      "Nenhum dado foi enviado ou armazenado. " +
      "Esta verificação não confirma a autenticidade dos dados.";
  }

  // Intercepta qualquer tentativa de envio, inclusive pelo teclado.
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    validarCadastro();
  });

  // Só habilita o envio após instalar a proteção acima.
  botao.type = "submit";
  botao.disabled = false;
}

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

// Feedback visual e textual dos campos
const cadastroVisual = document.getElementById("form-cadastro");

if (cadastroVisual) {
  const campos = cadastroVisual.querySelectorAll(
    ".campo input, .campo select"
  );

  function atualizarFeedback(campo) {
    campo.classList.add("foi-interagido");

    const idMensagem = `${campo.id}-feedback`;
    let aviso = document.getElementById(idMensagem);

    if (!aviso) {
      aviso = document.createElement("p");
      aviso.id = idMensagem;
      aviso.className = "mensagem-campo";
      campo.insertAdjacentElement("afterend", aviso);

      // Preserva as instruções já associadas ao campo.
      const descricoes = new Set(
        (campo.getAttribute("aria-describedby") || "")
          .split(/\s+/)
          .filter(Boolean)
      );

      descricoes.add(idMensagem);
      campo.setAttribute(
        "aria-describedby",
        [...descricoes].join(" ")
      );
    }

    const valido = campo.validity.valid;

    campo.setAttribute("aria-invalid", String(!valido));
    aviso.dataset.estado = valido ? "sucesso" : "erro";

    aviso.textContent = valido
      ? "Preenchimento válido para as regras deste campo."
      : `Revise este campo: ${campo.validationMessage}`;
  }

  campos.forEach((campo) => {
    campo.addEventListener("blur", () => {
      atualizarFeedback(campo);
    });

    campo.addEventListener("input", () => {
      if (campo.classList.contains("foi-interagido")) {
        atualizarFeedback(campo);
      }
    });

    campo.addEventListener("change", () => {
      atualizarFeedback(campo);
    });
  });

  // O evento invalid é capturado também no envio nativo.
  cadastroVisual.addEventListener(
    "invalid",
    (evento) => {
      if (evento.target.matches(".campo input, .campo select")) {
        atualizarFeedback(evento.target);
      }
    },
    true
  );

  cadastroVisual.addEventListener("submit", () => {
    campos.forEach(atualizarFeedback);
  });
}

// Modal informativo do cadastro
const abrirModal = document.getElementById("abrir-modal");
const modalCadastro = document.getElementById("modal-cadastro");

if (abrirModal && modalCadastro) {
  abrirModal.addEventListener("click", () => {
    if (!modalCadastro.open) {
      modalCadastro.showModal();
    }
  });

  modalCadastro.addEventListener("close", () => {
    abrirModal.focus();
  });
}