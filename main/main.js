var item = require('./datbase').loadAllItems();
 var promotion = require('./datbase').loadPromotions();

module.exports = function printInventory(inputs) {
   var  data=removeRepeat(inputs);
   var  items=readItem(data,item);
    var promotionitem=promptionShoping(items,promotion);
    var simpletotal=simpleTotal(items,promotionitem);
    var  totalprice=total(items,promotionitem);
     var resultpr=printresult(items,promotionitem,totalprice,simpletotal);
    console.log(resultpr);
   // return 'Hello World!';
};

function removeRepeat(input) {
    if(input==='')return;
    var result=new Array();
    var res=new Array();
    result[0]=input[0];
    var boo=true;
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
    var result=new Array();
      for(let j of data)
      {
          var obj={};
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
    var promotionItem=new Array();

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
    var obj={};
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
    var soulte='***<没钱赚商店>购物清单***\n';
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


