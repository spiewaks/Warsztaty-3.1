$(document).ready(function() {

    var url = '../../router.php/address/';

	// Send new ADDRESS to database
    $('#add-address input[type=submit]').on('click', function(event) {
    	event.preventDefault();
        var city = $('#add-address #city').val(),
        	code = $('#add-address #code').val(),
        	street = $('#add-address #street').val(),
        	flat = $('#add-address #flat').val();
        	
        $.ajax({
            type: 'POST',
            url: url,
            data: {
                city: city + '',
                code: code + '',
                street: street + '',
                flat: flat + ''
        	},
            success: function(response) {
                alert('Dodano nowy adres');
                $('#city').val('');
                $('#code').val('');
                $('#street').val('');
                $('#flat').val('');
            },
            error: function(error) {
                alert( "Wystąpił błąd");
            }
        });
    });

});