


//Fetching the data

async function fetching()
{
try{
  const resolve= await  fetch('http://localhost:3000/employees')
  const data= await resolve.json();

  // console.log(data);
  displaytotable(data)


}
catch(error){
  console.log(error);
}
}

fetching();

// fetching().then(data => {
//   console.log(data); // Log the fetched data
// })
// .catch(error => {
//   console.log(error);
// });

function displaytotable(data){


  const tbody=document.getElementById("tbody");
  let list=``;
  let i=0;
  data.forEach(e => {
    list+=`<tr>
    <td scope="row">#${i+1}</td>
    <td>${data[i].salutation}. ${data[i].firstName} ${data[i].lastName}</td>
    <td>${data[i].email}</td>
    <td>${data[i].phone}</td>
    <td>${data[i].gender}</td>
    <td>${data[i].dob}</td>
    <td>${data[i].country}</td>
    <td>
      <div class="dropdown">
        <button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item view_Details" href="profilepage.html" target="_blank"><i class="fa-solid fa-eye"></i> View Details</a></li>
          <li><a class="dropdown-item edit" onclick=edit_employe_open() href="#"><i class="fa-regular fa-pen-to-square"></i>Edit</a></li>
          <li><a class="dropdown-item delet" onclick=dele_dialog_open() href="#"> <i class="fa-solid fa-trash"></i> Delete</a></li>
        </ul>
      </div>
    
    </td>
  </tr>`
i++;
  tbody.innerHTML=list;
  
  });
}


//displaying and hidding for add employee form

const add_Employe_Form=document.querySelector(".add_Employe_Form");
const overlay=document.querySelector(".overlay");
const addemployebtn=document.querySelector(".addemployebtn");
const add_employe_closebtn=document.querySelector(".add_employe_closebtn");
const add_emply_cancel_btn=document.querySelector(".add_emply_cancel_btn");
const form_add_btn=document.querySelector(".form_add_btn");
// function to display the add_emplye_form

const openaddemploye=function(){
  add_Employe_Form.classList.remove("hidden");
  overlay.classList.remove("hidden");

}
addemployebtn.addEventListener("click",openaddemploye);


form_add_btn.addEventListener("click", addemplytotable);

const salutation=document.getElementById("salutation")
const first_name=document.getElementById("f-name");
const last_name=document.getElementById("l-name");
const email=document.getElementById("e-mail");
const mob_no=document.getElementById("mob-no");
const dateofbirth=document.getElementById("dateofbirth");
const maleradio=document.getElementById("inlineRadio1");
const femaleradio=document.getElementById("inlineRadio2");
const address=document.getElementById("add-ress");
const country=document.getElementById("country");
const state=document.getElementById("state");
const city=document.getElementById("c-ity");
const qualification=document.getElementById("quali-fication");
// const pincode=document.getElementById("pin-code");
const username=document.getElementById("user-name");
const password=document.getElementById("pass-word");



function dob(dateofbirth){

  let db=dateofbirth.split("-");
  let year=db[0];
  let month=db[1];
  let day=db[2];

  let dateformat=day+'-'+month+'-'+year;

  return dateformat;

}



function addemplytotable(){


  
  let emply={

    salutation:salutation.value,
    firstName:first_name.value,
    lastName:last_name.value,
    email:email.value,
    phone:mob_no.value,
    dob:dob(dateofbirth.value),
    gender:(maleradio.checked==true) ? 'Male' : 'Female',
    qualifications:qualification.value,
    address:address.value,
    city:city.value,
    state:state.value,
    country:country.value,
    username:username.value,
    password:password.value,
    
  };

  fetch("http://localhost:3000/employees",{
  
  method: "POST",
  headers: { "Content-type": "application/json" },
  body: JSON.stringify(emply),
})


}



// .then((response) => response.json())
// .then((json) => console.log(json));












// function to hide the add_emplye_form
const closeaddemploye=function(){

  add_Employe_Form.classList.add("hidden");
  overlay.classList.add("hidden");

}

add_employe_closebtn.addEventListener("click",closeaddemploye);
add_emply_cancel_btn.addEventListener("click", closeaddemploye);
overlay.addEventListener("click",closeaddemploye);


document.addEventListener("keydown",(e) => {
  if(e.key==="Escape" && !add_Employe_Form.classList.contains("hidden")){
    closeaddemploye();

  }
});





//displaying and hidding for Edit employee form

const edit_Employe_Form=document.querySelector(".edit_Employe_Form");
const edt=document.querySelector(".edit");
const edit_Employ_close_btn=document.querySelector(".edit_Employ_close_btn")
const edit_Employ_cancel_btn=document.querySelector(".edit_Employ_cancel_btn")

// function to display the edit_emplye_form

const edit_employe_open=function(){
  // console.log("sdasd");

  edit_Employe_Form.classList.remove("hidden");
  overlay.classList.remove("hidden");
  

}
edt.addEventListener("click",edit_employe_open);
// console.log("sc");


// function to hide the edit_emplye_form

const edit_employe_close=function(){

  edit_Employe_Form.classList.add("hidden");
  overlay.classList.add("hidden");

}

edit_Employ_close_btn.addEventListener("click",edit_employe_close);
edit_Employ_cancel_btn.addEventListener("click",edit_employe_close);
overlay.addEventListener("click",edit_employe_close);


document.addEventListener("keydown",(e) => {

  if(e.key==="Escape" && !edit_Employe_Form.classList.contains("hidden")){

    edit_employe_close();

  }
});




// displaying and hidding for delete employee form

const delete_template_form=document.querySelector(".delete_template_form");
const delet=document.querySelector(".delet");
const delet_close_btn=document.querySelector(".delet_close_btn");
const delet_cancel_btn=document.querySelector(".delet_cancel_btn")

// function to display delete_dialogue box

const dele_dialog_open=function(){

  delete_template_form.classList.remove("hidden");
  overlay.classList.remove("hidden"); 

}
// delet.addEventListener("click",dele_dialog_open);


// function to hide delete_dialogue box

const dele_dialog_close=function(){
  
  delete_template_form.classList.add("hidden");
  overlay.classList.add("hidden");
}

delet_close_btn.addEventListener("click",dele_dialog_close);
delet_cancel_btn.addEventListener("click",dele_dialog_close)
overlay.addEventListener("click",dele_dialog_close);


document.addEventListener("keydown",(e) => {
  if(e.key==="Escape" && ! delete_template_form.classList.contains("hidden")){
    dele_dialog_close();

  }
});


// add_Employe_Form.addEventListener("click", (e) => {
//   e.preventDefault();
//   formvalidation();
// });


// let formvalidation= () => {

//   if(first_name.value==="")
//   {
//     fname_err.innerHTML="mandatory";
//     console.log("failure");
//   }
//   else{
//     console.log("success");
//     fname_err.innerHTML="";
//   }
 

//   if(last_name.value==="")
//   {
//     lname_err.innerHTML="mandatory";
//     console.log("failure");
//   }
//   else{
//     console.log("success");
//     lname_err.innerHTML="";
//   }


//   if(email.value==="")
//   {
//     email_err.innerHTML="mandatory";
//     console.log("failure");
//   }
//   else{
//     console.log("success");
//     email_err.innerHTML="";
//   }

//   if(Mob_no.value==="")
//   {
//     Mob_no_err.innerHTML="mandatory";
//     console.log("failure");
//   }
//   else{
//     console.log("success");
//     mob_no_err.innerHTML="";
//   }



// }




