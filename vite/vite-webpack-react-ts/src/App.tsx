import React from 'react'
import Home from '@/page/home/home'
import './App.less'

function App() {
  const [count, setCount] = React.useState<number>(0)

  const addCount = (param: number) => {
    setCount(param + count);
  }
  const click = () => {
    addCount(1);
  };

  return (
    <div className="App">
      <header className="App-header" onClick={click}>
        <Home />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs suyi
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
