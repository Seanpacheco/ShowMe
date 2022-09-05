const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteShow)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteShow(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteShow', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


// Get Summary
const clickShow = document.querySelectorAll('span.showN')

Array.from(clickShow).forEach((el)=>{
    el.addEventListener('click', showBio)
})

async function showBio(){
    var nodeimg = document.getElementById('showImg')
    // nodeimg.src = <%=data.image.medium%>
    var nodename = document.getElementById("showTitle")
    nodename.innerHTML("<%=data.name%>")
    
    // <span><%=data.summary%></span>

    const showId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/showSummary', {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'showIDfromJS': showId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}