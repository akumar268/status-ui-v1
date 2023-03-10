import logo from './logo.svg';
import './App.css';
import StatusTableFunc from './components/status_table';
import CandidateForm from './components/candidate_form';
import UpdateCandidateStatusComponent from './components/update_candidate_status_component';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/header';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path="/candidate-status" element={<StatusTableFunc/>} />
          <Route path="/candidate-status/edit/:statusId" element={<UpdateCandidateStatusComponent />} />
          <Route path="/candidate-status/add" element={<CandidateForm/>} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
