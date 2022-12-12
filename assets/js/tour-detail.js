const detail = document.querySelector('#tour-detail');
const memberDiv = document.querySelector('#memberDiv');
const collectStatus = document.querySelector("#collect-status");
let collectId = "";

async function getdetail() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // 詳細資訊
    const res = await axios.get(`${apiUrl}/tours/${urlParams.get('id')}`).then( response => {
        console.log(response.data);
        
        detail.innerHTML = `${JSON.stringify(response.data)}`;
    }).catch( error => { 
        console.log(error.response);
    });

}

async function renderCollect() {
    let token = localStorage.getItem("accessToken");
    let userId = localStorage.getItem("userId");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(token) {
        // 登入
        $(memberDiv).removeClass('d-none');
    }

    // 是否收藏
    const res = await axios.get(`${apiUrl}/collects?tourId=${urlParams.get('id')}&userId=${userId}`)
        .then( response => {
            if(!!response.data && response.data.length > 0) {
                collectStatus.textContent = "已收藏";
                $("#addBtn").addClass("d-none");
                $("#removeBtn").removeClass("d-none");
                collectId = response.data[0].id;
            }  else {
                collectStatus.textContent = "未收藏";
                $("#addBtn").removeClass("d-none");
                $("#removeBtn").addClass("d-none");
                collectId = "";
            }
            
        }).catch( error => { 
            console.log(error.response);
        });
}

async function addCollects() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    axios.post(`${apiUrl}/collects`, {
        "userId": localStorage.getItem("userId"),
        "tourId": urlParams.get('id')
    }).then( response => {
        console.log(response);
        Swal.fire({
            icon: 'success',
            title: '加入收藏成功',
        });
        renderCollect();
    }).catch( error => { 
        console.log(error.response);
        
    });
}

async function removeCollects() {
    axios.delete(`${apiUrl}/collects/${collectId}`)
    .then( response => {
        console.log(response);
        Swal.fire({
            icon: 'success',
            title: '移除收藏成功',
        });
        renderCollect();
    }).catch( error => { 
        console.log(error.response);
        
    });
}

getdetail();
renderCollect();