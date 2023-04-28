// @ts-check
import { test, expect } from '@playwright/test';

const baseURL = 'https://reqres.in/api';

test.describe.parallel("API Testing",  () => {
    
    test("Simple API Test - Assert Response Status", async ({ request }) => {
        const Response = await request.get(`${baseURL}/users/2`)
        expect(Response.status()).toBe(200)

        //Allows print to console result in JSON format
        const responseBody = JSON.parse(await Response.text())
        //console.log(responseBody)
    });

    test("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {
        const Response = await request.get(`${baseURL}/users/non-existing-endpoint`)
        expect(Response.status()).toBe(404)
    });

    test("GET Request - Get User Detail", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/1`)
        const responseBody = JSON.parse(await response.text())

            expect(response.status()).toBe(200)
            //'data'(name will differ) would always be the named of the object thats coming back from json parse in console
            expect(responseBody.data.id).toBe(1)
            expect(responseBody.data.first_name).toBe('George')
            expect(responseBody.data.last_name).toBe('Bluth')
            //When you have data that always stay the same like date or time, check if it exist instead
            expect(responseBody.data.email).toBeTruthy()

    });

    test("POST Request - Create New User", async ({ request }) => {
        const response = await request.post(`${baseURL}/users`, {
            data: {
                name: 'Nage',
                job: 'nage.turtle@reqres.in',

              },
        })
        const responseBody = JSON.parse(await response.text())
        //console.log(responseBody)
        expect(response.status()).toBe(201)
        expect(responseBody.name).toBe('Nage')
        expect(responseBody.createdAt).toBeTruthy()
    });

    test("POST Request - Login", async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',

              },
        })
        const responseBody = JSON.parse(await response.text())
        //console.log(responseBody)
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    });

    test("POST Request - Login Failure", async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email: 'peter@klaven',

              },
        })
        const responseBody = JSON.parse(await response.text())
        //console.log(responseBody)
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBeTruthy()
        expect(responseBody.error).toBe('Missing password')
    });

    test("PUT Request - Update User", async ({ request }) => {
        const response = await request.put(`${baseURL}/users/2`, {
            data: {
                name: "morpheus",
                job: "zion resident"

              },
        })
        const responseBody = JSON.parse(await response.text())
        //console.log(responseBody)
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe("morpheus")
        expect(responseBody.job).toBe("zion resident")
        expect(responseBody.updatedAt).toBeTruthy()
    });

    test("DELETE Request - Delete User", async ({ request }) => {
        const response = await request.delete(`${baseURL}/users/2`)

        expect(response.status()).toBe(204)

    });
});