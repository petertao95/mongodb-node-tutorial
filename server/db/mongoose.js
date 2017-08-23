var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://petertao:seastheday@ds157723.mlab.com:57723/breadcrumbs', { useMongoClient: true });

module.exports = {mongoose};
