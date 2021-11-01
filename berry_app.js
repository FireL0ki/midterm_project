// console.log("JavaScript is working") // initial JS test

// for search function - inputs
let berryNameInput = document.querySelector('#berry-name-input')
let searchButton = document.querySelector('#search-button')


// for main document spans holding information in the HTML
let berryName = document.querySelector('.berry-name')
let berryId = document.querySelector('.berry-id')
let berryImage = document.querySelector('.berry-image')
let berryHarvestTime = document.querySelector('.berry-harvest-time')
let berryMaxHarvest = document.querySelector('.berry-max-harvest')

let berryFlavors = document.querySelector('.berry-flavors')

// Get information from the API
let fetchResult = fetch('https://pokeapi.co/api/v2/berry/') // connect to URL
    .then(res => { // get result
        return res.json()  // return result as json data
    })
    .then(data => {  // take json data
        console.log(data) // print data to console
    })


// Use the value passed from the berry name search box
// Add it to the end of the URL
function getBerryInformation(berryNameInput) {
fetch(`https://pokeapi.co/api/v2/berry/${berryNameInput}`)
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data);
        berryName.innerHTML = data.name
        berryId.innerHTML = data.id

        berryHarvestTime.innerHTML = data.growth_time
        berryMaxHarvest.innerHTML = data.max_harvest

        // create empty array to hold berry flavors with potencies greater than 0 
        // (berries that actually have any of that flavor profile)
        // Later- add a doughnut chart to show the break down of flavor profiles?
        let berryFlavorsArray = []
        // create/define totalFlavorsArray to hold all the flavor profiles (each a separate object within the array)
        let totalFlavorsArray = data.flavors

       // loop over the array of flavors, check for flavor potencies greater than 0
       // if the flavor potency is greater than zero (the berry has that flavor), add it to the new berryFlavorsArray
        for (x = 0; x < totalFlavorsArray.length; x++) {
            if (data.flavors[x].potency > 0) {
                berryFlavorsArray.push(' ' + data.flavors[x].flavor.name)
            }
        }

        // set the berry flavors to the html berryFlavors element
        berryFlavors.innerHTML = berryFlavorsArray

    })
}


// add an event listener to the search button
// when the search button is clicked, get the value from the berry name in put box
// pass that value to the function getBerryInformation
document.getElementById("search-button").addEventListener("click", function() {
    // change input to all lowercase, so it functions for the API call
    let berrySearch = document.getElementById("berry-name-input").value.toLowerCase()

    // Data validation, check there is something entered in search bar
    if (berrySearch.length <= 0) {
        alert("Please enter a berry name from the list")
    } else {
       getBerryInformation(berrySearch) 
    }

    // Grab the search input and use it to update the image source and load the correct berry picture
    // The getElementbyID is working, manual input works, but the program cannot read the html input element perhaps?
    document.getElementById("berry-image").src=`${berryNameInput}.png`
})