function register() {
    axios.post(`${apiUrl}/users`, {
        "email": document.querySelector('#email').value,
        "password": document.querySelector('#pwd').value,
        "isAdmin": false
    }).then( response => {
        console.log(response);
        Swal.fire({
            icon: 'success',
            title: '註冊成功',
        }).then(() => {
            window.location.href = './login.html';
        });
    }).catch( error => { 
        console.log(error.response);
        Swal.fire({
            icon: 'error',
            title: "註冊失敗", 
            text: error.response?.data
        });
    });
}