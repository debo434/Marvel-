showDetail();

//show deatil card
function showDetail(){
    let  detailsItem = localStorage.getItem("detailsItem");
    favListObj = JSON.parse(detailsItem);
    let html="";
    //console.log(favListObj.id);

    //fetching data from api using id 
    fetch(`https://gateway.marvel.com:443/v1/public/characters/${favListObj.id}?ts=1&apikey=1fd565b76a17eb2ac6b96fee1f86bf56&hash=5c8836343a5b644b7be095e2a7d80ab8`)
      .then(data=>data.json())
      .then(res =>{
        //console.log(res)

        html +=`
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${res.data.results[0].thumbnail.path}.${res.data.results[0].thumbnail.extension}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8 bg-secondary text-white">
          <div class="card-body ">
            <h5 class="card-title">${res.data.results[0].name}</h5>
            <p class="card-text">${res.data.results[0].description}</p>
            <p class="card-text">Toatl Comics available : ${res.data.results[0].comics.available} </p>
            <p class="card-text">Toatl Comics Events : ${res.data.results[0].events.available} </p>
            <p class="card-text">Toatl Comics Series : ${res.data.results[0].series.available} </p>
          </div>
        </div>
      </div>`;

      let detailsItemEle = document.getElementById("detailsItem");
      detailsItemEle.innerHTML = html;
      
      //remove from local stroge
      localStorage.removeItem("detailsItem");
      });
}