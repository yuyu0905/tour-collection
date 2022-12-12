$(function() {
  let token = localStorage.getItem("accessToken");
  let isAdmin = localStorage.getItem("isAdmin");
  let navbarList = $(".navbar-nav").children().siblings();
  if(token) {
    // 登入
    navbarList.each((i,item) => {
      if($(item).attr('data-role') === 'member') $(item).removeClass("d-none");
      else if($(item).attr('data-role') === 'admin' && isAdmin === 'true') $(item).removeClass("d-none");
      else $(item).addClass("d-none");
    })
  } else {
    navbarList.each((i,item) => {
      if(!$(item).attr('data-role')) $(item).removeClass("d-none");
      else $(item).addClass("d-none");
    })
  }
});



function louout() {
  localStorage.clear();
  window.location.href = './index.html';
}

