const api = "https://api.jikan.moe/v3";


// Take user input and uses API to retrieve the anime list (unsorted)
function searchAnime(){
   //user input selected
   var input = $("#animeID").val();
   // Button event
   var button = document.getElementById("searchButton");
   // API
   const settings = {
       "async": true,
       "crossDomain": true,
       // Syntax works
       "url": `${api}/search/anime?q=${input}&page=1`,
       "method": "GET",
       "type": "anime",
   };
   // Logging to see progress
   console.log(input);

   // Progress + display result function called
   $.ajax(settings).done(function (response) {
       console.log(response);
       updateDom(response);
       console.log("logged");
       });
}

// Same as searchAnime(), type = mange
function searchManga(){

   //TODO: needs a reference <> after html #input for manga
   var input = $("#animeID").val();

   var button = document.getElementById("searchButton");

   const settings = {
       "async": true,
       "crossDomain": true,
       //syntax works
       "url": `${api}/search/manga?q=${input}&page=1`,
       "method": "GET",
       "type": "manga",
   };
   console.log(input);


   $.ajax(settings).done(function (response) {
       console.log(response);
       updateDom(response);
       console.log("logged");
       });
}

// Displaying result for anime/manga
function updateDom(data){

   const searchResults = document.getElementById('search-results');
   searchResults.innerHTML = data.results
       .map(anime=>{
           return `
               <div class="card-content">
                   <div class="card-title"> <br> <br>
                       <b href="">.............................</b>
                       ${anime.title}
                   </div>
                   <table>
                       <td>...................................................</td>
                       <td><img src="${anime.image_url}" width ="150" height="200"></td>
                       <td>............</td>
                       <div class="card-synopsis">
                           <td> ${anime.synopsis} <br>
                           <a href="${anime.url}"><br>Find out more</a></td>
                       </div>
                       <td>...................................................</td>
                   </table>
           `
       }).join("");
   }

   // Pulling top anime sorted by ranked 1-x
   function topAnime(){
       var settings = {
           "url": "https://api.jikan.moe/v3/top/anime/1/upcoming",
           "method": "GET",
           "timeout": 0,
             "type": "anime",
             "page":1,
             "subtype": "upcoming",
         };

         $.ajax(settings).done(function (response) {
           console.log(response);
           showTopAnime(response);

         });
   }

   // Display top anime
   function showTopAnime(data){
       const searchResults = document.getElementById('top-results');

       searchResults.innerHTML = data.top
           .map(anime=>{
           return `
               <div class="card-content">
                   <div class="card-title"> <br> <br>
                       <b href="">.............................</b>
                       ${anime.rank}. ${anime.title}
                   </div>
                   <table>
                       <td>...................................................</td>
                       <td><img src="${anime.image_url}" width ="150" height="200"></td>
                       <td>............</td>
                       <div class="card-synopsis">
                           <td> Members: ${anime.members}<br>Start Date: ${anime.start_date}<br>Type: ${anime.type}
                           <a href="${anime.url}"><br><br>Find out more</a></td>
                       </div>
                       <td>...................................................</td>
                   </table>
           `
       }).join("");
   }

// Pulling top manga sorted by ranked 1-x
   function topManga(){
       var settings = {
           "url": "https://api.jikan.moe/v3/top/manga/1/upcoming",
           "method": "GET",
           "timeout": 0,
           "type": "manga",
           "page":1,
           "subtype": "upcoming",
         };

         $.ajax(settings).done(function (response) {
           console.log(response);
           showTopManga(response);

         });
   }

// Display top manga
function showTopManga(data){
   const searchResults = document.getElementById('top-results');

   searchResults.innerHTML = data.top
       .map(manga=>{
       return `
           <div class="card-content">
               <div class="card-title"> <br> <br>
                   <b href="">.............................</b>
                   ${manga.title}
               </div>
               <table>
                   <td>...................................................</td>
                   <td><img src="${manga.image_url}" width ="150" height="200"></td>
                   <td>............</td>
                   <div class="card-synopsis">
                       <td> Status: ${manga.status}<br>Start Date: ${manga.start_date}<br>Type: ${manga.type}
                       <a href="${manga.url}"><br><br>Find out more</a></td>
                   </div>
                   <td>...................................................</td>
               </table>
       `
   }).join("");
}