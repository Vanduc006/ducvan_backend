import mysqlDump from 'mysqldump'

mysqlDump({
    host: 'localhost',
    user: 'root',
    password: '@Matkhau12345',
    database: 'ducvan',
    dest:'./data.sql' // destination file 
},function(err){
    // create data.sql file; 
})