// ^ HTML Elements
var pdt_name   = document.getElementById('pdt-name');
var pdt_name_erro = document.getElementById("error");
var pdt_cat    = document.getElementById('pdt-cat');
var pdt_price  = document.getElementById('pdt-price');
var pdt_des    = document.getElementById('pdt-des');
var pdt_img    = document.getElementById('pdt-img');
var pdt_search = document.getElementById('search-term');
var pdt_container = document.getElementById('preview-pdts');
var add_btn= document.getElementById('add')
var upadte_btn= document.getElementById('update')
//* Regex
 var nameproduct = /^[A-Za-z][a-z]{1,}( [a-z]{1,20})?$/;
 var desproduct = /^[a-z]{1,50}( [a-z]{0,20})?$/;

// & Prodcuts List
var Product_List= JSON.parse(localStorage.getItem('pdt')) || [] ;  //! if data not exist equal to empty array
Display_all_products(); 


 
// * Functions
//! validate input
function validate(){
    if(nameproduct.test(pdt_name.value)){
        pdt_name.classList.add("is-valid")
        pdt_name.classList.remove("is-invalid")
        pdt_name_erro.classList.add('d-none')

       
    }else{
        pdt_name.classList.add("is-invalid")
        pdt_name.classList.remove("is-valid")
        pdt_name_erro.classList.add('d-block')
        pdt_name_erro.classList.remove('d-none')

        
        
    }
   
}

function validate_des(){
    if (desproduct.test(pdt_des.value)){
        pdt_des.classList.add("is-valid")
        pdt_des.classList.remove("is-invalid")
        pdt_des.nextElementSibling.classList.add('d-none')
    }else{
        pdt_des.classList.add("is-invalid")
        pdt_des.classList.remove("is-valid")
        pdt_des.nextElementSibling.classList.remove('d-none')
    }
}
// ~ adding pdt and update the list of pdts update the local storage
 function adding_pdt(){ 
if(pdt_name.value !== "" && pdt_price.value !== "" ){
    
    var create_Product_obj= { 
        name: pdt_name.value, 
        cat:pdt_cat.value,
         price:pdt_price.value,
         des:pdt_des.value,
         img:"./imgs/"+ pdt_img.files[0].name
     };
     Product_List.push(create_Product_obj);                     //^ push to array
     localStorage.setItem('pdt',JSON.stringify(Product_List)); //^ update local storage
 
     //filling the HTML Preview 
     display_product(Product_List.length - 1)
     Clear_input();
     pdt_name.classList.remove('is-valid');
     pdt_des.classList.remove('is-valid')
}else{
    window.confirm('enter name , price');
}
   
   
 }


// ~ del pdt and update the list of pdts update the local storage
 function del_pdt(index){ 
    console.log('product No:  ' + index + '  (deleted)')

    //! delete from product list 
    Product_List.splice(index ,1); 

    //!update local storage 
    localStorage.setItem('pdt', JSON.stringify(Product_List));


    //! Empty HTML
    pdt_container.innerHTML= "" ;
    //! update HTML
    Display_all_products();
    
 }

 // ~ update pdt and update the list of pdts update the local storage

 function update_pdt(index){ 
  add_btn.classList.add('d-none')
    pdt_name.value=Product_List[index].name
    pdt_cat.value=Product_List[index].cat
    pdt_price.value=Product_List[index].price
    pdt_des.value=Product_List[index].des
    
    upadte_btn.classList.remove('d-none')
    // upadte_btn.classList.add('d-block')
  del_pdt(index)

 }

 //!del_Update()
 function del_Update(index){
    
    if(pdt_name.value !== "" && pdt_price.value !== "" ){
    
        var create_Product_obj= { 
            name: pdt_name.value, 
            cat:pdt_cat.value,
             price:pdt_price.value,
             des:pdt_des.value,
             img:"./imgs/"+ pdt_img.files[0].name
         };
         Product_List.push(create_Product_obj);                     //^ push to array
         localStorage.setItem('pdt',JSON.stringify(Product_List)); //^ update local storage
    
    pdt_container.innerHTML= ""; 
    Display_all_products()
    Clear_input();
    upadte_btn.classList.add('d-none')
    add_btn.classList.remove('d-none')

 }
 }
 // ~ display pdts 
 function display_product(index){ 
    var HTML_Preview_Product = `
     
                <div class="col-sm-6 col-md-4 col-lg-3 m-2 " >
                        <div class="inner ">
                            <img src="${Product_List[index].img}" alt="" id="img-product">

                            <div class="d-flex justify-content-between mt-2" id="Price_section">
                                <h2 class="h6" >${Product_List[index].name} </h2>
                                <span > <i class="fa-solid fa-tag"></i>   ${Product_List[index].price}$</span>
                            </div>
                            <div >
                            <p> <i class="fa-solid fa-list"></i>  ${Product_List[index].cat}</p>
                                <p><i class="fa-brands fa-product-hunt"></i>  ${Product_List[index].des}</p>

                            </div>
                            <hr>
                            <div class="btns d-flex   justify-content-center">
                                <button class="btn btn-outline-danger m-1 " onclick='del_pdt(${index})'>Delete</button>
                                <button class="btn btn-outline-primary m-1" onclick='update_pdt(${index})'>Update</button>
                            </div>
                        </div>
                
                    </div>
     
    `

    pdt_container.innerHTML += HTML_Preview_Product; 
 }
 // ~ search pdt and filter pdts and preview the new list 
 function search_pdt(){ 
    pdt_container.innerHTML=""; 
     
  
    for(i=0; i<Product_List.length; i++){
      
     
        if( Product_List[i].name.includes(pdt_search.value)){

            display_product(i); //preview only pdt full filled  the input 
        }
      
       
        

    }
 }

 // ~ load all products
function Display_all_products(){
    for (count=0; count<Product_List.length; count++){
        display_product(count);
    }
    
}


// ~ clear input
function Clear_input(){
   pdt_name.value="";
   pdt_des.value="";
   pdt_price.value="";
   pdt_img.value= null;
   pdt_cat.value="";
}



