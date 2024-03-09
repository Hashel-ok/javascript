


//Fetching the data

// const { response } = require("express");


let tabledata=[];
async function fetching()
{
try{
  const resolve= await fetch('http://localhost:3000/employees')

  // if(!resolve.ok){
  //   throw new error(`errr ${responnse.status} ` );
  // }
  const data= await resolve.json();

  tabledata=data;

  // console.log(data);
  displaytotable(tabledata);



}
catch(error){
  console.log(`eror not found ${error}`);
}
}


fetching();

let k = 1;

const tbody=document.getElementById("tbody");

function displaytotable(data){


  let list=``;
  let i=data.length-1;
  // let k = 1;
  data.forEach(e => {
    list+=`<tr>
    <td scope="row">#${k}</td>
    <td><img src="http://localhost:3000/employees/${data[i].id}/avatar" height="30px" width="30px" style="border-radius: 50%"> ${data[i].salutation}. ${data[i].firstName} ${data[i].lastName}</td>
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
          <li><a class="dropdown-item view_Details" href="profilepage.html?id=${data[i].id}" target="_blank"><i class="fa-solid fa-eye"></i> View Details</a></li>
          <li><a class="dropdown-item edit" onclick=editemployeeform('${data[i].id}') href="#"><i class="fa-regular fa-pen-to-square"></i>Edit</a></li>
          <li><a class="dropdown-item delet" onclick=deletetable('${data[i].id}') ('${k}') href="#"> <i class="fa-solid fa-trash"></i> Delete</a></li>
        </ul>
      </div>
    
    </td>
  </tr>`
i--;
k++;
  tbody.innerHTML=list;
  // console.log(i);
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



// function to push the data to the API


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
const pincode=document.getElementById("pin-code");
const username=document.getElementById("user-name");
const password=document.getElementById("pass-word");
const errorMsg = document.getElementsByClassName("error_msg");


// for showing and uploading the profile pic to add employee form.

let inputfile=document.getElementById("input-file");
let profilepic=document.getElementById("profilepic");

  
inputfile.onchange=function(){

  profilepic.src=URL.createObjectURL(inputfile.files[0]);

}


function dob(dateofbirth){

  let db=dateofbirth.split("-");
  let year=db[0];
  let month=db[1];
  let day=db[2];

  let dateformat=day+'-'+month+'-'+year;

  return dateformat;

}



async function addemplytotable(){

 
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
    pincode:pincode.value
    
  };
  try {
    const response= await fetch("http://localhost:3000/employees",{
  
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(emply),
  })
  


  if(!response.ok) {
    throw new Error ( `error found ${response.status}`);
  }

  const resposne_data= await response.json();
  console.log("sdds",resposne_data);

  const sid = resposne_data.id;
  const avatarFile = inputfile.files[0];

  const formData = new FormData();
      formData.append("avatar", avatarFile);

    await fetch(`http://localhost:3000/employees/${sid}/avatar`,{
         method: "POST",
         body: formData,
      });


  tabledata.push(emply);
  emply.id=sid;
  displaytotable(tabledata);
  closeaddemploye();
  add_Employe_Form.reset();
  profilepic.src="Av/profile.png";
 
  
  }
  
  catch (error) {
    console.error("form canot be empty", error);
  }
 


}




form_add_btn.addEventListener("click", (e)=> {

 
e.preventDefault();


 validation();
  
  addemplytotable();

  // displaytotable();
  
  // fetching();

  console.log("sucess")
});




function validation()

{

 
  const validateInput = (input, serial, msg) => {
    if(input.value.trim() === ""){
      errorMsg[serial].innerHTML = msg;
    } 
    else {
     errorMsg[serial].innerHTML = "";
     }
    
  }
  
  const validatePhoneno=(input,serial,msg) => {

    let mobnovalue=input.value.trim();
  
    if(mobnovalue==="")
    {
      errorMsg[serial].innerHTML = msg;
    }
  
    else if((mobnovalue.length)!= 10)
    {
  
      errorMsg[serial].innerHTML ="Invalid phone no";
    }
    else{
      errorMsg[serial].innerHTML ="";
    }
  
  }
  
  
  const validateEmail=(input,serial,msg) => 
  {
      let emailvalue=input.value.trim();
      let emailregex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if(emailvalue==="")
    {
      errorMsg[serial].innerHTML = msg;
    }
  
    else if(!(emailvalue.match(emailregex)))
    {
      errorMsg[serial].innerHTML="Invalid Email";
    }
  
  else{
    errorMsg[serial].innerHTML="";
  }
  }
  
  
  const validateGender= (msg) => {
  
  if(!maleradio.checked==true && !femaleradio.checked==true )
  {
    errorMsg[6].innerHTML=msg;
  }
  else{
    errorMsg[6].innerHTML="";
  }
  
  }
  
  //add employe validateinput

  validateInput(salutation, 0, "Please select salutation");
  validateInput(first_name, 1, "Please enter first Name");
  validateInput(last_name, 2, "Please enter last Name");
  validateEmail(email, 3, "Please enter email");
  validatePhoneno(mob_no, 4, "Please enter phone no");
  validateInput(dateofbirth, 5, "Please select dateofbirth");
  validateGender("Please select the Gender");
  validateInput(username, 7, "Please enter username");
  validateInput(password, 8, "Please enter password");
  validateInput(qualification, 9, "Please enter qualifications");
  validateInput(address, 10, "Please enter address");
  validateInput(country, 11, "Please select country");
  validateInput(state, 12, "Please select state");
  validateInput(city, 13, "please enter city");
  validateInput(pincode, 14, "please enter pincode");





//add employe validation removal

salutation.addEventListener("input",() => remove_validation_error(0));
first_name.addEventListener("input",() => remove_validation_error(1))
last_name.addEventListener("input", () => remove_validation_error(2))
email.addEventListener("input",() => remove_validation_error(3));
mob_no.addEventListener("input",() => remove_validation_error(4));
dateofbirth.addEventListener("input",() => remove_validation_error(5));
maleradio.addEventListener("input",() => remove_validation_error(6));
femaleradio.addEventListener("input",() => remove_validation_error(6));
username.addEventListener("input",() => remove_validation_error(7));
password.addEventListener("input",() => remove_validation_error(8));
qualification.addEventListener("input",() => remove_validation_error(9));
address.addEventListener("input",() => remove_validation_error(10));
country.addEventListener("input",() => remove_validation_error(11));
state.addEventListener("input",() => remove_validation_error(12));
city.addEventListener("input",() => remove_validation_error(13));
pincode.addEventListener("input",() => remove_validation_error(14));



function remove_validation_error(serial) 

{

    errorMsg[serial].innerHTML="";
}


}









// EDIT Viewing  and updating.... 


const edit_select=document.getElementById("edit_Select");
const edit_fname=document.getElementById("edit_fname");
const edit_lname=document.getElementById("edit_lname");
const edit_mobno=document.getElementById("edit_mobno");
const edit_email=document.getElementById("edit_email");
const edit_dateofbirth=document.getElementById("edit_dateofbirth");
const edit_maleradio=document.getElementById("edit_inlineRadio1");
const edit_femaleradio=document.getElementById("edit_inlineRadio2");
const edit_address=document.getElementById("edit_address");
const edit_country=document.getElementById("edit_country");
const edit_state=document.getElementById("edit_state");
const edit_city=document.getElementById("edit_city");
const edit_pincode=document.getElementById("edit_pincode");
const edit_image=document.getElementById("edit_image");
const edit_username=document.getElementById("edit_username");
const edit_password=document.getElementById("edit_password");
const edit_qualification=document.getElementById("edit_qualification");
const save_btn=document.getElementById("save-btn");
const change_btn=document.getElementsByClassName("change_btn");
const edit_upload=document.getElementById("edit_upload");
const edt_image=document.getElementById("edit_image");
const edit_EmployeForm=document.getElementsByClassName("edit_Employe_Form");

//previewing image while uploading


edit_upload.onchange=function()
{

edt_image.src=URL.createObjectURL(edit_upload.files[0]);
}



// function for updating the edit form
function edit_dob(dateofbirth){

  let db=dateofbirth.split("-");
  
  let year=db[0];
  let month=db[1];
  let day=db[2];
  
  let dateformat=day+'-'+month+'-'+year;
  
  return dateformat;
  }
  
  




async function editemployeeform(id){

  
edit_employe_open();


try{
  const response= await fetch(`http://localhost:3000/employees/${id}`,{
  method:"GET",

})
if(!(response.ok)){
  throw new Error(`response not there ${response.status}`);
}

const data=await response.json();

console.log(data);



edit_select.value=data.salutation;
edit_fname.value=data.firstName;
edit_lname.value=data.lastName;
edit_dateofbirth.value=editdob(data.dob);
gender(data.gender);
edit_username.value=data.username;
edit_password.value=data.password;
edit_qualification.value=data.qualifications;
edit_mobno.value=data.phone;
edit_email.value=data.email;
edit_address.value=data.address;
edit_country.value=data.country;
edit_state.value=data.state;
edit_city.value=data.city;
edit_pincode.value=data.pincode;


function editdob(data){

  let db=data.split("-");
  let year=db[2];
  let month=db[0];
  let day=db[1];

  let dateformat=year+'-'+day+'-'+month;

return dateformat;

}

function gender(data)
{

  if(data==="Male")
  {
  edit_maleradio.checked=true;

  }

  else{
  edit_femaleradio.checked=true;
  }


}

edit_image.src=(`http://localhost:3000/employees/${id}/avatar`) // for previewing  the image during edit.

}
catch(error){

  console.log(`edit form error`,error);

}




save_btn.addEventListener("click", (e) => {

  e.preventDefault();
 
  editvalidation();
  editemplychange(id);
   
 });



}




async function editemplychange(id)
{


  let newemply= {

    salutation:edit_select.value,
    firstName:edit_fname.value,
    lastName:edit_lname.value,
    email:edit_email.value,
    phone:edit_mobno.value,
    dob:edit_dob(edit_dateofbirth.value),
    gender:(edit_maleradio.checked==true) ? 'Male' : 'Female',
    qualifications:edit_qualification.value,
    address:edit_address.value,
    city:edit_city.value,
    state:edit_state.value,
    country:edit_country.value,
    username:edit_username.value,
    password:edit_password.value,
    pincode:edit_pincode.value

  };


  try{

    const response= await fetch(`http://localhost:3000/employees/${id}`,{
     
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newemply),

    })


    

    if(!response.ok){
      throw new Error(`unable to update edit form ${response.status},Message: ${await response.text()} `)
    }

    const data=await response.json();

    console.log(data);

    
    const avatarfile=edit_upload.files[0];

    const editformdata=new FormData();
    editformdata.append("avatar",avatarfile) 
    await fetch(`http://localhost:3000/employees/${id}/avatar`,{

      method:"POST",
      body:editformdata,

    });

    tabledata.push(newemply);
    newemply.id=id;
    displaytotable(tabledata);
    location.reload() 
    edit_employe_close();
    edit_EmployeForm.reset();

    

  }
  catch(error){

    console.log(`error in edit form `+ error)
  } 

}





function editvalidation()
{

  
  const validateInput = (input, serial, msg) => {
    if(input.value.trim() === ""){
      errorMsg[serial].innerHTML = msg;
    } 
    else {
     errorMsg[serial].innerHTML = "";
     }
    
  }
  
  const validatePhoneno=(input,serial,msg) => {

    let mobnovalue=input.value.trim();
  
    if(mobnovalue==="")
    {
      errorMsg[serial].innerHTML = msg;
    }
  
    else if((mobnovalue.length)!= 10)
    {
  
      errorMsg[serial].innerHTML ="Invalid phone no";
    }
    else{
      errorMsg[serial].innerHTML ="";
    }
  
  }
  
  
  const validateEmail=(input,serial,msg) => 
  {
      let emailvalue=input.value.trim();
      let emailregex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if(emailvalue==="")
    {
      errorMsg[serial].innerHTML = msg;
    }
  
    else if(!(emailvalue.match(emailregex)))
    {
      errorMsg[serial].innerHTML="Invalid Email";
    }
  
  else{
    errorMsg[serial].innerHTML="";
  }
  }
  
  

  
  validateInput(edit_fname, 15, "Please enter first Name");
  validateInput(edit_lname, 16, "Please enter last Name");
  validateEmail(edit_email, 17, "Please enter email");
  validatePhoneno(edit_mobno, 18, "Please enter phone no");

  validateInput(edit_username, 21, "Please enter username");
  validateInput(edit_password, 22, "Please enter password");
  validateInput(edit_qualification, 23, "Please enter qualifications");
  validateInput(edit_address, 24, "Please enter address");


  validateInput(edit_city, 27, "please enter city");
  validateInput(edit_pincode, 28, "please enter pincode");


  
//edit remove validation..............
edit_fname.addEventListener("input",() => remove_validation_error(15))
edit_lname.addEventListener("input", () => remove_validation_error(16))
edit_email.addEventListener("input",() => remove_validation_error(17));
edit_mobno.addEventListener("input",() => remove_validation_error(18));


edit_username.addEventListener("input",() => remove_validation_error(21));
edit_password.addEventListener("input",() => remove_validation_error(22));
edit_qualification.addEventListener("input",() => remove_validation_error(23));
edit_address.addEventListener("input",() => remove_validation_error(24));
edit_country.addEventListener("input",() => remove_validation_error(25));
edit_state.addEventListener("input",() => remove_validation_error(26));
edit_city.addEventListener("input",() => remove_validation_error(27));
edit_pincode.addEventListener("input",() => remove_validation_error(28));



function remove_validation_error(serial) 

{

    errorMsg[serial].innerHTML="";
}


}





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





// Deletion of a row in the table


const del_btn=document.getElementById("del_btn");

function deletetable(id,k)
{

dele_dialog_open();



del_btn.addEventListener("click", async function () {


  try{

   const response= await fetch(`http://localhost:3000/employees/${id}`,{
      method: "DELETE"
    });
 
    if(!response.ok){
      throw new Error(`Deletion cannot be done ${response.status}`)
    }

    tbody.deleteRow(k);
    dele_dialog_close();
    location.reload();


  }
  catch(error){
    console.log(error);
  }

});


}



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
delet.addEventListener("click",dele_dialog_open);


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



//searching inside a table

function searchTable() {
  var input, filter, found, table, tr, td, i, j;
  input = document.getElementById("searchinput");
  filter = input.value.toUpperCase();
  table = document.getElementById("mytable");
  tr = table.getElementsByTagName("tr");


  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++) {
          if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
              found = true;
          }
      }
      if (found===true) {
          tr[i].style.display = "";
          found = false;
      } else {
          tr[i].style.display = "none";
      }
      
  }

  
 
}


//pagination..................


// const emply_perpage_div=document.getElementById("emply_perpage");



// emply_perpage_div.addEventListener("input", () => {

//   const emply_perpage=emply_perpage_div.value;

//   const totalPages=Math.ceil(tabledata.length/emply_perpage);

//   const pageNos = Array.from({length : totalPages}, (_, i) => i+1);

  

//   pageNos.forEach((pageNo) => {
//     const startIndex = (pageNo - 1) * emply_perpage;
//     const endIndex = startIndex + emply_perpage;

//     if(k>=startIndex && k<=endIndex){

//     }




//   var input, filter, found, table, tr, td, i, j;
//   input = document.getElementById("searchinput");
//   filter = input.value.toUpperCase();
//   table = document.getElementById("mytable");
//   tr = table.getElementsByTagName("tr");


//   for (i = 0; i < tr.length; i++) {
//       td = tr[i].getElementsByTagName("td");

//       if (k>=startIndex && k<=endIndex) {
//           tr[i].style.display = "block";
//       } else {
//           tr[i].style.display = "none";
//       }
      
//   }


//   })



// });

