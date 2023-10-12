let addNewContact = document.querySelector('.add_NewContact')
let closeBtn = document.querySelector('.close_btn')
let formSection = document.querySelector('.form_section')
let formAddContact = document.querySelector('.form_section .formAddContact')


addNewContact.addEventListener('click', () => {
    formSection.classList.add('overlay')
    formAddContact.style.display = 'block'
});

closeBtn.addEventListener('click', () => {
    formSection.classList.remove('overlay')
    formAddContact.style.display = 'none'
});

//create list to recive data
let savedData = localStorage.getItem('contact')
let contactlist = JSON.parse(savedData || '[]' )

let fullName = document.getElementById('full_name');
let phone = document.getElementById('phone');
let email = document.getElementById('email_address');
let address = document.getElementById('home_address');

let contactID = contactlist.length;

let contactInfo = () => {
    contactlist.push({
        contactid: contactID += 1,
        contactName: fullName.value,
        contacPhone: phone.value,
        contactEmail: email.value,
        contactAddress: address.value
    })
    console.log(contactlist);
}

//add info to the table by a function
let tableBdy = document.querySelector('.table_bdy')

let addInfo = () => {
    let tr = ''
    contactlist.forEach(contact=> {
    tr += `
        <tr data-id='${contact.contactid}'>
        <td>${contact.contactid}</td>
        <td>${contact.contactName}</td>
        <td>${contact.contacPhone}</td>
        <td>${contact.contactEmail}</td>
        <td>${contact.contactAddress}</td>
        <td class='green'>Edit</td>
        <td class='red'>Delete</td>
        </tr>
     `
    })
    tableBdy.innerHTML=tr
}
addInfo()

let resetContact=()=>{
    fullName.value='';
    phone.value='';
    email.value='';
    address.value='';
}

//save button
let saveBtn = document.querySelector('.save_btn');

let saveBtnHandeler = () => {
    contactInfo()
    localStorage.setItem('contact',JSON.stringify(contactlist))
    resetContact()
    addInfo()
    formSection.classList.remove('overlay')
    formAddContact.style.display = 'none'
    console.log('add');
}

saveBtn.addEventListener('click', saveBtnHandeler)

//edit button and delete

tableBdy.addEventListener('click', e =>{
    if(e.target.classList.contains('green')){
        let tr = e.target.parentElement;
        let id = tr.dataset.id;
        let index = id-1

        full_name.value=contactlist[index].contactName
        phone.value=contactlist[index].contacPhone
        email_address.value=contactlist[index].contactEmail
        home_address.value=contactlist[index].contactAddress

        formSection.classList.add('overlay')
        formAddContact.style.display = 'block'
        //new object of the modified data
        let updatBtn = ()=>{
            let updatedObj = {
                contactid: parseInt(id),
                contactName: fullName.value,
                contacPhone: phone.value,
                contactEmail: email.value,
                contactAddress: address.value
            }
            contactlist[index] = updatedObj
            localStorage.setItem('contact',JSON.stringify(contactlist))
        //close the overlay
            formSection.classList.remove('overlay')
            formAddContact.style.display = 'none'  
        //reset data
            resetContact()
        //render data
            addInfo()          
        //activate the old save button
            saveBtn.removeEventListener('click',updatBtn)
            saveBtn.addEventListener('click',saveBtnHandeler)
            console.log('update');
        }
        saveBtn.removeEventListener('click',saveBtnHandeler)
        saveBtn.addEventListener('click',updatBtn)
    }
    if(e.target.classList.contains('red')){
        let tr = e.target.parentElement;
        let id = tr.dataset.id;
        let index = id-1
        contactlist.splice(index,1)
        localStorage.setItem('contact',JSON.stringify(contactlist))
        addInfo()
    }
})







