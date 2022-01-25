//获取要用上的元素标签
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//不同状态的类名，ui的改变
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//要用上的变量，事件清单消息，事件数
let LIST, id;

// 从本地storage获取todo数据
let data = localStorage.getItem("TODO");

//如果获取到的todo不是空的，则获取数据赋值给变量list，如果为空，则list赋值空
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // 设置最后一个数据的id
    loadList(LIST); // 加载数据到接口
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// 把从本地storage获取到的数据通过自己写的函数渲染到页面中
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear元素标签绑定事件监听器，点击事件发生执行清空本地缓存的键值对数据，重新加载该页面
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// 获取当前时间并赋值给dateElement元素
  const options={year: "long", month:"short", day:"numeric"};
  const today = new Date();

dateElement.innerHTML = today.toLocaleDateString(options);

/* 
    添加todo的详细内容并且渲染到ul中
*/
 
function addToDo(toDo, id, done, trash){
    
    if(trash){ 
        return;
     }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// 添加一个键盘监听器，键盘松开回车按钮发生时执行addToDo函数，同时input框的内容置为“ ”
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // input内容不为空，添加todo
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // 添加ToDolist清单到本地缓存
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});

// 点击圆圈完成按钮，通过check的值，改变css样式，
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// 移除当前todo
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}


// 在list元素标签下增加事件监听器，点击事件发生时，获取事件发生源，操作事件发生元素
list.addEventListener("click", function(event){
    const element = event.target; //返回当前点击的list数组中的元素标签li
    const elementJob = element.attributes.job.value; // 读取该按钮的功能，
    
    //判断是删除还是完成，执行对应的函数改变css样式
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    

    // 修改完的消息样式，更新到本地缓存中
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

