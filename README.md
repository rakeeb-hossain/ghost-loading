# ghost-loading

Synchronized ghost loading component using singleton state hooks and leader election. 

# Singleton state hooks

An implementation of singleton state hooks is provided in `packages/ghost-loading/utils/singleton.ts`. This allows multiple components in different
DOM sub-trees to share state and re-render on updates to shared state. This is used to synchronize ghost loading animations by keeping a global 
animation state that all Ghost components share. This is also used in our leader election strategy (see below).

# Leader election

Ghost components rendered on screen compete to become the "leader" and set the global interval which updates the singleton animation state that all
Ghost components use. On unmount, leaders relinquish ownership and election takes place again. This ensures that Ghost components on-screen have
atomic animation states.

# Examples

Build the project via `npm install && lerna bootstrap`. Then, build the ghost-loading lib and example via `lerna run build`. You can now run the
example by opening `examples/blog-page/dist/index.html`.
