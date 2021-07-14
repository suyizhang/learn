import React, { useState } from 'react';
import Home from '@/page/home/home';
import './App.less';
function App() {
    const [count, setCount] = useState(0);
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Home, null),
            React.createElement("p", null, "Hello Vite + React!"),
            React.createElement("p", null,
                React.createElement("button", { type: "button", onClick: () => setCount((count) => count + 1) },
                    "count is: ",
                    count)),
            React.createElement("p", null,
                "Edit ",
                React.createElement("code", null, "App.tsx"),
                " and save to test HMR updates."),
            React.createElement("p", null,
                React.createElement("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, "Learn React"),
                ' | ',
                React.createElement("a", { className: "App-link", href: "https://vitejs.dev/guide/features.html", target: "_blank", rel: "noopener noreferrer" }, "Vite Docs suyi")))));
}
export default App;
//# sourceMappingURL=App.js.map