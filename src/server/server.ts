import * as express from 'express';
//import views from './client/routes';
import api from './api/routes';

const port = process.env.PORT || 3000
const app = express()

//views.configure(app);
api.configure(app);
app.use(express.static('dist/client'))

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`Game server is listening on ${port}`)
})
