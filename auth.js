const SENHA_CORRETA = "123456789"; // TODO: troque antes de publicar
const CHAVE_SESSAO = "mt_validador_autenticado";

const overlay = document.getElementById("auth-overlay");
const conteudo = document.getElementById("conteudo-principal");
const form = document.getElementById("auth-form");
const erro = document.getElementById("auth-erro");

function liberarAcesso() {
  overlay.style.display = "none";
  conteudo.classList.remove("oculto");
}

if (sessionStorage.getItem(CHAVE_SESSAO) === "1") {
  liberarAcesso();
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const senhaDigitada = document.getElementById("auth-senha").value;

  if (senhaDigitada === SENHA_CORRETA) {
    sessionStorage.setItem(CHAVE_SESSAO, "1");
    erro.hidden = true;
    liberarAcesso();
  } else {
    erro.hidden = false;
    form.reset();
  }
});
