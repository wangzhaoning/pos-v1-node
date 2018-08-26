$(function () {
    let items = loadAllItems();
    let boughtItems = [];
    for (let i = 0; i < items.length; i++) {
        $("#selectable").append('<li class="ui-state-default">' +
            '<div class="item_info">' +
            '<div class="item_price" id="item_price_' + (i + 1) + '">' +
            items[i].name+'$ '+
            items[i].price.toFixed(2) + '/' + items[i].unit + '</div>' +
            '</div>' +
            '<button id="submit">购买' + '</button>'+
            '</li>');
    }
        $("#selectable").selectable({
            stop: function () {
                $(".ui-selected", this).each(function () {
                    let index = $("#selectable li").index(this);
                    boughtItems.push(index);
                });
            }
        });
        $("#shopping_cart").click(function () {
            $(window).attr('location', './shoppingcart.html?bought=' + boughtItems.toString());
        });
    });
    