function modifyTour() {
    if(document.querySelector('#tour-name').value === '' ||
        document.querySelector('#tour-description').value === '' ||
        document.querySelector('#tour-imgUrl').value === '') {
            Swal.fire({
                icon: 'error',
                title: "更新失敗", 
                text: '三個欄位皆為必填'
            });
            return false;
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    axios.patch(`${apiUrl}/tours/${urlParams.get('id')}`, {
        "name": document.querySelector('#tour-name').value,
        "description": document.querySelector('#tour-description').value,
        "imgUrl": document.querySelector('#tour-imgUrl').value,
        "userId": localStorage.getItem("userId")
    }).then( response => {
        console.log(response);
        Swal.fire({
            icon: 'success',
            title: '更新成功',
        }).then(() => {
            window.location.href = './admin-list.html';
        });
    }).catch( error => { 
        console.log(error.response);
        Swal.fire({
            icon: 'error',
            title: "更新失敗", 
            text: error.response?.data
        });
    });
}

async function getdetail() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // 詳細資訊
    const res = await axios.get(`${apiUrl}/tours/${urlParams.get('id')}`).then( response => {
        console.log(response.data);
        document.querySelector('#tour-name').value = response.data.name;
        document.querySelector('#tour-description').value = response.data.description;
        document.querySelector('#tour-imgUrl').value = response.data.imgUrl;
    }).catch( error => { 
        console.log(error.response);
    });

}

getdetail();