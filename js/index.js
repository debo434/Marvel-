
//fetch all data from api 
fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=1fd565b76a17eb2ac6b96fee1f86bf56&hash=5c8836343a5b644b7be095e2a7d80ab8`)

    .then(data => data.json())
    .then(res => {
        console.log(res);
        //console.log("for one data:::")
        //console.log(res.data.results[1])

        //console.log(res.data.results.length);
        let n = res.data.results.length;
        let html = "";

        for (let i = 0; i < n; i++) {
            html += `
        <div class="col">
          <div class="card">
            <div class="d-flex flex-row favIcon">
              <a href="details.html" target="_blank"><span><i class="fa-solid fa-circle-info" id="${res.data.results[i].id}" onclick="showDetail(this.id)"></i></span></a>
              <span><i class="fa-solid fa-heart " id="${res.data.results[i].id}" onclick="addFavourit(this.id)"></i></span>
            </div>
            <img src="${res.data.results[i].thumbnail.path}.${res.data.results[i].thumbnail.extension}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${res.data.results[i].name}</h5>
              <!--<p class="card-text">${res.data.results[i].description}</p>-->
            </div>
          </div>
        </div>`;

        }

        let allItem = document.getElementById("allItem");
        allItem.innerHTML = html;
    })


//Add item in local storage
function addFavourit(index){
  //console.log(index);
  let  favouritItem = localStorage.getItem("favouritItem");
  if (favouritItem == null) {
    favListObj = [];
  }
  else {
    favListObj = JSON.parse(favouritItem);
  }
  let MyObj={
      id:index
  }

  favListObj.push(MyObj);
  localStorage.setItem("favouritItem", JSON.stringify(favListObj));
  //display alert for adding favourit
  alert("Add Favourit!!")
}



//For search Bar(search character)
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', () => {

  const inputValue = searchInput.value;
  //fetch data from api with the help of character name
  fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&nameStartsWith=${inputValue}&apikey=1fd565b76a17eb2ac6b96fee1f86bf56&hash=5c8836343a5b644b7be095e2a7d80ab8`)
  .then(data => data.json())
    .then(res => {
      
      //console.log(res)

      let n = res.data.results.length;
      let html = "";

        for (let i = 0; i < n; i++) {
            html += `
        <div class="col">
          <div class="card">   
            <div class="d-flex flex-row favIcon">
              <a href="details.html" target="_blank"><span><i class="fa-solid fa-circle-info" id="${res.data.results[i].id}" onclick="showDetail(this.id)"></i></span></a>
              <span><i class="fa-solid fa-heart " id="${res.data.results[i].id}" onclick="addFavourit(this.id)"></i></span>
            </div>
          <img src="${res.data.results[i].thumbnail.path}.${res.data.results[i].thumbnail.extension}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title" >${res.data.results[i].name}</h5>
            <!--<p class="card-text">${res.data.results[i].description}</p>-->
            </div>
          </div>
        </div>`;

        }

        let allItem = document.getElementById("allItem");
        allItem.innerHTML = html;

    })
})


//for detail page (save id in local storage)
function showDetail(index){
  let  detailsItem = localStorage.getItem("detailsItem");
  let MyObj={
      id:index
  }
  localStorage.setItem("detailsItem", JSON.stringify(MyObj));
  
}
