"use strict";

// Os scripts defer executam na ordem indicada no HTML, após a leitura do DOM.
// Arquivos clássicos compartilham um namespace, permitindo abrir via file://.
const fecharMenus = ConexaoSolidaria.iniciarNavegacao();
ConexaoSolidaria.iniciarRoteador(fecharMenus);
