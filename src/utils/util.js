export function randomInt(s, e) {
  let d = e - s
  if (d < 0) {
      return s
  }
  let r = Math.random() * d + s
  r = parseInt(r, 10)
  return r
}

export function fullScreen() {
  var element = document.documentElement
  if (window.ActiveXObject) {
      var WsShell = new ActiveXObject('WScript.Shell')
      WsShell.SendKeys('{F11}')
  } else if (element.requestFullScreen) {
      element.requestFullScreen()
  } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
  } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
  } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
  }
}

export function fullExit() {
  var element = document.documentElement
  if (window.ActiveXObject) {
      var WsShell = new ActiveXObject('WScript.Shell')
      WsShell.SendKeys('{F11}')
  } else if (element.requestFullScreen) {
      document.exitFullscreen()
  } else if (element.msRequestFullscreen) {
      document.msExitFullscreen()
  } else if (element.webkitRequestFullScreen) {
      document.webkitCancelFullScreen()
  } else if (element.mozRequestFullScreen) {
      document.mozCancelFullScreen()
  }
}

export function formatTime(time) {
  let it = parseInt(time)
  let m = parseInt(it / 60)
  let s = parseInt(it % 60)

  return (m < 10 ? "0" : "") + parseInt(it / 60) + ":" + (s < 10 ? "0" : "") + parseInt(it % 60)
}