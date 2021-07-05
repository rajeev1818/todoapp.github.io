let searchForm=document.getElementById("searchForm");
let searchCategory=document.getElementById("category");
let searchPriority=document.getElementById("priority");
let searchStatus=document.getElementById("status");
let searchText=document.getElementById("searchText");
let submitByQuery=document.getElementById("submitByQuery");
let todoItemsContainer=document.getElementById("todoItemsContainer");

function onDeleteTodo(id) {
  let todoElement = document.getElementById(id);
  todoItemsContainer.removeChild(todoElement);

  let url=`https://todo-full-apis.herokuapp.com/todos/${id}/`;
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url,options);
}
function createAndAppendTodo(id,todo,priority,status,category,dueDate) {
  
  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container");
  todoElement.id =id
  todoItemsContainer.appendChild(todoElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  
  let idEl=document.createElement("h1");
  idEl.textContent=`Todo Id : ${id}`;
  idEl.classList.add("el-data");
  labelElement.appendChild(idEl);

  let todoEl=document.createElement("h1");
  todoEl.textContent=`Todo : ${todo}`;
  todoEl.classList.add("el-data","highlight");
  labelElement.appendChild(todoEl);

  let priorityEl=document.createElement("h1");
  priorityEl.textContent=`Priority : ${priority}`;
  priorityEl.classList.add("el-data");
  labelElement.appendChild(priorityEl);

  let statusEl=document.createElement("h1");
  statusEl.textContent=`Status : ${status}`;
  statusEl.classList.add("el-data");
  labelElement.appendChild(statusEl);

  let categoryEl=document.createElement("h1");
  categoryEl.textContent=`Category : ${category}`;
  categoryEl.classList.add("el-data");
  labelElement.appendChild(categoryEl);

  let dateEl=document.createElement("h1");
  dateEl.textContent=`Due Date : ${dueDate}`;
  dateEl.classList.add("el-data");
  labelElement.appendChild(dateEl);


  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

  deleteIcon.onclick = function () {
    onDeleteTodo(id);
  };

  deleteIconContainer.appendChild(deleteIcon);
}

function printResult(obj){

  let {id,todo,priority,status,category,dueDate}=obj;
  createAndAppendTodo(id,todo,priority,status,category,dueDate);
}

function showResult(data){
  dateTodoItemsContainer.classList.remove("success");
    dateTodoItemsContainer.textContent="";
  singleTodoItemsContainer.classList.remove("success");
    singleTodoItemsContainer.textContent="";
  todoAddResult.classList.remove("success");
  todoAddResult.textContent="";
  todoItemsContainer.textContent="";
  singleTodoItemsContainer.textContent="";
  
  dateTodoItemsContainer.textContent="";
  todoAddResult.textContent="";
  searchText.value="";
  priorityUpdateResult.classList.remove("success");
  priorityUpdateResult.textContent="";
  statusResult.classList.remove("success");
  statusResult.textContent="";
  todoResult.classList.remove("success");
  todoResult.textContent="";
  dateUpdateRes.classList.remove("success");
  dateUpdateRes.textContent="";
  categoryUpdateResult.classList.remove("success");
  categoryUpdateResult.textContent="";
  if(data.length===0){
    
    todoItemsContainer.classList.add("success");
    todoItemsContainer.textContent="No Todo Available";
  }
  else{
    for(let obj of data){
      printResult(obj);
    }
  }
  
}

submitByQuery.addEventListener("click",(event)=>{
    event.preventDefault();
    let category=searchCategory.value;
    if(category==="NONE"){
      category=undefined;
    }
    let priority=searchPriority.value;
    if(priority==="NONE"){
      priority=undefined;
    }
    let status=searchStatus.value;
    if(status==="NONE"){
      status=undefined;
    }
    let text=searchText.value;
    let url;
    if(category!==undefined && priority!==undefined && status!==undefined && text!==""){
      url=`https://todo-full-apis.herokuapp.com/todos/?status=${status}&priority=${priority}&category=${category}&search_q=${text}`;
    }
    else if(category!==undefined && priority!==undefined && status!==undefined && text===""){
      url=`https://todo-full-apis.herokuapp.com/todos/?status=${status}&priority=${priority}&category=${category}`;
    }
    else if(priority!==undefined && status!==undefined && text!==""){
      url=`https://todo-full-apis.herokuapp.com/todos/?status=${status}&priority=${priority}&search_q=${text}`;
    }
    else if(priority!==undefined && status!==undefined && text===""){
      url=`https://todo-full-apis.herokuapp.com/todos/?status=${status}&priority=${priority}`;
    }
    else if(category!==undefined && status!=undefined && text!==""){
      url=`https://todo-full-apis.herokuapp.com/todos/?status=${status}&category=${category}&search_q=${text}`;
    }
    else if(category!==undefined && status!=undefined && text===""){
      url=`https://todo-full-apis.herokuapp.com/todos/?status=${status}&category=${category}`;
    }
    else if(category!==undefined && priority!=undefined && text!==""){
      url=`https://todo-full-apis.herokuapp.com/todos/?priority=${priority}&category=${category}&search_q=${text}`;
    }
    else if(category!==undefined && priority!=undefined && text===""){
      url=`https://todo-full-apis.herokuapp.com/todos/?priority=${priority}&category=${category}`;
    }
    else if(priority!==undefined && text!==""){
      url=`https://todo-full-apis.herokuapp.com/todos/?priority=${priority}&search_q=${text}`;
    }
    else if(priority!==undefined && text===""){
      url=`https://todo-full-apis.herokuapp.com/todos/?priority=${priority}`;
    }
    else if(status!==undefined && text!==""){
      url=`https://todo-full-apis.herokuapp.com/todos/?status=${status}&search_q=${text}`;
    }
    else if(status!==undefined && text===""){
      url=`https://todo-full-apis.herokuapp.com/todos/?status=${status}`;
    }
    else if(category!==undefined && text!==""){
      url=`https://todo-full-apis.herokuapp.com/todos/?category=${category}&search_q=${text}`;
    }
    else if(category!==undefined && text===""){
      url=`https://todo-full-apis.herokuapp.com/todos/?category=${category}`;
    }
    else if(text!==""){
      url=`https://todo-full-apis.herokuapp.com/todos/?search_q=${text}`;
    }
    else{
      url=`https://todo-full-apis.herokuapp.com/todos/`;
    }


    fetch(url)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      showResult(data);
    });
});









































let getById=document.getElementById("todoId");
let buttonById=document.getElementById("submitById");
let singleTodoItemsContainer=document.getElementById("singleTodoItemsContainer");
let singleView=document.getElementById("singleView");
let errMsg=document.getElementById("errMsg");

function singleTodoDelete(id) {
  let todoElement = document.getElementById(id);
  singleTodoItemsContainer.removeChild(todoElement);

  let url=`https://todo-full-apis.herokuapp.com/todos/${id}/`;
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url,options);
}


function singleCreateAndAppendTodo(id,todo,priority,status,category,dueDate) {

  
  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container");
  todoElement.id = id
  singleTodoItemsContainer.appendChild(todoElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  
  let idEl=document.createElement("h1");
  idEl.textContent=`Todo Id : ${id}`;
  idEl.classList.add("el-data");
  labelElement.appendChild(idEl);

  let todoEl=document.createElement("h1");
  todoEl.textContent=`Todo : ${todo}`;
  todoEl.classList.add("el-data","highlight");
  labelElement.appendChild(todoEl);

  let priorityEl=document.createElement("h1");
  priorityEl.textContent=`Priority : ${priority}`;
  priorityEl.classList.add("el-data");
  labelElement.appendChild(priorityEl);

  let statusEl=document.createElement("h1");
  statusEl.textContent=`Status : ${status}`;
  statusEl.classList.add("el-data");
  labelElement.appendChild(statusEl);

  let categoryEl=document.createElement("h1");
  categoryEl.textContent=`Category : ${category}`;
  categoryEl.classList.add("el-data");
  labelElement.appendChild(categoryEl);

  let dateEl=document.createElement("h1");
  dateEl.textContent=`Due Date : ${dueDate}`;
  dateEl.classList.add("el-data");
  labelElement.appendChild(dateEl);

  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

  deleteIcon.onclick = function () {
    singleTodoDelete(id);
  };

  deleteIconContainer.appendChild(deleteIcon);
}


function showResult2(data){
  dateTodoItemsContainer.classList.remove("success");
    dateTodoItemsContainer.textContent="";
  todoItemsContainer.classList.remove("success");
    todoItemsContainer.textContent="";
  todoAddResult.classList.remove("success");
  todoAddResult.textContent="";
  getById.value="";
  singleTodoItemsContainer.textContent="";
  todoItemsContainer.textContent="";
  dateTodoItemsContainer.textContent="";
  todoAddResult.textContent="";
  priorityUpdateResult.classList.remove("success");
  priorityUpdateResult.textContent="";
  statusResult.classList.remove("success");
  statusResult.textContent="";
  todoResult.classList.remove("success");
  todoResult.textContent="";
  dateUpdateRes.classList.remove("success");
  dateUpdateRes.textContent="";
  categoryUpdateResult.classList.remove("success");
  categoryUpdateResult.textContent="";

  let {value}=data;
  if(value!==undefined){
    
    singleTodoItemsContainer.classList.add("success");
    singleTodoItemsContainer.textContent="No Todo Available";
  }
  else{
    const {id,todo,priority,status,category,dueDate}=data;
    singleCreateAndAppendTodo(id,todo,priority,status,category,dueDate);
  }
  
}

buttonById.addEventListener("click",(event)=>{
  event.preventDefault();
  let id=getById.value;
  if(id===""){
    errMsg.textContent="Required*";
  }
  else{
    errMsg.textContent="";
    let url=`https://todo-full-apis.herokuapp.com/todos/${id}/`;
    fetch(url)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      showResult2(data);
    });

  }


  
  
});

































let dateTime=document.getElementById("dateTime");
let dueDateSubmit=document.getElementById("dueDateSubmit");
let dateTodoItemsContainer=document.getElementById("dateTodoItemsContainer");
let dateErr=document.getElementById("dateErr");




function dateTodoDelete(id) {
  let todoElement = document.getElementById(id);
  dateTodoItemsContainer.removeChild(todoElement);

  let url=`https://todo-full-apis.herokuapp.com/todos/${id}/`;
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url,options);
}

function dateCreateAndAppendTodo(id,todo,priority,status,category,dueDate) {

  
  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container");
  todoElement.id = id
  dateTodoItemsContainer.appendChild(todoElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  
  let idEl=document.createElement("h1");
  idEl.textContent=`Todo Id : ${id}`;
  idEl.classList.add("el-data");
  labelElement.appendChild(idEl);

  let todoEl=document.createElement("h1");
  todoEl.textContent=`Todo : ${todo}`;
  todoEl.classList.add("el-data","highlight");
  labelElement.appendChild(todoEl);

  let priorityEl=document.createElement("h1");
  priorityEl.textContent=`Priority : ${priority}`;
  priorityEl.classList.add("el-data");
  labelElement.appendChild(priorityEl);

  let statusEl=document.createElement("h1");
  statusEl.textContent=`Status : ${status}`;
  statusEl.classList.add("el-data");
  labelElement.appendChild(statusEl);

  let categoryEl=document.createElement("h1");
  categoryEl.textContent=`Category : ${category}`;
  categoryEl.classList.add("el-data");
  labelElement.appendChild(categoryEl);

  let dateEl=document.createElement("h1");
  dateEl.textContent=`Due Date : ${dueDate}`;
  dateEl.classList.add("el-data");
  labelElement.appendChild(dateEl);

  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

  deleteIcon.onclick = function () {
    dateTodoDelete(id);
  };

  deleteIconContainer.appendChild(deleteIcon);
}



function show(obj){
  
  let {id,todo,priority,status,category,dueDate}=obj;
  
  dateCreateAndAppendTodo(id,todo,priority,status,category,dueDate);
}


function showResult3(data){
  singleTodoItemsContainer.classList.remove("success");
    singleTodoItemsContainer.textContent="";
  todoItemsContainer.classList.remove("success");
    todoItemsContainer.textContent="";
  todoAddResult.classList.remove("success");
  todoAddResult.textContent="";
  dateTodoItemsContainer.textContent="";
  singleTodoItemsContainer.textContent="";
  todoItemsContainer.textContent="";
  todoAddResult.textContent="";
  priorityUpdateResult.classList.remove("success");
  priorityUpdateResult.textContent="";
  statusResult.classList.remove("success");
  statusResult.textContent="";
  todoResult.classList.remove("success");
  todoResult.textContent="";
  dateUpdateRes.classList.remove("success");
  dateUpdateRes.textContent="";
  categoryUpdateResult.classList.remove("success");
  categoryUpdateResult.textContent="";
  if(data.length===0){
    
    dateTodoItemsContainer.classList.add("success");
    dateTodoItemsContainer.textContent="No Todo Available";
  }
  else{
    for(let obj of data){
      show(obj);
    }
  }
  
  
}
dueDateSubmit.addEventListener("click",(event)=>{
  event.preventDefault();
  let date=dateTime.value;
  if(date===""){
    dateErr.textContent="Required*";
  }
  else{
    dateErr.textContent="";
    date=new Date(date);
    let month=date.getMonth();
    month=month+1;
    let year=date.getFullYear();
    let day=date.getDate();
    let finalDate=`${year}-${month}-${day}`;
    let url=`https://todo-full-apis.herokuapp.com/agenda/?date=${finalDate}/`;
    fetch(url)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      
      showResult3(data);
    })
  }
});































let createTodoButton=document.getElementById("createTodo");
let todoText=document.getElementById("todoText");
let createCategory=document.getElementById("createCategory");
let createPriority=document.getElementById("createPriority");
let createStatus=document.getElementById("createStatus");
let todoAddResult=document.getElementById("todoAddResult");
let todoInputId=document.getElementById("todoInputId");
let postDateTime=document.getElementById("postDateTime");
let idCreateErr=document.getElementById("idCreateErr");
let textErr=document.getElementById("textErr");
let createDateErr=document.getElementById("createDateErr");

function sendResponse(){
  dateTodoItemsContainer.classList.remove("success");
    dateTodoItemsContainer.textContent="";
  singleTodoItemsContainer.classList.remove("success");
    singleTodoItemsContainer.textContent="";
  todoItemsContainer.classList.remove("success");
    todoItemsContainer.textContent="";
  
  todoAddResult.textContent="Todo Successfully Added";
  todoAddResult.classList.add("success");




  postDateTime.value="";
  todoInputId.value="";
  todoText.value="";
  singleTodoItemsContainer.textContent="";
  todoItemsContainer.textContent="";
  dateTodoItemsContainer.textContent="";
  
  priorityUpdateResult.classList.remove("success");
  priorityUpdateResult.textContent="";
  statusResult.classList.remove("success");
  statusResult.textContent="";
  todoResult.classList.remove("success");
  todoResult.textContent="";
  dateUpdateRes.classList.remove("success");
  dateUpdateRes.textContent="";
  categoryUpdateResult.classList.remove("success");
  categoryUpdateResult.textContent="";
}

createTodoButton.addEventListener("click",(event)=>{
  event.preventDefault();
  let date=postDateTime.value;
  if(date===""){
    createDateErr.textContent="Required*";
  }
  else{
    createDateErr.textContent="";
  }
  
  if(todoText.value===""){
    textErr.textContent="Required*";
  }
  else{
    textErr.textContent="";
  }
  
  if(todoInputId.value===""){
    idCreateErr.textContent="Required*";
  }
  else{
    idCreateErr.textContent="";
  }
  
  if(todoInputId.value!=="" && todoText.value!=="" && date!==""){
  
    date=new Date(date);
    let month=date.getMonth();
    month=month+1;
    let year=date.getFullYear();
    let day=date.getDate();
    let finalDate=`${year}-${month}-${day}`;

    let obj={
      id:parseInt(todoInputId.value),
      todo:todoText.value,
      priority:createPriority.value,
      status:createStatus.value,
      category:createCategory.value,
      dueDate:finalDate,
    };
    let url="https://todo-full-apis.herokuapp.com/todos/";

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      };

      fetch(url,options)
      .then((response)=>{
        sendResponse();
      })
      ;
  }

  
    
});




let updateForm=document.getElementById("updateForm");
let formUpdateId=document.getElementById("formUpdateId");
let updateCategory=document.getElementById("updateCategory");
let updatePriority=document.getElementById("updatePriority");


let updateTodoButton=document.getElementById("updateTodoButton");

let updateResult=document.getElementById("updateResult");
let categoryButton=document.getElementById("categoryButton");
let priorityUpdateId=document.getElementById("priorityUpdateId");
let priorityUpdateResult=document.getElementById("priorityUpdateResult");
let categoryUpdateResult=document.getElementById("categoryUpdateResult");
let priorityButton=document.getElementById("priorityButton");


let statusId=document.getElementById("statusId");
let updateStatus=document.getElementById("updateStatus");
let statusButton=document.getElementById("statusButton");
let statusResult=document.getElementById("statusResult");

let textId=document.getElementById("textId");
let updateText=document.getElementById("updateText");
let todoButton=document.getElementById("todoButton");
let todoResult=document.getElementById("todoResult");


let dateId=document.getElementById("dateId");
let updateDateTime=document.getElementById("updateDateTime");
let dateUpdate=document.getElementById("dateUpdate");
let dateUpdateRes=document.getElementById("dateUpdateRes");


let textUpdateId=document.getElementById("textUpdateId");
let priorityUpdId=document.getElementById("priorityUpdId");
let statusUpdateId=document.getElementById("statusUpdateId");
let categoryUpdateId=document.getElementById("categoryUpdateId");
let textUpdateErr=document.getElementById("textUpdateErr");
let dateUpdateId=document.getElementById("dateUpdateId");
let dateUpdateErr=document.getElementById("dateUpdateErr");


function printResult1(){
  dateTodoItemsContainer.classList.remove("success");
    dateTodoItemsContainer.textContent="";
  singleTodoItemsContainer.classList.remove("success");
    singleTodoItemsContainer.textContent="";
  todoItemsContainer.classList.remove("success");
    todoItemsContainer.textContent="";
  todoAddResult.classList.remove("success");
  todoAddResult.textContent="";
  priorityUpdateResult.classList.remove("success");
  priorityUpdateResult.textContent="";
  statusResult.classList.remove("success");
  statusResult.textContent="";
  todoResult.classList.remove("success");
  todoResult.textContent="";
  dateUpdateRes.classList.remove("success");
  dateUpdateRes.textContent="";
  todoItemsContainer.textContent="";
  singleTodoItemsContainer.textContent="";
  
  dateTodoItemsContainer.textContent="";
  todoAddResult.textContent="";
  
  categoryUpdateResult.classList.add("success");
  categoryUpdateResult.textContent="Category Updated";
  formUpdateId.value="";
}
categoryButton.addEventListener("click",(event)=>{
  event.preventDefault();
  let id=formUpdateId.value;
  if(id===""){
    categoryUpdateId.textContent="Required*";
  }
  else{
    categoryUpdateId.textContent="";
    let url=`https://todo-full-apis.herokuapp.com/todos/${id}/`;
  let category=updateCategory.value;

  let obj={
    category:category,
  };
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  fetch(url,options)
  .then((response)=>{
    printResult1();
  });
  }
  
});

function printResult2(){
  dateTodoItemsContainer.classList.remove("success");
    dateTodoItemsContainer.textContent="";
  singleTodoItemsContainer.classList.remove("success");
    singleTodoItemsContainer.textContent="";
  todoItemsContainer.classList.remove("success");
    todoItemsContainer.textContent="";
  todoAddResult.classList.remove("success");
  todoAddResult.textContent="";
  categoryUpdateResult.classList.remove("success");
  categoryUpdateResult.textContent="";
  
  statusResult.classList.remove("success");
  statusResult.textContent="";
  todoResult.classList.remove("success");
  todoResult.textContent="";
  dateUpdateRes.classList.remove("success");
  dateUpdateRes.textContent="";
  todoItemsContainer.textContent="";
  singleTodoItemsContainer.textContent="";
  
  dateTodoItemsContainer.textContent="";
  todoAddResult.textContent="";
  
  priorityUpdateResult.classList.add("success");
  priorityUpdateResult.textContent="Priority Updated";
  priorityUpdateId.value="";
}

priorityButton.addEventListener("click",(event)=>{
  event.preventDefault();
  let id=priorityUpdateId.value;
  if(id===""){
    priorityUpdId.textContent="Required*";
  }
  else{
    priorityUpdId.textContent="";
    let url=`https://todo-full-apis.herokuapp.com/todos/${id}/`;
  let priority=updatePriority.value;

  let obj={
    priority:priority,
  };
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  fetch(url,options)
  .then((response)=>{
    printResult2();
  });
  }
  
});


function printResult3(){
  dateTodoItemsContainer.classList.remove("success");
    dateTodoItemsContainer.textContent="";
  singleTodoItemsContainer.classList.remove("success");
    singleTodoItemsContainer.textContent="";
  todoItemsContainer.classList.remove("success");
    todoItemsContainer.textContent="";
  todoAddResult.classList.remove("success");
  todoAddResult.textContent="";
  categoryUpdateResult.classList.remove("success");
  categoryUpdateResult.textContent="";
  priorityUpdateResult.classList.remove("success");
  priorityUpdateResult.textContent="";
  
  todoResult.classList.remove("success");
  todoResult.textContent="";
  dateUpdateRes.classList.remove("success");
  dateUpdateRes.textContent="";
  todoItemsContainer.textContent="";
  singleTodoItemsContainer.textContent="";
  
  dateTodoItemsContainer.textContent="";
  todoAddResult.textContent="";
  
  statusResult.classList.add("success");
  statusResult.textContent="Status Updated";
  statusId.value="";
}

statusButton.addEventListener("click",(event)=>{
  event.preventDefault();
  let id=statusId.value;
  if(id===""){
    statusUpdateId.textContent="Required*";
  }
  else{
    statusUpdateId.textContent="";
    let url=`https://todo-full-apis.herokuapp.com/todos/${id}/`;
    let status=updateStatus.value;

    let obj={
      status:status,
    };
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };

    fetch(url,options)
    .then((response)=>{
      printResult3();
    });
  }
  
});

function printResult4(){
  dateTodoItemsContainer.classList.remove("success");
    dateTodoItemsContainer.textContent="";
  singleTodoItemsContainer.classList.remove("success");
    singleTodoItemsContainer.textContent="";
  todoItemsContainer.classList.remove("success");
    todoItemsContainer.textContent="";
  todoAddResult.classList.remove("success");
  todoAddResult.textContent="";
  categoryUpdateResult.classList.remove("success");
  categoryUpdateResult.textContent="";
  priorityUpdateResult.classList.remove("success");
  priorityUpdateResult.textContent="";
  statusResult.classList.remove("success");
  statusResult.textContent="";
  todoItemsContainer.textContent="";
  singleTodoItemsContainer.textContent="";
  
  dateTodoItemsContainer.textContent="";
  todoAddResult.textContent="";
  
  dateUpdateRes.classList.remove("success");
  dateUpdateRes.textContent="";


  todoResult.classList.add("success");
  todoResult.textContent="Todo Updated";
  textId.value="";
  updateText.value="";
}

todoButton.addEventListener("click",(event)=>{
  event.preventDefault();
  let id=textId.value;
  if(id===""){
    textUpdateId.textContent="Required*";
  }
  else{
    textUpdateId.textContent="";
  }
  if(updateText.value===""){
    textUpdateErr.textContent="Required*";
  }
  else{
    textUpdateErr.textContent="";
  }

  if(id!=="" && updateText.value!==""){
    let url=`https://todo-full-apis.herokuapp.com/todos/${id}/`;
    let todo=updateText.value;

    let obj={
      todo:todo,
    };
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };

    fetch(url,options)
    .then((response)=>{
      printResult4();
    });
  }
  
});

function printResult5(){
  dateTodoItemsContainer.classList.remove("success");
    dateTodoItemsContainer.textContent="";
  singleTodoItemsContainer.classList.remove("success");
    singleTodoItemsContainer.textContent="";
  todoItemsContainer.classList.remove("success");
    todoItemsContainer.textContent="";
  categoryUpdateResult.classList.remove("success");
  categoryUpdateResult.textContent="";
  priorityUpdateResult.classList.remove("success");
  priorityUpdateResult.textContent="";
  statusResult.classList.remove("success");
  statusResult.textContent="";
  todoResult.classList.remove("success");
  todoResult.textContent="";
  todoItemsContainer.textContent="";
  singleTodoItemsContainer.textContent="";
  
  dateTodoItemsContainer.textContent="";
  todoAddResult.textContent="";
  todoAddResult.classList.remove("success");
  todoAddResult.textContent="";

  dateUpdateRes.classList.add("success");
  dateUpdateRes.textContent="Todo Updated";
  dateId.value="";
  updateDateTime.value="";
}
dateUpdate.addEventListener("click",(event)=>{
  event.preventDefault();
  let id=dateId.value;
  if(id===""){
    dateUpdateId.textContent="Required*";
  }
  else{
    dateUpdateId.textContent="";
  }

  if(updateDateTime.value===""){
    dateUpdateErr.textContent="Required*";
  }
  else{
    dateUpdateErr.textContent="";
  }

  if(id!=="" && updateDateTime.value!==""){
    let url=`https://todo-full-apis.herokuapp.com/todos/${id}/`;
    let date=updateDateTime.value;
    
    date=new Date(date);
    let month=date.getMonth();
    month=month+1;
    let year=date.getFullYear();
    let day=date.getDate();
    let finalDate=`${year}-${month}-${day}`;
    let obj={
      dueDate:finalDate,
    };
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };

    fetch(url,options)
    .then((response)=>{
      printResult5();
    });
  }


  
});








