const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

io.on('connection', function(socket) {
    console.log('\u001b[1;33m[server]\u001b[0\u001b[22m\u001b[90m A user has connected: ' + '\u001b[32m' + socket.id + '\u001b[0m');

    console.log('\n\u001b[1;35mBOLD\u001b[0m')
    console.log('\u001b[0mNORMAL')

    socket.on('disconnect', function () {
        console.log('\u001b[1;33m[server]\u001b[22m\u001b[90m A user has disconnected: ' + '\u001b[31m' + socket.id + '\u001b[0m');
    })
});

// io.on('connection', function(socket) {
//     console.log('\u001b[1;33m[server]\u001b[0m\u001b[90m A user has connected: ' + '\u001b[32m' + socket.id + '\u001b[0m');

//     socket.on('disconnect', function () {
//         console.log('\u001b[1;33m[server]\u001b[0m\u001b[90m A user has disconnected: ' + '\u001b[31m' + socket.id + '\u001b[0m');
//     })
// });


http.listen(3000, function () {
    // console.log('\n\u001b[100m\u001b[32m[success]\u001b[0m\u001b[90m\u001b[3m Server started\u001b[24m!\u001b[25m\u001b[23m\n');
    console.log('\n\u001b[100m\u001b[32m[success]\u001b[0m\u001b[90m\u001b[3m Server started\u001b[24m!\u001b[25m\u001b[23m\n');
});