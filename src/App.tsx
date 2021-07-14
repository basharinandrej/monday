import './App.css';
import ListTasks from "./Components/TaskList/ListTasks";

function App() {
  return (
    <div className="App">
        <div className="container">
            <h1>Monday</h1>
            <br />
            <br />
            <ListTasks/>
        </div>
    </div>
  );
}

export default App;
