const toDoForm=document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input")
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS ="toDos";

let toDos = [];
function saveTodos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event){
    const btn = event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        // console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveTodos();
    console.log(cleanToDos);
}

function paintToDo(text){
    console.log(text);
    
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML="X";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length+1;
    span.innerText=text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id= newId;
    toDoList.appendChild(li);
    const toDoObj={
        text: text,
        id: toDos.length+1
    };
    toDos.push(toDoObj);
    saveTodos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadTodos(){
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    if(loadedtoDos !== null){
        const parsedToDos = JSON.parse(loadedtoDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}


function init(){
    loadTodos();
    toDoForm.addEventListener("submit", handleSubmit);


}

init();
