const app = require('./server');
require('dotenv').config();

app.listen(process.env.PORT_SERVER_DEV, () => console.log(`Server running in port ${process.env.PORT_SERVER_DEV}`))