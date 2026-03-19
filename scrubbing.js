const section = document.querySelector('section.vidScrub')
const section2 = document.querySelector('section.vidScrub2')
const vid = section.querySelector('video')
const vid2 = section2.querySelector('video')
const smoothing = 0.001

const slides = [0, 0.006, 0.015, 0.067, 0.097, 0.159, 0.181, 0.207, 0.228, 0.256, 0.306, 0.336, 0.351, 0.380, 0.397, 0.442, 0.477, 0.521, 0.542, 0.571, 0.601, 0.636, 0.681, 0.695, 0.704, 0.722, 0.743, 0.766, 0.796, 0.823, 0.855, 0.899, 0.941, 0.967, 1]

vid.pause()

const scroll = () => {
  const distance = window.scrollY - section.offsetTop
  const distance2 = window.scrollY - section2.offsetTop
  const total = section.clientHeight - window.innerHeight
  const total2= section2.clientHeight - window.innerHeight

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
  let percent = window.scrollY / document.documentElement.scrollHeight
  console.log(percent.toFixed(3));
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

function scrollToPercentage(percent) {
  const target = percent * document.documentElement.scrollHeight
  window.scrollTo({
    top: target,
    behavior: 'smooth'
  });
}

scroll()
window.addEventListener('scroll', scroll)

document.addEventListener('keydown', event => {
  let percent = window.scrollY / document.documentElement.scrollHeight /*get current percent*/
  percent = parseFloat(percent.toFixed(3));
  console.log(percent);
  if (event.keyCode == 13) {
    scrollToTop();
  } else if (event.keyCode == 37) { /*previous*/
    for (let i in slides) {
      if (percent <= slides[parseInt(i)+1] && percent > slides[i]) { /*decide which slide is previous based on what percent is between*/
        scrollToPercentage(slides[i]);
        break;
      }
    }
  } else if (event.keyCode == 39) { /*next*/
    for (let i in slides) {
      if (percent >= slides[parseInt(i)-1] && percent < slides[i]) { /*decide which slide is next based on what percent is between*/
        scrollToPercentage(slides[i]);
        break;
      }
    }
  }
})
