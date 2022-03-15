// random key generator
function rand() {
  let id = localStorage.getItem("AdminID");
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  console.log("random text " + text);
  return id + text;
}

export default {
  rand,
};
//   let rand = document.getElementById("examkey");
//   rand.value = text;
// }
