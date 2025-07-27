import NodeCache from 'node-cache';
let cache: NodeCache;

declare global {
  var __cache: NodeCache | undefined;
}

class MockDevCache {
  get() {
    return undefined;
  }
  set() {
    return true;
  }
}

if (process.env.NODE_ENV === 'production') {
  cache = new NodeCache();
} else {
  if (!global.__cache) {
    global.__cache = new MockDevCache() as unknown as NodeCache;
  }
  cache = global.__cache;
}

export { cache };
