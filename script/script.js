const themeToggle = document.getElementById('themeToggle')
const filterBtn = document.querySelectorAll('.filter-btn')
let currentFilter = 'all'

//toggles the dark/light themes
themeToggle.addEventListener('click', () => {
    const root = document.documentElement
    const isLight = root.classList.contains('light-theme')

    root.classList.toggle('light-theme', !isLight)
    root.classList.toggle('dark-theme', isLight)

    themeToggle.src = isLight
        ? '../assets/images/icon-sun.svg'
        : '../assets/images/icon-moon.svg'
})

const extensionContainer = document.getElementById('container')

//fetches and renders the data from the json file
fetch('../data.json')
    .then(response => response.json())
    .then(data => { //data is the array of objects
        console.log(data)
        //each data item as a logo, name, description and isActive
            data.forEach(item => {
                //initial generation of data
                const extensionEl = generateCard(item, data)
                extensionContainer.appendChild(extensionEl)
            })
            
            //uses data-filter to filter the data according to the button clicked
            filterBtn.forEach( btn => {
                btn.addEventListener('click', (e) => {
                //change active state on button
                const selectedFilter = e.target.dataset.filter
                currentFilter = selectedFilter
                filterBtn.forEach(b => b.classList.remove('active'))
                e.target.classList.add('active')
                renderFilteredData(selectedFilter, data)
            })
        })
    })
    .catch(error => {
        console.log('error loading JSON:', error)
    })

    //renders dom elements based on the current filters
function renderFilteredData(filter = 'all', data) {
    extensionContainer.innerHTML = ''

    //sets filter to correct filter type
    const filteredData = data.filter(item => {
        if (filter === 'all') return true
        if (filter === 'active') return item.isActive
        if (filter === 'inactive') return !item.isActive
    })
    //generates dom based on current filter
    filteredData.forEach(item => {
        const extensionEl = generateCard(item, data)
        extensionContainer.appendChild(extensionEl)
     })
}

//removes extensions and rerenders the dom
function removeExtension(item, data) {
    const itemIndex = data.indexOf(item)
    data.splice(itemIndex, 1)
    renderFilteredData(currentFilter, data)
}

//creates the cards and adds them to the dom
function generateCard(item, data) {
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
    removeBtn.addEventListener('click', () => {
        removeExtension(item, data)
    })

    let toggle = document.createElement('label')
    toggle.classList.add('toggle-slider')
    toggle.setAttribute('for', `${item.name}`)

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = item.isActive
    checkbox.setAttribute('id', `${item.name}`)
    checkbox.addEventListener('change', function() {
        item.isActive = this.checked
        renderFilteredData(currentFilter, data)
    })

    let toggleSwitch = document.createElement('span')
    toggleSwitch.classList.add('slider', 'round')

    toggle.append(checkbox, toggleSwitch)
    cardText.append(cardTitle, cardBody)
    card.append(logo, cardText, removeBtn, toggle)
    return card
}

