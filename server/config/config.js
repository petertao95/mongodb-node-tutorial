// Setup environment
var env = process.env.NODE_ENV || 'development';
if(env === 'production') {
  process.env.MONGODB_URI = 'mongodb://petertao:seastheday@ds157723.mlab.com:57723/breadcrumbs';
} else if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/breadcrumbs';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/breadcrumbs_test';
}
