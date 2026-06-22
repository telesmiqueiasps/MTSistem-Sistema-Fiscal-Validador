const STATUS_CLASSES = {
  "ok": "status-ativo",
  "bloqueado": "status-inativo",
};

async function carregarClientes() {
  const infoVersao = document.getElementById("info-versao");
  const corpoTabela = document.getElementById("corpo-tabela");

  try {
    const resposta = await fetch("clientes.json");

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }

    const dados = await resposta.json();
    renderizarInfoVersao(dados, infoVersao);
    renderizarClientes(dados.clientes, corpoTabela);
  } catch (erro) {
    infoVersao.innerHTML = "";
    corpoTabela.innerHTML = `<tr><td colspan="3" class="info-msg">Não foi possível carregar os dados: ${erro.message}</td></tr>`;
  }
}

function renderizarInfoVersao(dados, infoVersao) {
  infoVersao.innerHTML = `
    <p><strong>Versão atual:</strong> ${dados.versao_atual}</p>
    <p>${dados.mensagem_update}</p>
    <a href="${dados.exe_url}" class="btn-download">Baixar atualização</a>
  `;
}

function renderizarClientes(clientes, corpoTabela) {
  if (!clientes || clientes.length === 0) {
    corpoTabela.innerHTML = `<tr><td colspan="3" class="info-msg">Nenhum cliente encontrado.</td></tr>`;
    return;
  }

  corpoTabela.innerHTML = clientes
    .map((cliente) => {
      const statusClasse = STATUS_CLASSES[cliente.status?.toLowerCase()] || "";
      const mensagem = cliente.mensagem_bloqueio || "-";
      return `
        <tr>
          <td>${cliente.id}</td>
          <td><span class="status-badge ${statusClasse}">${cliente.status}</span></td>
          <td>${mensagem}</td>
        </tr>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", carregarClientes);
