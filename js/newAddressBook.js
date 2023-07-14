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

const save=()=>{
    try{
        let addressBookData = createAddressBook();
        createAndUpdateStorage(addressBookData);
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

function createAndUpdateStorage(addressBookData){
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookList != undefined){
        addressBookList.push(addressBookData);
    }else{
        addressBookList = [addressBookData]
    }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBookList",JSON.stringify(addressBookData))
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item =>{
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
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