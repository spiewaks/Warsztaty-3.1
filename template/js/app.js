$(document).ready(function() {
	var editForm = $('.edit-form'),
		viewAddress = $('#view-address'),
		viewSize = $('#view-size'),
		viewUser = $('#view-user'),
		viewParcel = $('#view-parcel');



	/////////////////////////////////  SHOW DATA  ////////////////////////////////////////

	//// Show ADDRESS data in the view/address
	function loadAddressView() {

		$.ajax({
			type: 'GET',
			url: '../../router.php/address/',
			contentType: 'application/json',
			dataType: 'json',
			success: function(response){
				insertContentAddress(response);
			},
		    error: function(error) {
            	alert( "Wystąpił błąd");
            	console.log(error);
            }
		})
	}
	loadAddressView();

	//// Show SIZE data in the view/size
    function loadSizeView() {

		$.ajax({
			type: 'GET',
			url: '../../router.php/size/',
			contentType: 'application/json',
			dataType: 'json',
			success: function(response){
				insertContentSize(response);
			},
		    error: function(error) {
            	alert( "Wystąpił błąd");
            	console.log(error);
            }
		})
	}
	loadSizeView();

	//// Show USER data in the view/user
    function loadUserView() {

		$.ajax({
			type: 'GET',
			url: '../../router.php/user/',
			contentType: 'application/json',
			dataType: 'json',
			success: function(response){
				insertContentUser(response);
			},
		    error: function(error) {
            	alert( "Wystąpił błąd");
            	console.log(error);
            }
		})
	}
	loadUserView();

	//// Show PARCEL data in the view/parcel
    function loadParcelView() {

		$.ajax({
			type: 'GET',
			url: '../../router.php/parcel/',
			contentType: 'application/json',
			dataType: 'json',
			success: function(response){
				insertContentParcel(response);
			},
		    error: function(error) {
            	alert( "Wystąpił błąd");
            	console.log(error);
            }
		})
	}
	loadParcelView();
	
	/// Show available data in select input to add a new Parcel
	function loadDataToAddParcel() {

		$.ajax({
			type: 'GET',
			url: '../../router.php/address/',
			contentType: 'application/json',
			dataType: 'json',
			success: function(response){
				showAddressOption(response);
			},
		    error: function(error) {
            	alert( "Wystąpił błąd");
            	console.log(error);
            }
		})

		$.ajax({
			type: 'GET',
			url: '../../router.php/user/',
			contentType: 'application/json',
			dataType: 'json',
			success: function(response){
				showUserOption(response);
			},
		    error: function(error) {
            	alert( "Wystąpił błąd");
            	console.log(error);
            }
		})

		$.ajax({
			type: 'GET',
			url: '../../router.php/size/',
			contentType: 'application/json',
			dataType: 'json',
			success: function(response){
				showSizeOption(response);
			},
		    error: function(error) {
            	alert( "Wystąpił błąd");
            	console.log(error);
            }
		})
	}
	loadDataToAddParcel();

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
	                url: '../../router.php/address',
	                // contentType: "application/json",
	                data: {
	                	id: id,
						city: city,
						code: code,
						street: street,
						flat: flat
	                },
	                success: function(response) {
	                    console.log(response);
	                    alert('Adres został zaktualizowany');
	                    location.reload();
	                },
	                error: function(error) {
                		alert( "Wystąpił błąd");
                		console.log(error);
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
                url: '../../router.php/address/',
                // contentType: "application/json",
                data: {
                    id: id
                },
                
                success: function(response) {
                    console.log(response);
                    location.reload();
                    alert('Adres został usunięty');
                }    
            });
	       
		})
	}

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
	                url: '../../router.php/size',
	                // contentType: "application/json",
	                data: {
	                	id: id,
						size: size,
						price: price
	                },
	                success: function(response) {
	                    console.log(response);
	                    alert('Rozmiar został zaktualizowany');
	                    location.reload();
	                },
	                error: function(error) {
                		alert( "Wystąpił błąd");
                		console.log(error);
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
                url: '../../router.php/size/',
                // contentType: "application/json",
                data: {
                    id: id
                },
                
                success: function(response) {
                    console.log(response);
                    location.reload();
                    alert('Rozmiar zostanie usunięty');
                }    
            });
	       
		})
    }

    // USER
    // Create table element to put data from db 
	// Do action (edit, delete) on data in table
    function insertContentUser(user) {
    	$.each(user, function(){
    		var tr = $('<tr>'),
				tdId = $('<td>', {class: "id"}),
				tdAddress = $('<td>', {class: "address"}),
				tdName = $('<td>', {class: "name"}),
				tdSurname = $('<td>', {class: "surname"}),
				tdCredits = $('<td>', {class: "credits"}),
				tdAction = $('<td>', {class: "action"}),
				addressName = $('<p>', {class: "address_p"}),
				actionDelete = $('<button>', {class: "delete-btn"}).text('Usuń'),
				actionEdit = $('<button>', {class: "edit-btn"}).text('Edytuj'),
				actionForm = $('<form>', {class: "edit-form hide"}),
				inputAddress = $('<input>', {name: "address", id: "address"}),
				inputName = $('<input>', {name: "name", id: "name"}),
				inputSurname = $('<input>', {name: "surname", id: "surname"}),
				inputCredits = $('<input>', {name: "credits", id: "credits"}),
				inputSubmit = $('<input>', {type: "submit"});

			// Create table element
			tr.append(tdId);
			tr.append(tdAddress);
			tr.append(tdName);
			tr.append(tdSurname);
			tr.append(tdCredits);
			tr.append(tdAction);
			tdAddress.append(addressName);
			tdAction.append(actionDelete);
			tdAction.append(actionEdit);
			tdAction.append(actionForm);
			actionForm.append(inputAddress);
			actionForm.append(inputName);
			actionForm.append(inputSurname);
			actionForm.append(inputCredits);
			actionForm.append(inputSubmit);
			viewUser.append(tr);

		    function insertAddress(address) {
		    	$.each(address, function() {
		    		addressName.text(address.city + ' ' + address.code + ' ' +  address.street + ' ' + address.flat);
		    	})
		    }

			var id = this.address_id;
			var url = '../../router.php/address/';

			// Show address from database ADDRESS in table
			$.ajax({
				type: 'GET',
				url: url + id,
				contentType: 'application/json',
				dataType: 'json',
				success: function(response){
					insertAddress(response);
				},
			    error: function(error) {
	            	alert( "Wystąpił błąd");
	            	console.log(error);
	            }
			})
			
			// Show content from database - USER
			tdId.text(this.id);
			tdName.text(this.name);
			tdSurname.text(this.surname);
			tdCredits.text(this.credits);
			tdAction.text(this.action);
    	})
    	// Edit USER data
    	viewUser.on('click', '.edit-btn', function(){
		
			var editForm = $(this).next('form');
			var edit = $(this).next('form').find('input[type=submit]');

			editForm.toggleClass('hide');

			var id = $(this).parent().parent().find('td[class=id]').text();
			var addressValue = $(this).parent().parent().find('td[class=address]').text();
			var nameValue = $(this).parent().parent().find('td[class=name]').text();
			var surnameValue = $(this).parent().parent().find('td[class=surname]').text();
			var creditsValue = $(this).parent().parent().find('td[class=credits]').text();
			
			editForm.children('input[name=address]').val(addressValue);
			editForm.children('input[name=name]').val(nameValue);
			editForm.children('input[name=surname]').val(surnameValue);
			editForm.children('input[name=credits]').val(creditsValue);
			
			edit.on('click', function(e){
				e.preventDefault();

				var address = $(this).siblings('#address').val();
				var name = $(this).siblings('#name').val();
				var surname = $(this).siblings('#surname').val();
				var credits = $(this).siblings('#credits').val();

				$.ajax({
	                type: "PUT",
	                url: '../../router.php/user',
	                // contentType: "application/json",
	                data: {
	                	id: id,
						address_id: address,
						name: name,
						surname: surname,
						credits: credits,

	                },
	                success: function(response) {
	                    console.log(response);
	                    alert('Dane zostaną zaktualizowane');
	                    location.reload();
	                },
	                error: function(error) {
                		alert( "Wystąpił błąd");
                		console.log(error);
            		}
	            });
			})
		})

		// Delete USER data
		viewUser.on('click', '.delete-btn', function(e){
			e.preventDefault();
		
			var id = $(this).parent().parent().find('td[class=id]').text();

			$.ajax({
                type: "DELETE",
                url: '../../router.php/user/',
                // contentType: "application/json",
                data: {
                    id: id
                },
                success: function(response) {
                    console.log(response);
                    location.reload();
                    alert('Użytkownik zostanie usunięty');
                }    
            });
	       
		})
    }

    // PARCEL
    // Create table element to put data from db 
	// Do action (edit, delete) on data in table
    function insertContentParcel(parcel) {
    	$.each(parcel, function(){
    		var tr = $('<tr>'),
				tdId = $('<td>', {class: "id"}),
				tdAddress = $('<td>', {class: "address"}),
				tdName = $('<td>', {class: "name"}),
				tdSize = $('<td>', {class: "size"}),
				tdPrice = $('<td>', {class: "price"}),
				tdAction = $('<td>', {class: "action"}),
				// addressName = $('<p>', {class: "address_p"}),
				actionDelete = $('<button>', {class: "delete-btn"}).text('Usuń'),
				actionEdit = $('<button>', {class: "edit-btn"}).text('Edytuj'),
				actionForm = $('<form>', {class: "edit-form hide"}),
				inputAddress = $('<input>', {name: "address", id: "address"}),
				inputName = $('<input>', {name: "name", id: "name"}),
				inputSize = $('<input>', {name: "size", id: "size"}),
				inputPrice = $('<input>', {name: "price", id: "price"}),
				inputSubmit = $('<input>', {type: "submit"});

			// Create table element
			tr.append(tdId);
			tr.append(tdAddress);
			tr.append(tdName);
			tr.append(tdSize);
			tr.append(tdPrice);
			tr.append(tdAction);
			tdAction.append(actionDelete);
			tdAction.append(actionEdit);
			tdAction.append(actionForm);
			actionForm.append(inputAddress);
			actionForm.append(inputName);
			actionForm.append(inputSize);
			actionForm.append(inputPrice);
			actionForm.append(inputSubmit);
			viewParcel.append(tr);

			// Insert proper address
		    function insertAddress(address) {
		    	$.each(address, function() {
		    		tdAddress.text(address.city + ' ' + address.code + ', ' +  address.street + ' ' + address.flat);
		    	})
		    }

			var addressId = this.address_id;
			var url = '../../router.php/address/';

			// Show data from database ADDRESS in table
			$.ajax({
				type: 'GET',
				url: url + addressId,
				contentType: 'application/json',
				dataType: 'json',
				success: function(response){
					console.log(response);
					insertAddress(response);
				},
			    error: function(error) {
	            	alert( "Wystąpił błąd");
	            	console.log(error);
	            }
			})

			// Insert proper name
			function insertName(user) {
		    	$.each(user, function() {
		    		tdName.text(user.name + ' ' + user.surname);
		    	})
		    }

			var userId = this.user_id;
			var url = '../../router.php/user/';

			// Show data from database USER in table
			$.ajax({
				type: 'GET',
				url: url + userId,
				contentType: 'application/json',
				dataType: 'json',
				success: function(response){
					insertName(response);
				},
			    error: function(error) {
	            	alert( "Wystąpił błąd");
	            	console.log(error);
	            }
			})

			// Insert proper size and price
			function insertSize(size) {
		    	$.each(size, function() {
		    		tdSize.text(size.size);
		    		tdPrice.text(size.price);
		    	})
		    }

			var sizeId = this.size_id;
			var url = '../../router.php/size/';

			// Show data from database SIZE in table
			$.ajax({
				type: 'GET',
				url: url + sizeId,
				contentType: 'application/json',
				dataType: 'json',
				success: function(response){
					insertSize(response);
				},
			    error: function(error) {
	            	alert( "Wystąpił błąd");
	            	console.log(error);
	            }
			})
			tdId.text(this.id);
    	})
    	// Edit PARCEL data 
    	// Doesn't work properly
    	viewParcel.on('click', '.edit-btn', function(){
		
			var editForm = $(this).next('form');
			var edit = $(this).next('form').find('input[type=submit]');

			editForm.toggleClass('hide');

			var id = $(this).parent().parent().find('td[class=id]').text();
			var addressValue = $(this).parent().parent().find('td[class=address]').text();
			var nameValue = $(this).parent().parent().find('td[class=name]').text();
			var sizeValue = $(this).parent().parent().find('td[class=size]').text();
			var priceValue = $(this).parent().parent().find('td[class=price]').text();
			
			editForm.children('input[name=address]').val(addressValue);
			editForm.children('input[name=name]').val(nameValue);
			editForm.children('input[name=size]').val(sizeValue);
			editForm.children('input[name=price]').val(priceValue);
			
			edit.on('click', function(e){
				e.preventDefault();

				var address = $(this).siblings('#address').val();
				var name = $(this).siblings('#name').val();
				var size = $(this).siblings('#size').val();
				var price = $(this).siblings('#price').val();

				$.ajax({
	                type: "PUT",
	                url: '../../router.php/parcel',
	                // contentType: "application/json",
	                data: {
	                	id: id,
						address_id: address,
						name: name,
						size: size,
						price: price,

	                },
	                success: function(response) {
	                    console.log(response);
	                    alert('Dane zostaną zaktualizowane');
	                    location.reload();
	                },
	                error: function(error) {
                		alert( "Wystąpił błąd");
                		console.log(error);
            		}
	            });
			})
		})

		// Delete PARCEL data
		viewParcel.on('click', '.delete-btn', function(e){
			e.preventDefault();
		
			var id = $(this).parent().parent().find('td[class=id]').text();
			
			$.ajax({
                type: "DELETE",
                url: '../../router.php/parcel/',
                // contentType: "application/json",
                data: {
                    id: id
                },
                success: function(response) {
                    console.log(response);
                    location.reload();
                    alert('Użytkownik zostanie usunięty');
                }    
            });
	       
		})
    }

    // Show select option in add/parcel
 
    var optionAddress = $('#address_option'),
    	optionUser = $('#user_option'),
    	optionSize = $('#size_option');

    function showAddressOption(address) {
    	$.each(address, function(){
    		var option = $('<option>');
				
    		optionAddress.append(option);
    		option.text(this.city + ' ' + this.code + ', ' + this.street + ' ' + this.flat);
    		option.attr('data-id', this.id);
		})
    }
	
	 function showUserOption(user) {
    	$.each(user, function(){
    		var option = $('<option>');
				
    		optionUser.append(option);
    		option.text(this.name + ' ' + this.surname);
    		option.attr('data-id', this.id);
		})
    }

     function showSizeOption(size) {
    	$.each(size, function(){
    		var option = $('<option>');
				
    		optionSize.append(option);
    		option.text(this.size);
    		option.attr('data-id', this.id);
		})
    }
	
	/////////////////////////////////////// SENDING DATA TO DATABASE /////////////////////////////////////

	// Send new BOX to database
    $('#add-box input[type=submit]').on('click', function(event) {
    	event.preventDefault();
        var address = $('#add-box #address').val(),
        	size = $('#add-box #size').val();
        	
        $.ajax({
            type: 'POST',
            url: '../../router.php/box/',
     		// contentType: "application/json",
            data: {
                address_id: address,
                size_id: size
        	},
            success: function(response) {
            	console.log(response);
                alert('Dodano nową paczkę');
                $('#address').val('');
                $('#size').val('');
            },
            error: function(error) {
                alert( "Wystąpił błąd");
                console.log(error);
            }
        });
    });

    // Send new SIZE to database
	$('#add-size input[type=submit]').on('click', function(event) {
    	event.preventDefault();
        var price = $('#add-size #price').val(),
        	size = $('#add-size #size').val();
        	
        $.ajax({
            type: 'POST',
            url: '../../router.php/size/',
     		// contentType: "application/json",
            data: {
                size: size,
                price: price
        	},
            success: function(response) {
            	console.log(response);
                alert('Dodano nowy rozmiar paczki');
                $('#price').val('');
                $('#size').val('');
            },
            error: function(error) {
                alert( "Wystąpił błąd");
                console.log(error);
            }
        });
    });

    // Send new ADDRESS to database
    $('#add-address input[type=submit]').on('click', function(event) {
    	event.preventDefault();
        var city = $('#add-address #city').val(),
        	code = $('#add-address #code').val(),
        	street = $('#add-address #street').val(),
        	flat = $('#add-address #flat').val();
        	
        $.ajax({
            type: 'POST',
            url: '../../router.php/address/',
     		// contentType: "application/json",
            data: {
                city: city + '',
                code: code + '',
                street: street + '',
                flat: flat + ''
        	},
            success: function(response) {
            	console.log(response);
                alert('Dodano nowy adres');
                $('#city').val('');
                $('#code').val('');
                $('#street').val('');
                $('#flat').val('');
            },
            error: function(error) {
                alert( "Wystąpił błąd");
                console.log(error);
            }
        });
    });

    // Send new PARCEL to database
    $('#add-parcel input[type=submit]').on('click', function(event) {
    	event.preventDefault();
        var address = $('#address_option option:selected').attr('data-id'),
        	user = $('#user_option option:selected').attr('data-id'),
        	size = $('#size_option option:selected').attr('data-id');
        	
        $.ajax({
            type: 'POST',
            url: '../../router.php/parcel/',
     		// contentType: "application/json",
            data: {
                address_id: address,
                user_id: user,
                size_id: size
        	},
            success: function(response) {
            	console.log(response);
                alert('Dodano nową paczkę');
                $('#address_option').val('');
                $('#user_option').val('');
                $('#size_option').val('');
            },
            error: function(error) {
                alert( "Wystąpił błąd");
                console.log(error);
            }
        });
    });

    // Send new USER to database
    $('#add-user input[type=submit]').on('click', function(event) {
    	event.preventDefault();
        var address = $('#add-user #address').val(),
        	name = $('#add-user #name').val(),
        	surname = $('#add-user #surname').val(),
        	credits = $('#add-user #credits').val(),
        	pass = $('#add-user #pass').val();
        	
        $.ajax({
            type: 'POST',
            url: '../../router.php/user/',
     		// contentType: "application/json",
            data: {
                address_id: address,
                name: name,
                surname: surname,
                credits: credits,
                pass: pass
        	},
            success: function(response) {
            	console.log(response);
                alert('Dodano użytownika');
                $('#address').val('');
                $('#name').val('');
                $('#surname').val('');
                $('#credits').val('');
                $('#pass').val('');
            },
            error: function(error) {
                alert( "Wystąpił błąd");
                console.log(error);
            }
        });
    });
});