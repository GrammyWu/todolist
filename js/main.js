/*
<li class="item">
    <i class="fa fa-circle-thin co" job="complete" id="0"></i>
    <p class="text ">我是</p>
    <i class="fa fa-trash-o de" job="delete" id="0"></i>
 </li>

 <li class="item">
    <i class="fa co fa-check-circle" job="complete" id="0"></i>
    <p class="text lineThrough">我是</p>
    <i class="fa fa-trash-o de" job="delete" id="0"></i>
  </li>
*/

const templateTodo = (todo, index) => {
    let id = index
    // let name = todo.name
    // let done = todo.done
    // let trash = todo.trash
    // python 解构
    let { name, done, trash } = todo
    let todoDone = 'fa-circle-thin'
    let todoDoneThrough = ''
    if (done) {
        todoDone = 'fa-check-circle'
        todoDoneThrough = 'lineThrough'
    }
    let t = `
    <li class="item" data-index=${id}>
        <i class="fa ${todoDone} co item-done" job="complete" id="item-name-${id}"></i>
        <p class="text  ${todoDoneThrough} ">${name}</p>
        <i class="fa fa-trash-o de item-delete" job="delete" id="item-delete-${id}"></i>
    </li>
    `
    return t
}

const renderTodos = (todos) => {
    let t = ''
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i]
        t += templateTodo(todo, i)
    }
    appendHtml(e('#list'), t)
}

const init = () => {
    // 清空页面
    e('#list').innerHTML = ''
    // let ts = localStorage.TODO
    /*
     [
            {
                "name": "我是",
                "id": 0,
                "done": false,
                "trash": false
            }
        ]
    */

    // 渲染数据
    renderTodos(ts)
}

const bindEventAdd = () => {
    bindEvent(document, 'keyup', (event) => {
        let task = event.target.value
        if (event.key === 'Enter') {
            event.target.value = ''
            // log('enter')
            // 插入数据
            let todo = {
                name: task,
                done: false,
                trash: false,
            }
            // 直接
            window.ts.push(todo)
            saveTodos()
            init()
            // 第二种最好的方式：
            // 第一步：数据库添加一个数据
            // 第二步： 页面元素 List, 添加模版 todo
        }
    })
}

const actionDelete = (index) => {
    window.ts.splice(index, 1)
    saveTodos()
    init()
}

const actionDone = (index) => {
    window.ts[index].done = !window.ts[index].done
    saveTodos()
    init()
}

const actionUpate = (index, task) => {
    window.ts[index].name = task
    saveTodos()
    init()
}

const bindEventDeleteAndDone = () => {
    bindEvent(e('#list'), 'click', (event) => {
        let target = event.target
        let item = target.closest('.item')
        let index = Number(item.dataset.index)
        log('item', item, index)
        // bind 或者 call apply 改变 this
        let hasClass = target.classList.contains.bind(target.classList)
        if (hasClass('item-delete')) {
            actionDelete(index)
        }
        if (hasClass('item-done')) {
            actionDone(index)
        }
    })
}

const bindEventEdit = () => {
    let container = e('#list')
    bindEvent(container, 'click', event => {
        log('点击即可编辑')
        let target = event.target
        if (target.classList.contains('text')) {
            target.setAttribute('contenteditable', 'true')
            target.focus()
        }
    })
    container.addEventListener('blur', event => {
        // log('edit blur', event, event.target)
        let target = event.target
        if (target.classList.contains('text')) {
            log("失去焦点")
            let item = target.closest('.item')
            let index = Number(item.dataset.index)
            target.setAttribute('contenteditable', 'false')
            // 阻止默认行为的发生, 也就是不插入回车
            event.preventDefault()
            let task = target.innerText
            actionUpate(index, task)
        }
    }, true)
}


const bindEvents = () => {
    bindEventAdd()
    bindEventDeleteAndDone()
    bindEventEdit()
}

const loadTodos = () => {
    if (localStorage.todos == undefined) {
        localStorage.todos = '[]'
    }
    let todoList = JSON.parse(localStorage.todos)
    return todoList
}

const saveTodos = () => {
    localStorage.todos = JSON.stringify(window.ts)
}

const __main = () => {
    window.ts = loadTodos()

    init()
    bindEvents()
}

__main()

// 编辑功能实现
