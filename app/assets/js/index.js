const tourList = document.querySelector('#tour-list');

async function getList() {
    const res = await axios.get(`${apiUrl}/tours`).then( response => {
        // console.log(response.data);
        let tour = "";
        response.data.forEach(item => {
            // console.log(item)
            tour +=
            `<li class="col-12 col-md-4" data-id="${item.id}">
                <div class="card">
                    <img src="${item.imgUrl}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description.length > 30 ? item.description.slice(0,30) : item.description}</p>
                        <a href="./tour-detail.html?id=${item.id}" class="btn btn-primary">延伸閱讀</a>
                    </div>
                </div>
            </li>`
        });
        tourList.innerHTML = tour;
    }).catch( error => { 
        console.log(error.response);
    });

}

getList();