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

const testUpdateUserJson = {
    "name":"Tanjiro",
    "lastName": "Kamado",
}

const resetTest = async () => {

    const getInfo = await request(`http://localhost:3001`).post(`/user/login`)
        .send(loginUserJson)

    const userId = getInfo._body.User.id;
    const userToken = getInfo._body.token;

    const clearUserDb = await request(`http://localhost:3001`).delete(`/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);
    
        expect(getInfo.status).toBe(200)
        expect(clearUserDb.status).toBe(201)
}



//Testes de Create de USER
it("Testa POST de Usuário", async () => {

    const response = await request(`http://localhost:3001`).post(`/user/`)
        .send(testUserJson)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

        expect(response.status).toBe(201)
});

it("Testa POST de usuário já cadastrado", async () => {

    const duplicate = await request(`http://localhost:3001`).post(`/user/`)
        .send(testUserJson)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)

        expect(duplicate.status).toBe(409)
});


//Testes de GET de USER
it("Testa GET de Usuário", async () => {

    const getInfo = await request(`http://localhost:3001`).post(`/user/login`)
        .send(loginUserJson)

    const userId = getInfo._body.User.id;
    const userToken = getInfo._body.token;

    const response = await request(`http://localhost:3001`).get(`/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);
    
        expect(getInfo.status).toBe(200)
        expect(response.status).toBe(200)
    
});

//Testes de PUT de USER
it("Testa PUT de usuário", async () => {

    const getInfo = await request(`http://localhost:3001`).post(`/user/login`)
        .send(loginUserJson)

    const userId = getInfo._body.User.id;
    const userToken = getInfo._body.token;

    const response = await request(`http://localhost:3001`).put(`/user/${userId}`)
        .send(testUpdateUserJson)
        .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200)
});


//Teste POST de TASK
it("Testa POST de task", async () => {

    const getInfo = await request(`http://localhost:3001`).post(`/user/login`)
        .send(loginUserJson)

    const userId = getInfo._body.User.id;
    const userToken = getInfo._body.token;

    const response = await request(`http://localhost:3001`).post(`/task/`)
        .send({"title": "Fazer testes PS Codex", "authorId": userId})
        .set('Authorization', `Bearer ${userToken}`);
    
        expect(getInfo.status).toBe(200)
        expect(response.status).toBe(200)
});


//Teste GET ALL de TASK
it("Testa GET ALL de task", async () => {

    const getInfo = await request(`http://localhost:3001`).post(`/user/login`)
        .send(loginUserJson)

    const userId = getInfo._body.User.id;
    const userToken = getInfo._body.token;

    const response = await request(`http://localhost:3001`).get(`/task/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);
    
        expect(getInfo.status).toBe(200)
        expect(response.status).toBe(200)
});


//Teste GET de TASK
it("Testa GET de task", async () => {

    const getInfo = await request(`http://localhost:3001`).post(`/user/login`)
        .send(loginUserJson)

    const userId = getInfo._body.User.id;
    const userToken = getInfo._body.token;

    const createTask = await request(`http://localhost:3001`).post(`/task/`)
        .send({"title": "Comer", "authorId": userId})
        .set('Authorization', `Bearer ${userToken}`);

    const taskId = createTask._body.id;

    const response = await request(`http://localhost:3001`).get(`/task/${userId}/${taskId}`)
        .set('Authorization', `Bearer ${userToken}`);
    
        expect(getInfo.status).toBe(200)
        expect(createTask.status).toBe(200)
        expect(response.status).toBe(200)
});


//Teste PUT de TASK
it("Testa PUT de task", async () => {

    const getInfo = await request(`http://localhost:3001`).post(`/user/login`)
        .send(loginUserJson)

    const userId = getInfo._body.User.id;
    const userToken = getInfo._body.token;

    const createTask = await request(`http://localhost:3001`).post(`/task/`)
        .send({"title": "Ir para academia", "authorId": userId})
        .set('Authorization', `Bearer ${userToken}`);

    const taskId = createTask._body.id;

    const response = await request(`http://localhost:3001`).put(`/task/${userId}/${taskId}`)
        .send({"title": "Beber Água"})
        .set('Authorization', `Bearer ${userToken}`);
    
        expect(getInfo.status).toBe(200)
        expect(createTask.status).toBe(200)
        expect(response.status).toBe(200)
});


//Teste DELETE de TASK
it("Testa DELETE de task", async () => {

    const getInfo = await request(`http://localhost:3001`).post(`/user/login`)
        .send(loginUserJson)

    const userId = getInfo._body.User.id;
    const userToken = getInfo._body.token;

    const createTask = await request(`http://localhost:3001`).post(`/task/`)
        .send({"title": "Estudar para LEDA", "authorId": userId})
        .set('Authorization', `Bearer ${userToken}`);

    const taskId = createTask._body.id;

    const response = await request(`http://localhost:3001`).delete(`/task/${userId}/${taskId}`)
        .set('Authorization', `Bearer ${userToken}`);
    
        expect(getInfo.status).toBe(200)
        expect(createTask.status).toBe(200)
        expect(response.status).toBe(201)
});


//Testes de DELETE de USER
it("Testa DELETE de usuário", async () => {

    const getInfo = await request(`http://localhost:3001`).post(`/user/login`)
        .send(loginUserJson)

    let userId = getInfo._body.User.id;
    let userToken = getInfo._body.token;

    const response = await request(`http://localhost:3001`).delete(`/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);
    
        expect(getInfo.status).toBe(200)
        expect(response.status).toBe(201)
});

export default request;