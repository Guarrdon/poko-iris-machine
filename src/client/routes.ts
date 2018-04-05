import * as express from 'express';

export default class ViewRouter {
  
  //Used mostly for view redirects
  public static configure(app:express.Application) {
    
    app.get('/welcome', function (req, res) {
      res.send('Welcome to Poko-Iris-Machine')
    });  

  }
}
