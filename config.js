module.exports = {
    maxUsersPerPage :100,
    defaultPageNumber : 0,
    jwtTTL: 60*60,
    dbConfig: {
        dbName: "shyftplan",
        username: "root",
        password: "root"
    },
    serverKeys: {
        secret : "abcdefuyio098655gnnmbg677"
    },
    saltRounds:10
};
