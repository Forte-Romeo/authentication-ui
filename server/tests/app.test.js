
import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.js";

test("unknown routes return a consistent 404 response", async () => {
    const response = await request(app)
        .get("/api/route-that-does-not-exist");

    assert.equal(response.status, 404);
    assert.equal(response.body.success, false);
    assert.equal(
        response.body.message,
        "The requested route was not found."
    );
});

test("malformed JSON returns a safe 400 response", async () => {
    const response = await request(app)
        .post("/api/auth/signup")
        .set("Content-Type", "application/json")
        .send('{"name":');

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
    assert.equal(
        response.body.message,
        "Invalid JSON request body."
    );
});


test("current-user endpoint rejects requests without an access token", async () => {
    const response = await request(app)
        .get("/api/users/me");

    assert.equal(response.status, 401);
    assert.equal(response.body.success, false);
});

test("user-management endpoint rejects requests without an access token", async () => {
    const response = await request(app)
        .get("/api/users");

    assert.equal(response.status, 401);
    assert.equal(response.body.success, false);
});

test("current-user endpoint rejects an invalid access token", async () => {
    const response = await request(app)
        .get("/api/users/me")
        .set("Authorization", "Bearer invalid-test-token");

    assert.equal(response.status, 401);
    assert.equal(response.body.success, false);
});