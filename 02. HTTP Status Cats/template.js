const HTMLSelectors = {
    allCats: () => document.getElementById('allCats'),
    statusButtons: () => document.getElementsByClassName('status'),
    showBtn: () => document.getElementsByClassName('showBtn'),
} 

Promise.all([
    getTemplate('./template.hbs'),
    getTemplate('./cat.hbs')
])
.then(([templateSrc, catSrc]) => {
    
    Handlebars.registerPartial('cat', catSrc);

    let template = Handlebars.compile(templateSrc);
    let allCats = HTMLSelectors.allCats();
    let resultHTML = template({ cats });
    allCats.innerHTML = resultHTML;
    
    [...HTMLSelectors.showBtn()].forEach((but) => {
        but.addEventListener('click', toggleStatus)
    })
})

function toggleStatus(e) {
    let statusDiv = e.target.parentElement.getElementsByClassName('status')[0];
    if (statusDiv.style.display === 'none') {
    statusDiv.style.display = 'block';
    e.target.innerText = 'Hide status code';
    } else {
        statusDiv.style.display = 'none';
        e.target.innerText = 'Show status code';
    }
}

function getTemplate(templateLocation) {
    return fetch(templateLocation).then((res) => res.text());
}