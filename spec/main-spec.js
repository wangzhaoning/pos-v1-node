const printInventory = require('../main/main');
const readItem= require('../main/main');
//const loadAllItems=require('../main/dabase');
describe('pos', function () {
    var inputs = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
];
    it('选出给定区间中项目', function() {
        var result = readItem(inputs);
        expect(result).toEqual('名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：6.00(元)'+
        '名称：羽毛球，数量：5个，单价：1.00(元)，小计：4.00(元)'+
        '名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)');
    });
    beforeEach(function () {
      //  allItems = require('../main/datbase').loadAllItems();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });
    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});