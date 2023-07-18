let isUpdate=false;
let addressBookObj = {};

window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#name');
    const texterror = document.querySelector('.text-error');
    name.addEventListener('input',function(){
        if(name.value.length ==0){
            texterror.textContent = "";
            return;
        }try{
            (new AddressBook()).name = name.value;
            texterror.textContent="";
        }catch(e){
            texterror.textContent=e;
        }
    });
});

const save=(event)=>{
    event.preventDefault();
    event.stopPropagation();
    try{
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(siteProperties.homePage);
    }catch (e){
        return;
    }
}

const createAddressBook =()=>{
    let addressBookData = new AddressBook();
    try{
        addressBookData.name = getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    addressBookData.phoneNumber=getInputValueById('#number');
    addressBookData.state = getInputValueById('#state');
    addressBookData.city = getInputValueById('#city');
    addressBookData.zip = getInputValueById('#zip');
    addressBookData.address = getInputValueById('#address');
    alert (addressBookData.toString());
    return addressBookData;
}

const getInputValueById = (id) =>{
    let value = document.querySelector(id).value;
    return value;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item =>{
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const setAddressBookData=(addressBookData)=>{
    try{
        addressBookData.name = addressBookObj._name;
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    addressBookData.address = addressBookObj._address;
    addressBookData.state = addressBookObj._state;
    addressBookData.city = addressBookObj._city;
    addressBookData.zip = addressBookObj._zip;
    addressBookData.phoneNumber = addressBookObj._phoneNumber;
    alert(addressBookData.toString());
}

const createNewAddressID=()=>{
    let addID = localStorage.getItem("AddressID");
    addID = !addID ? 1 : (parseInt(addID)+1).toString();
    localStorage.setItem("AddressID",addID);
    return addID;
}

const resetForm =()=>{
    setValue('#name','');
    setValue('#state','');
    setValue('#city','');
    setValue('#zip','');
    setValue('#address','');
}

const setTextValue=(id)=>{
    const element = document.querySelectorAll(id);
    element.textContent = value;
}

const setValue = (id) => {
    const element = document.querySelector(id);
    element.value = value;
}
//define method used in set form
const setSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item =>{
        if(item.checked) 
         selItems.push(item.value);
    });
    return selItems;
}

//define check for update method if update is availble
const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem('editEmp');
    isUpdate = addressBookJson ? true : false;
    if(!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
}

//define setForm method which is used to set the element to be updated in payroll form
const setForm=()=>{
    setValue('#name',addressBookObj._name);
    setValue('[name=address]',addressBookObj._address);
    setSelectedValues('[name=state]',addressBookObj._state);
    setSelectedValues('[name=city]',addressBookObj._city);
    setValue('#zip',addressBookObj._zip);
    setValue('#number',addressBookObj._phoneNumber)
}

// define setEmployeePayrollObject
const setAddressBookObject=()=>{
    addressBookObj._name = getInputValueById('#name');
    addressBookObj._address = getInputValueById('#address');
    addressBookObj._city = getInputValueById('#city');
    addressBookObj._state = getInputValueById('#state');
    addressBookObj._zip = getInputValueById('#zip');
    addressBookObj._phoneNumber = getInputValueById('#number');
}

function createAndUpdateStorage(){
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookList){
        let addressBookData = addressBookList.find(addID=>addID._id == addressBookObj._id);
        if(!addressBookData){
            addressBookList.push(createAddressBookData());
        }else{
            const index = addressBookList.map(addData=>addData._id).indexOf(addData._id);
            addressBookList.splice(index,1,createAddressBookData(addressBookData._id));
        }
    }else{
        addressBookList = [createAddressBookData()];
    }
    localStorage.setItem("AddressBookList",JSON.stringify(addressBookList));
}

// To read from json Object and set to local storage
const createAddressBookData=(id)=>{
    let addressBookData = new AddressBook();
    if(!id) addressBookData.id = createNewAddressID();
    else addressBookData.id = id;
    setAddressBookObject(addressBookData);
    return addressBookData;
}

const redirect =()=>{
    window.location.href="../pages/addressBookHome.html";
}