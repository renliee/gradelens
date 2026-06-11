import { useEffect, useState } from "react";
import { getMetadata, getSchema } from "./api";
import Icon from "./components/Icon";
import AboutTab from "./components/tabs/AboutTab";
import DashboardTab from "./components/tabs/DashboardTab";
import HowItWorksTab from "./components/tabs/HowItWorksTab";
import type { FeatureSchema, Metadata } from "./types";

type TabId = "dashboard" | "how" | "about";

const TABS: { id: TabId; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "how", label: "How it works" },
  { id: "about", label: "About" },
];

export default function App() {
  const [tab, setTab] = useState<TabId>("dashboard");
  const [meta, setMeta] = useState<Metadata | null>(null);
  const [schema, setSchema] = useState<FeatureSchema | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  useEffect(() => {
    getMetadata().then(setMeta).catch(() => setMeta(null));
    getSchema().then(setSchema).catch(() => setSchema(null));
  }, []);

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__inner">
          <div className="brand">
            <span className="brand__mark">
              <Icon name="chart" size={20} />
            </span>
            <span className="brand__name">GradeLens</span>
          </div>

          <nav className="tabs" aria-label="Sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`tabbtn${tab === t.id ? " tabbtn--active" : ""}`}
                onClick={() => setTab(t.id)}
                aria-current={tab === t.id ? "page" : undefined}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="content">
        {tab === "dashboard" && <DashboardTab meta={meta} schema={schema} />}
        {tab === "how" && <HowItWorksTab meta={meta} />}
        {tab === "about" && <AboutTab />}
      </main>

      <footer className="foot">
        <span>GradeLens</span>
        <span className="foot__dot" />
        <span>COMP6577001 Machine Learning</span>
        <span className="foot__dot" />
        <span>{meta?.best_model ?? "Linear Regression"} model</span>
      </footer>
    </div>
  );
}
