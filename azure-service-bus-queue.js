function (user, context, callback) {
  var azure = require('azure');
  var ep = configuration.ASB_ENDPOINT;
  var queue = configuration.ASB_QUEUE;
  
  var uc = {};
  uc.user = user;
  uc.context = context;
  
  var serviceBusService = azure.createServiceBusService(ep);
    var message = {
      body: JSON.stringify(uc),
      contentType: 'application/json+auth0',
    };
   
  serviceBusService.sendQueueMessage(queue, message, function(error){
        if (!error) {
            callback(null, user, context);
        } else {
            callback(error, user, context);
        }
    });   
}