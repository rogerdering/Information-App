console.log("I am loaded")
function getUsers() {
    var url, usersOption;
    url = './users.json';

    $.getJSON(url, function(data) {
        $(data.osUsers).each(function() {
            usersOption = "<option value=\"" + this.firstname + "\">" + this.lastname + "</option>";
            $('#json-datalist').append(usersOption);
        });
    });
}