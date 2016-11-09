window.onload = function(){
	// Кнопки
	var quickAddBtn = document.getElementById('addButton'),
	    quickAddFormDiv = document.querySelector('.quickaddForm'),
	    cancelBtn = document.getElementById('Cancel'),
	    AddBtn = document.getElementById('Add'),
	// Поля формы
	    name = document.getElementById('name'),
	    phone = document.getElementById('phone'),
	    address = document.getElementById('address'),
	    email = document.getElementById('email'),
        items = document.querySelectorAll('fieldDis'),
	// Дивы
	    addBookDiv = document.querySelector('.addbook'),
        fields = addBookDiv.getElementsByTagName('input'),
        filter = document.getElementById('filterField');
   

	quickAddBtn.addEventListener("click", function(){
	//Отображает Add-форму
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);
    filter.addEventListener("input", searchNotes);
	addBookDiv.addEventListener("click", removeEntry);
    addBookDiv.addEventListener("click", editAttr);

	// Демо массив в хранилище
	var addressBook = [];

	localStorage['addbook'] = '[{"fullname":"Акимов В.А.","email":"fotvorkot@gmail.com","phone":"+79137454521","address":"Томск"},{"fullname":"Золотухин Илья","email":"zolotuhin_ii@bw-sw.com","phone":"undefined","address":"Томск"}]';

	function jsonStructure(name,phone,address,email){
		this.name = name;
		this.phone = phone;
		this.address = address;
		this.email = email;
	}

	function addToBook(){
		var isNull = name.value!='' || phone.value!='' || address.value!='' || email.value!='';
		if(isNull){
			var obj = new jsonStructure(name.value,phone.value,address.value,email.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showAddressBook();
		}
	}
//недобавлено сравнение по RegExp
//не решил как хочу отображать выборку, пока только бэкграунд
//срабатывает при 100% идентичности value
     function searchNotes(e){

         if(filter.value != null){
          var note = filter.value;
          var items = document.getElementsByClassName('fieldDis');
          for(var n of items){
            function nChar(value){
                for(var i of value){
                nChar = value.replace( /^[0-9a-zA-Z]+$/, '');
                return value.replace( /^[0-9a-zA-Z]+$/, '');
                }
            }
              
            var res = nChar(n.value);  
            
             if(res == note){
              
              n.style.backgroundColor="rgba(105, 189, 15, 0.55)"; 
          }
          else{
              
             n.style.backgroundColor="#fffbf5";  
          }
         }
        }
       }
      
    
 
   function removeEntry(e){
       
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
            if (confirm("УДАЛИТЬ ЗАПИСЬ ?")){
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();}
		}
	}
    
    
 //Edit функция, срабатывает по blur
//к JSON не подвязана   
    function editAttr(e){
        
        var focItem = e.target;
        var parrent = focItem.parentElement;
        
        focItem.onblur =  function() {
            
            this.setAttribute("readonly", true);
        }    
            focItem.onmousedown = function(){
            this.removeAttribute('readonly');
        }
    }
        
    

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}
//парсит строчный arrey JSON и вбивает в шаблон
	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			addBookDiv.innerHTML = '';
			for(var n in addressBook){
				var str = '<div class="entry">';
					str += '<div class="name"><input readonly class="fieldDis" type="text" value="'+ addressBook[n].name+'"></div>';
					str += '<div class="email"><input readonly class="fieldDis" type="text" value="'+ addressBook[n].email+'"></div>';
					str += '<div class="phone"><input readonly class="fieldDis" type="text" value="'+addressBook[n].phone +'"></div>';
					str += '<div class="address"><input readonly class="fieldDis" type="text" value="'+ addressBook[n].address +'"></div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '"></a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();
    
}
