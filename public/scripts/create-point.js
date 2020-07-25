function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res =>  res.json() )
    .then( states => {
      for( state of states ) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const optCities = document.createDocumentFragment()

  const ufValue = event.target.value
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = `<option value="">Selecione a Cidade</option>` 
  citySelect.disabled = true

  fetch(url)
  .then( res => res.json() )
  .then( cities => {

    // stateInput.value = cities[event.target.selectedIndex].microrregiao.mesorregiao.UF.nome

    for ( const city of cities ) {
      // citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      const newElement = document.createElement('option')
      newElement.value = city.nome
      newElement.innerText = city.nome
      optCities.appendChild(newElement)
    }
    citySelect.disabled = false;
    citySelect.appendChild(optCities)
  })
}

document
  .querySelector("select[name=uf]")
  .addEventListener('change', getCities)

//items de coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target
  const itemId = event.target.dataset.id
  itemLi.classList.toggle("selected")

  // verificar se existem itens selecionados, se sim
  // pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex( item => { 
    const itemFound = item == itemId
    return itemFound
  })

  // se já estiver selecionado, tirar da seleção
  if ( alreadySelected >= 0 ) {
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent 
    })

    selectedItems = filteredItems
  } else { // se não tiver selecionado adicionar à seleção 
    selectedItems.push(itemId)
  }

  // atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems.toString().replace(/,/g, ", ")

  
}


