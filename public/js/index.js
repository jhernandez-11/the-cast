////// Anime.js //////
anime({
    targets: '.header__title',
    translateY: -9,
    delay: anime.stagger(100, {start: 500}),
    direction: 'alternate'
  })

const headerTitle = document.querySelector('.header__title-container')

headerTitle.addEventListener('click', () => {
    anime({
        targets: '.header__title',
        keyframes: [
            {translateY: -9},
            {translateX: 9},
            {translateY: 9},
            {translateX: -9},
            {translateX: 0},
            {translateY: 0}
          ],
        delay: anime.stagger(100),
        duration: 2100
      })
})

////// JQuery ///////
$('#update-search').hide()
$('.header__button').on('click', () => {
  $('#update-search').show('slow')
  $('#form').hide('slow')
})

$('#update-search').on('click', () => {
  $('#update-search').hide('slow')
  $('#form').show('slow')
})

// Popup

$('.popup').hide()

$('#mpb').on('click', () => {
  $('.popup').show('slow')
})

$('.popup').on('click', () => {
  $('.popup').hide('slow')
})