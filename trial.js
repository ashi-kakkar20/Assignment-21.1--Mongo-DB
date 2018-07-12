db.createCollection("employee", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "Ename", "department", "designation" ],
          properties: {
             Ename: {
                bsonType: "string",
                description: "must be a string and is required"
             },
             department: {
                enum: [ "clerical staff", "support staff", "ops staff", "development staff","management staff","logistic staff" ],
                description: "can only be one of the enum values and is required"
 
             },
 designation: {
                enum: [ "Clerk", "Support", "Ops", "Developer", "Manager","Logistics"],
                description: "can only be one of the enum values and is required"
             },
             salary: {
                bsonType: "int",
                minimum: 3000,
                maximum: 50000,
                description: "must be an integer in [ 3000, 50000] and is required"
             },
             dateofjoining : {
                bsonType:"date",
                description: "must be a date"
             },
            cities : {
                enum: [ "Delhi", "Bangalore", "newyork", "california", "singapore"],
                description: "can only be one of the enum values and is required"
             }
          }
       }
    }
 });

db.employee.aggregate(
    [
        {
            $group:
            {
                designation:
                {
                    $cond: { if: { $eq: [ "$department", "clerical staff" ] }, then: "clerk", else: "" }
                }
                
            }
        }
    ]
)


db.employee.insertMany([
    {
    "_id": "E101", "Ename" : "John Mathews", "department":"clerical staff","designation":"Clerk", "salary":NumberInt(4000), "dateofjoining": new Date('Mar 21, 2015') ,"cities":"Delhi"
    },
    {
    "_id": "E102", "Ename" : "Richard Jones", "department":"development staff","designation":"Developer","salary":NumberInt(40000), "dateofjoining":new Date('Jun 21, 2015'),"cities":"Bangalore"
    },
    {
    "_id": "E103", "Ename" : "Ricky Behl", "department":"ops staff","designation":"Ops", "salary":NumberInt(42000), "dateofjoining":new Date('Jul 03, 2015'),"cities":"newyork"
    },
    {
    "_id": "E104", "Ename" : "Martin Luther", "department":"management staff","designation":"Manager", "salary":NumberInt(50000), "dateofjoining":new Date('Aug 21, 2017'),"cities":"california"
    },
    {
    "_id": "E105", "Ename" : "Robert Wade", "department":"development staff","designation":"Developer", "salary":NumberInt(40000), "dateofjoining":new Date('Jan 30, 2015'),"cities":"singapore"
    },
    {
    "_id": "E106", "Ename" : "Stephen Jewings", "department":"logistic staff","designation":"Logistics", "salary":NumberInt(20000), "dateofjoining":new Date('Jul 15,2016'),"cities":"Delhi"
    },
    {
    "_id": "E107", "Ename" : "Qing Chang", "department":"development staff","designation":"Developer", "salary":NumberInt(40000), "dateofjoining":new Date('Jun 21, 2014'),"cities":"Bangalore"
    },
    {
    "_id": "E108", "Ename" : "James Anderson", "department":"support staff","designation":"Support", "salary":NumberInt(5000), "dateofjoining":new Date('Jun 21, 2015'),"cities":"Bangalore"
    },
    {
    "_id": "E109", "Ename" : "Julie Westwood", "department":"ops staff","designation":"Ops", "salary":NumberInt(40000), "dateofjoining":new Date('Feb 21, 2017'),"cities":"newyork"
    },
    {
    "_id": "E110", "Ename" : "Selena Williams", "department":"development staff","designation":"Developer", "salary":NumberInt(40000), "dateofjoining":new Date('Jun 21, 2016'),"cities":"Bangalore"
    }
    
    ]);
    

   db.employee.aggregate( [ { $project : { _id: 0, designation:1 } } ] ).pretty()
   db.employee.find( { salary: { $gt: 7000 } } ).pretty()
   db.employee.find().sort( { dateofjoining: -1 } ).pretty()
   db.employee.find().sort( { salary: 1 } ).pretty()
   db.employee.find( { $and: [ { salary: { $gt: 5000 } }, { salary: { $lt: 40000 } } ] } ).pretty()
   db.employee.find( { designation: { $ne: "Developer" } } ).pretty()
   db.employee.find().sort( { cities: -1 } ).pretty()
   db.employee.find( { $and: [ { cities: { $eq: "singapore" } }, { salary: { $gt: 8000 } } ] } ).pretty()
   db.employee.drop()
   db.employee.find()