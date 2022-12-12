function addTour() {
    if(document.querySelector('#tour-name').value === '' ||
        document.querySelector('#tour-description').value === '' ||
        document.querySelector('#tour-imgUrl').value === '') {
            Swal.fire({
                icon: 'error',
                title: "新增失敗", 
                text: '三個欄位皆為必填'
            });
            return false;
    }
    axios.post(`${apiUrl}/tours`, {
        "name": document.querySelector('#tour-name').value,
        "description": document.querySelector('#tour-description').value,
        "imgUrl": document.querySelector('#tour-imgUrl').value,
        "userId": localStorage.getItem("userId")
    }).then( response => {
        console.log(response);
        Swal.fire({
            icon: 'success',
            title: '新增成功',
        }).then(() => {
            window.location.href = './admin-list.html';
        });
    }).catch( error => { 
        console.log(error.response);
        Swal.fire({
            icon: 'error',
            title: "新增失敗", 
            text: error.response?.data
        });
    });
}