(function () {
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


  // Инициализация ширины и слайдов
  if (wrapper && slides.length) {
    initWidth()
    setActiveSlide(0)
  }

  if (wrapperRight && slidesRight.length) {
    initWidthRight()
    setActiveSlideRight(0)
  }

  // Обработчики событий
  if (buttonBack) {
    buttonBack.addEventListener('click', () => {
      setActiveSlide(activeSlideInbox - 1)
      if (slidesRight.length) setActiveSlideRight(activeSlideInbox - 1)
    })
  }

  if (buttonNext) {
    buttonNext.addEventListener('click', () => {
      setActiveSlide(activeSlideInbox + 1)
      if (slidesRight.length) setActiveSlideRight(activeSlideInbox + 1)
    })
  }

  if (buttonBackRight) {
    buttonBackRight.addEventListener('click', () => {
      setActiveSlideRight(activeSlideInboxRight - 1)
    })
  }

  if (buttonNextRight) {
    buttonNextRight.addEventListener('click', () => {
      setActiveSlideRight(activeSlideInboxRight + 1)
    })
  }

  function setActiveSlide(index, withAnimation = true) {
    if (!innerWrapper || index < 0 || index >= slidesCount) return

    innerWrapper.style.transform = `translateX(${index * slideWidth * -1}px)`

    if (buttonBack) buttonBack.removeAttribute('disabled')
    if (buttonNext) buttonNext.removeAttribute('disabled')

    if (withAnimation) {
      clearTimeout(timer)
      innerWrapper.style.transition = `transform ${ANIMATION_DELAY}ms`

      timer = setTimeout(() => {
        innerWrapper.style.transition = ''
      }, ANIMATION_DELAY)
    }

    if (index === 0 && buttonBack) {
      buttonBack.setAttribute('disabled', 'disabled')
    }

    if (index === slidesCount - 1 && buttonNext) {
      buttonNext.setAttribute('disabled', 'disabled')
    }

    activeSlideInbox = index
  }

  function setActiveSlideRight(indexRight, withAnimationRight = true) {

    if (!innerWrapperRight || indexRight < 0 || indexRight >= slidesCountRight) return

    innerWrapperRight.style.transform = `translateX(${indexRight * slideWidthRight * -1}px)`

    if (withAnimationRight) {
      clearTimeout(timer)
      innerWrapperRight.style.transition = `transform ${ANIMATION_DELAY}ms`
      timer = setTimeout(() => {
        innerWrapperRight.style.transition = ''
      }, ANIMATION_DELAY)
    }

    activeSlideInboxRight = indexRight
  }

  function initWidth() {
    if (!wrapper) return
    slideWidth = wrapper.offsetWidth
    slides.forEach(slide => {
      slide.style.width = `${slideWidth}px`
    });
  }

  function initWidthRight() {
    if (!wrapperRight) return
    slideWidthRight = wrapperRight.offsetWidth
    slidesRight.forEach(slideRight => {
      slideRight.style.width = `${slideWidthRight}px`
      })
    }
})();


(function () {
  const questionDivs = document.querySelectorAll('.question__div')

  questionDivs.forEach((div) => {
    const openAnswerBtn = div.querySelector('.question_btn_js')
    const answer = div.querySelector('.question__div-answer_js')


    openAnswerBtn.addEventListener('click', () => {
      if (answer.style.display === 'block' || answer.style.display === '') {
        answer.style.display = 'none'
        openAnswerBtn.textContent = '+'
      } else {
        answer.style.display = 'block'
        openAnswerBtn.textContent = '−'
      }
    })
  })
})();




//код для
(function () {
  const title = document.querySelector(".question__title")

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Когда заголовок виден, добавляем класс для запуска анимации
          entry.target.classList.add("animate")
          // Отключаем наблюдение после срабатывания, чтобы анимация не повторялась
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.5, // Запускаем анимацию, когда 50% элемента видно
    }
  )
  observer.observe(title)
})();

