const clickShow = document.getElementsByClassName('showN')

Array.from(clickShow).forEach((el)=>{
    el.addEventListener('click', showBio)
})

async function showBio(){
    var nodeimg = document.getElementById('showImg')
    nodeimg.src.innerHTML("<%=data.image.medium%>")
    var nodename = document.getElementById(showTitle)
    nodename.innerHTML('<%=data.name%>')
    
    // <span><%=data.summary%></span>

    


    const showId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/showSummary', {
            method: 'get',
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






