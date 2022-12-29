import { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';

// A. Mount (initial render) -> B. updates -> C. (re-render) -> D. unmount
// 1. Clicking on the "hide counter button" it unmounts the counter component
// 2. When we click show counter this mounts the component
// 3. When we click on increment this is updating the state of the component (re-render)


export default function App() {
  // Add the constants we will use to keep track of state
  const [isShown, setIsShown] = useState(true);
  // Another hook function, we do not use an async function
  // This is also a hook that we cannot call conditionally
  // We can use an arrow function or an actual function that we pass as a parameter
  // Use Effect runs after every render (initial or re-render will trigger useEffect)
  // Note: These useEffect hooks will run in order
  // Switch the order to confirm if you'd like


  // We can control this hook with an array that is a dependency
  // This will determine when the useEffect should run
  // 1. This will run on mount 2. Run on the array that is passed as a dependency
  // 2. With nothing in the array it will only run when mount occurs
  // 3. To prove this refresh the page, let everything mount and click on the buttons
  // useEffect(() => {
  //   console.log('mounted');

  //   // We can go ahead and cleanup things as it is good practice
  //   return () => console.log('unmount');
  // }, []);


  return (
    <div className="App">
       <button onClick={() => setIsShown(!isShown)}>
          {isShown ? 'Hide Counter' : 'Show Counter'}
       </button>
       {isShown ? <Counter /> : null}
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  const [bool, setBool] = useState(false);

  // Common error with hooks is in creating infinitie loops like below
  // This is commented out but go ahead and uncomment and look in the terminal
  // useEffect(() => {
    // Comment out the if below to see the infinite loop in action
    // This stops the loop from infinitely running after the condition is met
  //   if (count > 5) return;
  //   setCount(count + 1);
  // }, [count]);

  // useEffect doesn't address any layout changes as expected when debugging
  // layoutEffect
  // 1. Try to run this by clicking and it looks ok but investigating gives us the truth
  // 2. useEffect runs asynchronously after the a. (render) and b. (paint)
  // Uncomment this to observe the bug (Bug - useEffect)
  // useEffect(() => {
  //   if (count === 3) {
  //     setCount(4);
  //   }
  // }, [count]);

  // useLayoutEffect handles the rare case where we may run into the example above
  // The example above is commented out but please feel free to uncomment and debug
  // useLayoutEffect runs synchronously after render and will run before the paint occurs
  // Caution when using useLayoutEffect because it will make things run slower
  // Things will run slower due to the synchronous behavior
  // Comment this out to encounter the bug above (No bug)
  useLayoutEffect(() => {
    if (count === 3) {
      setCount(4);
    }
  }, [count]);


  useEffect(() => {
    console.log('count changed');

    // We can go ahead and cleanup things as it is good practice
    // This is useful for API subscription where we want to clean things up
    // Note: Example for a timer, we would clean up the interval 
    return () => console.log('cleanup count changed');
  }, [count]);

  useEffect(() => {
    console.log('render');
  });

  // stall the render to observe the bug for the useEffect hook on the button clicks
  // Uncomment this to force the violation error on the section with (Bug - useEffect)
  // const startTime = new Date();
  // while (new Date() - startTime < 100) {}

    // Add a dependency in the array for a boolean
    // Click the button to see that this works correctly
    // useEffect(() => {
    //   console.log('pressed re-render button');
    // }, [bool]);  

  return (
    <>
        <button onClick={() => setBool(!bool)}>Re-Render</button>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p>Count: {count}</p>
    </>
  );
}
