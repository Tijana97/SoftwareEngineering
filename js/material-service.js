let html="";
let materialService = {
  init: function() {
    $('#addMaterialForm').validate({
      submitHandler: function(form) {
        let material = Object.fromEntries((new FormData(form)).entries());
        materialService.add(material);
      }
    });  //JQUERY VALIDATION
    materialService.list();
  },

  list: function() {
    $.ajax({
      url: 'rest/material',
      type: 'GET',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        $('#material-list').html('');
        html = '';
        html += `<div class="dropdown" style="margin-top:20px; float:left;">
                  <button class="btn btn-secondary dropdown-toggle" 
                  style=" border-radius:solid; border-color:black;" 
                  type="button" id="dropdownMenuButton1" 
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Filter material
                  </button>
                  <div style="float:right;">
                    <button type="button" class="btn btn-secondary" 
                    style="border-radius:solid; border-color:black" 
                    onclick="materialService.showColorLength()">
                    Show total length</button>
                  </div>
                  <ul class="dropdown-menu" 
                  aria-labelledby="dropdownMenuButton1">
                  <li><option class="dropdown-item" 
                  onclick="materialService.sortByBrandAscending()">
                  Brand ascending</option></li>
                  <li><option class="dropdown-item" 
                  onclick="materialService.sortByBrandDescending()">
                  Brand descending</option></li>
                  <li><option class="dropdown-item" 
                  onclick="materialService.sortByTypeAscending()">
                  Type ascending</option></li>
                  <li><option class="dropdown-item" 
                  onclick="materialService.sortByTypeDescending()">
                  Type descending</option></li>
                  <li><option class="dropdown-item" 
                  onclick="materialService.sortByLengthAscending()">
                  Length ascending</option></li>
                  <li><option class="dropdown-item" 
                  onclick="materialService.sortByLengthDescending()">
                  Length descending</option></li>
                  </ul>
                </div>
                `;
        for (let i = 0; i < data.length; i++) {
          html += `
          <div class="col-lg-3" style="padding:15px">
              <div class="card" style="border-radius:solid;border-color:black">
                <div class="card-body">
                  <h5 class="card-title" style="padding:50px; 
                  background-color:`+data[i].color_name+`; 
                  color:white;text-shadow: -1px -1px 0 #000, 1px -1px 0 #000,
                   -1px 1px 0 #000, 1px 1px 0 #000; text-align:center">`
                   + data[i].type_name +`</h5>
                  <p>
                    <p style="margin-bottom:0px">
                    Brand: `+ data[i].brand_name +`</p>
                    <p style="margin-bottom:0px">
                    Color: `+ data[i].color_name +`</p>
                    <p style="margin-bottom:0px">
                    Length: `+ data[i].length +`</p>
                    <p>Available: `+ data[i].available +`</p>
                    <button type="button" 
                    class="btn btn-primary material-button" 
                    onclick="materialService.get(`+data[i].id+`)">
                      Edit material
                    </button>
                    <button type="button" 
                    class="btn btn-danger material-button-delete" 
                    onclick="showModalDelete(`+data[i].id+`)">
                      Delete material
                    </button>
                  </p>
                </div>
              </div>
            </div>`;
        }
        html += `<button style="margin: 15px" type="button" 
        class="btn btn-success" data-bs-toggle="modal" 
        data-bs-target="#exampleModal3"">
          Add material
        </button>`;
        $('#material-list').html(html);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
      }
    });
  },

  listSearchedMaterial: function(name) {
    html = '';
    $('#material-list').html('');
    html += `
        <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" 
        style="width: 5rem; height: 5rem; margin-top:100px" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    `;
    $('#material-list').html(html);
    $.ajax({
      url: 'rest/search/' + name,
      type: 'GET',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        setTimeout(function() {
          $('#material-list').html('');
          html = '';
          html += `
          <form class="d-flex">
            <button class="btn btn-warning" type="button" 
            style="margin-top:20px" 
            onclick="materialService.list()">Reset search</button>
          </form>`;
          for (let i = 0; i < data.length; i++){
            html += `
            <div class="col-lg-3" style="padding:15px">
                <div class="card" 
                style="border-radius:solid;border-color:black">
                  <div class="card-body">
                    <h5 class="card-title" style="padding:50px; 
                    background-color:` + data[i].color_name + `;
                    color:white;text-shadow: -1px -1px 0 #000, 1px -1px 0 #000,
                     -1px 1px 0 #000, 1px 1px 0 #000; 
                     text-align:center">` + data[i].type_name + `</h5>
                    <p>
                      <p style="margin-bottom:0px">Brand: 
                      ` + data[i].brand_name + `</p>
                      <p style="margin-bottom:0px">Length: 
                      ` + data[i].length + `</p>
                      <p>Available: ` + data[i].available + `</p>
                      <button type="button" 
                      class="btn btn-primary material-button" 
                      onclick="materialService.get(` + data[i].id + `)">
                        Edit material
                      </button>
                      <button type="button" 
                      class="btn btn-danger material-button-delete" 
                      onclick="showModalDelete(` + data[i].id + `)">
                        Delete material
                      </button>
                    </p>
                  </div>
                </div>
              </div>`;
          }
          $('#material-list').html(html);
        },400);
      },
    });
  },

  get: function(id) {
    $('.material-button').attr('disabled', true);
    $('.material-button-delete').attr('disabled', true);


    $.ajax({
      url: 'rest/material/' + id,
      type: 'GET',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {

        let options = '';
        for (let i = 0; i < data.colors.length; i++){
          options +=`<option value="${data.colors[i].id}">${data.colors[i].name}
          </option>`
        }
        $('#color_id').html(options);

        let options2 = '';
        for (let i = 0; i < data.types.length; i++){
          options2 += `<option value="${data.types[i].id}">${data.types[i].name}
          </option>`
        }
        $('#type_id').html(options2);

        let options3 = '';
        for (let i = 0; i < data.brands.length; i++){
          options3 +=`<option value="${data.brands[i].id}">${data.brands[i].name}
          </option>`
        }
        $("#brand_id").html(options3);

        $('#brand_id option[value="' + data.brand_id + '"]').prop('selected', true);
        $('#type_id option[value="' + data.type_id + '"]').prop('selected', true);
        $("#id").val(data.id);
        $("#length").val(data.length);
        $("#available").val(data.available);
        $('#color_id option[value="' + data.color_id + '"]').prop('selected', true);
        $("#exampleModal").modal("show");
        $('.material-button').attr('disabled', false);
        $('.material-button-delete').attr('disabled', false);
      },
    });
  },

  update: function() {
    $('.save-material-button').attr('disabled', true);
    let material={};
    material.brand_id=$('#brand_id').val();
    material.type_id=$('#type_id').val();
    material.color_id=$('#color_id').val();
    material.length=$('#length').val();
    material.available=$('#available').val();

    $.ajax({
      url: 'rest/material/' + $('#id').val(),
      type: 'PUT',
      data: JSON.stringify(material),
      contentType: 'application/json',
      dataType: "json",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {
        toastr.success("Material updated!");
        $("#exampleModal").modal("hide");
        $('.save-material-button').attr('disabled', false);
        $("#material-list").html('<div class="d-flex justify-content-center">' +
          '<div class="spinner-border text-primary" ' +
          'style="width : 5rem ; height : 5rem;" role="status"> ' +
          '<span class="sr-only"></span>  </div></div>');
        materialService.list();
      }
    });
  },

  add: function(material) {
    let temp=document.getElementById("select-color").value;
    let temp2=document.getElementById("select-type").value;
    let temp3=document.getElementById("select-brand").value;
    let colorName=$("#select-color").children("option").filter(":selected").
    text();
    let typeName =
    $("#select-type").children("option").filter(":selected").text();
    let brandName =
    $("#select-brand").children("option").filter(":selected").text();
    $.ajax({
      url: "rest/material",
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        let isFound = false;
        for (let i = 0; i < data.length; i++){

          if (colorName == data[i].color_name 
            && typeName == data[i].type_name && brandName == data[i].brand_name)
            {
            toastr.error("Cannot add the same material!");
            isFound = true;
            break;
          }
        }
        if (isFound==false) {
          $.ajax({
            url: 'rest/material',
            type: 'POST',
            data: JSON.stringify({...material,
              color_id:temp,type_id:temp2,brand_id:temp3}),
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function(xhr) {
              xhr.setRequestHeader('Authorization', 
              localStorage.getItem('token'));
            },
            success: function(result) {
              toastr.success("Material added!");
              $("#exampleModal3").modal("hide");
              $("#material-list").html(
                '<div class="d-flex justify-content-center">' +
                  '<div class="spinner-border text-primary" ' +
                  'style="width : 5rem ; height : 5rem;" role="status"> ' +
                  '<span class="sr-only"></span>  </div></div>');
              materialService.list();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              toastr.error(XMLHttpRequest.responseJSON.message);
            }
          });
        }
      },
    });
  },
  delete: function(id) {
    $('.delete-material-button').attr('disabled', true);

    $.ajax({
      url: 'rest/material/' + $('#id-delete-modal').val(),
      type: 'DELETE',
      contentType: 'application/json',
      dataType: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(result) {
        toastr.success("Material deleted!");
        $("#exampleModal2").modal("hide");
        $('.delete-material-button').attr('disabled', false);
        $("#material-list").html('<div class="d-flex justify-content-center">' +
          '<div class="spinner-border text-primary" style="width : 5rem ; ' +
          'height : 5rem;" role="status"> <span class="sr-only"></span> ' +
          ' </div></div>');
        materialService.list();
      }
    });
  },

  sortByTypeAscending: function() {
    let type = 'type_name';
    let order = 'ASC';
    materialService.executeFilter(type, order);
  },

  sortByLengthAscending: function() {
    let type = 'material.length';
    let order = 'ASC';
    materialService.executeFilter(type, order);
  },

  sortByLengthDescending: function() {
    let type = 'material.length';
    let order = 'DESC';
    materialService.executeFilter(type, order);
  },

  sortByBrandAscending: function() {
    let type = 'brand_name';
    let order = 'ASC';
    materialService.executeFilter(type, order);
  },

  sortByBrandDescending: function() {
    let type = 'brand_name';
    let order = 'DESC';
    materialService.executeFilter(type, order);
  },

  sortByTypeDescending: function() {
    let type = 'type_name';
    let order = 'DESC';
    materialService.executeFilter(type, order);
  },

  executeFilter: function(type, order) {
    html = '';
    $('#material-list').html('');
    html += `
        <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" 
        style="width: 5rem; height: 5rem; margin-top:100px" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    `;
    $('#material-list').html(html);
    $.ajax({
      url: 'rest/filter/' + type + '/' + order,
      type: 'GET',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        setTimeout(function() {$('#material-list').html('');
        html = '';
        html += `
          <div style="float:left">
            <div class="dropdown" style="margin-top:20px; float:left;">
              <button class="btn btn-secondary dropdown-toggle" 
              style=" border-radius:solid; border-color:black;" 
              type="button" id="dropdownMenuButton1" 
              data-bs-toggle="dropdown" aria-expanded="false">
              Filter material
              </button>
              <ul class="dropdown-menu" 
              aria-labelledby="dropdownMenuButton1">
              <li><option class="dropdown-item" 
              onclick="materialService.sortByBrandAscending()">
              Brand ascending</option></li>
              <li><option class="dropdown-item" 
              onclick="materialService.sortByBrandDescending()">
              Brand descending</option></li>
              <li><option class="dropdown-item" 
              onclick="materialService.sortByTypeAscending()">
              Type ascending</option></li>
              <li><option class="dropdown-item" 
              onclick="materialService.sortByTypeDescending()">
              Type descending</option></li>
              <li><option class="dropdown-item" 
              onclick="materialService.sortByLengthAscending()">
              Length ascending</option></li>
              <li><option class="dropdown-item" 
              onclick="materialService.sortByLengthDescending()">
              Length descending</option></li>
              </ul>
            </div>
            <div style="float:left">
              <form class="d-flex">
                <button class="btn btn-warning" type="button" 
                style="margin-top:20px; margin-left:10px" 
                onclick="materialService.list()">Reset search</button>
              </form>
            </div>
          </div>`;
        for (let i = 0; i < data.length; i++) {
          html += `
          <div class="col-lg-3" style="padding:15px">
            <div class="card" style="border-radius:solid;border-color:black">
              <div class="card-body">
                <h5 class="card-title" style="padding:50px; 
                background-color:`+data[i].color_name+`;
                color:white;text-shadow: -1px -1px 0 #000, 1px -1px 0 #000,
                  -1px 1px 0 #000, 1px 1px 0 #000; text-align:center">
                  `+ data[i].type_name +`</h5>
                <p>
                  <p style="margin-bottom:0px">Brand:
                    `+ data[i].brand_name +`</p>
                  <p style="margin-bottom:0px">Length:
                    `+ data[i].length +`</p>
                  <p>Available: `+ data[i].available +`</p>
                  <button type="button" 
                  class="btn btn-primary material-button" 
                  onclick="materialService.get(`+data[i].id+`)">
                    Edit material
                  </button>
                  <button type="button" 
                  class="btn btn-danger material-button-delete" 
                  onclick="showModalDelete(`+data[i].id+`)">
                    Delete material
                  </button>
                </p>
              </div>
            </div>
          </div>`;
        }
        $('#material-list').html(html);},400);
      },
    });
  },

  showColorLength: function() {
    html = '';
    $('#material-list').html('');
    html += `
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" 
          style="width: 5rem; height: 5rem; margin-top:100px" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    `;
    $('#material-list').html(html);
    $.ajax({
      url: 'rest/length',
      type: 'GET',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        setTimeout(function() {
          $('#material-list').html('');
          html = '';
          html += `
          <div style="float:left">
            <form class="d-flex">
              <button class="btn btn-warning" type="button" 
              style="margin-top:20px;" 
              onclick="materialService.list()">Home</button>
              <button class="btn btn-success" type="button" 
              style="margin-top:20px; margin-left:10px" 
              onclick="materialService.pieChart()">Chart version</button>
            </form>
          </div>`;
          html += `
          <table class="table table-dark table-striped" 
          style="margin-top: 20px">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Color</th>
              <th scope="col">Length</th>
            </tr>
            </thead>
            <tbody>
          `;
          for (let i = 0; i < data.length; i++){
            number = i + 1;
            html += `
              <tr>
                <th scope="row">` + number + `</th>
                <td>` + data[i].color_name + `</td>
                <td>` + data[i].sum_length + `</td>
              </tr>
            `;
          }
          html += `
          </tbody>
          </table>
          `;
          $('#material-list').html(html);
        }, 400);
      },
    });
  },
  pieChart: function() {
    $.ajax({
      url: 'rest/length',
      type: 'GET',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function(data) {
        html = '';
        $('#material-list').html('');
        html += `
        <div style="float:left">
          <form class="d-flex">
            <button class="btn btn-warning" type="button" 
            style="margin-top:20px; margin-bottom: 10px;" 
            onclick="materialService.list()">Home</button>
          </form>
        </div>`;
        html += `
          <head>
          <script type="text/javascript">
          google.charts.load('current', {'packages':['corechart']});
          google.charts.setOnLoadCallback(drawChart);

          function drawChart() {

            let data = google.visualization.arrayToDataTable([
              ['Task', 'Hours per Day'],
              `;
              for (let i = 0; i < data.length; i++){
                html += `
                  ['` + data[i].color_name + `', ` + data[i].sum_length + `],
                `;
              }
              html += `
            ]);

            let options = {
              title: 'Percentage of all colors'
            };

            let chart = new google.visualization.
            PieChart(document.getElementById('piechart'));

            chart.draw(data, options);
          }
          </script>
          </head>
          <body>
          <div id="piechart" style="width: 100vw; height: 80vh;"></div>
          </body>
        `;
        $('#material-list').html(html);
      },
    });
  }
}
