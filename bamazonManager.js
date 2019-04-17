var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connection successful!");

    managerMenu()
});

    var managerMenu = function () {
        inquirer.prompt(

            {
                name: "action",
                type: "list",
                message: "Manager Menu",
                choices: [
                    "Product for Sale",
                    "Low Inventory", 
                    "Add to Inventory", 
                    "Add New Product", 
                    "Exit"
                ]
            }).then(function(answer){
            switch(answer.action) {

                case "Product for Sale":
                productSale();
                break;
                case "Low Inventory":
                lowInventory();
                break;
                case "Add to Inventory":
                addToInventory();
                break;
                case "Add new Product":
                addNewInventory();
                break;
                case "Exit":
                connection.end();
                break;

            }
        });

    }
        function productSale() {
            connection.query("SELECT * FROM   products", function (err, res) {
                for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + "\n");
        }
      
    });
}

function lowInventory() {
    connection.query("SELECT * FROM   products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
        console.log(res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + "\n");
            }
}

});
}

function addToInventory() {
    connection.query("SELECT * FROM   products", function (err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + "\n");
      }
      promptUser(res);
    })
  }
  var promptUser = function (res) {
    inquirer.prompt([
      {
        type: "input",
        name: "choice",
        message: "What item would you like to add to? [Exit with E]"
      }
    ]).then(function (updateQuant) {
      var correct = false;
      if (updateQuant.choice.toUpperCase() == "E") {
        process.exit()
      };
      for (var i = 0; i < res.length; i++) {
        if (res[i].product_name == updateQuant.choice) {
          correct = true;
          var product = updateQuant.choice;
          var id = i;
          inquirer.prompt({
            type: "input",
            name: "quant",
            message: "How much would you like to add?",
            validate: function (value) {
              if (isNaN(value) == false) {
                return true;
              } else {
                return false;
              }
            }
          }).then(function (updateQuant) {
            if ((res[id].stock_quantity + updateQuant.quant) > 0) {
              connection.query("UPDATE products SET stock_quantity='" + (res[id].stock_quantity + updateQuant.quant) + "' WHERE product_name='" + product + "'", function (err, res2) {
                console.log("Updated Quantity!");
                start();
              })
            } else {
              console.log("Not a valid selection!");
              promptUser(res);
            }
          })
        }
      }
      if (i == res.length && correct == false) {
        console.log("Not a valid input");
        promptUser(res);
      }
    })
  }