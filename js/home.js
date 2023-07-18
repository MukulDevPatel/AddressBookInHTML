let addressBookList;
window.addEventListener('DOMContentLoaded',(event)=>{
    addressBookList = getAddressBookSDataFromStorage();
    document.querySelector(".emp-count").textContent = addressBookList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});


const getAddressBookSDataFromStorage = ()=>{
    return localStorage.getItem('AddressBookList') ?
    JSON.parse(localStorage.getItem('AddressBookList')): [];
}

const createInnerHtml =()=>{
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>Zip code</th><th>Phone Number</th><th>Actions</th>";
    if (addressBookList.length==0) return;
    let innerHtml = `${headerHtml}`;
    // let addressBookList = createEmployeePayrollJSON();
    for (const addressBookData of addressBookList) {
     innerHtml = `${headerHtml}
      <tr>
        <td>${addressBookData._name}</td>
        <td>${addressBookData._address}</td>
        <td>${getDeptHtml(addressBookData._city)}</td>
        <td>${getDeptHtml(addressBookData._state)}</td>
        <td>${addressBookData._zip}</td>
        <td>${addressBookData._phoneNumber}</td>
        <td>
            <img id="${addressBookData._id}" onclick="remove(this)" alt="delete" src="../assets/deleteIcon.png">
            <img id="${addressBookData._id}" onclick="update(this)" alt="edit" src="../assets/edit.png">
        </td>
      </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
  let deptHtml = '';
  for (const dept of deptList) {
      deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
  }
  return deptHtml;
}