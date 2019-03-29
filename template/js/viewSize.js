$(document).ready(function() {

	var url = '../../router.php/size/',
		viewSize = $('#view-size');

	//// Show SIZE data in the view/size
    function loadSizeView() {

		$.ajax({
			type: 'GET',
			url: url,
			contentType: 'application/json',
			dataType: 'json',
			success: function(response){
				insertContentSize(response);
			},
		    error: function(xhr, status, error) {
//                        var err = eval("(" + xhr.responseText + ")");
                        console.log(xhr);
                      }
		})
	}
	loadSizeView();

	 // SIZE
    // Create table element to put database inside
	// Do action (edit, delete) on data in table
    function insertContentSize(size) {
    	$.each(size, function(){
    		var tr = $('<tr>'),
				tdId = $('<td>', {class: "id"}),
				tdSize = $('<td>', {class: "size"}),
				tdPrice = $('<td>', {class: "price"}),
				tdAction = $('<td>', {class: "action"}),
				actionDelete = $('<button>', {class: "delete-btn"}).text('Usuń'),
				actionEdit = $('<button>', {class: "edit-btn"}).text('Edytuj'),
				actionForm = $('<form>', {class: "edit-form hide"}),
				inputSize = $('<input>', {name: "size", id: "size"}),
				inputPrice = $('<input>', {name: "price", id: "price"}),
				inputSubmit = $('<input>', {type: "submit"});

			// Create table element
			tr.append(tdId);
			tr.append(tdSize);
			tr.append(tdPrice);
			tr.append(tdAction);
			tdAction.append(actionDelete);
			tdAction.append(actionEdit);
			tdAction.append(actionForm);
			actionForm.append(inputSize);
			actionForm.append(inputPrice);
			actionForm.append(inputSubmit);

			// Show data from database in table
			viewSize.append(tr);
			tdId.text(this.id);
			tdSize.text(this.size);
			tdPrice.text(this.price);
			tdAction.text(this.action);
    	})
    	// ACTION - Edit SIZE data
    	viewSize.on('click', '.edit-btn', function(){
		
			var editForm = $(this).next('form');
			var edit = $(this).next('form').find('input[type=submit]');

			editForm.toggleClass('hide');

			var id = $(this).parent().parent().find('td[class=id]').text();
			var sizeValue = $(this).parent().parent().find('td[class=size]').text();
			var priceValue = $(this).parent().parent().find('td[class=price]').text();
			
			editForm.children('input[name=size]').val(sizeValue);
			editForm.children('input[name=price]').val(priceValue);
			
			edit.on('click', function(e){
				e.preventDefault();

				var size = $(this).siblings('#size').val();
				var price = $(this).siblings('#price').val();

				$.ajax({
	                type: "PUT",
	                url: url,
	                data: {
	                	id: id,
						size: size,
						price: price
	                },
	                success: function(response) {
	                    alert('Rozmiar został zaktualizowany');
	                    location.reload();
	                },
	                error: function(error) {
                		alert( "Wystąpił błąd");
            		}
	            });
			})
		})

		// ACTION - Delete SIZE data
		viewSize.on('click', '.delete-btn', function(e){
			e.preventDefault();
		
			var id = $(this).parent().parent().find('td[class=id]').text();
			$.ajax({
                type: "DELETE",
                url: url,
                data: {
                    id: id
                },
                
                success: function(response) {
                    location.reload();
                    alert('Rozmiar zostanie usunięty');
                }    
            });
	       
		})
    }
});