# Eat tha Burger App

### Description
Eat the Burger is a fun app that allows users to not only "devour" a burger listed in the preset menu, but they can delete it dynamically from the page, as well as create their own burger! Once they add a burger, that data will flow back to the mySQL Database for later use.

### Deployment
This application is deployed on heroku via [this link](https://eat-the-burger-brandon-l.herokuapp.com/)

If you would like to deploy this application locally, please ensure to install the following packages:
    npm install express
    npm install express-handlebars
    npm install mysql

run ```node server.js``` from the ```server.js``` file.

### Routing
I chose to create the routes separately from the logic base, so it was more legible.
    const router = require('express').Router();
    const burgerRoutes = require('./burger');

    router.use('/burgers', burgerRoutes);

    module.exports = router;

### HTML Template (Handlebars)
I used Handlebars as my templating language. below is a code snippet for the dynamically built buttons/data for each burger in the database
```<div class='col-md-6'>
        <h4>Menu Of Burgers:</h4>
        <ul id='toEat'>
            {{#each burgers}}
                {{#unless devoured}}
                    <li><p>{{burger_name}}</p><button class='updateMe' data-id={{id}} data-devour={{devoured}}>Devour</button> </li>
                {{/unless}}
            {{/each}}
        </ul>
    </div>
```

### Front End JQuery 
On the front end, I used JQuery to manipulate the DOM based off user input. 
```$.ajax('/api/burgers', {
            type: 'post',
            data: newBurger
        }).then(function(burger) {
            console.log('added new burger');
            //dynamically creates devour buttons for newly added burgers
            let li = $('<li>');
            let p = $('<p>').text(newBurger.burger_name);
            let button = $('<button>').text('Devour').addClass('updateMe').attr('data-id', burger.id).attr('data-devour', newBurger.devoured);

            $(li).append(p, button);
            $('#toEat').prepend(li);
            $('#burgerInput').val('')
        })
```

### Models 
I chose to keep my models separate from my routing in order to make things easier to scale, and create more legible code across each module.
   ```let burger = {
    selectAll: function(cb) {
        orm.selectAll('burgers', function(res) {
            cb(res);
        });
    },
    insertOne: function(columns, values, cb) {
        orm.insertOne('burgers', columns, values, function(res) {
            cb(res);
        });
    }
```

### Technologies Used
- Express
- Express Handlebars
- ORM (Object Relational Modules)
- MVC (Model View Controller)
- JQuery
- Bootstrap
- MySQL
- Node
