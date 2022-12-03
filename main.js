let toDoList = document.querySelector('.to-do-list')
let inputText = document.querySelector('.input-text')
let addButton = document.querySelector('.add-button')
let sortButton = document.querySelector('.sort')
let downSortButton = document.querySelector('.down')
let upSortButton = document.querySelector('.up')

function addToDoList(){

    let itemRow = document.createElement('div')
    itemRow.classList.add('item-row')
    toDoList.append(itemRow)
    let listItem = document.createElement('p')
    listItem.contentEditable = 'true'
    let deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    itemRow.append(listItem, deleteButton)
    
    listItem.style.height = '40px'
    listItem.style.paddingTop = '10px'
    listItem.style.flexWrap = 'wrap'
    listItem.style.width = '236px'
    listItem.style.marginLeft = '25px'
    listItem.style.border = '0px'
    listItem.style.resize = 'none'
    itemRow.style.display = 'flex'
    toDoList.style.display = 'block'
    
    listItem.innerText = inputText.value
    deleteButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
    <path d="M6 6L14 14" stroke="#C4C4C4"/>
    <path d="M6 14L14 6" stroke="#C4C4C4"/>
    </svg>`
    inputText.value = ''    

    deleteButton.addEventListener('click', () =>{
        itemRow.remove();
        check()
    })

        function sortDown(){

            downSortButton.style.display = 'none'
            upSortButton.style.display = 'block'

            const tasks = [...document.querySelectorAll('.item-row')];
            tasks.sort((a,b)=>{
                return parseInt(a.innerText) - parseInt(b.innerText);
            })
            toDoList.replaceChildren(...toDoList.children, ...tasks);    
        }

        function sortUp(){
            downSortButton.style.display = 'block'
            upSortButton.style.display = 'none'

            const tasks = [...document.querySelectorAll(".item-row")];
            tasks.sort((a,b)=>{
                return parseInt(b.innerText) - parseInt(a.innerText);
            })
            toDoList.replaceChildren(...toDoList.children, ...tasks);                
        }

    downSortButton.addEventListener('click', sortDown)
    upSortButton.addEventListener('click', sortUp)

    check()
}

addButton.addEventListener('click', addToDoList)
inputText.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
     addToDoList();
    }
});


function check(){
    let childNum = toDoList.childElementCount

    if(childNum==0){
        toDoList.style.display = 'none'
        addButton.addEventListener('click', addToDoList)
    }else if(childNum<5){
        inputText.style.display = 'block'
        addButton.addEventListener('click', addToDoList)
    }else{
        inputText.style.display = 'none'
        addButton.removeEventListener('click', addToDoList)
    }
}

check()