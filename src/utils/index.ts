export const debounce = (func: Function, timeout: any, immediate: Boolean) => {
  let timer: any

  return function () {
    const context = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, timeout)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, timeout)
    }
  }
}
