const request = require("supertest");

let userToken = undefined;

const testUserJson = {
    "email":"gab@gmail.com",
    "name":"kin",
    "lastName": "costa",
    "password":"40028922"
}

it("Testa Post de Novo Usuário", async () => {
    const response = await request(`http://localhost:3001`).post(`/user/`)
    .send(testUserJson)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

    expect(response.status).toBe(201)

    const getToken = request(`http://localhost:3001`).post(`/user/login`)

    userToken = response.body.token;
});

it("Testa Post de usuário já cadastrado", async () => {
    const response = await request(`http://localhost:3001`).post(`/user/`)
        .send(testUserJson)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

    expect(response.status).toBe(409)
});
