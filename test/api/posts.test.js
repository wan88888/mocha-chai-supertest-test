const { expect } = require('chai');
const testUtils = require('../utils/testUtils');
const config = require('../../config/test.config');

describe('Posts API Tests', () => {
    const postSchema = {
        id: 'number',
        title: 'string',
        body: 'string',
        userId: 'number'
    };

    let createdPostId;

    describe('GET /posts', () => {
        it('should return all posts', async () => {
            const response = await testUtils.get(config.endpoints.posts);
            const posts = testUtils.validateResponse(response);
            expect(posts).to.be.an('array');
            expect(posts.length).to.be.greaterThan(0);
            testUtils.validateSchema(posts[0], postSchema);
        });

        it('should return a specific post', async () => {
            const postId = 1;
            const response = await testUtils.get(`${config.endpoints.posts}/${postId}`);
            const post = testUtils.validateResponse(response);
            testUtils.validateSchema(post, postSchema);
            expect(post.id).to.equal(postId);
        });
    });

    describe('POST /posts', () => {
        it('should create a new post', async () => {
            const newPost = {
                title: 'Test Post',
                body: 'This is a test post',
                userId: 1
            };

            const response = await testUtils.post(config.endpoints.posts, newPost);
            const post = testUtils.validateResponse(response, 201);
            testUtils.validateSchema(post, postSchema);
            expect(post.title).to.equal(newPost.title);
            expect(post.body).to.equal(newPost.body);
            createdPostId = post.id;
        });
    });

    describe('PUT /posts', () => {
        it('should update an existing post', async () => {
            const updateData = {
                title: 'Updated Test Post',
                body: 'This post has been updated',
                userId: 1
            };

            const response = await testUtils.put(`${config.endpoints.posts}/1`, updateData);
            const post = testUtils.validateResponse(response);
            testUtils.validateSchema(post, postSchema);
            expect(post.title).to.equal(updateData.title);
            expect(post.body).to.equal(updateData.body);
        });
    });

    describe('DELETE /posts', () => {
        it('should delete a post', async () => {
            const response = await testUtils.delete(`${config.endpoints.posts}/1`);
            testUtils.validateResponse(response, 200);
        });
    });
});