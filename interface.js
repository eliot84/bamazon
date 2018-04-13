var mysql = require("mysql");
var inquirer = require("inquirer");
var bamazonCustomer = require("./bamazonCustomer.js");

//bamazonCustomer.readItems();

bamazonCustomer.readItems();




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
    console.log( "You want: ID: " + user.id + " " + "Unit: " + user.unit );
  });
}
