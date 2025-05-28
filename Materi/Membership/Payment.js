// Simple form formatting
document.getElementById("card-number").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\s+/g, "");
  if (value.length > 0) {
    value = value.match(new RegExp(".{1,4}", "g")).join(" ");
  }
  e.target.value = value;
});

document.getElementById("expiry-date").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D+/g, "");
  if (value.length > 2) {
    value = value.substring(0, 2) + "/" + value.substring(2, 4);
  }
  e.target.value = value;
});
