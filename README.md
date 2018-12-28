# An introduction to react hooks

React hooks is a new feature introduced in version 16.7.0-alpha.  
It is not a revolution because they are not breaking changes, and react will still be compatible with older code, but it will change the way we are using react in the future when it becomes mature.

## What are react hooks
React hooks are set of methods that can be used inside of react component and add new functionality like state management, component lifecycle, and more. Up until now, those capabilities were only available to classes components and not functional components. The motivation to add hooks was to make the code cleaner and clearer, make it more “functional” and improve the performance, because functions are translated to a faster code then classes.

Personally, I prefer using as much function component as I can, and found classes components less attractive, so I’m in favor of react hooks very much.

There are many hooks:  
- useState
- useEffect
- useContext
- useReducer
- useCallback
- useMemo
- useRef
- useImperativeMethods
- useLayoutEffect

In this blog post, I will describe __useState__ and __useEffect__ hooks and how to use them.

## useState
useState allows you to add a local state into a functional component. Just to be clear, this state is local to the component (like in class component), and not global as in redux or mobx. There are technics to use it as a global state but I’ll not cover it in this post. A functional component can have multiple independent states.
This is an example for a simple component that counts the number of clicks:

```js
import React, { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

useState gets as a parameter the initial state and returns two objects:  
The newly created state object, and a method to change the state. Every time the method will be called, the component will re-rendered with the new state.
In this example, the state is the count of clicks, every time the user presses the button, setCount is called with the new count.
Very simple right?

As I said, the component can have multiple independent states of a different type:
```js
import React, { useState } from "react";

export function MultipleStates() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <p>Flag is {flag.toString()}</p>
      <button onClick={() => setFlag(!flag)}>Change flag</button>
    </div>
  );
}
```
I added a new state for a flag, that changes from true to false.

## useEffect
useEffect hook, is very similar to componentDidMount lifecycle method in a class component.
You can use this hook to add functionality before or after the the function is called. You can control if the effect will run every time the function runs (the “render” of the component), only once or everytime a value (usually a prop) has changed.

```js
import React, { useEffect } from 'react';

export function LifecycleDemo() {
  useEffect(() => {
    console.log('render!');
    return () => console.log('unmounting...');
  })

  return <div>I'm a lifecycle demo</div>;
```
useEffect gets as parameter a function, that will run when the function will be called (“render”). If it returns a method, the returned method will be run when the component will unmount.

A great use case is when fetching data from an API. in the next example I will use both setState and setEffect to fetch and show data from an API:

```js
import React, { useEffect, useState } from 'react';

export function FetchData() {
  const [name, setName] = useState({ title: "", first: "", last: ""});

  useEffect(async () => {
    const res = await fetch('https://randomuser.me/api/');
    const json = await res.json();
    setName(json.results[0].name);
  },[])


  return (
    <div>
      {`The person name is: ${name.title} ${name.first} ${name.last}`}
    </div>
  );
}
```
One thing to notice is the second parameter of useEffect. When I add an empty array, the useEffect will occur only once. Without it, it will be called every state change, which means it will be run forever (why?).

The last example will show how to fetch the call useEffect only when needed, I will add a wrap component that will change the gender of the person:
```js
import React, { useEffect, useState } from "react";

function FetchDataWithGender({ gender }) {
  const [name, setName] = useState({ title: "", first: "", last: "" });

  useEffect(
    async () => {
      const res = await fetch(`https://randomuser.me/api?gender=${gender}`);
      const json = await res.json();
      setName(json.results[0].name);
    },
    [gender]
  );

  return (
    <div>{`The person name is: ${name.title} ${name.first} ${name.last}`}</div>
  );
}

export function WrapperFetchDataWithGender() {
  const [gender, setGender] = useState("female");

  return (
    <div>
      <p>Select Gender</p>
      <button onClick={() => setGender("male")}>Male</button>
      <button onClick={() => setGender("female")}>Female</button>
      <FetchDataWithGender gender={gender} />
    </div>
  );
}
```
Here, useEffect gets ‘gender’ as the second parameter (in the array), and only if the gender is changed, it will re-fetch the data from the API.

## Conclusion
As you can see in my examples, hooks are extremely useful and can wake the code much more elegant. I encourage you to try them but wait till it ready before using it in production.
In addition to that, hooks also allow users to share code between components because you can use the same states or effects for different components. Many hooks are available online, and you can use them in your code. https://usehooks.com is an example of such a repository.

All code can be found [here](https://github.com/amitai10/react-hooks-example).

## References
- https://reactjs.org/docs/hooks-intro.html
- https://daveceddia.com/



