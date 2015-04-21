# UltraServerIO
A set of fast, high concurrency non blocking IO utilities that will handle any load. 

Looping that is completely non blocking and can easily do 10 million loops

Check out npm test for more examples / details

forEachNext is the forEach statement that doesnt continue until you tell it too

var ultraIO = require('UltraServerIO');
var assert = require('assert');

var arrayTest = ['testing1', 'testing2', 'testing3'];

ultraIO.forEachNext(arrayTest, function(element, next, done){
    if(element == 'testing2'){
        done(null, 'Found testing2');
    }
    next();    
}, function(err, results){
    assert(err === null, "Error something went wrong.");
    assert(results === 'Found testing2', "Error testing2 not found");
    done();
});
