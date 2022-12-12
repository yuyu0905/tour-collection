const tourList = document.querySelector('#tour-table');

async function removeTour(collectId) {
    axios.delete(`${apiUrl}/tours/${collectId}`)
    .then( response => {
        console.log(response);
        Swal.fire({
            icon: 'success',
            title: '刪除景點成功',
        });
        getList();
    }).catch( error => { 
        console.log(error.response);
        
    });
}

function editTour(collectId) {
    window.location.href = `./admin-modify-tour.html?id=${collectId}`;
}

async function getList() {
    const res = await axios.get(`${apiUrl}/tours`).then( response => {
        // console.log(response.data);
        let tour = "";
        response.data.forEach((item, i) => {
            // console.log(item)
            tour += `<tr>
                <th scope="row">${ i+1 }</th>
                <td>${item.name}</td>
                <td>${item.description.length > 30 ? item.description.slice(0,30) : item.description}</td>
                <td>
                    <input type="button" value="刪除" class="btn btn-outline-danger" onclick="removeTour(${item.id})">
                    <input type="button" value="編輯" class="btn btn-warning" onclick="editTour(${item.id})">
                </td>
            </tr>`;
        });
        tourList.innerHTML = tour;
    }).catch( error => { 
        console.log(error.response);
    });

}

getList();