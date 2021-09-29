// getting DOM value of Shopping cart by cartDetails function
		function cartDetails($btn){
			// getting cart id
			let id = $btn.parents('#mainCart').attr('class');

			// getting image path
			let image = $btn.parents('#mainCart').find('img').attr('src');

			// getting name of the product
			let name = $btn.parents('#mainCart').find('#itemName').text();

			// getting price of the item
			let price = $btn.parents('#mainCart').find('#price').text();
			let newPrice = price.split('/');

			return [id,image,name,newPrice[0]];
		}

		// customer 'Add to cart' button clicked cart details save to localstorage
		function save_To_localstorage(key,values){
			if(localStorage.getItem(key)!=null){
				let secondClicked = localStorage.getItem(key);
				// localStorage.getItem give key values as string.we need array here.so we use JSON.parse function to have array
				let actualData = JSON.parse(secondClicked);
				let qty = actualData[3];
				qty++;
				let data = JSON.stringify([actualData[0],actualData[1],actualData[2],qty]);
				localStorage.setItem(key,data);
				update_fontawesome_cart_icon();
			}else{
				let qty = 1;
				let customer_clicked_cart_array = [values[1],values[2],values[3],qty];

				// localStorage save item as key value pair. value is saved as string here.so in order to have array from localStorage.we need to convert array to string by stringify function
				let data = JSON.stringify(customer_clicked_cart_array);
				localStorage.setItem(key,data);
				update_fontawesome_cart_icon();
			}
		}

		function update_fontawesome_cart_icon(){
			let qty = 0;
			if(Object.keys(localStorage).length){
				let itemKeys = Object.keys(localStorage);
				$.each(itemKeys,function(key,value){
					let itemValues = localStorage.getItem(value);
					let items = JSON.parse(itemValues);
					qty += items[3]; 
				})
			}

			// ADD TOTAL QTY BUYER ADD TO CART ICON
			$('#num').text(qty);
			return qty;
		}

		let num = update_fontawesome_cart_icon();

		// WHEN USER REFRESH THE BROWSER
		$('#num').text(num);

		// when customer click 'Add to cart' button
		$('.add_to_cart').on('click',function(){
			let itemDetails = cartDetails($(this));
			save_To_localstorage(itemDetails[0],itemDetails);
		})


		//when user click the close button
		$('#close').on('click',function(){
			$('#shopCart').css('transform','translateX(100%)');
		})

		//when user click cart icon
		$('#cartIcon').on('click',function(){
			$('#shopCart').css('transform','translateX(0%)')
		})