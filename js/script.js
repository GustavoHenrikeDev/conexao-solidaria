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