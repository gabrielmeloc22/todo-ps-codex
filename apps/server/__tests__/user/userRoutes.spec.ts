const request = require("supertest");

const testUserJson = {
    "email":"gab@gmail.com",
    "name":"kin",
    "lastName": "costa",
    "password":"40028922"
}

const loginUserJson = {
    "email":"gab@gmail.com",
    "password":"40028922"
}

const resetTest = async () => {
    const getInfo = await request(`http://localhost:3001`).post(`/user/login`)
        .send(loginUserJson)

    let userId = getInfo._body.User.id;
    let userToken = getInfo._body.token;

    const clearUserDb = await request(`http://localhost:3001`).delete(`/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);
    
        expect(getInfo.status).toBe(200)
        expect(clearUserDb.status).toBe(201)
}



//Testes de Create
it("Testa Post de Usuário com Json vazio", async () => {
    const response = await request(`http://localhost:3001`).post(`/user/`)
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

        expect(response.status).toBe(500)
});

it("Testa Post de Usuário", async () => {
    const response = await request(`http://localhost:3001`).post(`/user/`)
        .send(testUserJson)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

        expect(response.status).toBe(201)
});

it("Testa Post de usuário já cadastrado", async () => {

    const duplicate = await request(`http://localhost:3001`).post(`/user/`)
        .send(testUserJson)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

        expect(duplicate.status).toBe(409)

});


//Testes de GET

it("Testa get de Usuário", async () => {

    const getInfo = await request(`http://localhost:3001`).post(`/user/login`)
    .send(loginUserJson)

    let userId = getInfo._body.User.id;
    let userToken = getInfo._body.token;

    const response = await request(`http://localhost:3001`).get(`/user/${userId}`)
    .set('Authorization', `Bearer ${userToken}`);
    
    expect(getInfo.status).toBe(200)
    expect(response.status).toBe(200)
    
    resetTest();
});