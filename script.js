const STATUS_CLASSES = {
  "ok": "status-ativo",
  "bloqueado": "status-inativo",
};

let clientesCarregados = [];

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
    clientesCarregados = dados.clientes || [];
    renderizarClientes(clientesCarregados, corpoTabela);
  } catch (erro) {
    infoVersao.innerHTML = "";
    corpoTabela.innerHTML = `<tr><td colspan="5" class="info-msg">Não foi possível carregar os dados: ${erro.message}</td></tr>`;
  }
}

function renderizarInfoVersao(dados, infoVersao) {
  infoVersao.innerHTML = `<p>${dados.mensagem_update}</p>`;
}

function renderizarClientes(clientes, corpoTabela) {
  if (!clientes || clientes.length === 0) {
    corpoTabela.innerHTML = `<tr><td colspan="5" class="info-msg">Nenhum cliente encontrado.</td></tr>`;
    return;
  }

  corpoTabela.innerHTML = clientes
    .map((cliente) => {
      const statusClasse = STATUS_CLASSES[cliente.status?.toLowerCase()] || "";
      const versao = cliente.versao_atual || "-";
      const download = cliente.exe_url
        ? `<a href="${cliente.exe_url}" class="btn-download">Baixar</a>`
        : "-";
      const mensagem = cliente.mensagem_bloqueio || "-";
      return `
        <tr>
          <td>${cliente.id}</td>
          <td><span class="status-badge ${statusClasse}">${cliente.status}</span></td>
          <td>${versao}</td>
          <td>${download}</td>
          <td>${mensagem}</td>
        </tr>
      `;
    })
    .join("");
}

function filtrarClientes(termo) {
  const corpoTabela = document.getElementById("corpo-tabela");
  const termoNormalizado = termo.trim().toLowerCase();

  const clientesFiltrados = termoNormalizado
    ? clientesCarregados.filter((cliente) => cliente.id?.toLowerCase().includes(termoNormalizado))
    : clientesCarregados;

  renderizarClientes(clientesFiltrados, corpoTabela);
}

document.addEventListener("DOMContentLoaded", () => {
  carregarClientes();

  const buscaInput = document.getElementById("busca-cliente");
  buscaInput.addEventListener("input", (evento) => filtrarClientes(evento.target.value));
});
