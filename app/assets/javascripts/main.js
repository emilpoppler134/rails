/* Window click event listener */
window.addEventListener('click', (event) => {
  if (document.querySelector('.profile-list').classList.contains('open')) {
    document.querySelector('.profile-list').classList.remove('open')
  }
})

/* currency switcher */
document.querySelector('.nav-profile-button').addEventListener('click', (event) => {
  if (!document.querySelector('.profile-list').classList.contains('open')) {
    event.stopPropagation();
    document.querySelector('.profile-list').classList.add('open')
  }
})

/* currency list */
document.querySelector('.profile-list').addEventListener('click', (event) => {
  document.querySelector('.active').classList.remove('active')
  event.target.classList.add('active')
})

/* Calculate difference in days between two dates*/
function date_difference(type, date1, date2) {

  var start,
  end = new Date(date2),
  today = new Date();

  date1 == null ? start = new Date() : start = new Date(date1);

  var oneDay = 1000 * 60 * 60 * 24
  var diffInTime = end.getTime() - start.getTime()
  var diffInDays = Math.round(diffInTime / oneDay)

  diffInDays < 0 ? diffInDays = 0 : "";

  if (type == 'days_left') {
    return diffInDays
  } else if (type == 'procentage'){
    var procentage = Math.round(((today - start) / (end - start)) * 100)
    procentage > 100 ? procentage = 100 : "";
    return procentage
  }
}