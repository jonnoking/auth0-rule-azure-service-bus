var moment = require('moment');
var azure = require('azure');
var ep = 'Endpoint=sb://...';  // exclude ;EntityPath=... otherwise an error is thrown
var queue = '...';

module.exports = function (ctx, cb) {
    var serviceBusService = azure.createServiceBusService(ep);

    serviceBusService.receiveQueueMessage(queue, function(error, receivedMessage){
        if(!error){
            // message validation required
            var uc = JSON.parse(receivedMessage.body);
            cb(null, uc);
        } else {
            cb(error, '');
        }
    });
}