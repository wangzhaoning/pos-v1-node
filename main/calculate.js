$(function () {
    let url = document.location.toString();
    let cals = url.split('?cal=');
    if (cals[1] !== '') {
        $("#cal").append(printInventory(cals[1].split(',')));
    } else {
        $("#cal").text('出错啦！购物车没东西！！');
    }
});