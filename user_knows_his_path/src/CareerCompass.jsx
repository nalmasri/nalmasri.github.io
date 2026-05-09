import { useEffect, useState } from "react";
import "./career.css";

export default function CareerCompass() {
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    drawLines();

    window.addEventListener("resize", drawLines);

    return () => {
      window.removeEventListener("resize", drawLines);
    };
  }, []);

  const drawLines = () => {
    const svg = document.getElementById("connector-svg");

    if (!svg) return;

    svg.innerHTML = "";

    const cards = document.querySelectorAll(".card");
    const compass = document.querySelector(".compass-wrap");

    if (!compass) return;

    const compassRect = compass.getBoundingClientRect();

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

      line.setAttribute("x1", rect.left + rect.width / 2);
      line.setAttribute("y1", rect.top + rect.height / 2);

      line.setAttribute(
        "x2",
        compassRect.left + compassRect.width / 2
      );

      line.setAttribute(
        "y2",
        compassRect.top + compassRect.height / 2
      );

      line.setAttribute("stroke", "rgba(156,13,19,.25)");
      line.setAttribute("stroke-width", "2");

      svg.appendChild(line);
    });
  };

  const cards = [
    {
      title: "فني ميكاترونكس",
      desc: "هندسة الميكاترونكس الصناعية المتقدمة",
      icon: "⚙️",
    },
    {
      title: "فني أوتوترونكس",
      desc: "المركبات الكهربائية والهجينة",
      icon: "🚗",
    },
    {
      title: "فني تصنيع",
      desc: "تشكيل المعادن والتصنيع",
      icon: "🏭",
    },
    {
      title: "فني مركبات كهربائية",
      desc: "ميكاترونكس المركبات الكهربائية",
      icon: "🔋",
    },
  ];

  return (
    <div className="page">

      <header className="header">
        <div className="logo">CAVT</div>
      </header>

      <div className="hero">
        <div className="badge">
          المسار الأول - اعرف شغفك!
        </div>

        <h1>
          شو حابب تصير <span>بالمستقبل</span>؟
        </h1>

        <p>
          اختر المجال المناسب لمسارك المهني
        </p>
      </div>

      <div className="layout">

        <svg id="connector-svg"></svg>

        <div className="cards">

          {cards.map((card, index) => (
            <div
              key={index}
              className={`card ${
                selectedCard === index ? "active" : ""
              }`}
              onClick={() => setSelectedCard(index)}
            >
              <div className="icon">
                {card.icon}
              </div>

              <div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}

        </div>

        <div className="center">

          <div className="compass-wrap">

            <div className="compass">

              <div className="needle"></div>

              <div className="dot"></div>

              <span className="north">N</span>
              <span className="south">S</span>
              <span className="east">E</span>
              <span className="west">W</span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
