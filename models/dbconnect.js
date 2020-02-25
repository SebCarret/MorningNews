const mongoose = require('mongoose');

var options = {
   connectTimeoutMS: 5000,
   useNewUrlParser: true,
   useUnifiedTopology: true
  };

mongoose.connect(process.env.MONGODB_URL,
  options,
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.info('BDD Morning News OK');
    }
  }
);

module.exports = mongoose;
