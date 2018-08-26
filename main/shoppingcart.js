$(function () {
    let items = loadAllItems();
    let boughts = [];
    let url = document.location.toString();
    let bought_indexs = url.split('?bought=');
    if (bought_indexs[1] !== '') {
        let ids = bought_indexs[1]
            .split(',')
            .map(elem => parseInt(elem))
            .filter(elem => elem !== -1);

        boughts = getBoughtItems(items, ids);
        showBoughts(boughts);
    } else {
        $("#bought_items").text("购物车为空");
    }

    $( "#dialog-message" ).dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            ok: function() {
                $( this ).dialog( "close" );
            }
        }
    });

    $("#ok_img").bind('click', function () {
        if (boughts.length !== 0) {
            let cal = boughts.map(elem => `${elem.bought.barcode}-${elem.count}`);
            $(window).attr('location', './calculate.html?cal=' +
                cal.join(','));
        } else {
            $( "#dialog-message" ).dialog("open");
        }
    });

    minus = function minus(index) {
        boughts[index].count -= 1;
        if (boughts[index].count === 0) {
            $("#div_bought_" + index).hide();
            $("#bought_items").text("购物车为空");
            boughts.splice(index,1);
            console.log(boughts);
        } else {
            $("#" + index).text(boughts[index].count);
        }
    };

    addItem = function addItem(index) {
        boughts[index].count += 1;
        $("#" + index).text(boughts[index].count);
    };

    function showBoughts(boughts) {
        for (let i = 0; i < boughts.length; i++) {
            let bought = boughts[i];
            $("#bought_items").append('<div id="div_bought_' + i + '" class="each_bought">' +
                '<div>'+ bought.bought.name +
                '<button class="minus_btn" ' +
                'onclick="minus(' + i + ')"' + '>-</button>' +
                '<p id="' + i + '">' + bought.count + '</p>' +
                '<button class="add_btn"' +
                'onclick="addItem(' + i + ')"' + '>+</button>' +
                '</div>' +
                '</div>');
        }
    }

    function getBoughtItems(allItems, ids) {
        let tmp = ids.reduce((total, current) =>
            (total[current]++ || (total[current] = 1), total), {});
        console.log(tmp);
        return Object.keys(tmp).map(elem => {
            return {'bought': allItems[elem], 'count': tmp[elem]}
        });
    }
});