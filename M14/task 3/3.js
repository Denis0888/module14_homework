const input = document.querySelector("input");
const submitButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const imgContainer = document.querySelector("div");

submitButton.addEventListener("click", () => {
   const value = input.value;

   if (value >= 1 && value <= 10 && !isNaN(value)) {
      useRequest("https://picsum.photos/v2/list?limit=" + value, loadImg);
   } else {
      outputSpan.innerHTML = "Число вне диапазона от 1 до 10.";
   }
});

function useRequest(url, callback) {
   const xhr = new XMLHttpRequest();
   xhr.open('GET', url);

   xhr.onload = function () {
      if (xhr.status !== 200) {
         write("Статус ответа: ", xhr.status);
      } else {
         const result = JSON.parse(xhr.response);
         
         callback(result);
      }
   };

   xhr.onerror = function () {
      outputSpan.innerHTML = `Ошибка! Статус ответа: ${xhr.status}`;
      console.log("Ошибка! Статус ответа: ", xhr.status);
   };

   xhr.send();
};

function loadImg(apiData) {
   let cards = String();

   apiData.forEach(item => {
      const cardBlock = `<div>
                           <img src="${item.download_url}"/>
                        </div>`;
      cards += cardBlock;
   });

   imgContainer.innerHTML = cards;
}
