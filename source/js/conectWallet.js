(function(){
  const slider = document.querySelector('.wallet__slider')
  const wrapper = slider.querySelector('.wallet__slider-wrapper')
  const innerWrapper = wrapper.querySelector('.wallet__slider-inner--wrapper')
  const slides = [...innerWrapper.querySelectorAll('.wallet__slide')]
  const buttonBack = slider.querySelector('.slider__button-back_js')
  const buttonNext = slider.querySelector('.slider__button-next_js')
  const ANIMATION_DELAY = 500

  const slidesCount = slides.length

  let slideWidth = wrapper.offsetWidth
  let activeSlideInbox = 0
  let timer

  initWidth()
  setActiveSlide(0)

  buttonBack.addEventListener('click', () => {
    setActiveSlide(activeSlideInbox - 1)
  })

  buttonNext.addEventListener('click', () => {
    setActiveSlide(activeSlideInbox + 1)
  })



  //функция высталяющая слайды
  function setActiveSlide(index, withAnimation = true) {
    if ( index < 0 || index >= slidesCount ) return

    innerWrapper.style.transform = `translateX(${index * slideWidth * (-1)}px)`

    buttonBack.removeAttribute('disabled')
    buttonNext.removeAttribute('disabled')

    if (withAnimation) {
      clearTimeout(timer)
      innerWrapper.style.transition = `transform ${ANIMATION_DELAY}ms`
      timer = setTimeout = (() => {
        innerWrapper.style.transition = ''

      }, ANIMATION_DELAY)
    }

    if ( index === 0 ) {
      buttonBack.setAttribute('disabled', 'disabled')
    }

    if ( index === slidesCount - 1 ) {
      buttonNext.setAttribute('disabled', 'disabled')
    }

    activeSlideInbox = index
  }




  //функция которая будет выставлять ширину
  function initWidth() {
    slideWidth = wrapper.offsetWidth

    slides.forEach(slide => {
      slide.style.width = `${slideWidth}px`
    })
  }

  //анимация

})()
