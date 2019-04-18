MONGODB & MONGOOSE REVIEW

What do we need to run?

##Always:
-having 'mongod' running ('gomongo' on mac?) -- run the server -- in a terminal somewhere else

##Testing:
-'npm run test:watch'

##Dev server (Seeing stuff in a browser, postman)
-'npm run start:watch' or 'npm start'


##Mongo DB
-collection/document based data model
-Data is stored in JSON like documents


## Databases vs Collections vs Documents
-Databases hold collections (entire spreadsheet in excel)
-Collections hold documents (individual sheet in excel) - all live inside of one database
-Documents hold data (row in excel)

MONGODB_URI=mongodb://localhost:27017/twitter_clone    twitter_clone is the name of the database

## Mongoose
- ODM - object Document Mapping ==> creates a map of documents 
- a schema maps to a collection and specifices the shape of each document in that collection should take; defines specific fields and types
    *String
    *Number
    *Date, buffer, boolean, mixed, objectId, array (put square brackets around the type ex: type: [String]  not type: array), decimal128, map

##Validators
- built in:
    * required - makes the field non-optional
    * unique
    * default
    * select - boolean whether the field should be returned 
    * validate - function to validate the field

- String only:
    * lowercase, uppercase
    * trim - trim off whitespace
    * match - regex that the field must match
    * enum - array of strings it must match
    * min and max length

- Number only
    * `min` - field must be greater than or equal to min
    * `max` - field must be less than or equal to max

- Date only
    * `min`
    * `max`

- Custom:

    A custom validate function can be added to a field:

    ```js
    var personSchema = new Schema({
    phone: {
        type: String,
        validate: {
        validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Person phone number required']
    }
    });
```
