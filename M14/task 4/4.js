const inputWidth = document.querySelector("#width");
const inputHeight = document.querySelector("#height");
const submitButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector(".container_photo");

submitButton.addEventListener("click", () => {
   const width = inputWidth.value;
   const height = inputHeight.value;

   if ((width < 100 || width > 300 || isNaN(width)) || (height < 100 || height > 300 || isNaN(height))) {
      outputSpan.innerHTML = "Одно из чисел вне диапазона от 100 до 300.";
      return;
   }

   fetch(`https://picsum.photos/${width}/${height}`)
       .then((response) => response.url)
       .then((result) => {
           loadPhoto(result);
       })
       .catch((reason) => {
         outputSpan.innerHTML = `Ошибка: ${reason}`;
         console.log("Ошибка: " + reason);
       });
});

function loadPhoto(photoUrl) {
   const cardBlock = `<img src="${photoUrl}"/>`;

   photosContainer.innerHTML = cardBlock;
}
