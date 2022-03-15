answers = document.querySelectorAll('input[type="radio"]:checked'); //returns nodelist
let answersarr = Array.prototype.slice.call(answers); //converts node list to an array
arr = [];

for (i in answersarr) {
  arr[i] = answersarr[i].value;
}

console.log(answersarr);
var ans = document.createElement("textarea"); //textarea for the answers
eof = document.getElementsByTagName("form")[4]; //gets the 3rd form for the exams

ans.name = "Answer";

eof.append(ans);

console.log(arr);
ans.innerText = JSON.stringify(arr);
// ans.setAttribute("hidden", true);

// trail doesnt effect the code
window.addEventListener("load", function () {
  var rad = document.getElementsByClassName("Answer");
  for (i in rad) var button = rad[i];
  button.addEventlistener("change", radio);
});

function radio(event) {
  let btn = event.target;
  console.log(btn);
}
