"use strict";
ConexaoSolidaria.iniciarModal = function () {
  const template = document.createElement("template");
  template.innerHTML = "<dialog\n  class=\"modal\"\n  id=\"modal-cadastro\"\n  aria-labelledby=\"modal-titulo\"\n  aria-describedby=\"modal-descricao\"\n>\n  <h2 id=\"modal-titulo\">Sobre o cadastro demonstrativo</h2>\n\n  <p id=\"modal-descricao\">\n    Este formulário faz parte de um projeto acadêmico da\n    Conexão Solidária, uma ONG fictícia.\n  </p>\n\n  <p>\n    Utilize dados fictícios para testar os campos e as validações.\n    Ao concluir, será exibida uma mensagem na página.\n    Nenhum dado será enviado. Somente a preferência de participação será salva neste navegador. Os dados pessoais não serão salvos.\n  </p>\n\n  <form method=\"dialog\" class=\"modal__acoes\">\n    <button class=\"botao\" type=\"submit\" autofocus>\n      Entendi, fechar\n    </button>\n  </form>\n</dialog>";
  document.body.append(template.content.cloneNode(true));
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
};
