
export default function Scoreboard({ runs = 47, wickets = 1, balls = 7 }) {
  const totalBalls = 12;
  const overs = Math.floor(balls / 6);
  const ballsInOver = balls % 6;


  //displaying scorecard
  return (
    <div className="scoreboard-wrapper">
      <div className="scoreboard">

        <div className="scoreboard-header">
          <span className="icon">🏏</span>
          <span className="title">Live Scorecard</span>
          <span className="live-dot" />
        </div>

        <div className="main-score">
          <span className="runs">{runs}</span>
          <span className="wickets">/{wickets}</span>
          <span className="wkt-label">WKT</span>
        </div>

        <div className="h-divider" />

        <div className="stats-row">
          <div className="stat-item">
            <div className={`stat-value overs`}>{overs}.{ballsInOver}</div>
            <div className="stat-label">Overs</div>
          </div>
          <div className="v-divider" />
          <div className="stat-item">
            <div className="stat-value balls">{totalBalls - balls}</div>
            <div className="stat-label">Balls Left</div>
          </div>
          <div className="v-divider" />
          <div className="stat-item">
            <div className={`stat-value ${wickets >= 2 ? 'danger' : 'wkts'}`}>
              {2 - wickets}
            </div>
            <div className="stat-label">Wkts Left</div>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <span>Progress</span>
            <span>{balls}/{totalBalls} balls</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(balls / totalBalls) * 100}%` }}
            />
          </div>
          <div className="ball-dots">
            {Array.from({ length: totalBalls }).map((_, i) => (
              <div key={i} className={`ball-dot ${i < balls ? 'played' : ''}`} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}