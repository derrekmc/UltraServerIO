var assert = require('assert');
var ultraIO = require("../");

describe('Ultra Server IO test suite', function(test){

    this.timeout(20000);

    it('Tested forEachNext ', function(done){
        
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
        
    });
    
    it('Tested forEachNext with auto end', function(done){
        
        var arrayTest = ['testing1', 'testing2', 'testing3'];
        ultraIO.forEachNext(arrayTest, function(element, next, done){
            if(element == 'testing2'){
                //just loop and do nothing we want auto end
            }
            next();    
        }, function(err, results){
            assert(err === null, "Error something went wrong.");
            assert(results === 0, "Nothing found in the loop so end with 0 results");
            done();
        });
        
    });
    
    it('Tested forEachNext with error end', function(done){
        
       var arrayTest = ['testing1', 'testing2', 'testing3'];
       ultraIO.forEachNext(arrayTest, function(element, next, done){
            if(element != 'eric'){
                done('Cant find eric');
            }
            next();    
        }, function(err, results){
            assert(err === 'Cant find eric', "Error something went wrong.");
            assert(results === undefined || results === null, 'No results should be passed');
            done();
        });
        
    });
    
    it('Tested forEachParallel', function(done){
        
        var arrayTest = ['testing1', 'testing2', 'testing3'];
        var i = 0;
        ultraIO.forEachParallel(function(done){
            if(arrayTest[i] == 'testing2'){
                done(null, 'Found testing2');
            }
            i++;
        }, function(err, results){
            assert(err === null, "Error something went wrong.");
            assert(results === 'Found testing2', 'No results should be passed');
            done();
        });
        
    });
    
    it('Tested forEachParallel nested forEach', function(done){
        
        var i = 0;
        ultraIO.forEachParallel(function(done){
            
            if(i >= 100){
                done(null, i + ' Loops Completed.');
            }
            
            var arrayTest = ['testing1', 'testing2', 'testing3'];
            ultraIO.forEachNext(arrayTest, function(element, next, done){
                if(element == 'testing2'){
                    done(null, 'Found testing2');
                }
                next();    
            }, function(err, results){
                i++;
            });
            
        }, function(err, results){
            assert(err === null, "Error something went wrong.");
            assert(results === i + ' Loops Completed.');
            done();
        }, 100, 10);
        
    });
    
    it('Tested forEachParallel 1,000 Loops with error ending', function(done){
        
        var i = 0;
        ultraIO.forEachParallel(function(done){
            if(i >= 1000){
                done("Error: !I just felt like erroring out on this");
            }
            i++;
        }, function(err, results){
            assert(err === "Error: !I just felt like erroring out on this", "Should error something went wrong.");
            assert(results === undefined || results === null, 'No results should be passed');
            done();
        }, 100);
        
    });
    
    it('Tested forEachParallel 10,000 Loops with 100 limit', function(done){
        
        var i = 0;
        ultraIO.forEachParallel(function(done){
            if(i >= 10000){
                done(null, i + ' Loops Completed.');
            }
            i++;
        }, function(err, results){
            assert(err === null, "Error something went wrong.");
            assert(results == i + ' Loops Completed.');
            done();
        }, 100, 10);
        
    });
   
    it('Tested forEachParallel 100,000 Loops with 1000 limit 100 spread', function(done){
        
        var i = 0;
        ultraIO.forEachParallel(function(done){
            if(i >= 100000){
                done(null, i + ' Loops Completed.');
            }
            i++;
        }, function(err, results){
            assert(err === null, "Error something went wrong.");
            assert(results === i + ' Loops Completed.');
            done();
        }, 1000, 100);
        
    });
    
    it('Tested forEachParallel 1,000,000 Loops with 1000 limit 100 spread', function(done){
        
        var i = 0;
        ultraIO.forEachParallel(function(done){
            if(i >= 1000000){
                done(null, i + ' Loops Completed.');
            }
            i++;
        }, function(err, results){
            assert(err === null, "Error something went wrong.");
            assert(results === i + ' Loops Completed.');
            done();
        }, 1000, 100);
        
    });
    
    
    it('Tested forEachParallel 2,500,000 Loops with 2500 limit 250 spread', function(done){
        
        var i = 0;
        ultraIO.forEachParallel(function(done){
            if(i >= 2000000){
                done(null, i + ' Loops Completed.');
            }
            i++;
        }, function(err, results){
            assert(err === null, "Error something went wrong.");
            assert(results === i + ' Loops Completed.');
            done();
        }, 2500, 250);
        
    });
    
    it('Tested forEachParallel 5,000,000 Loops with 5000 limit 500 spread', function(done){
        
        var i = 0;
        ultraIO.forEachParallel(function(done){
            if(i >= 5000000){
                done(null, i + ' Loops Completed.');
            }
            i++;
        }, function(err, results){
            assert(err === null, "Error something went wrong.");
            assert(results === i + ' Loops Completed.');
            done();
        }, 5000, 500);
        
    });
    
    it('Tested forEachParallel 10,000,000 Loops with 10000 limit 1000 spread', function(done){
        
        var i = 0;
        ultraIO.forEachParallel(function(done){
            if(i >= 10000000){
                done(null, i + ' Loops Completed.');
            }
            i++;
        }, function(err, results){
            assert(err === null, "Error something went wrong.");
            assert(results === i + ' Loops Completed.');
            done();
        }, 10000, 1000);
        
    });
    
    
    
});