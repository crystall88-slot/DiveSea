(function(){
  const slider = document.querySelector('.banner__slider')
  const wrapper = slider.querySelector('.banner__slider-wrapper')
  const innerWrapper = wrapper.querySelector('.banner__slider-inner--wrapper')
  const slides = [...innerWrapper.querySelectorAll('.banner__slide')]

  const sliderRight = document.querySelector('.banner__slider-right')
  const wrapperRight = sliderRight.querySelector('.banner__slider-right--wrapper')
  const innerWrapperRight = wrapperRight.querySelector('.banner__slider-right--inner-wrapper')
  const slidesRight = [...innerWrapperRight.querySelectorAll('.banner__slide-right')]


  const buttonBack = slider.querySelector('.slider__button-back_js')
  const buttonNext = slider.querySelector('.slider__button-next_js')
  const buttonBackRight = sliderRight.querySelector('.slider__button-right--back_js')
  const buttonNextRight = sliderRight.querySelector('.slider__button-right--next_js')




  const ANIMATION_DELAY = 500

  const slidesCount = slides.length
  const slidesCountRight = slidesRight.length

  let slideWidth = wrapper.offsetWidth
  let activeSlideInbox = 0

  let slideWidthRight = wrapperRight.offsetWidth
  let activeSlideInboxRight = 0
  let timer

  initWidth()
  initWidthRight()
  setActiveSlide(0)
  setActiveSlideRight(0)


  buttonBack.addEventListener('click', () => {
    console.log('Button Back clicked, new index:', activeSlideInbox - 1);
    setActiveSlide(activeSlideInbox - 1);
    setActiveSlideRight(activeSlideInbox - 1);
  })

  buttonNext.addEventListener('click', () => {
    console.log('Button Next clicked, new index:', activeSlideInbox + 1);
    setActiveSlide(activeSlideInbox + 1);
    setActiveSlideRight(activeSlideInbox + 1);
  })

  buttonBackRight.addEventListener('click', () => {
    console.log('Button Back Right clicked, new index:', activeSlideInboxRight - 1);
    setActiveSlideRight(activeSlideInboxRight - 1);
  })

  buttonNextRight.addEventListener('click', () => {
    console.log('Button Next Right clicked, new index:', activeSlideInboxRight + 1);
    setActiveSlideRight(activeSlideInboxRight + 1);
  })



  //функция высталяющая слайды слева
  function setActiveSlide(index, withAnimation = true) {
    index = (index % slidesCount + slidesCount) % slidesCount; // Циклический индекс

    innerWrapper.style.transform = `translateX(${index * slideWidth * (-1)}px)`

    buttonBack.removeAttribute('disabled')
    buttonNext.removeAttribute('disabled')

    if (withAnimation) {
      clearTimeout(timer)
      innerWrapper.style.transition = `transform ${ANIMATION_DELAY}ms`
      timer = setTimeout(() => {
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




  //функция высталяющая слайды справа
  function setActiveSlideRight(indexRight, withAnimationRight = true) {
    indexRight = (indexRight % slidesCountRight + slidesCountRight) % slidesCountRight; // Циклический индекс

    innerWrapperRight.style.transform = `translateX(${indexRight * slideWidthRight * (-1)}px)`

    // buttonBackRight.removeAttribute('disabled')
    // buttonNextRight.removeAttribute('disabled')

    if (withAnimationRight) {
      clearTimeout(timer)
      innerWrapperRight.style.transition = `transform ${ANIMATION_DELAY}ms`
      timer = setTimeout(() => {
        innerWrapperRight.style.transition = ''
      }, ANIMATION_DELAY)
    }

    // if ( indexRight === 0 ) {
    //   buttonBackRight.setAttribute('disabled', 'disabled')
    // }

    // if ( indexRight === slidesCountRight - 1 ) {
    //   buttonNextRight.setAttribute('disabled', 'disabled')
    // }

    activeSlideInboxRight = indexRight
  }







  //функция которая будет выставлять ширину для левого слайдера
  function initWidth() {
    slideWidth = wrapper.offsetWidth

    slides.forEach(slide => {
      slide.style.width = `${slideWidth}px`
    })
  }



  //функция которая будет выставлять ширину для правого слайдера
  function initWidthRight() {
    slideWidthRight = wrapperRight.offsetWidth

    slidesRight.forEach(slideRight => {
      slideRight.style.width = `${slideWidthRight}px`
    })
  }

  //анимация

})()
