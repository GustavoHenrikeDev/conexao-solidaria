"use strict";

// Persiste somente a preferência de participação, nunca os dados pessoais.
ConexaoSolidaria.armazenamento = (() => {
  const chave = "conexao-solidaria:preferencias:v1";
  const opcoes = ["doador", "voluntario", "ambos"];

  function recuperar() {
    try {
      const texto = window.localStorage.getItem(chave);
      if (texto === null) return { estado: "vazio" };
      const dados = JSON.parse(texto);
      if (!dados || typeof dados !== "object" || Array.isArray(dados) ||
          dados.versao !== 1 || !opcoes.includes(dados.participacao)) {
        return { estado: "invalido" };
      }
      return { estado: "restaurado", participacao: dados.participacao };
    } catch {
      return { estado: "erro" };
    }
  }

  function salvar(participacao) {
    if (participacao !== "" && !opcoes.includes(participacao)) return false;
    try {
      if (participacao === "") {
        window.localStorage.removeItem(chave);
      } else {
        const dados = { versao: 1, participacao };
        window.localStorage.setItem(chave, JSON.stringify(dados));
      }
      return true;
    } catch {
      return false;
    }
  }

  return { recuperar, salvar };
})();

ConexaoSolidaria.iniciarPreferencias = function () {
  const campo = document.getElementById("participacao");
  const status = document.getElementById("status-preferencia");
  if (!campo || !status) return;

  // Restaura assim que o template do cadastro é inserido no DOM.
  const resultado = ConexaoSolidaria.armazenamento.recuperar();
  if (resultado.estado === "restaurado") {
    campo.value = resultado.participacao;
    status.textContent = "Sua preferência de participação foi recuperada neste navegador.";
  } else if (resultado.estado === "invalido" || resultado.estado === "erro") {
    status.textContent = "Não foi possível recuperar a preferência salva. Você pode escolher novamente.";
  }

  campo.addEventListener("change", () => {
    const salvo = ConexaoSolidaria.armazenamento.salvar(campo.value);
    status.textContent = !salvo
      ? "Não foi possível salvar a preferência neste navegador. Você pode continuar preenchendo o formulário."
      : campo.value
        ? "Preferência salva neste navegador."
        : "Preferência salva removida.";
  });
};
