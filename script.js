let mainGallery = document.querySelector("#gallery");
let search = document.querySelector("#search");
let galleryPopup = document.querySelector("#gallery-popup");
let mainImgPopup = document.querySelector(".main-img");
let control = document.querySelector(".control");
let preImg = document.querySelector("#pre");
let nextImg = document.querySelector("#next");
let imgMenu = document.querySelector(".img-menu");
let galleryIndex = 0;
let url = `https://api.unsplash.com/search/photos?query=all&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;

search.addEventListener("keydown",(eo) => {
    if(eo.key === "Enter" && eo.target.value != "") {
        mainGallery.innerHTML = "";
        imgMenu.innerHTML ="";
        url = `https://api.unsplash.com/search/photos?query=${search.value}&per_page=30&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
        getData(url);
    }
});

window.onload = function() {
    getData(url);
}
async function getData(api) {
    try{
        let response = await fetch(api);
        let data = await response.json();

        // call loadImg function
        loadImg(data);

    }catch(e) {
        alert("error " + e );
    }
}

// load img in the page
function loadImg(data) {
    data.results.forEach( (item,i) => {
        // let div = document.createElement("div");
        // div.className = "img";
        // div.innerHTML =`<img src="${item.urls.raw}" loading="lazy" alt="loading....">`;
        mainGallery.innerHTML += `
            <div class="img">
              <img src="${item.urls.raw}" loading="lazy" alt="loading...">
            </div>
        `;
        imgMenu.innerHTML += `
            <div class="img-tow active">
              <img src="${item.urls.raw}"  alt="loading...">
            </div>
        `;  
    });
    addToPopup();
    addToPopupFromMenu();
}

// add img to img-popup
function addToPopup(){
    let getAllImg = document.querySelectorAll(".img");
    let getAllImgTow = document.querySelectorAll(".img-tow");
    
    getAllImg.forEach((item,i) => {
        item.addEventListener("click",(eo) => {
            imgMenu.querySelectorAll(".active").forEach((item) => {
                item.classList.remove("active");
            });
            getAllImgTow[i].classList.add("active");
            
            let imgSrc = item.querySelector("img").src;
            galleryPopup.style.display = "flex";
            mainImgPopup.querySelector("img").src = imgSrc;
            galleryIndex = i;
            
            if(galleryIndex == 0) {
                preImg.setAttribute("disabled","");
                nextImg.removeAttribute("disabled");
            }else if(galleryIndex == getAllImg.length-1) {
                nextImg.setAttribute("disabled","");
                preImg.removeAttribute("disabled");
            }else {
                nextImg.removeAttribute("disabled");
                preImg.removeAttribute("disabled");
            }
        });
    });
}
// add img to img-popup from img-menu
function addToPopupFromMenu() {
    let getAllImg = document.querySelectorAll(".img");
    let getAllImgTow = document.querySelectorAll(".img-tow");
    
    getAllImgTow.forEach((item,i) => {
        item.addEventListener("click",(eo) => {
            imgMenu.querySelectorAll(".active").forEach((item) => {
                item.classList.remove("active");
            });
            item.classList.add("active");
            
            let imgSrc = item.querySelector("img").src;
            galleryPopup.style.display = "flex";
            mainImgPopup.querySelector("img").src = imgSrc;
            galleryIndex = i;
            
            if(galleryIndex == 0) {
                preImg.setAttribute("disabled","");
                nextImg.removeAttribute("disabled");
            }else if(galleryIndex == getAllImgTow.length-1) {
                nextImg.setAttribute("disabled","");
                preImg.removeAttribute("disabled");
            }else {
                nextImg.removeAttribute("disabled");
                preImg.removeAttribute("disabled");
            }
        });
    });
}
// next img gallery
nextImg.addEventListener("click",(eo) => {
    galleryIndex++;
    let getAllImgTow = document.querySelectorAll(".img-tow");
    getAllImgTow[galleryIndex].click();
    console.log(galleryIndex);
});
// previos img gallery
preImg.addEventListener("click",(eo) => {
    let getAllImgTow = document.querySelectorAll(".img-tow");
    --galleryIndex;
    getAllImgTow[galleryIndex].click();
});

let timeLoop ;
function modeOn(e) {
    let getAllImgTow = document.querySelectorAll(".img-tow");
    if(document.body.className == "play_arrow"){
        e.innerHTML= "pause";
        document.body.className ="pause";
        timeLoop = setInterval(() => {
            nextImg.click();
            if(galleryIndex == getAllImgTow.length-1){
                clearInterval(timeLoop);
                e.innerHTML = "play_arrow";
                document.body.className ="play_arrow";
            }
        }, 5000);
    }else {
        e.innerHTML= "play_arrow";
        document.body.className ="play_arrow";
        clearInterval(timeLoop);
    }
}


// controll img munu
control.addEventListener("click",(eo) => {
    switch(eo.target.id){
        case "close" :
            galleryPopup.style.display = "none";
            break;
        case "menu" :
            document.querySelector(".popup-container").classList.toggle("full-width");
            imgMenu.classList.toggle("display");
            break;
        case "mode-on" : 
            modeOn(eo.target);
            break;
    };
});




