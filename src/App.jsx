import { useState } from "react";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [latestScore, setLatestScore] = useState(650);
  const [history, setHistory] = useState([]);
  const [language, setLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(true);

  const content = {
    English: {
      hero: "Fair, Inclusive and Accessible Loan Assessment for Everyone",
      apply: "Apply for Loan",
    },
    Kiswahili: {
      hero: "Tathmini ya Mikopo ya Haki na Inayopatikana kwa Wote",
      apply: "Omba Mkopo",
    },
    French: {
      hero: "Évaluation Inclusive et Accessible des Prêts",
      apply: "Demander un Prêt",
    },
    Arabic: {
      hero: "تقييم قروض عادل وسهل الوصول للجميع",
      apply: "تقديم طلب قرض",
    },
  };

  const t = content[language];

  const speakText = () => {
    const speech = new SpeechSynthesisUtterance(t.hero);
    window.speechSynthesis.speak(speech);
  };

  const handleSubmit = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const amount = Number(
      document.getElementById("loanAmount").value
    );
    const employment =
      document.getElementById("employment").value;

    if (!name || !email || !amount) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      let score = 500;

      if (employment === "Employed") score += 200;
      if (employment === "Self Employed") score += 150;
      if (employment === "Student") score += 80;

      if (amount < 50000) score += 100;
      else if (amount < 100000) score += 50;

      let recommendation =
        "Keep building a positive financial profile.";

      if (score >= 750)
        recommendation =
          "Excellent profile. Eligible for most loans.";

      if (score < 700)
        recommendation =
          "Reduce loan amount and improve income stability.";

      const data = {
        name,
        score,
        amount,
        recommendation,
        status:
          score >= 700 ? "APPROVED" : "UNDER REVIEW",
      };

      setLatestScore(score);
      setResult(data);
      setHistory((prev) => [...prev, data]);
      setLoading(false);
    }, 3000);
  };

  return (
    <div
      style={{
        background: darkMode ? "#0f172a" : "#f4f4f4",
        color: darkMode ? "#fff" : "#111",
        minHeight: "100vh",
        paddingBottom: "50px",
      }}
    >
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <nav className="navbar">
        <h2>CreditScore AI</h2>

        <div>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#history">History</a>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >
            <option>English</option>
            <option>Kiswahili</option>
            <option>French</option>
            <option>Arabic</option>
          </select>

          <button
            className="apply-btn"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      <section id="home" className="hero">
        <h1 className="typing">
          CreditScore AI
        </h1>

        <p>{t.hero}</p>

        <button
          className="apply-btn"
          onClick={() => {
            setResult(null);
            setShowForm(true);
          }}
        >
          {t.apply}
        </button>

        <button
          className="apply-btn"
          onClick={speakText}
          style={{ marginLeft: "10px" }}
        >
          🎤 Speak
        </button>
      </section>

      <section
        id="features"
        className="features"
      >
        <div className="card">
          <h3>🌍 Multi-Language</h3>
          <p>
            Supports English, French,
            Arabic and Kiswahili.
          </p>
        </div>

        <div className="card">
          <h3>🎤 Voice Assistant</h3>
          <p>
            Reads information aloud for
            accessibility.
          </p>
        </div>

        <div className="card">
          <h3>📱 Mobile Ready</h3>
          <p>
            Works on phones, tablets and
            desktop.
          </p>
        </div>
      </section>

      <section
        id="dashboard"
        className="features"
      >
        <div className="card">
          <h3>📊 Credit Score</h3>
          <h1>{latestScore}</h1>
        </div>

        <div className="card">
          <h3>💰 Eligibility</h3>
          <h1>
            {latestScore >= 700
              ? "Eligible"
              : "Review"}
          </h1>
        </div>

        <div className="card">
          <h3>📈 Approval Chance</h3>
          <h1>
            {Math.floor(
              (latestScore / 850) * 100
            )}
            %
          </h1>
        </div>
      </section>

      <section
        id="history"
        className="features"
      >
        <div className="card">
          <h2>Application History</h2>

          {history.length === 0 ? (
            <p>No applications yet.</p>
          ) : (
            history.map((item, index) => (
              <p key={index}>
                {item.name} | Score: {item.score} | {item.status}
              </p>
            ))
          )}
        </div>
      </section>

      <section className="features">
        <div className="card">
          <h2>Contact Us</h2>
          <p>Email: support@creditscoreai.com</p>
          <p>Phone: +254 700 000000</p>
        </div>
      </section>

      {showForm && (
        <div className="modal">
          <div className="form-card">

            {loading ? (
              <>
                <h2>🤖 AI Processing...</h2>

                <div className="loader-container">
                  <div className="loader-bar"></div>
                </div>

                <p style={{ textAlign: "center" }}>
                  Analyzing credit profile,
                  employment stability,
                  affordability and risk...
                </p>
              </>
            ) : !result ? (
              <>
                <h2>Loan Application</h2>

                <input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                />

                <input
                  id="loanAmount"
                  type="number"
                  placeholder="Loan Amount"
                />

                <select id="employment">
                  <option>Employment Status</option>
                  <option>Employed</option>
                  <option>Self Employed</option>
                  <option>Student</option>
                </select>

                <button
                  className="apply-btn"
                  onClick={handleSubmit}
                >
                  Submit Application
                </button>

                <button
                  className="close-btn"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h2>AI Assessment Result</h2>

                <h1>{result.score}</h1>

                <h3>{result.status}</h3>

                <p>{result.recommendation}</p>

                <button
                  className="apply-btn"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Finish
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default App;