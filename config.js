module.exports = {
    maxUsersPerPage :100,
    defaultPageNumber : 0,
    jwtTTL: 60*60,
    bearerString: 'bearer',
    invalidCredentials: 'invalid credentials',
    dbConfig: {
        dbName: "shyftplan",
        username: "docker",
        password: "docker"
    },
    serverKeys: {
        secret : "abcdefuyio098655gnnmbg677"
    },
    saltRounds:10
};
