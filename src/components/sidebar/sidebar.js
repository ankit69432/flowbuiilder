import "./sidebar.css";
import { useState } from "react";

function Sidebar() {
  const [activeTab, setActiveTab] = useState(1);
  function handleTabChange(tab) {
    setActiveTab(tab);
  }
  return (
    <div>
      <div className="tab-buttons">
        <button
          onClick={() => handleTabChange(1)}
          className={activeTab === 1 ? "active" : ""}
        >
          Tab 1
        </button>
        <button
          onClick={() => handleTabChange(2)}
          className={activeTab === 2 ? "active" : ""}
        >
          Tab 2
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 1 && <div>Content of Tab 1</div>}
        {activeTab === 2 && <div>Content of Tab 2</div>}
      </div>
    </div>
  );
}

export default Sidebar;
