import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './VotingView.css';

const ENDPOINT = process.env.REACT_APP_API_URL || 'http://localhost:9000';

const VotingCView: React.FC = () => {
  const navigate = useNavigate();

  const handleVote = async (option: string) => {
    try {
      await axios.post(`${ENDPOINT}/api/votes`, { option });
      navigate('/results3');
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="voting-container">
      <h2 className="voting-title">We actively invest in research that replaces our work using AI</h2>
      <div className="voting-buttons">
        <button className="vote-button" onClick={() => handleVote('5')}>Yes</button>
        <button className="vote-button" onClick={() => handleVote('6')}>No</button>
      </div>
    </div>
  );
};

export default VotingCView;
