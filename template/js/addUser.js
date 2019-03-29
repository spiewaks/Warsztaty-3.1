$(document).ready(function() {

    var urlUser = '../../router.php/user/',
        urlAddress = '../../router.php/address/';

    // Functions which get data address from the other class
    var optionAddress = $('#address_option');

    function showAddressOption(address) {
        $.each(address, function(){
            var option = $('<option>');
                
            optionAddress.append(option);
            option.text(this.city + ' ' + this.code + ', ' + this.street + ' ' + this.flat);
            option.attr('data-id', this.id);
        })
    }

    /// Show available data address in select input to add a new User
    /// Send request to address class to get full list with addresses
    function loadDataToAddUser() {

        $.ajax({
            type: 'GET',
            url: urlAddress,
            contentType: 'application/json',
            dataType: 'json',
            success: function(response){
                showAddressOption(response);
            },
            error: function(error) {
                alert( "Wystąpił błąd");
            }
        })
    }
    loadDataToAddUser();

    // Send new USER to database
    $('#add-user input[type=submit]').on('click', function(event) {
    	event.preventDefault();
        var address = $('#add-user #address_option option:selected').attr('data-id'),
        	name = $('#add-user #name').val(),
        	surname = $('#add-user #surname').val(),
        	credits = $('#add-user #credits').val(),
        	pass = $('#add-user #pass').val();
        	
        $.ajax({
            type: 'POST',
            url: urlUser,
            data: {
                address_id: address,
                name: name,
                surname: surname,
                credits: credits,
                pass: pass
        	},
            success: function(response) {
                alert('Dodano użytownika');
                $('#address_option').val('');
                $('#name').val('');
                $('#surname').val('');
                $('#credits').val('');
                $('#pass').val('');
            },
            error: function(error) {
                alert( "Wystąpił błąd");
            }
        });
    });
});