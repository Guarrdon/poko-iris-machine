import * as express from 'express';

export default class ViewRouter {
  
  public static configure(app:express.Application) {
    
    //Root route
    app.get('/', function (req, res) {
      res.send('Welcome to Battleship (for beginners)')
    });  

  }
}
