const section = document.querySelector('section.vidScrub')
const vid = section.querySelector('video')

vid.pause()

const scroll = () => {
  const distance = window.scrollY - section.offsetTop
  const total = section.clientHeight - window.innerHeight
  const smoothing = 0.01

  let percentage = distance / total
  percentage = Math.max(0, percentage)
  percentage = Math.min(percentage, 1)

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
}

      /* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

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
