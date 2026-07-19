import assert from "node:assert/strict";
import test from "node:test";
import { createRouteRenderer } from "./router.js";

function deferred() {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
}

test("newer route requests win over slower earlier imports", async () => {
  const slow = deferred();
  const fast = deferred();
  const initialized = [];
  const container = { innerHTML: "" };
  const renderRoute = createRouteRenderer({
    slow: () => slow.promise,
    fast: () => fast.promise
  });

  const slowRender = renderRoute("slow", container);
  const fastRender = renderRoute("fast", container);

  fast.resolve({
    render: () => "<p>Fast</p>",
    initialize: () => initialized.push("fast")
  });
  assert.equal(await fastRender, true);
  assert.equal(container.innerHTML, "<p>Fast</p>");

  slow.resolve({
    render: () => "<p>Slow</p>",
    initialize: () => initialized.push("slow")
  });
  assert.equal(await slowRender, false);
  assert.equal(container.innerHTML, "<p>Fast</p>");
  assert.deepEqual(initialized, ["fast"]);
});

test("unknown routes are rejected without changing the container", async () => {
  const container = { innerHTML: "unchanged" };
  const renderRoute = createRouteRenderer({});

  assert.equal(await renderRoute("missing", container), false);
  assert.equal(container.innerHTML, "unchanged");
});
