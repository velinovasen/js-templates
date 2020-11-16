const HTMLSelectors = {
  towns: () => document.getElementById('towns').value,
  loadButton: () => document.getElementById('btnLoadTowns'),
  root: () => document.getElementById('root'),
}


HTMLSelectors.loadButton().addEventListener('click', (e) => {
  e.preventDefault()
  let townsTokens = HTMLSelectors.towns().split(/[', ']|[ ]|[,]/);
  let towns = [];
  for (town of townsTokens) {
    if (town) {
      towns.push(town)
    }
  }
  appendTowns(towns)
})

function appendTowns(towns) {
  getTemplate().then((templateSource) => {
    let template = Handlebars.compile(templateSource);
    let root = HTMLSelectors.root()
    root.innerHTML = template({towns})
  })
}

function getTemplate() {
  return fetch('./template.hbs').then((r) => r.text());
}