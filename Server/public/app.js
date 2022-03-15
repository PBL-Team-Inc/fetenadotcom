{
  async function updtbl(root) {
    root
      .querySelector(".tbl_refresh_opt_btn")
      .classList.add("tbl_refresh_refreshing"); //can be ommited only useful for the css

    const tbl = root.querySelector(".tbl_refresh_table");

    //make request to retrieve json
    const response = await fetch(root.dataset.url); //is equal to  "/data"
    const data = await response.json();

    console.log(data[0].FirstName);
    tbl.querySelector("thead tr").innerHTML = "";
    tbl.querySelector("tbody").innerHTML = ""; //clears the exising table if any

    //POPULATE HEADERS
    headerA = [
      "UserId",
      "Fname",
      "Lname",
      "Email",
      "DoB",
      "CreatedOn",
      "Password",
      "CC",
      "Phno",
      "Created On",
    ];
    for (const header of headerA) {
      tbl
        .querySelector("thead tr")
        .insertAdjacentHTML("beforeend", `<th>${header}</th>`);
    }
    //populate body
    data.forEach((data1) => {
      // for (const body of data1)
      tbl.querySelector("tbody").insertAdjacentHTML(
        "beforeend", //alternative is "afterbegin" places items in reverse order
        `
            <tr>
            <td>${data1.UserID}</td><td>${data1.FirstName}</td><td>${data1.LastName}</td><td>${data1.Email}</td>
            <td>${data1.DoB}</td><td>${data1.Password}</td><td>${data1.CountryCode}</td>
            <td>${data1.PhoneNumber}</td><td>${data1.CreatedOn}</td>
            </tr>`
      );
    });
  }

  for (const root of document.querySelectorAll(".table_refresh[data-url]")) {
    const tbl = document.createElement("table");
    const opt = document.createElement("div");

    tbl.classList.add("tbl_refresh_table");
    opt.classList.add("tbl_refresh_opt");

    tbl.innerHTML = `
   <thead>
   <tr>
   <td>
Head
   </td>
   </tr> 
   </thead> 

   <tbody>
   <tr>
   <td>
   loading...
   </td>
   <tr>
   </tbody>
  `;

    opt.innerHTML = `<span class="tbl_refresh_opt_label">Last updated: never</span>

  <button type="button" class="tbl_refresh_opt_btn">Refresh </buttton>
  `;
    root.append(tbl, opt);

    opt.querySelector(".tbl_refresh_opt_btn").addEventListener("click", () => {
      updtbl(root);
    });
    updtbl(root);
  }
}
