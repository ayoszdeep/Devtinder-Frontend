export function applyTheme() {
  localStorage.setItem('devtinder-theme', 'darkpink')
  document.documentElement.setAttribute('data-theme', 'darkpink')
}
