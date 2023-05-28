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

    const clearUserDb = await request(`http://localhost:3001`)
    .delete(`/user/${userId}`)
    .set('Authorization', `Bearer ${userToken}`);
    
    expect(getInfo.status).toBe(200)
    expect(clearUserDb.status).toBe(201)
}


it("Testa Post de Novo Usuário", async () => {
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

        resetTest();  
});