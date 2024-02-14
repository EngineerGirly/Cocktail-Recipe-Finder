//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

let currentIndex = 0;
let arr = [];
//hide on load
document.querySelector('#work').classList.add('hidden')

document.querySelector('button').addEventListener('click', getDrink);
document.querySelector('.next').addEventListener('click', getDrink);
// document.querySelector('.previous').addEventListener('click', retrieve);


function getDrink() {
  let drink = encodeURIComponent(document.querySelector('input').value.trim());
  //remove all children before making a new fetch
  document.querySelector('ol').innerHTML = '';
  document.querySelector('.message').innerText = '';


  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json())
    .then(data => {
      //remove when fetch request comes back
      document.querySelector('#work').classList.remove('hidden')
      console.log(data)
      const drinks = data.drinks;


      if (drinks && drinks.length > 0) {
        arr.push(drinks[currentIndex].strDrink)
        document.querySelector('h2').innerText = (drinks[currentIndex].strDrink);
        document.querySelector('img').src = (drinks[currentIndex].strDrinkThumb);
        document.querySelector('.instruction').innerText = (drinks[currentIndex].strInstructions);

        for (let i = 1; i <= 15; i++) {
          if (drinks[currentIndex][`strIngredient${i}`] != null) {
            const newLi = document.createElement('li');
            // Set the content of the li element
            newLi.innerHTML = drinks[currentIndex][`strMeasure${i}`]; /*adding measurement property */
            newLi.innerText += " "/*adding spacing */
            newLi.innerHTML += drinks[currentIndex][`strIngredient${i}`]; /*adding ingredient property */
            // Append the li element to the ul
            document.querySelector('ol').appendChild(newLi); 
          }
        }

        currentIndex = (currentIndex + 1) % drinks.length;
      } else {
        document.querySelector('#work').classList.add('hidden')
        document.querySelector('.message').innerText = "Sorry, that cocktail is not in the database"
      }
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
}

// function retrieve() {

//   fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${arr[arr.length - 2]}`)
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {
//       console.log(data.drinks);
//       arr.pop(arr.length - 1)

//       // document.querySelector('h2').innerText = (drinks[currentIndex].strDrink);
//       // document.querySelector('img').src = (drinks[currentIndex].strDrinkThumb);
//       // document.querySelector('.instruction').innerText = (drinks[currentIndex].strInstructions);
      

//     })
//     .catch(err => {
//       console.log(`error ${err}`);
//     });
// }




// document.querySelector('button').addEventListener('click', getDrink);

// function getDrink() {
//   let drink = encodeURIComponent(document.querySelector('input').value.trim());

//   fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {
//       console.log(data.drinks);

//     })
//     .catch(err => {
//       console.log(`error ${err}`);
//     });
// }


