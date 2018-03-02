var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
const app=express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect("mongodb://127.0.0.1/Employee");
app.use(express.static(__dirname + '/client'));

//create a Model
var Employee = mongoose.model("employees", mongoose.Schema({
    name:String,
    dept:String,
    area:String,
    contact:String,
    status:String,
    salary:String
}));

app.get('/view', function(req,res){
    Employee.find(function(err,employees){
        if(err)
            res.send(err);
        console.log(employees);
        res.send(employees);
    });
});
app.get('/view/:name', function(req,res){
    Employee.findOne({name:req.params.name},function(err,employees){
        if(err)
            res.send(err);
        console.log(employees);
        res.send(employees);
    });
});
app.post('/add', function(req,res){
    var emp_inst = new Employee({
        "name":req.body.name,
        "dept":req.body.dept,
        "area":req.body.area,
        "contact":req.body.contact,
        "status":req.body.status,
        "salary":req.body.salary
    });
    emp_inst.save(function(err){
        if(err)
            return err;
        else
            console.log("saved!");
    })
});
app.delete('/delete/:name',function(req,res){
    Employee.findOneAndRemove({name:req.params.name},function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.put('/view/update/:name',function(req,res){
    console.log("entered put!",req)
    var update_Params ={
        "dept":req.body.dept,
        "area":req.body.area,
        "contact":req.body.contact,
        "status":req.body.status,
        "salary":req.body.salary
    };
    console.log("Server : ",update_Params);
    console.log(req.params.name)
    Employee.findOneAndUpdate({name:req.params.name}, update_Params, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

app.listen(3000,function(){
    console.log("Server Listening on Port 3000")
})