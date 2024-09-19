const tbody=document.getElementById('tbody');
let submit=document.getElementById('submit');
let form=document.getElementById('form');
let students=JSON.parse(localStorage.getItem('student')) || [];
function load(){
    students=JSON.parse(localStorage.getItem('student')) || [];
    tbody.innerHTML='';
    students.forEach((student,index)=>{
        addstudent(student,index);
    })
    
}
load();
function addstudent(student,index){ 
     let row=document.createElement('tr');
     row.dataset.index=index; 
     row.innerHTML=`
                   <td><input class="ed" type="text" value=${student.id} disabled></td>
                   <td><input class="ed" type="text" value=${student.name} disabled></td>
                   <td><input class="ed" type="text" value=${student.regno} disabled></td>
                   <td><input class="ed" type="email" value=${student.email} disabled></td>
                   <td><input class="ed" type="text" value=${student.phoneno} disabled></td>
                   <button class="edit" data-index=${index}>Edit</button>
                   <button class="save" data-index=${index} style="display:none";>save</button>
                   <button class="cancel" style="display:none";>cancel</button>
                   <button class="delete" data-index=${index}>delete</button>
                   `
                   tbody.appendChild(row);
                   row.style.backgroundColor=index%2===0 ? "green"  : "red";
 }
function savestudent(){
     localStorage.setItem('student',JSON.stringify(students))
 };

submit.addEventListener('click',(e)=>{
    e.preventDefault();
    let id=document.getElementById('id').value.trim();
    let name=document.getElementById('name').value.trim();
    let regno=document.getElementById('regno').value.trim();
    let email=document.getElementById('email').value.trim();
    let phoneno=document.getElementById('phoneno').value.trim();
    students=JSON.parse(localStorage.getItem('student')) || [];

    if(id!='' && name!='' && regno!='' && email!='' && phoneno!='')
    {
    students.push({id,name,regno,email,phoneno});
    savestudent();
    load();
   }
   form.reset();
});

tbody.addEventListener('click',(e)=>{
   const row=e.target.closest('tr');
    const index=e.target.dataset.index;
    if(e.target.classList.contains('edit')){
        document.querySelectorAll('.edit').forEach((btn)=>{btn.disabled=true});
        document.querySelectorAll('.delete').forEach((btn)=>{btn.disabled=true});
        row.querySelector('.save').style.display="inline";
        row.querySelector('.cancel').style.display="inline";
        let input=row.querySelectorAll('.ed');
        input.forEach((r)=>{
            r.disabled=false;
        })

    }
     else if(e.target.classList.contains('cancel')){
        load();
    }
    else if(e.target.classList.contains('delete')){
        students.splice(index,1);
         savestudent();
         load();
     }
    else if(e.target.classList.contains('save')){
        let inputs=row.querySelectorAll('.ed');
       students[index]={
         id:inputs[0].value,
         name:inputs[1].value,
         regno:inputs[2].value,
         email:inputs[3].value,
         phoneno:inputs[4].value
     }
        savestudent();
        load();
     }
   
 })

