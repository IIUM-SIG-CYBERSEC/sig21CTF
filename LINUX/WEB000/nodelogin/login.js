const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const { exec } = require("child_process");
const flag_1 = "sig21CTF{wh0_s4id_1_need_passw0rd_t0_l0g1n}"
const flag_2 = "sig21CTF{n0t_0nl7_c4t_c4n_v13w_f1l3s}"
const flag_3 = "sig21CTF{1_though7_1t_w4s_s3cur3d_t0_st0r3_th3_55h_k3y5_h3r3}"
const flag_4 = "sig21CTF{y0u_ju5t_g0tt4_l34rn_5tuff_0n_y0ur_0wn}"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'abuyusif',
    password: 'abuyusif',
    database: 'nodelogin'
});

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));


app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});


app.post('/auth', function (request, response) {

    let username = request.body.username;
    let password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.get('/home', function (request, response) {

    if (request.session.loggedin) {
        response.redirect('/dash');
    } else {

        response.send('Please login to view this page!');
    }
    response.end();
});

app.get('/dash', (request, response) => {
    if (request.session.loggedin) {
        exec(`echo ${flag_1} > flag_1: ${flag_1}`, () => { })
    }
    response.sendFile(path.join(__dirname + '/dashboard.html'));
});

const sanitize = (value) => {

    blocked = {
        "cat": "cat",
        "less": "less",
        "more": "more",
        "strings": "strings",
        "head": "head",
        "tail": "tail",
    }
    return Object.values(blocked).includes(value.split(' ')[0])
}

app.post('/dash', (request, response) => {

    if (request.session.loggedin) {
        let command = request.body.command;
        !command ? response.send('Enter some command brooo!!!') :
            !sanitize(command) ?
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        // console.log(`error: ${error.message}`)
                        response.end()
                    }
                    if (stderr) {
                        // console.log(`error: ${stderr}`)
                        response.end()
                    }
                    // console.log(stdout)
                    response.send(stdout)
                    response.end()
                }) : response.send(`<b>${command.split(' ')[0]}</b> is blacklisted by the admin :(`)

    }
    else {
        response.send('<script>alert("Need to login")</script>')
        response.end()
    }
})

app.listen(3000);