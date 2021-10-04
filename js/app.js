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

			return [id,'plus',image,name,newPrice[0]];
		}

		// customer 'Add to cart' button clicked cart details save to localstorage
		function save_To_localstorage(item){
			if(localStorage.getItem(item[0])!=null){
				let secondClicked = localStorage.getItem(item[0]);
				// localStorage.getItem give key values as string.we need array here.so we use JSON.parse function to have array
				let actualData = JSON.parse(secondClicked);
				let qty = actualData[3];
				if(item[1]=="plus"){
					qty++;
				}else{
					qty--;
				}
				let data = JSON.stringify([actualData[0],actualData[1],actualData[2],qty]);
				localStorage.setItem(item[0],data);
				update_fontawesome_cart_icon();
			}else{
				let qty = 1;
				let customer_clicked_cart_array = [item[2],item[3],item[4],qty];
				// localStorage save item as key value pair. value is saved as string here.so in order to have array from localStorage.we need to convert array to string by stringify function
				let data = JSON.stringify(customer_clicked_cart_array);
				localStorage.setItem(item[0],data);
				update_fontawesome_cart_icon();
			}
		}

		function update_fontawesome_cart_icon(){
			let qty = 0;
			let total_cart_money = 0;
			let cart_item_arry = [];
			let count = 0;
			if(Object.keys(localStorage).length){
				let itemKeys = Object.keys(localStorage);
				$.each(itemKeys,function(key,value){
					let itemValues = localStorage.getItem(value);
					let items = JSON.parse(itemValues);
					total_cart_money += items[2]*items[3];
					cart_item_arry[count] = [value, items[0], items[1], items[2], items[3]];
					qty += items[3]; 
					count++;
				})
			}

			// ADD TOTAL QTY BUYER ADD TO CART ICON
			$('#num').text(qty);
			return [qty, total_cart_money, cart_item_arry];
		}

		function display_cart(){
			$('#mainappend').remove();
			let html = "";
			html += `<div id="mainappend">`;
			let cart_data = update_fontawesome_cart_icon();
			cart_data[2].forEach(function(item){
				html += `<div id="cartMiddle">
					<div id="imageNamePrice">
						<div id="cartImage">
							<img src="${item[1]}">
						</div>
						<div id="namePrice">
							<p>${item[2]}</p>
							<h3> $ ${item[3]} </h3>
							<button>Remove</button>
						</div>
					</div>
					<div id="fontAwesome" class="${[item[0], item[3]]}">
						<i class="fas fa-chevron-up"></i>
						<p id="cart_qty">${item[4]}</p>
						<i class="fas fa-chevron-down"></i>
					</div>
				</div>`
			});
			html += `<p id="total">Cart Total : $ <span>${cart_data[1]}</span></p>
			</div>`;
			return html;
		}

		let num = update_fontawesome_cart_icon();

		
		// WHEN USER REFRESH THE BROWSER
		$('#num').text(num[0]);

		const content = $(document.body);
		// WHEN USER CLICK UP ARROW
		content.on('click', '.fa-chevron-up',function(){
			let convertId = getId($(this));
			let dummyArray = [convertId[0],'plus'];
			save_To_localstorage(dummyArray);
			updateCart([$(this),'plus']);
		})

		function getId($btn){
			let id = $btn.parents('#fontAwesome').attr('class');
			let convertId = id.split(',');
			return convertId;
		}

		function updateCart($test){
			let cart_qty = $test[0].siblings('#cart_qty').text();
			if ($test[1]=="plus"){
				cart_qty++;
			}else{
				cart_qty--;
			}
			$test[0].siblings('#cart_qty').text(cart_qty);
		}

		content.on('click', '.fa-chevron-down', function(){
			let convertId = getId($(this));
			let dummyArray = [convertId[0],'minus'];
			save_To_localstorage(dummyArray);
			updateCart([$(this),'minus']);
		})

		// when customer click 'Add to cart' button
		$('.add_to_cart').on('click',function(){
			let itemDetails = cartDetails($(this));
			save_To_localstorage(itemDetails);
		})


		//when user click the close button
		$('#close').on('click',function(){
			$('#shopCart').css('transform','translateX(100%)');
		})

		//when user click cart icon
		$('#cartIcon').on('click',function(){
			$('#append').append(display_cart());
			$('#shopCart').css('transform','translateX(0%)')
		})