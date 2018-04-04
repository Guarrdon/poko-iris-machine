import * as express from 'express';
import views from './views/routes';
import api from './api/routes';

const port = process.env.PORT || 3000
const app = express();

views.configure(app);
api.configure(app);

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
