const inputPageNumber = document.querySelector("#page-number");
const inputLimit = document.querySelector("#limit");
const submitButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector(".container_photos");

submitButton.addEventListener("click", () => {
   const pageNumber = inputPageNumber.value;
   const limit = inputLimit.value;

   if ((pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) && (limit < 1 || limit > 10 || isNaN(limit))) {
      outputSpan.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10.";
      return;
   } else
      if (pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) {
         outputSpan.innerHTML = "Номер страницы вне диапазона от 1 до 10.";
         return;
      } else if (limit < 1 || limit > 10 || isNaN(limit)) {
         outputSpan.innerHTML = "Лимит вне диапазона от 1 до 10.";
         return;
      }

   fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)
      .then((response) => response.json())
      .then((json) => {
         loadPhotos(json);
         savePhotosToLocalStorage();
      })
      .catch((reason) => {
         outputSpan.innerHTML = `Ошибка: ${reason}`;
         console.log("Ошибка:", reason);
      });
});

loadPhotosFromLocalStorage();

function loadPhotos(apiData) {
   let cards = String();

   apiData.forEach(item => {
      const cardBlock = `<img src="${item.download_url}"/>`;
      cards += cardBlock;
   });

   photosContainer.innerHTML = cards;
}

function savePhotosToLocalStorage() {
   localStorage.setItem("last_photos", photosContainer.innerHTML);
}

function loadPhotosFromLocalStorage() {
   photosContainer.innerHTML = localStorage.getItem("last_photos");
   return photosContainer.innerHTML.length > 0;
}


