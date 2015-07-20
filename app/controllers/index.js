var net = require("/net");


Ti.API.info("Make REST Call");
net.download({
	url: 'https://raw.githubusercontent.com/sandeepm212/appcelerator/master/products.json',
    type: 'json',
    success: function (productsInfo) {
        $.products.sections[0].setItems(productsInfo);
        Ti.API.info(productsInfo);
    },
    error: function (error) {
        Ti.API.info(error);
    }
});



(function () {
	Ti.API.info("Make REST Call");	
})();

$.index.open();
