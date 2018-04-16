var mysql = require("mysql");
var inquirer = require("inquirer");
var connection;
var newConnection = function(){
      connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "bamazon"
    });
    connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
  });
}
var catalogue = [];
var insertItem = function(product, department, price, stock_quantity){
  //product, department, price, stock_quantity
  var queryString = 'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (' + '"' + product + '"' + ', ' + '"' + department + '"' + ', ' + price + ', ' + stock_quantity + ')';
  connection.query(queryString, function(err, res){
    if (err) throw err;
//console.log(res);
  });
}
/*
exports.readItems = function(){
  console.log("it works!");
}
*/
exports.readItems = function(){
    newConnection();
    var queryString = 'SELECT * FROM products';
    connection.query(queryString, function(err, res){
      if(err) throw err;
      catalogue = res;
      console.log("");
      console.log("THE BAMAZON CATALOGUE: ");
      console.log("");
      for(i = 0; i < res.length; i++){
        console.log("Item ID: " + res[i].item_id);
        console.log("Product: " + res[i].product_name);
        console.log("Department: " + res[i].department_name);
        console.log("Price: " + res[i].price);
        console.log("Quantity: " + res[i].stock_quantity);
        console.log("");
        console.log("");
      }
      connection.end();
 // console.log("The cat: " + catalogue);
      promptUser();
    });
  }
var placeOrder = function(id, quantity){
    newConnection();
  //is there enough of the item?
  var condition = catalogue[id - 1].stock_quantity - quantity;
  console.log("condition: " + condition);
  if(condition < 0) {
    console.log("Insufficient quantity!");
  }
  //There is enough of the item to buy
  else{
    var item_id = id - 1;
    var price = catalogue[item_id].price;
    var total = price * quantity;
    var queryString = 'UPDATE products SET stock_quantity = ' + condition + ' WHERE item_id = ' + id;
    
    connection.query(queryString, function(err, res){
      if(err) throw err;
      connection.end();
    });
    console.log("Your total is: $" + total + ".00 Come again!!");
  }
}
//Prompt user to determine what they wish to buy
var promptUser = function(){
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Please enter the ID for the product you would like to buy:"
    },
    {
      type: "input",
      name: "unit",
      message: "How many units would you like to buy?"
    }
  ]).then(function(user){
    placeOrder(user.id, user.unit);
  });
}
/*
  var customerPrompt = function(){
  inquirer.prompt([
  {
    type: "list",
    name: "doThis",
    message: "What would you like to do?",
    choices: ["Show Catalogue", "Buy Item"]
  }
    ]).then(function(user){
      
    });
}
*/