// displaying and hidding for add employee form

const add_Employe_Form=document.querySelector(".add_Employe_Form");
const overlay=document.querySelector(".overlay");
const addemployebtn=document.querySelector(".addemployebtn");
const add_employe_closebtn=document.querySelector(".add_employe_closebtn");
const add_emply_cancel_btn=document.querySelector(".add_emply_cancel_btn");

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






// displaying and hidding for Edit employee form

const edit_Employe_Form=document.querySelector(".edit_Employe_Form");
const edit=document.querySelector(".edit");
const edit_Employ_close_btn=document.querySelector(".edit_Employ_close_btn")
const edit_Employ_cancel_btn=document.querySelector(".edit_Employ_cancel_btn")

// function to display the edit_emplye_form

const edit_employe_open=function(){

  edit_Employe_Form.classList.remove("hidden");
  overlay.classList.remove("hidden");

}
edit.addEventListener("click",edit_employe_open);


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
