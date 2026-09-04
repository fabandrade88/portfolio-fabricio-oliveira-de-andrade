// script do portfólio - javascript puro, sem jquery nem nada

// DOMContentLoaded pra garantir que os elementos já existem antes de pegar eles com getElementById
document.addEventListener("DOMContentLoaded", function () {

  // ---- menu que abre/fecha no celular ----
  var botaoMenu = document.getElementById("botao-menu");
  var menu = document.getElementById("menu");
  const linksDoMenu = document.querySelectorAll(".link-menu");

  botaoMenu.addEventListener("click", function () {
    menu.classList.toggle("aberto");
    botaoMenu.classList.toggle("ativo");

    // atualiza o aria-expanded (acessibilidade, vi isso numa pesquisa sobre menus mobile)
    var aberto = menu.classList.contains("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto);
  });

  // sem isso o menu ficava aberto depois de clicar num link, tinha que fechar na mão
  for (let i = 0; i < linksDoMenu.length; i++) {
    linksDoMenu[i].addEventListener("click", function () {
      menu.classList.remove("aberto");
      botaoMenu.classList.remove("ativo");
    });
  }

  // ---- tema claro/escuro ----
  const botaoTema = document.getElementById("botao-tema");
  const htmlPagina = document.documentElement;

  // uso o localStorage pra lembrar o tema, assim quando a pessoa volta no site
  // continua no escuro (ou claro) do jeito que ela deixou da última vez
  var temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") {
    htmlPagina.setAttribute("data-tema", "escuro");
    botaoTema.textContent = "☀️";
  }

  botaoTema.onclick = function () {
    var temaAtual = htmlPagina.getAttribute("data-tema");

    if (temaAtual === "escuro") {
      htmlPagina.removeAttribute("data-tema");
      botaoTema.textContent = "🌙";
      localStorage.setItem("tema", "claro");
    } else {
      htmlPagina.setAttribute("data-tema", "escuro");
      botaoTema.textContent = "☀️";
      localStorage.setItem("tema", "escuro");
    }
  };

  // ---- destaca no menu qual seção o usuário está vendo ----
  const secoes = document.querySelectorAll("main section[id]");

  window.addEventListener("scroll", function () {
    let secaoAtual = "";

    secoes.forEach(function (secao) {
      const topoDaSecao = secao.offsetTop - 90; // esse 90 é só um valor que testei e ficou bom por causa do cabeçalho fixo
      if (window.scrollY >= topoDaSecao) {
        secaoAtual = secao.getAttribute("id");
      }
    });

    linksDoMenu.forEach(function (link) {
      link.classList.remove("ativo");
      if (link.getAttribute("href") === "#" + secaoAtual) {
        link.classList.add("ativo");
      }
    });
  });

  // ---- formulário de contato: validação e "envio" (a atividade pede pra simular) ----
  const formulario = document.getElementById("formulario-contato");
  const campoNome = document.getElementById("nome");
  const campoEmail = document.getElementById("email");
  const campoMensagem = document.getElementById("mensagem");

  const erroNome = document.getElementById("erro-nome");
  const erroEmail = document.getElementById("erro-email");
  const erroMensagem = document.getElementById("erro-mensagem");

  // regex bem simples só pra conferir se tem "alguma coisa@alguma coisa.alguma coisa"
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // não deixa o navegador recarregar a página, já que não tenho um back-end pra enviar de verdade

    let valido = true;

    // limpa os erros da tentativa anterior antes de validar de novo
    campoNome.classList.remove("invalido");
    campoEmail.classList.remove("invalido");
    campoMensagem.classList.remove("invalido");
    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroMensagem.textContent = "";

    // nome não pode estar vazio
    if (campoNome.value.trim() === "") {
      erroNome.textContent = "Por favor, informe seu nome.";
      campoNome.classList.add("invalido");
      valido = false;
    }

    // email vazio ou fora do formato usuario@dominio.com
    if (campoEmail.value.trim() === "") {
      erroEmail.textContent = "Por favor, informe seu e-mail.";
      campoEmail.classList.add("invalido");
      valido = false;
    } else if (!regexEmail.test(campoEmail.value.trim())) {
      erroEmail.textContent = "Informe um e-mail válido (ex: usuario@dominio.com).";
      campoEmail.classList.add("invalido");
      valido = false;
    }

    // mensagem também não pode ficar vazia
    if (campoMensagem.value.trim() === "") {
      erroMensagem.textContent = "Por favor, escreva uma mensagem.";
      campoMensagem.classList.add("invalido");
      valido = false;
    }

    // só mostra o modal de sucesso se passou em todas as validações acima
    if (valido) {
      abrirModal("Mensagem enviada com sucesso!");
      formulario.reset();
    }
  });

  // ---- modal de "mensagem enviada com sucesso" ----
  const modal = document.getElementById("modal-confirmacao");
  const modalMensagem = document.getElementById("modal-mensagem");
  const modalFechar = document.getElementById("modal-fechar");

  function abrirModal(texto) {
    modalMensagem.textContent = texto;
    modal.hidden = false;
  }

  modalFechar.onclick = function () {
    modal.hidden = true;
  };

  // ano do rodapé automático, assim não preciso lembrar de trocar isso todo ano
  document.getElementById("ano-atual").textContent = new Date().getFullYear();

});
