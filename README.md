# svelte-summit-2021
Code and transcript from my Svelte Summit 2021 presentation

## Install

```javascript
$ git clone https://github.com/angrytongan/svelte-summit-2021
$ cd svelte-summit-2021
$ npm install
$ npm run dev
```

Then open http://localhost:5000

## Transcript

Svelte stores allow you to easily manage state within your application.  Svelte
also allows you to create your own custom stores, where you can leverage
Svelte's reactivity to manage data however you like. In this video, we'll show
how to use custom svelte stores to transform data to and from local storage, and
illustrate a couple of use cases.

First, a quick review of Svelte's two-way binding. Let's create a text input
and bind it's value to a variable:

Now, let's move the variable out of our component and convert it to a svelte
store.

Note that to reference a store, the only change required is prepending the
store name with a dollar-sign.

We can now create other components that will react to changes to this store.

Now let's create our own custom store, which we will use to write it's value to
the browser's local storage. First, let's implement svelte's store contract in
an object to make our own store.

Custom stores must adhere to the store contract and supply a subscribe method,
and optionally, a set method. Here we will use Svelte's subscribe method, and
wrap svelte's set method.

Now that we have our custom store, let's maintain it's value in local storage.
When the custom store is created, we'll set it's value to the value in local
storage. When the value of the store changes, we'll write it out to local
storage.

We are able to store strings into local storage, but what about objects?

localStorage.getItem() and localStorage.setItem() write UTF-16 strings, not
objects, so we need to adjust our custom store to handle transforming data on
read and write. We'll do this by supplying an array of functions to call on our
data when we write to local storage, and another array of functions to call when
we read from local storage.

We'll use JSON.stringify() to convert the object to a string for writing, and
JSON.parse for converting the string to an object.

So we can see what's happening, let's show our object in our component, and
create a way for the object to change; the store will react to the changes,
transform it's value according to our functions, and write to local storage.

As you can see, our store is transforming our new values and writing them to
local storage on each change.

You may be wondering why arrays of transformation functions were used in our
custom store. This is so we can chain transforms together. Consider an example
of compressing objects out to local storage - we need to transform our object
into a string, then compress the string, then write to local storage.

We'll use the lz-string library to perform compression and decompression, and
adjust our component so we can see the results.

Note that our interface to the store has not changed at all - we get the value
of the store by reference, and store a new value by assignment. Svelte handles
everything else.

While this reactivity is very convenient, be careful when doing too many
assignments. Each assignment statement here is picked up by Svelte as modifying
the store, so each of these assignments will call our set method, meaning in
this function, each of our two objects call set three times.

A better way would be to make just a single assignment to the store:

You could also handle this in the store itself, by debouncing the set call. How
you solve this is up to you.

While this example uses local storage, there's no reason why you couldn't put an
endpoint call in the store, so that values are persisted to the backend of your
application.

In this video, we showed a simple way of transforming data into and out of a
custom svelte store. For more information on custom stores, checkout the 
Svelte docs on svelte.dev. Thanks for watching.
