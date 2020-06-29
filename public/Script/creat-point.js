function changeState() {
    const stateSelect = document.querySelector('select#state')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then(estados => {

        for (const state of estados) {
            stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

changeState()

function getCity() {
    const citySelect = document.querySelector('select#city')
    const stateInput = document.querySelector('input#state')
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url=`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then(cidades => {
       
        for (const city of cidades) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document 
    .querySelector('select#state')
    .addEventListener('change', getCity)

//item de coleta 

const itensToCollect = document.querySelectorAll('.itens-grid li')
    for (const item of itensToCollect) {
        item.addEventListener('click', handleSelectedItem)
    }

    const collectedItems = document.querySelector('input[name=itens]')

    let selectedItens = []

    function handleSelectedItem(event) {
        const itemLi = event.target
        itemLi.classList.toggle('selected')
        const itemId = event.target.dataset.id

        const alreadySelected = selectedItens.findIndex(item => {
            const itemFound = item == itemId
            return itemFound
        })

        if(alreadySelected >= 0) {
            const filteredItems = selectedItens.filter(item => {
                const itemIsDifferent = item != itemId
                return itemIsDifferent
            })

            selectedItens = filteredItems
        } else {
            selectedItens.push(itemId)
        }

        collectedItems.value = selectedItens
    }