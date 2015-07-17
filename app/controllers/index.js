var net = require("/net");

var products = null;
Ti.API.info("Make REST Call");
net.download({
	url: 'https://raw.githubusercontent.com/sandeepm212/appcelerator/master/products.json',
    type: 'json',
    success: function (success) {
        products = success;
        Ti.API.info(success);
    },
    error: function (error) {
        Ti.API.info(error);
    }
});

$.products.sections[0].setItems(products);

(function () {
	Ti.API.info("Make REST Call");	
})();

$.index.open();
