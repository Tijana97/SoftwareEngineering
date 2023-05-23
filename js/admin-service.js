let adminService = {
  init: function() {
    let token = localStorage.getItem('token');

    if (token) {
      window.location.replace('index.html');
    }

    $('#login-form').validate({
      submitHandler: function(form) {
        let login = Object.fromEntries((new FormData(form)).entries());
        adminService.login(login);
      }
    });
  },

  login: function(login) {
    $.ajax({
      url: 'rest/login',
      type: 'POST',
      data: JSON.stringify(login),
      contentType: 'application/json',
      dataType: 'json',
      success: function(result){
        localStorage.setItem('token', result.token);
        window.location.replace("index.html");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        toastr.error(XMLHttpRequest.responseJSON.message);
      }
    });
  },

  logout: function() {
    localStorage.clear();
    window.location.replace('login.html');
  }
}
