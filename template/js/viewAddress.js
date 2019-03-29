$(document).ready(function() {
   var url = '../../router.php/address/',
        viewAddress = $('#view-address');

    //// Show ADDRESS data in the view/address
    function loadAddressView() {

        $.ajax({
            type: 'GET',
            url: url,
            contentType: 'application/json',
            dataType: 'json',
            success: function(response){
                insertContentAddress(response);
            },
            error: function(error) {
                alert( "Wystąpił błąd");
            }
        })
    }
    loadAddressView();

    // ADDRESS VIEW 
    // Create table element to put data from database inside
    // Do action (edit, delete) on data in table
    function insertContentAddress(address) {
        $.each(address, function() {
            var tr = $('<tr>'),
                tdId = $('<td>', {class: "id"}),
                tdCity = $('<td>', {class: "city"}),
                tdCode = $('<td>', {class: "code"}),
                tdStreet = $('<td>', {class: "street"}),
                tdFlat = $('<td>', {class: "flat"}),
                tdAction = $('<td>', {class: "action"}),
                actionDelete = $('<button>', {class: "delete-btn"}).text('Usuń'),
                actionEdit = $('<button>', {class: "edit-btn"}).text('Edytuj'),
                actionForm = $('<form>', {class: "edit-form hide"}),
                inputCity = $('<input>', {name: "city", id: "city"}),
                inputCode = $('<input>', {name: "code", id: "code"}),
                inputStreet = $('<input>', {name: "street", id: "street"}),
                inputFlat = $('<input>', {name: "flat", id: "flat"}),
                inputSubmit = $('<input>', {type: "submit"});

            // Create table element
            tr.append(tdId);
            tr.append(tdCity);
            tr.append(tdCode);
            tr.append(tdStreet);
            tr.append(tdFlat);
            tr.append(tdAction);
            tdAction.append(actionDelete);
            tdAction.append(actionEdit);
            tdAction.append(actionForm);
            actionForm.append(inputCity);
            actionForm.append(inputCode);
            actionForm.append(inputStreet);
            actionForm.append(inputFlat);
            actionForm.append(inputSubmit);

            // Show data from database in table
            viewAddress.append(tr);
            tdId.text(this.id);
            tdCity.text(this.city);
            tdCode.text(this.code);
            tdStreet.text(this.street);
            tdFlat.text(this.flat);
            tdAction.text(this.action);
        })

        // ACTION - Edit ADDRESS data
        viewAddress.on('click', '.edit-btn', function(){
        
            var editForm = $(this).next('form');
            var edit = $(this).next('form').find('input[type=submit]');

            editForm.toggleClass('hide');

            var id = $(this).parent().parent().find('td[class=id]').text();
            var cityValue = $(this).parent().parent().find('td[class=city]').text();
            var codeValue = $(this).parent().parent().find('td[class=code]').text();
            var streetValue = $(this).parent().parent().find('td[class=street]').text();
            var flatValue = $(this).parent().parent().find('td[class=flat]').text();
            
            editForm.children('input[name=city]').val(cityValue);
            editForm.children('input[name=code]').val(codeValue);
            editForm.children('input[name=street]').val(streetValue);
            editForm.children('input[name=flat]').val(flatValue);

            
            edit.on('click', function(e){
                e.preventDefault();

                var city = $(this).siblings('#city').val();
                var code = $(this).siblings('#code').val();
                var street = $(this).siblings('#street').val();
                var flat = $(this).siblings('#flat').val();

                $.ajax({
                    type: "PUT",
                    url: url,
                    data: {
                        id: id,
                        city: city,
                        code: code,
                        street: street,
                        flat: flat
                    },
                    success: function(response) {
                        alert('Adres został zaktualizowany');
                        location.reload();
                    },
                    error: function(error) {
                        alert( "Wystąpił błąd");
                    }
                });
            })
        })

        // ACTION - Delete ADDRESS data
        viewAddress.on('click', '.delete-btn', function(e){
            e.preventDefault();
        
            var id = $(this).parent().parent().find('td[class=id]').text();
            
            $.ajax({
                type: "DELETE",
                url: url,
                data: {
                    id: id
                },
                
                success: function(response) {
                    alert('Adres został usunięty');
                    location.reload();
                }    
            });
           
        })
    }
});