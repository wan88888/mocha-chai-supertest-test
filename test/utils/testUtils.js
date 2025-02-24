const request = require('supertest');
const { expect } = require('chai');
const config = require('../../config/test.config');

class TestUtils {
    constructor() {
        this.request = request(config.baseUrl);
    }

    async get(endpoint, params = {}) {
        const response = await this.request
            .get(endpoint)
            .query(params)
            .timeout(config.timeout);
        return response;
    }

    async post(endpoint, data = {}) {
        const response = await this.request
            .post(endpoint)
            .send(data)
            .timeout(config.timeout);
        return response;
    }

    async put(endpoint, data = {}) {
        const response = await this.request
            .put(endpoint)
            .send(data)
            .timeout(config.timeout);
        return response;
    }

    async delete(endpoint) {
        const response = await this.request
            .delete(endpoint)
            .timeout(config.timeout);
        return response;
    }

    validateResponse(response, expectedStatus = 200) {
        expect(response.status).to.equal(expectedStatus);
        expect(response.body).to.exist;
        return response.body;
    }

    validateSchema(data, schema) {
        Object.keys(schema).forEach(key => {
            expect(data).to.have.property(key);
            expect(data[key]).to.be.a(schema[key]);
        });
    }
}

module.exports = new TestUtils();