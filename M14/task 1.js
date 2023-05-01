
const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

let result = {
   list: []
};

xmlDOM.querySelectorAll("student").forEach((element) => {
   let student = new Object();
   const firstNameNode = element.querySelector("first");
   const secondNameNode = element.querySelector("second");
   const ageNode = element.querySelector("age");
   const profNode = element.querySelector("prof");
   const nameNode = element.querySelector("name");
   const nameLang = nameNode.getAttribute("lang");
   student.name = firstNameNode.textContent + ' ' + secondNameNode.textContent;
   student.age = ageNode.textContent;
   student.prof = profNode.textContent;
   student.lang = nameLang;
   result.list.push(student);
});

console.log(result);