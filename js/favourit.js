showFavItem()

//for showing favorit items
function showFavItem() {
    //console.log("favlist")

    let favouritItem = localStorage.getItem("favouritItem");
    if (favouritItem == null) {
      favListObj = [];
    }
    else {
      favListObj = JSON.parse(favouritItem);
    }
    
    let html = "";

    favListObj.forEach(function (element, index) {

      //fetching data from api with the help of id (items id)
      fetch(`https://gateway.marvel.com:443/v1/public/characters/${element.id}?ts=1&apikey=1fd565b76a17eb2ac6b96fee1f86bf56&hash=5c8836343a5b644b7be095e2a7d80ab8`)
      .then(data=>data.json())
      .then(res =>{
        
        //console.log(res)
        html +=`
        <div class="col">
          <div class="card">
            <div class="d-flex flex-row favIcon">
              <a href="details.html" target="_blank"><span><i class="fa-solid fa-circle-info" id="${res.data.results[0].id}" onclick="showDetail(this.id)"></i></span></a>
              <span><i class="fa-solid fa-heart" id="${index}" onclick="removeFavourit(this.id)"></i></span>
            </div>
            
            <img src="${res.data.results[0].thumbnail.path}.${res.data.results[0].thumbnail.extension}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${res.data.results[0].name}</h5>
              <!--<p class="card-text">${res.data.results[0].description}</p>-->
            </div>
          </div>
      </div>`;

        let favItemEle = document.getElementById("favouritItem");
        favItemEle.innerHTML = html;
  
      })
  
    });
    
}


//remove from local storage
function removeFavourit(index) {
    //console.log(`I am deleting!! ${index}`);

    let favouritItem = localStorage.getItem("favouritItem");
    if (favouritItem == null) {
        favListObj = [];
    }
    else {
        favListObj = JSON.parse(favouritItem);
    }

    //console.log("index",index)
    favListObj.splice(index, 1);
    alert("Remove from Favorit!!")
    localStorage.setItem("favouritItem", JSON.stringify(favListObj));

    // call showFavItem function
    showFavItem();
}


//for detail page (save id in local storage)
function showDetail(index){
  let  detailsItem = localStorage.getItem("detailsItem");
  let MyObj={
      id:index
  }
  localStorage.setItem("detailsItem", JSON.stringify(MyObj));
  
}