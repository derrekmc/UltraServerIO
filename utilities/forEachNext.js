function asyncForEachNext(items, iterator, done, spreadAffinityOneToTen) {

    var isArr = Object.prototype.toString.call(items) == '[object Array]';

    // Check the type of the input fields and make sure they are the correct type. If incorrect values are passed. Exit the function by calling done and pass the error.
    if(typeof(items) != 'object' || items === null || items.length === 0 || !isArr) {
        console.error("No list passed");
        if(done){
            done("empty array passed");
        }
        return;
    }

    var todo = items.concat();
    var completedCalled = false;
    var forLoop = null;
    var spread = 0;

    if(spreadAffinityOneToTen){
        spread = Math.random()*spreadAffinityOneToTen+1; //Used to prevent a continuous IO block from a strenuous parallel for loop
    }

    function complete(err, result){
        if(completedCalled === true) {
            return;
        }
        completedCalled = true;
        todo = [];
        clearTimeout(forLoop);

        if(done){
            done.apply(done, arguments);
        }
    }

    if(!todo) {
        complete("invalid array passed");
    }else{
        forLoop = setTimeout(
            function next() {
                if(todo.length > 0) {
                    /**
                     * iterator(todo.shift(), next, complete);
                     * iterator(function, next, complete);
                     **/
                        // First variable is the Array.shifted Item (The next iteration of the functions on the to do list)
                        // Second variable is the next() function. The next() function is used inside the loop to immediately jump to the next function in the Array of functions/iterators
                        // The last pass in variable is the complete() function. This function ends the loop immediately and stops all asyncronous executions of itself.
                    iterator(todo.shift(), next, complete);
                }else if(completedCalled == false){
                    complete(null, 0); // nothing found/complete was called early so we have reached the end of our array. Exit(Call Complete).
                }
            }, spread);
    }

}

module.exports = asyncForEachNext;

