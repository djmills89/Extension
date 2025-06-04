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

    let cardText = document.createElement('div')
    cardText.classList.add('card-text-container')

    let cardTitle = document.createElement('h2')
    cardTitle.textContent = item.name
    cardTitle.classList.add('card-title')

    let cardBody = document.createElement('p')
    cardBody.textContent = item.description
    cardBody.classList.add('card-body')

    let removeBtn = document.createElement('button')
    removeBtn.textContent = 'Remove'
    removeBtn.classList.add('remove-btn')

    let toggle = document.createElement('label')
    toggle.classList.add('toggle-slider')

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = item.isActive

    let toggleSwitch = document.createElement('span')
    toggleSwitch.classList.add('slider', 'round')

    toggle.append(checkbox, toggleSwitch)
    cardText.append(cardTitle, cardBody)
    card.append(logo, cardText, removeBtn, toggle)
    return card
}

