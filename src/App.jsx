import React, { useState, useEffect } from "react";
import DashboardCard from "./components/DashboardCard";
import "./components/Dashboard.css";
import datalist from "./data/dashboard.json";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [savedWidgets, setSavedWidgets] = useState(() => {
    const stored = localStorage.getItem("widgets");
    return stored ? JSON.parse(stored) : [];
  });
  const [query, setQuery] = useState("");

  const getRandomText = () => {
    const texts = [
      "Monitor security risks",
      "Performance overview",
      "Widget placeholder",
      "System health check",
      "Compliance summary",
      "Vulnerability tracker",
      "Insights dashboard",
      "Resource usage report",
      "Alerts and warnings",
      "Default widget text",
    ];
    return texts[Math.floor(Math.random() * texts.length)];
  };

  const cloudAccountData = [
    { name: "Connected", value: 2, color: "#3B82F6" },
    { name: "Not Connected", value: 2, color: "#E0E7FF" },
  ];

  const riskData = [
    { name: "Failed", value: 1689, color: "#EF4444" },
    { name: "Warning", value: 681, color: "#F59E0B" },
    { name: "Not available", value: 36, color: "#9CA3AF" },
    { name: "Passed", value: 7253, color: "#10B981" },
  ];

  const handleConfirm = () => {
    const updated = [
      ...savedWidgets,
      ...selectedWidgets.map((widget) => ({
        uid: Date.now() + Math.random(),
        id: widget.id,
        name: widget.name && widget.name.trim() !== "" ? widget.name : widget.id,
        text: widget.text && widget.text.trim() !== "" ? widget.text : getRandomText(),
        category: datalist.categories[activeTab].id,
      })),
    ];
    setSavedWidgets(updated);
    localStorage.setItem("widgets", JSON.stringify(updated));
    setSelectedWidgets([]);
    setShowModal(false);
  };

  const handleDelete = (uid) => {
    const updated = savedWidgets.filter((w) => w.uid !== uid);
    setSavedWidgets(updated);
    localStorage.setItem("widgets", JSON.stringify(updated));
  };

  const filteredWidgets = savedWidgets.filter(
    (w) =>
      w.name.toLowerCase().includes(query.toLowerCase()) ||
      w.text.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (showModal) {
      const currentCategory = datalist.categories[activeTab].id;
      const preSelected = savedWidgets
        .filter((w) => w.category === currentCategory)
        .map((w) => ({
          id: w.id,
          name: w.name,
          text: w.text,
          category: w.category,
        }));
      setSelectedWidgets(preSelected);
    }
  }, [showModal, activeTab]);

  const widgetsByCategory = datalist.categories.reduce((acc, cat) => {
    acc[cat.id] = filteredWidgets.filter((w) => w.category === cat.id);
    return acc;
  }, {});

  return (
    <div className="dashboard">
      <div className="topbar">
        <div className="breadcrumb">Dashboard V2</div>
        <div className="topbar-right">
          <input
            type="text"
            placeholder="Search anything..."
            className="search-box"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="icon-btn">⚙️</button>
          <button className="icon-btn">🔔</button>
          <div className="profile-circle">M</div>
        </div>
      </div>

      <div className="dashboard-header">
        <div className="left">
          <h2 className="dashboard-title">CNAPP Dashboard</h2>
        </div>
        <div className="right">
          <button className="add-widget" onClick={() => setShowModal(true)}>
            + Add Widget
          </button>
          <button className="refresh-btn">⟳</button>
          <select className="filter-select">
            <option>Last 2 days</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </div>

      <h6 className="dashboard-title">CSPM Dashboard</h6>
      <div className="first-row">
        <DashboardCard title="Cloud Accounts" total={2} data={cloudAccountData} />
        <DashboardCard title="Cloud Account Risk Assessment" total={9659} data={riskData} />
        <div className="card center last-card">
          <button className="add-widget-btn" onClick={() => setShowModal(true)}>
            + Add Widget
          </button>
        </div>
      </div>

      <h6 className="dashboard-title">CWPP Dashboard</h6>
      <div className="three-cards">
        <div className="card">
          <h4 className="card-title">Top Namespace Specific Alerts</h4>
          <p className="muted">No GraphData Availabel</p>
        </div>
        <div className="card">
          <h4 className="card-title">Workload Alerts</h4>
          <p className="muted">No GraphData Availabel</p>
        </div>
        <div className="card center last-card">
          <button className="add-widget-btn" onClick={() => setShowModal(true)}>
            + Add Widget
          </button>
        </div>
      </div>

      <h6 className="dashboard-title">Registry Scan</h6>
      <div className="last-row">
        <div className="card">
          <h4 className="card-title">Image Risk Assessment</h4>
          <p className="muted">1470 Total Vulnerabilities</p>
          <div className="progress-bar">
            <div className="critical" style={{ width: "20%" }}></div>
            <div className="high" style={{ width: "30%" }}></div>
            <div className="medium" style={{ width: "25%" }}></div>
            <div className="low" style={{ width: "25%" }}></div>
          </div>
          <div className="legend two-row">
            <div className="legend-row">
              <span><span className="legend-box critical"></span> Critical (9)</span>
              <span><span className="legend-box high"></span> High (150)</span>
            </div>
            <div className="legend-row">
              <span><span className="legend-box medium"></span> Medium (120)</span>
              <span><span className="legend-box low"></span> Low (90)</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h4 className="card-title">Image Security Issues</h4>
          <p className="muted">2 Total Images</p>
          <div className="progress-bar">
            <div className="critical" style={{ width: "40%" }}></div>
            <div className="high" style={{ width: "20%" }}></div>
            <div className="medium" style={{ width: "20%" }}></div>
            <div className="low" style={{ width: "20%" }}></div>
          </div>
          <div className="legend two-row">
            <div className="legend-row">
              <span><span className="legend-box critical"></span> Critical (2)</span>
              <span><span className="legend-box high"></span> High (2)</span>
            </div>
            <div className="legend-row">
              <span><span className="legend-box medium"></span> Medium (1)</span>
              <span><span className="legend-box low"></span> Low (1)</span>
            </div>
          </div>
        </div>

        <div className="card center last-card">
          <button className="add-widget-btn" onClick={() => setShowModal(true)}>
            + Add Widget
          </button>
        </div>
      </div>

      {datalist.categories.map((cat) => (
        <div key={cat.id} className="saved-row">
          <h5 className="dashboard-title">{cat.id}</h5>
          <div className="three-cards">
            {widgetsByCategory[cat.id] && widgetsByCategory[cat.id].length > 0 ? (
              widgetsByCategory[cat.id].map((w) => (
                <div key={w.uid} className="card">
                  <div className="card-header">
                    <h4 className="card-title">{w.name}</h4>
                    <button className="delete-btn" onClick={() => handleDelete(w.uid)}>
                      ❌
                    </button>
                  </div>
                  <p className="muted">{w.text}</p>
                </div>
              ))
            ) : (
              <p className="muted">No widgets added</p>
            )}
          </div>
        </div>
      ))}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Widget</h3>
              <button onClick={() => setShowModal(false)}>✖</button>
            </div>
            <div className="modal-tabs">
              {datalist.categories.map((user, index) => (
                <button
                  key={user.id}
                  onClick={() => setActiveTab(index)}
                  className={activeTab === index ? "active" : ""}
                >
                  {user.id}
                </button>
              ))}
            </div>

            <div className="modal-body">
              {datalist.categories[activeTab].widgets.map((widget) => (
                <div key={widget.id} className="widget-option">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedWidgets.some((w) => w.id === widget.id)}
                      onChange={() =>
                        setSelectedWidgets((prev) =>
                          prev.some((w) => w.id === widget.id)
                            ? prev.filter((w) => w.id !== widget.id)
                            : [
                                ...prev,
                                {
                                  id: widget.id,
                                  name: "",
                                  text: "",
                                  category: datalist.categories[activeTab].id,
                                },
                              ]
                        )
                      }
                    />
                    {widget.id}
                  </label>

                  {selectedWidgets.some((w) => w.id === widget.id) && (
                    <div className="edit-fields">
                      <input
                        type="text"
                        placeholder="Enter widget name"
                        value={
                          selectedWidgets.find((w) => w.id === widget.id)?.name ||
                          ""
                        }
                        onChange={(e) =>
                          setSelectedWidgets((prev) =>
                            prev.map((w) =>
                              w.id === widget.id
                                ? { ...w, name: e.target.value }
                                : w
                            )
                          )
                        }
                      />
                      <input
                        type="text"
                        placeholder="Enter widget text"
                        value={
                          selectedWidgets.find((w) => w.id === widget.id)?.text ||
                          ""
                        }
                        onChange={(e) =>
                          setSelectedWidgets((prev) =>
                            prev.map((w) =>
                              w.id === widget.id
                                ? { ...w, text: e.target.value }
                                : w
                            )
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
