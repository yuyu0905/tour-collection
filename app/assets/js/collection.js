const collectionList = document.querySelector('#collection-list');


async function removeCollects(collectId) {
    axios.delete(`${apiUrl}/collects/${collectId}`)
    .then( response => {
        console.log(response);
        Swal.fire({
            icon: 'success',
            title: '移除收藏成功',
        });
        getList();
    }).catch( error => { 
        console.log(error.response);
        
    });
}

async function getList() {
    const res = await axios.get(`${apiUrl}/collects?userId=${localStorage.getItem("userId")}&_expand=tour`).then( response => {
        console.log(response.data);
        let tour = "";
        response.data.forEach(item => {
            // console.log(item)
            tour +=
            `<li class="col-12 col-md-4" data-id="${item.id}">
                <div class="card">
                    <div class="mt-3 me-3 text-end">
                        <a href="#" class="btn btn-primary" onclick="removeCollects(${item.id})">已收藏</a>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title mt-2">${item.tour.name}</h5>
                        <p class="card-text">${item.tour.description.length > 30 ? item.tour.description.slice(0,30) : item.tour.description}</p>
                    </div>
                </div>
            </li>`
        });
        collectionList.innerHTML = tour;
    }).catch( error => { 
        console.log(error.response);
    });
}



getList();