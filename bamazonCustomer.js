var mysql = require("mysql");
var inquirer = require("inquirer");



var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});


connection.connect(function(err){
  if(err) throw err;
  console.log("connected as id " + connection.threadId);
  //insertItem("pizza", "food", 7.00, 1);
  //readItems();
  connection.end();
});

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

exports.readItems = function(callback){
    var queryString = 'SELECT * FROM products';

    connection.query(queryString, function(err, res){
      if(err) throw err;
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
    });
  }
