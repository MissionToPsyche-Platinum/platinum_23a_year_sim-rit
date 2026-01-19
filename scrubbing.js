const section = document.querySelector('section.vidScrub')
const section2 = document.querySelector('section.vidScrub2')
const vid = section.querySelector('video')
const vid2 = section2.querySelector('video')

vid.pause()

const scroll = () => {
  const distance = window.scrollY - section.offsetTop
  const distance2 = window.scrollY - section2.offsetTop
  const total = section.clientHeight - window.innerHeight
  const total2= section2.clientHeight - window.innerHeight
  const smoothing = 0.001

  let percentage = distance / total
  let percentage2 = distance2 / total2
  percentage = Math.max(0, percentage)
  percentage2 = Math.max(0, percentage2)
  percentage = Math.min(percentage, 1)
  percentage2 = Math.min(percentage2, 1)

  if (vid.duration > 0) {
    // Simply sets video to current percentage, looks stuttery
    //vid.currentTime = vid.duration * percentage
    
    while (vid.currentTime != vid.duration * percentage) {
      let dif = percentage - (vid.currentTime / vid.duration)
       if (Math.abs(dif) >= smoothing) {
        if (dif > 0) {
          vid.currentTime += vid.duration * smoothing
        } else if (dif < 0) {
          vid.currentTime -= vid.duration * smoothing
        } else {break}
      } else {break}
    }
  }
  
  if (vid2.duration > 0) {
    // Simply sets video to current percentage, looks stuttery
    //vid.currentTime = vid.duration * percentage
    
    while (vid2.currentTime != vid2.duration * percentage2) {
      let dif = percentage2 - (vid2.currentTime / vid2.duration)
       if (Math.abs(dif) >= smoothing) {
        if (dif > 0) {
          vid2.currentTime += vid2.duration * smoothing
        } else if (dif < 0) {
          vid2.currentTime -= vid2.duration * smoothing
        } else {break}
      } else {break}
    }
  }
}

      /* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

function fullscreen() {
  if (document.fullscreenElement == null) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
}

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function scrollToTop() {
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth' // Optional: for smooth scrolling animation
});
}

scroll()
window.addEventListener('scroll', scroll)

document.addEventListener('keypress', event => {
  if (event.keyCode == 13) {
    scrollToTop();
  }
})
