fetch("/js/carsdata.json")
  .then((response) => response.json())
  .then((data) => {
    var select = document.getElementById("brandname");
    for (var i = 0; i < data.data.length; i++) {
      var option = document.createElement("option");
      option.innerHTML = data.data[i].brandName;
      select.appendChild(option);
    }
    let choose = document.getElementById("brandname");
    let add = document.getElementById("modelname");
    var model = "";
    choose.addEventListener("change", () => {
      // add.createElement("option");
      // add.innerHTML = data.data[0].brandName;
      console.log(choose.value);
      model = choose.value;
      var temp = document.getElementById("brandname").value;
      const car = data.data.find((x) => {
        return x.brandName === model;
      });
      //console.log(data.data);
      var select2 = document.getElementById("modelname");
      while (select2.firstChild) {
        select2.removeChild(select2.firstChild);
      }
      for (var i = 0; i < car.models.length; i++) {
        var option2 = document.createElement("option");
        option2.innerHTML = car.models[i].modelName;
        select2.appendChild(option2);
      }
    });
  });
