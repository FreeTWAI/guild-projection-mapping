import {test} from 'node:test';
import assert from 'node:assert/strict';
import {escapeHtml, build} from '../scripts/build.mjs';

test('benchmark escapeHtml', () => {
  const start = performance.now();
  for (let i = 0; i < 10000; i++) {
    escapeHtml('This is a "test" <string> with & entities \'');
  }
  const end = performance.now();
  const duration = end - start;
  // Should ideally be very fast, well under 50ms for 10k iterations.
  assert.ok(duration < 100, `escapeHtml took too long: ${duration}ms`);
});

test('benchmark build latency', async () => {
  const start = performance.now();
  const iterations = 5;
  for (let i = 0; i < iterations; i++) {
    await build();
  }
  const end = performance.now();
  const duration = end - start;
  // 5 iterations of file IO shouldn't take more than 1 second (1000ms).
  assert.ok(duration < 2000, `build latency is too high: ${duration}ms for ${iterations} iterations`);
});
