import {coinFlip, coinFlips, countFlips, flipACoin} from "./modules/coin.mjs"
import express from "express";
import minimist from "minimist";
const app = express();

const args = minimist(process.argv.slice(2));
args['port'];
const port = args.port ||process.env.port|| 5000;

const server = app.listen(port, () => {
    console.log(`App is running on port %PORT%`.replace(`%PORT%`,port))
     })
    

//multiple flips endpoint
app.get("/app/flips/:number", (req, res) =>{
    let flipsArr = coinFlips(req.params.number);
    res.status(200).json({ "raw" : flipsArr }, {"summary": countFlips(flipsArr)})
    res.type("text/plain")
})  

//flip with heads guess endpoint
app.get("/app/flip/call/heads", (req, res) =>{
    let result = flipACoin("heads");
    res.status(200).json({"call" : result.call, "flip" : result.flip, "result" : result.result})
    res.type("text/plain")
})

//flip with tails guess endpoint
app.get("/app/flip/call/tails", (req, res) =>{
    let result = flipACoin("tails");
    res.status(200).json({"call" : result.call, "flip" : result.flip, "result" : result.result})
    res.type("text/plain")
})

//flip endpoint
app.get("/app/flip", (req, res) =>{
    res.status(200).json({ "flip" : coinFlip() })
    res.type("text/plain")
})

 //default endpoint
app.get("/app", (req, res) =>{
    //res.status(200).end("OK")
    //res.type("text/plain")
     res.statusCode = 200;
     res.statusMessage = 'OK';
     res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
     res.end(res.statusCode+ ' ' +res.statusMessage)
      
//endpoint for nonexistent URL
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND');
    res.type("text/plain")
 });
 })