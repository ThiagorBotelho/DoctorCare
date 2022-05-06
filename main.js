window.addEventListener('scroll', onScroll)  // Cria o evento scrool, quando esse evento acontecer, chama a função onScroll.

onScroll()  // Coloca para iniciar uma primeira vez, para as outras funções chamarem o scroll tb.
function onScroll() {  // vai rodar quando rolar a tela, vai ser chamada no body do html.
  showNavOnScroll()
  showBackToTopButtonOnScroll()

  activateMenuAtCurrentSection(home)
  activateMenuAtCurrentSection(services)
  activateMenuAtCurrentSection(about)
  activateMenuAtCurrentSection(contact)
}

function activateMenuAtCurrentSection(section) {  // Define as seções que o usuário está na página e coloca um indicativo no menu para sinalizar qual é a seção atual.


  const targetLine = scrollY + innerHeight / 2    // o const cria uma variável (targetLine) que não irá mudar dentro desse bloco, o scrollY retorna a posição da barra de rolagem e soma com o innerHeight que é a altura da viewport (janela de exibição). Tudo isso para saber o intervalo da seção em que está ( inicio, serviço ou Sobre)

  // verificar se a seção passou da linha:
  const sectionTop = section.offsetTop        // pega o valor do topo
  const sectionHeight = section.offsetHeight  // pega a altura da seção Home
  const sectionTopReachOrPassedTargetline = targetLine >= sectionTop  // verifica se o topo da seção ultrapassou a linha alvo (de baixo pra cima).

  // verificar se a base está abaixo da linha alvo

  const sectionEndsAt = sectionTop + sectionHeight
  const sectionEndPassedTargetline = sectionEndsAt <= targetLine

  // limites da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline

  const sectionId = section.getAttribute('id')
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)  // vai procurar no código o href que possui o id do nome da section passado na função.

  menuElement.classList.remove('active')  // remova primeiro para poder limpar.
  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {  // define que se eu descer a barra (scrollY é oq retorna a posição da barra), o topo do menu fica verde, se não, fica da mesma cor do fundo, por isso add a função scroll quando mexe e remove quando volta a ser zero.
    navigation.classList.add('scroll')  // navigation é o id que escolhemos para o nav do html.
  } else {
    navigation.classList.remove('scroll')
  }
}

function showBackToTopButtonOnScroll() {  // Mostrar o botão de voltar ao topo
  if (scrollY > 450) {  // scrollY é oq retorna a posição da barra, o botão aparece quando for maior que 500, se não, fica sem, por isso add a função scroll quando mexe e remove quando volta a ser zero.
    backToTopButton.classList.add('show')   
  } else {
    backToTopButton.classList.remove('show')
  }
}

function openMenu() {     // chama a class menu-expanded que abre o menu
  document.body.classList.add('menu-expanded')
}

function closeMenu() {    // remove a class menu-expanded para fechar o menu
  document.body.classList.remove('menu-expanded')
}

ScrollReveal({      //propriedades:
  origin: 'top',    //vai originar do topo da página
  distance: '30px',
  duration: 700
}).reveal(`
  #home, 
  #home img, 
  #home .stats, 
  #services,
  #services header,
  #services .card
  #about, 
  #about header, 
  #about .content`)
