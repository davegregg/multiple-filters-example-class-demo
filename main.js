window.onload = function (_event) {
    const categorySelect = document.querySelector(`[name="category"]`)
    const difficultySelect = document.querySelector(`[name="difficulty"]`)
    const filtersForm = document.querySelector("#filters")

    populateCategorySelect(categories, categorySelect)
    populateDifficultySelect(difficultyLevels, difficultySelect)

    filtersForm.onsubmit = displayHikeCards
    filtersForm.onreset = showAllHikes  // show all hikes on reset

    // Trigger a form submission automatically when the user selects a new option
    categorySelect.onchange = () => filtersForm.requestSubmit()
    difficultySelect.onchange = () => filtersForm.requestSubmit()

    // Go ahead and show all (unfiltered) hikes on page load
    showAllHikes()
}

function showAllHikes () {
    let html = ""
    for (const currentHike of hikes) {
        html += buildHikeCard(currentHike)
    }

    const resultsElement = document.getElementById("matching-hikes")
    resultsElement.innerHTML = html
}

function displayHikeCards (event) {
    event.preventDefault()
    const filtersForm = event.target

    const chosenCategory = filtersForm.elements.category.value
    const chosenDifficulty = filtersForm.elements.difficulty.value

    let html = ""
    for (const currentHike of hikes) {
        const categoryMatches = currentHike.category === chosenCategory
        const difficultyMatches = currentHike.difficulty === Number(chosenDifficulty)
        
        const difficultyDoesntMatter = chosenDifficulty === "not applicable"
        const categoryDoesntMatter = chosenCategory === "not applicable"
        
        if (categoryMatches && difficultyMatches) {
            html += buildHikeCard(currentHike)
        } else if (categoryMatches && difficultyDoesntMatter) {
            html += buildHikeCard(currentHike)
        } else if (difficultyMatches && categoryDoesntMatter) {
            html += buildHikeCard(currentHike)
        } else if (categoryDoesntMatter && difficultyDoesntMatter) {
            html += buildHikeCard(currentHike)
        }
    }

    if (html === "") {
        html += "<h4>No results.</h4>"
    }

    const resultsElement = document.getElementById("matching-hikes")
    resultsElement.innerHTML = html
}

function buildHikeCard (hike) {
    const categoryTitleCased = hike.category[0].toUpperCase() + hike.category.slice(1)

    return `
        <div class="card" id="hike-${hike.id}">
            <img src="./data/images/${hike.scenicImage}" class="card-img-top" alt="${hike.name}">
            <div class="card-body accordion accordion-flush" id="accordion-${hike.id}">

                <h5 class="card-title">${hike.name}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Challenge Rating: <span class="badge text-bg-warning">${hike.difficulty}</span></h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Length: <span class="badge text-bg-info">${hike.length}</span></h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Environment: <span class="badge text-bg-success">${categoryTitleCased}</span></h5>

                <p class="card-text">${hike.description}</p>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${hike.id}" aria-expanded="false" aria-controls="flush-collapse-${hike.id}">
                            Trail Map
                        </button>
                    </h2>
                    <div id="flush-collapse-${hike.id}" class="accordion-collapse collapse" data-bs-parent="#accordion-${hike.id}">
                        <div class="accordion-body">
                            <img src="./data/images/${hike.trailMapImage}" class="card-img-top" alt="${hike.name}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

function populateCategorySelect (categories, selectElement) {
    let html = ""
    
    for (const category of categories) {
        html += `<option value="${category.toLowerCase()}">${category}</option>`
    }

    selectElement.innerHTML += html
}


function populateDifficultySelect (difficultyLevels, selectElement) {
    let html = ""
    
    for (const difficulty of difficultyLevels) {
        html += `<option value="${difficulty}">${difficulty}</option>`
    }

    selectElement.innerHTML += html
}
