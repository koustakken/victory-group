import $ from 'jquery'
import './slide.js'

$(function () {
  /**
   * Toggle handler for checkboxes
   */
  $('input[type=checkbox]').on('change', function () {
    const span = $(this).closest('.hero-stats__item__discount-item').find('span')
    if (this.checked) {
      span.addClass('active')
    } else {
      span.removeClass('active')
    }
  })

  $('input[type=checkbox]').each(function () {
    const span = $(this).closest('.hero-stats__item__discount-item').find('span')
    if (this.checked) {
      span.addClass('active')
    } else {
      span.removeClass('active')
    }
  })

  /**
   * Function to update range input and its display
   */
  function updateRangeDisplay(rangeInput) {
    const min = rangeInput.attr('min')
    const max = rangeInput.attr('max')
    const currentVal = rangeInput.val()

    rangeInput.css('background-size', ((currentVal - min) / (max - min)) * 100 + '% 100%')
  }

  $('#range-1, #range-2').each(function () {
    updateRangeDisplay($(this))
  })

  $('#range-1').on('input', function () {
    updateRangeDisplay($(this))
  })

  $('#range-2').on('input', function () {
    updateRangeDisplay($(this))
  })

  /**
   * Click handlers for plus and minus buttons
   */
  $('#plus').on('click', function () {
    const rangeInput = $('#range-2')
    let currentVal = parseInt(rangeInput.val(), 10)
    let minVal = rangeInput.attr('min')

    if (currentVal === 0) {
      return
    }

    if (currentVal >= minVal) {
      currentVal -= 1
      rangeInput.val(currentVal)
      updateRangeDisplay(rangeInput)
    }

    const paymentSpan = $('#minus').closest('.calc-wrapper__item-price__buttons').find('span')
    let currentPayment = parseInt(paymentSpan.text().replace(/\s+/g, ''), 10)
    currentPayment += 1875
    paymentSpan.text(currentPayment.toLocaleString() + ' ₽')
  })

  $('#minus').on('click', function () {
    const rangeInput = $('#range-2')
    let currentVal = parseInt(rangeInput.val(), 10)
    let maxVal = rangeInput.attr('max')

    if (currentVal === 16) {
      return
    }

    if (currentVal <= maxVal) {
      currentVal += 1
      rangeInput.val(currentVal)
      updateRangeDisplay(rangeInput)
    }

    const paymentSpan = $('#plus').closest('.calc-wrapper__item-price__buttons').find('span')
    let currentPayment = parseInt(paymentSpan.text().replace(/\s+/g, ''), 10)
    currentPayment -= 1875
    paymentSpan.text(currentPayment.toLocaleString() + ' ₽')
  })
})
