export function applyTheme() {
  const savedTheme = localStorage.getItem('devtinder-theme') || 'darkpink'
  localStorage.setItem('devtinder-theme', savedTheme)
  document.documentElement.setAttribute('data-theme', savedTheme)
}
