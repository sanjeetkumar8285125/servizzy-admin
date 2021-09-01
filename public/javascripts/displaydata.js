fetch("/javascripts/carsdata.json")
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
    let car;
    choose.addEventListener("change", () => {
      // add.createElement("option");
      // add.innerHTML = data.data[0].brandName;
      console.log(choose.value);
      model = choose.value;
      var temp = document.getElementById("brandname").value;
      car = data.data.find((x) => {
        return x.brandName === model;
      });
      //console.log(data.data);
      var select2 = document.getElementById("modelname");
      while (select2.firstChild) {
        select2.removeChild(select2.firstChild);
      }
      let option2 = document.createElement("option");
      option2.innerHTML = "--Select Model Name--";
      select2.appendChild(option2);
      for (var i = 0; i < car.models.length; i++) {
        option2 = document.createElement("option");
        option2.innerHTML = car.models[i].modelName;
        select2.appendChild(option2);
      }
    });

    add.addEventListener("change", () => {
      // add.createElement("option");
      // add.innerHTML = data.data[0].brandName;
      console.log(car);
      model = add.value;
      console.log(model);
      // var temp = document.getElementById("brandname").value;
      model = car.models.find((x) => {
        return x.modelName === model;
      });
      console.log(model);
      var select3 = document.getElementById("fueltype");
      while (select3.firstChild) {
        select3.removeChild(select3.firstChild);
      }
      let option2 = document.createElement("option");
      option2.innerHTML = "--Select Fuel Type--";
      select3.appendChild(option2);
      if (model.diesel) {
        option2 = document.createElement("option");
        option2.innerHTML = "Diesel";
        select3.appendChild(option2);
      }
      if (model.petrol) {
        let option2 = document.createElement("option");
        option2.innerHTML = "Petrol";
        select3.appendChild(option2);
      }

      // while (select2.firstChild) {
      //   select2.removeChild(select2.firstChild);
      // }
      // for (var i = 0; i < car.models.length; i++) {
      //   var option2 = document.createElement("option");
      //   option2.innerHTML = car.models[i].modelName;
      //   select2.appendChild(option2);
      // }
    });
  });
