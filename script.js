const formElement = document.getElementById('Form');
const inputName = document.getElementById('iname');
const inputBook = document.getElementById('bname');
const btn = document.getElementById('btn');
const bodyElement = document.querySelector('tbody');
const books = [];

function handleEdit(event){
    const buttonElement = event.target;
    const id = buttonElement.id;

    if(buttonElement.textContent === 'Edit'){
        event.target.textContent = 'Save';
        const parentElement = buttonElement.parentElement;
        parentElement.removeChild(parentElement.firstChild);
        const input = document.createElement('input');
        input.id = 'status-inp';
        input.value = books[id-1].status;
        parentElement.insertBefore(input,event.target);
    }
    else{
        const statusElement = document.getElementById('status-inp');
        books[id-1].status = statusElement.value;
        renderBooksInsideTable();
    }
}
function createTableRow(data, bodyElement, bookID){
    const tr = document.createElement('tr');
    const tdID = document.createElement('td');
    tdID.textContent = bookID;
    const bookNameTD = document.createElement('td');
    bookNameTD.textContent = data.bookName;
    const issuedToTD = document.createElement('td');
    issuedToTD.textContent = data.name;
    const issuedATTD = document.createElement('td');
    issuedATTD.textContent = data.issuedAt;
    const statusTD = document.createElement('td');
    //statusTD.textContent = data.status;
   
    statusTD.classList.add('flex');
    const span = document.createElement('span');
    const button = document.createElement('button');
    button.classList.add('edit');
    span.textContent = data.status;
    const className = data.status === "not returned" ? "red" : "green";
    span.classList.add(className);
    button.textContent = 'Edit';
    button.id = bookID;
    button.addEventListener('click',handleEdit);
    statusTD.appendChild(span);
    statusTD.appendChild(button);
   
   

   
    tr.appendChild(tdID);
    tr.appendChild(bookNameTD);
    tr.appendChild(issuedToTD);
    tr.appendChild(issuedATTD);
    tr.appendChild(statusTD);

    bodyElement.appendChild(tr);
    
    



}
function renderBooksInsideTable(){
    bodyElement.textContent = "";
    books.map(function(book,index){
        createTableRow(book,bodyElement,index+1)
    })
}
function addData(){
    
    const name = inputName.value;
    inputName.value = "";
    const bookName = inputBook.value;
    inputBook.value = "";
    if(name && bookName){
        const book = {
            bookName: bookName,
            name: name,
            issuedAt: new Date().toUTCString().substring(0,12),
            status: "not returned",

        };
        books.push(book);
    }
    else {
        alert("you are trying to enter empty details");
     }
     
     renderBooksInsideTable();
    
}
btn.addEventListener('click',addData);


