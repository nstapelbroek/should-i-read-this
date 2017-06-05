/**
 * To prevent issues with cntrl + c in a container we hook into signal handeling to cleanly exit the container or environment 
 * if our app is asked to.
 * 
 * Sourse: https://github.com/moby/moby/issues/2838#issuecomment-288740934
 */
function signalHandler() {
    [
        'SIGINT',
        'SIGTERM'
    ].forEach((signal) => {
        process.on(signal, () => {
            console.log(`Quitting... Reason: ${signal}`);
            process.exit();
        });
    });
}

module.exports = signalHandler;