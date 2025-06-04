const extensionContainer = document.getElementById('container')
fetch('../data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        //each data item as a logo, name, description and isActive
        data.forEach(item => {
            console.log(item)
            let externtionEl = generateCard(item)
            extensionContainer.append(externtionEl)
        })
    })
    .catch(error => {
        console.log('error loading JSON:', error)
    })


function generateCard(item) {
    item.logo = '.' + item.logo
    let card = document.createElement('div')
    card.classList.add('card')

    let logo = document.createElement('img')
    logo.src = item.logo
    logo.classList.add('logo')

    let cardTitle = document.createElement('h2')
    cardTitle.textContent = item.name
    cardTitle.classList.add('card-title')

    let cardBody = document.createElement('p')
    cardBody.textContent = item.description
    cardBody.classList.add('card-body')

    let removeBtn = document.createElement('button')
    removeBtn.textContent = 'Remove'
    removeBtn.classList.add('remove-btn')

    let toggle = document.createElement('input')
    toggle.type = 'checkbox'
    toggle.checked = item.isActive
    toggle.classList.add('toggle-slider')

    card.append(logo, cardTitle, cardBody, removeBtn, toggle)
    return card
}

