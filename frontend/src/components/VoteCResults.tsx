import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { QRCodeSVG } from 'qrcode.react';

import './VoteResults.css';

const ENDPOINT = process.env.REACT_APP_API_URL || 'http://localhost:9000';

interface VoteCounts {
  [option: string]: number;
}

const VoteAResults: React.FC = () => {
  const [voteCounts, setVoteCounts] = useState<VoteCounts>({});
  const currentDomain = window.location.origin;

  useEffect(() => {
    const socket = io(`${ENDPOINT}`, { transports: ['websocket'] });

    socket.on('votesList', (data: any) => {
      setVoteCounts(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const totalVotes = (voteCounts['5'] || 0) + (voteCounts['6'] || 0);
  const optionOnePercentage = totalVotes > 0 ? ((voteCounts['5'] || 0) / totalVotes) * 100 : 50;
  const optionTwoPercentage = totalVotes > 0 ? ((voteCounts['6'] || 0) / totalVotes) * 100 : 50;

  return (
    <div className="results-container">
      <div className='root-domain-banner'>
        <span>We actively invest in research that replaces part of our work using AI</span>
      </div>

      <div className="results-bar">
        <div
          className="results-section option-one"
          style={{ flex: `${optionOnePercentage} 1 0%` }}
        >
          <h3>Yes</h3>
          <p>{optionOnePercentage.toFixed(1)}% ({voteCounts['5'] || 0} votes)</p>
        </div>

        <div
          className="results-section option-two"
          style={{ flex: `${optionTwoPercentage} 1 0%` }}
        >
          <h3>No</h3>
          <p>{optionTwoPercentage.toFixed(1)}% ({voteCounts['6'] || 0} votes)</p>
        </div>
      </div>
      <div className="voting-qr-code">
        <QRCodeSVG
          value={currentDomain}
          size={1200}
          bgColor={"#ffd100"}
          fgColor={"#101820"}
          level={"L"}
          className="qr-code"
        />
      </div>
    </div>
  );
};

export default VoteAResults;
