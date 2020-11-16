import monkeys from './monkeys.js';

const HTMLSelectors = {
    getMonkeysDiv: () => document.getElementsByClassName('monkeys')[0],
    infoBUttons: () => document.getElementsByTagName('button'),
}

fetch('./template.hbs')
.then((r) => r.text())
.then((templateSrc) => {
    let template = Handlebars.compile(templateSrc);
    let resultHTML = template({ monkeys })
    HTMLSelectors.getMonkeysDiv().innerHTML = resultHTML;

    [...HTMLSelectors.infoBUttons()].forEach((but) => {
        but.addEventListener('click', toggleInfo)
    })

})

function toggleInfo(e) {
    let parToDisplay = e.target.parentElement.getElementsByTagName('p')[0];
    if (parToDisplay.style.display === 'none') {
        parToDisplay.style.display = 'block';
    } else {
        parToDisplay.style.display = 'none';
    }
}