import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VotingView from './components/VotingView';
import VotingBView from './components/VotingBView';
import VotingCView from './components/VotingCView';
import VoteResults from './components/VoteResults';
import VoteBResults from './components/VoteBResults';
import VoteCResults from './components/VoteCResults';
import QRCodeView from './components/QRCodeView';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<VotingView />} />
          <Route path="/vote1" element={<VotingView />} />
          <Route path="/vote2" element={<VotingBView />} />
          <Route path="/vote3" element={<VotingCView />} />
          <Route path="/results" element={<VoteResults />} />
          <Route path="/results2" element={<VoteBResults />} />
          <Route path="/results3" element={<VoteCResults />} />
          <Route path="/code" element={<QRCodeView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
