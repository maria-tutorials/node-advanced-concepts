//  node {filename}.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// timers, tasks, operations are recorded from the file running
filename.executeContents();

function shouldContinue() {
    // Check one: Any pending setTimeout, setInterval, setInmmediate ?
    // Check one: Any pending OS tasks? (lise server listening to port)
    // Check one: Any pending long running operations? (like fs moddule ones)

    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// Everything runs in one 'tick'(lap)
while (shouldContinue()) {
    // 1) Check if any pendingTimers(setTimeout, setInterval) callback functions are ready to be called
    // 2) Check pendingOSTasks and pendingOperations and call relevant callbacks 
        // ^ most of the work happens here


    // 3) pause execution temporarily. Continue when...
        // - a new pendingOSTask is done
        // - a new pendingOperation is done
        // - timer is about to expire

    // 4) Look at pendingTimers(for setImediate)

    // 5) Handle 'close' events
       // .on('close', ()=>{})
}

// exit program
