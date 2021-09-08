function appendRow(){
  var d= document.getElementById("div")
  var b=document.createElement(  `
  <div class="form-row">
  <div class="form-group col-md-6">
      <label for="serviceDate">Service Date</label>
      <input
        type="date"
        class="form-control"
        name="serviceDate"
      />
    </div>
    <div class="form-group col-md-6">
      <label for="serviceType">Service Type</label>
      <input
        type="text"
        class="form-control"
        name="serviceType"
      />
    </div>
    </div>`)
  
}