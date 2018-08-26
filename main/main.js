let item = require('./datbase').loadAllItems();
let promotion = require('./datbase').loadPromotions();

function printInventory(inputs) {
    let  data=removeRepeat(inputs);
    let  items=readItem(data,item);
    let promotionitem=promptionShoping(items,promotion);
    let simpletotal=simpleTotal(items,promotionitem);
    let  totalprice=total(items,promotionitem);
    let resultpr=printresult(items,promotionitem,totalprice,simpletotal);
    return resultpr;
    console.log(resultpr);// const db = require('../main/datbase');

    function get_items_and_count(items_barcode) {
        let each_item_count = {};
        items_barcode.filter(elem => {
            let barcode = elem.split('-');
            if (each_item_count[barcode[0]] === undefined) {
                each_item_count[barcode[0]] = barcode.length === 1 ? 1 : parseInt(barcode[1]);
            } else {
                each_item_count[barcode[0]] += barcode.length === 1 ? 1 : parseInt(barcode[1]);
            }
        });
        return each_item_count;
    }

    function get_items_info(items_and_count) {
        let all_items = loadAllItems();
        let items_info = [];
        for (let key in items_and_count) {
            all_items.filter(elem => {
                if (elem['barcode'] === key) {
                    let item = {};
                    item['barcode'] = elem['barcode'];
                    item['name'] = elem['name'];
                    item['unit'] = elem['unit'];
                    item['price'] = elem['price'];
                    item['count'] = items_and_count[key];
                    item['total'] = item['price'] * item['count'];
                    items_info.push(item);
                }
            });
        }
        return items_info;
    }

    function get_buy_two_one_free(items_info) {
        let buy_two_one_free_items = loadPromotions()
            .filter(item => item['type'] === 'BUY_TWO_GET_ONE_FREE');
        let barcodes = buy_two_one_free_items[0]['barcodes'];
        for (let item of items_info) {
            if (item['barcode'] === barcodes.filter(x => x === item['barcode']).length !== 0) {
                item['reduce'] = item['price'] * Math.floor(item['count'] / 3);
            } else {
                item['reduce'] = 0;
            }
        }
        return items_info;
    }

    function printInventory(inputs) {
        let items_and_count = get_items_and_count(inputs);
        let items_info = get_items_info(items_and_count);
        let result_after_discount = get_buy_two_one_free(items_info);

        let ticket_manifest = [];
        let ticket_free_item = [];
        let total = 0;
        let reduce = 0;
        for (let item of result_after_discount) {
            ticket_manifest.push('名称：' + item['name']
                + '，数量：' + item['count'] + item['unit']
                + '，单价：' + item['price'].toFixed(2)
                + '(元)，小计：' + (item['total'] - item['reduce']).toFixed(2) + '(元)\n');
            total += item['total'] - item['reduce'];
            if (item['reduce'] !== 0) {
                ticket_free_item.push('名称：' + item['name']
                    + '，数量：' + (item['reduce'] / item['price']) + item['unit'] + '\n');
                reduce += item['reduce'];
            }
        }
        let ticket =
            '<p>***<思沃商店>购物清单***</p>' +
            ticket_manifest.join('<p>') +
            '<p>----------------------</p>' +
            '<p>挥泪赠送商品：</p>' +
            ticket_free_item.join('<p>') +
            '<p>----------------------</p>' +
            '<p>总计：' + total.toFixed(2) + '(元)</p>' +
            '<p>节省：' + reduce.toFixed(2) + '(元)</p>' +
            '<p>**********************</p>';
        return ticket;
    }

// module.exports = {get_items_and_count, get_items_info, printInventory, get_buy_two_one_free};

    // return 'Hello World!';
};

function removeRepeat(input) {
    if(input==='')return;
    let result=new Array();
    let res=new Array();
    result[0]=input[0];
    let boo=true;
    for(let i=0;i<input.length;i++)
    {
        boo=true;
        for(let j=0;j<result.length;j++)
        {
            if(input[i]===result[j])
            {
                boo=false;
                break;
            }
        }
        if(boo===true)
        {
            result.push(input[i]);
        }
    }
   //console.log(result);
   // console.log(result[1].length);

    for(let i of result)
    {
        let obj={};
        let count=0;
        if(i.length>11)
        {
            let x=i.split('-');
            obj.id=x[0].trim();
            obj.count=x[1];
           // console.log(obj);
            res.push(obj);
            continue;
        }
        for(let j=0;j<input.length;j++)
        {
            if(i===input[j])
            {
                count++;
            }
        }
        obj.id=i;
        obj.count=count;
        res.push(obj);
    }
   // console.log(res);
    return res;
}

function readItem(data,item) {
    let result=new Array();
      for(let j of data)
      {
          let obj={};
          for(let i of item)
       {
          if(j.id===i.barcode)
          {
              obj.id=j.id;
              obj.name=i.name;
              obj.num=j.count;
              obj.unit=i.unit;
              obj.price=i.price;//如何保留小数点后两位
              obj.sumprice=obj.price*obj.num;//如何保留小数点后两位
             // console.log(obj.sumprice);
              result.push(obj);
              break;
          }
       }
      }
    //console.log(result);
         return result;
}

function simpleTotal(items,promotionitem) {
    let result=new Array();
    for(let i=0;i<items.length;i++)
    {
        for(let j=0;j<promotionitem.length;j++)
        {
            result[i]=items[i].sumprice;
            if(items[i].name===promotionitem[j].name)
            {
                result[i]=items[i].sumprice-(promotionitem[j].count*items[i].price);
                break;
            }
        }
    }
    return result;
}

function promptionShoping(items,promotion) {
    let promotionItem=new Array();

    for(let i of items)
    {
        let obj={};
        for(let j of promotion[0].barcodes)
        {
            if(i.id===j&&i.num>2)
            {
                     obj.name=i.name;
                     obj.count=Math.floor(i.num/3);
                     obj.unit=i.unit;
                     obj.price=i.price;
                     promotionItem.push(obj);
                     break;
            }
        }
    }
    return promotionItem;
}
function total(items,promotionitem) {
    let obj={};
    obj.total=0;
    obj.save=0;
    for(let i of items)
    {
        obj.total+=i.sumprice;
    }
    for(let j of promotionitem)
    {
       obj.save+=j.price*j.count;
    }
    return obj;
}

function printresult(items,promotionitem,totalprice,simpletotal) {
    let soulte='***<没钱赚商店>购物清单***\n';
    for(let i=0;i<items.length;i++)
    {
        soulte+= '名称：'+items[i].name+'，数量：'+items[i].num+items[i].unit+'，单价：'+parseFloat(items[i].price).toFixed(2)+'(元)，小计：'+parseFloat(simpletotal[i]).toFixed(2)+'(元)\n';
    }
    soulte+='----------------------\n';
    soulte+='挥泪赠送商品：\n';
    for(let j of promotionitem)
    {
        soulte+='名称：'+j.name+'，数量：'+j.count+j.unit+'\n';
    }
soulte+= '----------------------\n';
    soulte+= '总计：'+parseFloat((totalprice.total-totalprice.save)).toFixed(2)+'(元)'+'\n';
    soulte+='节省：'+parseFloat(totalprice.save).toFixed(2)+'(元)\n';
    soulte+='**********************';
    return soulte;
}


