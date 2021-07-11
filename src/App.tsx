import './App.css';
import TaskList from "./Components/TaskList/TaskList";

function App() {
  return (
    <div className="App">
        <div className="container">
            <h1>Monday</h1>
            <br />
            <br />
            <TaskList/>
        </div>
    </div>
  );
}

export default App;
