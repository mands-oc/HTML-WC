$(document).ready(function(){
    $('.carrossel').slick({
      dots: true, /*exibir os dots*/
      slideToShow: 3, /*quantidade de imagens*/
      autoplay: true, /*inicia a transição sozinho*/
      infinite: true, /*termina e começa de novo*/
      speed: 1500, /*velocidade em milisegundos*/
      autoplayseed: 3000, /*tempo para iniciar a transição*/
      fade: true,
      cssEase: 'linear'
    })  
  })