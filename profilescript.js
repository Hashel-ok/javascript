const url = new URLSearchParams(document.location.search);
const id = url.get("id");
console.log("id is:", id);



const fullname=document.getElementById("fullname");
const prfl_email=document.getElementById("prfl_email");
const prfl_gender=document.getElementById("prfl_gender");
const prfl_age=document.getElementById("prfl_age");
const prfl_dob=document.getElementById("prfl_dob");
const prfl_mob=document.getElementById("prfl_mob");
const prfl_qualification=document.getElementById("prfl_qualification");
const prfl_address=document.getElementById("prfl_address");
const prfl_username=document.getElementById("prfl_username");
const prfl_img=document.getElementById("prfl_img");


viewprofile(id);



async function viewprofile(id){

 console.log(id);

 try {
 
  const response= await fetch(`http://localhost:3000/employees/${id}`,{
    method:"GET"

  })
  if(!response.ok){
    throw new Error(`Error while recieving the id${response.status}`)
  }
  const data=await response.json();

  console.log(data);
  // console.log("hashel"+JSON.stringify(data));

  const dob=data.dob;

  let [day,month,year]=dob.split("-");
  const newdob = `${year}-${month}-${day}`
  // console.log(newdob);


  prfl_img.src=(`http://localhost:3000/employees/${id}/avatar`);
  fullname.textContent=data.salutation+" "+data.firstName+" "+data.lastName;
  prfl_email.textContent=data.email;
  prfl_gender.textContent=data.gender;
  prfl_dob.textContent=data.dob;
  prfl_mob.textContent=data.phone;
  prfl_qualification.textContent=data.qualifications;
  prfl_address.textContent=data.address;
  prfl_username.textContent=data.username;
  prfl_age.textContent=calculateAge(newdob);

 
 } catch (error) {

  console.log("error " + error)
  
 }


}

function calculateAge(dateOfBirth) {
  var today = new Date();
  var birthDate = new Date(dateOfBirth);
  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  
  return age;
}


const delete_dailog=document.querySelector(".delete_dailog");
// const del_btn_prfl=document.getElementById("del_btn_prfl");
const delet_cancel_btn_prfl=document.getElementById("delet_cancel_btn_prfl");
const prfl_delet=document.getElementById("prfl_delet");
const delete_template_form=document.querySelector(".delete_template_form");
const overlay=document.querySelector(".overlay");
const delet_close_btn_prfl=document.getElementById("delet_close_btn_prfl");

const dele_dialog_open=function(){

  delete_template_form.classList.remove("hidden");
  overlay.classList.remove("hidden");


}
prfl_delet.addEventListener("click",dele_dialog_open);


//function to hide delete_dialogue box

const dele_dialog_close=function(){
  
  delete_template_form.classList.add("hidden");
  overlay.classList.add("hidden");
}

delet_close_btn_prfl.addEventListener("click",dele_dialog_close);
delet_cancel_btn_prfl.addEventListener("click",dele_dialog_close)
overlay.addEventListener("click",dele_dialog_close);


document.addEventListener("keydown",(e) => {
  if(e.key==="Escape" && ! delete_template_form.classList.contains("hidden")){
    dele_dialog_close();

  }
});


