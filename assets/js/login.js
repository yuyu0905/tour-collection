function login() {
    axios.post(`${apiUrl}/login`, {
        "email": document.querySelector('#email').value,
        "password": document.querySelector('#pwd').value
    }).then( response => {
        console.log(response);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("isAdmin", response.data.user.isAdmin);
        localStorage.setItem("userId", response.data.user.id);
        Swal.fire({
            icon: 'success',
            title: '登入成功',
        }).then(() => {
            if(response.data.user.isAdmin) 
                window.location.href = './admin-list.html';
            else
                window.location.href = './index.html';
        });
    }).catch( error => { 
        console.log(error.response);
        Swal.fire({
            icon: 'error',
            title: "登入失敗", 
            text: error.response?.data
        });
    });
}