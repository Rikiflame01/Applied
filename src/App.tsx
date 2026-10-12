import { ApplicationList } from "./components/ApplicationList";
import { seedApplications } from "./data/seed";
import "./App.css";

function App() {
  return (
    <>
      <header className="site-header">
        <h1>Applied</h1>
      </header>
      <main>
        <h2 className="visually-hidden">Job applications</h2>
        <ApplicationList applications={seedApplications} />
      </main>
    </>
  );
}

export default App
