var item = require('./datbase').loadAllItems();
 var promotion = require('./datbase').loadPromotions();

module.exports = function printInventory(inputs) {
   var  data=removeRepeat(inputs);
   var  items=readItem(data,item);
    var promotionitem=promptionShoping(items,promotion);
    var  totalprice=total(items,promotionitem);
     var resultpr=printresult(items,promotionitem,totalprice);
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
    for(let i=0;i<result.length;i++)
    {
        var obj={};
        var count=0;
        for(let j=0;j<input.length;j++)
        {
            if(result[i].length>10)
            {
                var x=result[i].split();
                obj.id=x[0];obj.count=x[1];
                res.push(obj);
                break;
            }
            if(result[i]===input[i])
            {
                count++;
            }
        }
        obj.id=result[i];
        obj.count=count;
        res.push(obj);
    }
    return res;
}
function readItem(data,item) {
    var result=new Array();

      for(let j=0;j<data.length;j++)
      {
          var obj={};
          for(let i=0;i<item.length;i++)
       {
          if(data[j].id===item[i].barcode)
          {
              obj.id=data.id;
              obj.name=item.name;
              obj.num=data[j].count;
              obj.unit=item.unit;
              obj.price=item.price;
              obj.sumprice=obj.price*obj.count;
              result.push(obj);
              break;
          }
       }
      }
         return result;
}
function promptionShoping(items,promotion) {
    var promotionItem=new Array();

    for(let i=0;i<items.length;i++)
    {
        var obj={};
        for(let j=0;j<promotion[0].barcodes.length;j++)
        {
            if(items[i].id===promotion[0].barcodes[j]&&items[i].count>=3)
            {
                     obj.name=items[i].name;
                     obj.count=items[i].count/3;
                     obj.unit=items[i].unit;
                     obj.price=items[i].price;
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
    for(let i=0;i<items.length;i++)
    {
        obj.total+=items[i].sumprice;
    }
    for(let j=0;j<promotionitem.length;j++)
    {
       obj.save+=promotionitem[j].price*promotionitem[j].count;
    }
    return obj;
}
function printresult(items,promotionitem,totalprice) {
    var soulte='***<没钱赚商店>购物清单***\n';
    for(let i=0;i<items.length;i++)
    {
        soulte+= '名称：'+items[i].name+'，数量：'+items[i].count+items[i].unit+'，单价：'+items[i].price+'(元)，小计：'+items[i].sumprice+'(元)\n';
    }
    soulte+='----------------------\n';
    soulte+='挥泪赠送商品：\n';
    for(let j=0;j<promotionitem;j++)
    {
        soulte+='名称'+promotionitem[j].name+'，数量：'+promotionitem[j].count+promotionitem[j].unit+'\n';
    }
soulte+= '----------------------\n';
    soulte+= '总计：'+totalprice.total+'(元)'+'\n';
    soulte+='节省：'+totalprice.save+'(元)\n';
    soulte+='**********************';
    return soulte;
}