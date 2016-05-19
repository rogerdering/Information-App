$(document).ready(function() {
  $('#ajax').keyup(function() {
    setTimeout(function() {
      var data = {
        search: $( '#ajax' ).val()
      }
      $.post('/api', data, function(result) {
        var lastVariableEver = result.filter(function(elem, pos) {
          return result.indexOf(elem) == pos;
        }); 

        $('#json-datalist').empty()

        var usersOption = ''
        for (var m = 0; m < lastVariableEver.length; m++) {
          usersOption += '<option value="'+lastVariableEver[m]+'" />'
        }
        $('#json-datalist').append(usersOption)
      })
    }, 300)
  })
})