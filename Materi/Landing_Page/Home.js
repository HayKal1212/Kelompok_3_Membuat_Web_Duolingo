/**  FUNCTION LOADERS **/
var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 5000);
}

function showPage() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
/****/

document
  .querySelector(".inviting-button")
  .addEventListener("click", function () {
    this.classList.remove("pulse");
  });

/** FUNCTION NAV-TOGGLE **/

function toggleMenu() {
  document.body.classList.toggle("open");
}
