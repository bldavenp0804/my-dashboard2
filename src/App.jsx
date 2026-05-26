import { useState, useEffect } from "react";

const PALETTE = {
  blushRose: "#DC4F7C",
  tomatoJam: "#C42B34",
  vanillaCustard: "#FCE9AB",
  princetonOrange: "#FC8A2D",
  olive: "#9E9820",
  bg: "#FDF0F3",
  cardBg: "#fff",
  cardBorder: "#f0d5dc",
  textDark: "#2a1a1f",
  textMid: "#7a5560",
  textLight: "#b08090",
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY = new Date().getDay();
const TODAY_IDX = TODAY === 0 ? 6 : TODAY - 1;
const CURRENT_DAY = 22;
const TOTAL_DAYS = 60;
const START_DATE = "May 4";
const END_DATE = "July 2, 2026";

const ALL_DAYS = [
  { day: 1, date: "May 4", home: "Buy shoe & jewelry storage (online order)", relationships: null, creativity: null },
  { day: 2, date: "May 5", home: null, relationships: null, creativity: null, milestone: "Work reorganization meeting" },
  { day: 3, date: "May 6", home: "Set up shoe storage", relationships: null, creativity: null },
  { day: 4, date: "May 7", home: "Set up jewelry storage", relationships: "Tell 1st person you're open to dating", creativity: null },
  { day: 5, date: "May 8", home: "Purchase home cleaning routine plans", relationships: null, creativity: null },
  { day: 6, date: "May 9", home: null, relationships: "Practice warm & open energy!", creativity: null, milestone: "Work event" },
  { day: 7, date: "May 10", home: "Review cleaning plans, list supplies needed", relationships: null, creativity: null },
  { day: 8, date: "May 11", home: "Buy cleaning zone supplies", relationships: "Say yes to 1 invitation", creativity: null },
  { day: 9, date: "May 12", home: "Clean out pantry (remove expired/trash)", relationships: null, creativity: null },
  { day: 10, date: "May 13", home: "Start cleaning zone box #1 (kitchen)", relationships: null, creativity: null },
  { day: 11, date: "May 14", home: null, relationships: "Tell 2nd person you're open to dating", creativity: null },
  { day: 12, date: "May 15", home: "Organize pantry by zones", relationships: null, creativity: null },
  { day: 13, date: "May 16", home: "Finish cleaning zone box #1", relationships: "Initiate conversation with someone new", creativity: null },
  { day: 14, date: "May 17", home: null, relationships: null, creativity: "Find 2 sewing patterns" },
  { day: 15, date: "May 18", home: "Make cleaning zone box #2", relationships: "Tell 3rd person you're open", creativity: null },
  { day: 16, date: "May 19", home: "Finish cleaning zone box #2", relationships: null, creativity: null },
  { day: 17, date: "May 20", home: null, relationships: null, creativity: "Buy fabric for project 1" },
  { day: 18, date: "May 21", home: "Implement Monday kitchen cleaning", relationships: "Practice 'warm & open' at any interaction", creativity: null },
  { day: 19, date: "May 22", home: null, relationships: null, creativity: "Practice sewing (get reacclimated)" },
  { day: 20, date: "May 23", home: "Implement Thursday pick-up routine", relationships: null, creativity: null },
  { day: 21, date: "May 24", home: null, relationships: "Say yes to 1 invitation", creativity: "Finish practice sewing project" },
  { day: 22, date: "May 25", home: "Bathroom cleaning routine (test it)", relationships: "Initiate conversation with someone new", creativity: null },
  { day: 23, date: "May 26", home: null, relationships: null, creativity: "Cut fabric for project 1" },
  { day: 24, date: "May 27", home: null, relationships: null, creativity: "Start project 1 construction" },
  { day: 25, date: "May 28", home: null, relationships: "Practice not self-rejecting if you feel drawn to someone", creativity: "Work on project 1" },
  { day: 26, date: "May 29", home: null, relationships: null, creativity: "Work on project 1" },
  { day: 27, date: "May 30", home: null, relationships: null, creativity: "Work on project 1" },
  { day: 28, date: "May 31", home: null, relationships: "Say yes to 1 invitation", creativity: "Work on project 1" },
  { day: 29, date: "June 1", home: null, relationships: "Attend 1 new/different event (plan it now)", creativity: "Work on project 1" },
  { day: 30, date: "June 2", home: null, relationships: null, creativity: "Work on project 1" },
  { day: 31, date: "June 3", home: null, relationships: "Initiate conversation with someone new", creativity: "Work on project 1" },
  { day: 32, date: "June 4", home: null, relationships: null, creativity: "Finish project 1 construction" },
  { day: 33, date: "June 5", home: null, relationships: null, creativity: "Final details project 1 (hemming, etc.)" },
  { day: 34, date: "June 6", home: null, relationships: "Practice warm & open!", creativity: null, milestone: "Work event out of town" },
  { day: 35, date: "June 7", home: null, relationships: "Say yes to 1 invitation", creativity: "Celebrate project 1! Document with photos", milestone: "Project 1 complete! 🎉" },
  { day: 36, date: "June 8", home: null, relationships: null, creativity: "Get fabric for project 2" },
  { day: 37, date: "June 9", home: null, relationships: "Attend the new/different event you planned", creativity: null },
  { day: 38, date: "June 10", home: null, relationships: "Practice vulnerability with a friend", creativity: "Cut fabric for project 2" },
  { day: 39, date: "June 11", home: null, relationships: null, creativity: "Start project 2 construction" },
  { day: 40, date: "June 12", home: null, relationships: null, creativity: "Work on project 2" },
  { day: 41, date: "June 13", home: null, relationships: "Initiate conversation with someone new", creativity: "Work on project 2" },
  { day: 42, date: "June 14", home: null, relationships: "Say yes to 1 invitation", creativity: "Work on project 2" },
  { day: 43, date: "June 15", home: null, relationships: null, creativity: "Work on project 2" },
  { day: 44, date: "June 16", home: null, relationships: "Practice 'warm & open' at any interaction", creativity: "Work on project 2" },
  { day: 45, date: "June 17", home: null, relationships: null, creativity: "Work on project 2" },
  { day: 46, date: "June 18", home: null, relationships: "Dress/show up confidently", creativity: "Prep for Juneteenth celebration" },
  { day: 47, date: "June 19", home: null, relationships: null, creativity: null, milestone: "Juneteenth family celebration! 🎉" },
  { day: 48, date: "June 20", home: null, relationships: null, creativity: "Work on project 2" },
  { day: 49, date: "June 21", home: null, relationships: "Say yes to 1 invitation", creativity: "Work on project 2" },
  { day: 50, date: "June 22", home: null, relationships: "Initiate conversation with someone new", creativity: "Work on project 2" },
  { day: 51, date: "June 23", home: null, relationships: null, creativity: "Work on project 2" },
  { day: 52, date: "June 24", home: null, relationships: null, creativity: "Finish project 2 construction" },
  { day: 53, date: "June 25", home: null, relationships: "Attend 1 new/different event", creativity: "Final details project 2" },
  { day: 54, date: "June 26", home: null, relationships: null, creativity: "Celebrate project 2 done! 🎉", milestone: "Project 2 complete! 🎉" },
  { day: 55, date: "June 27", home: null, relationships: "Practice not self-rejecting. If someone shows interest, don't dismiss it", creativity: null },
  { day: 56, date: "June 28", home: null, relationships: "Say yes to 1 invitation", creativity: null },
  { day: 57, date: "June 29", home: null, relationships: "Relationship check-in: Have I been showing up warmly? Going on dates?", creativity: null },
  { day: 58, date: "June 30", home: null, relationships: "Initiate conversation with someone new", creativity: null },
  { day: 59, date: "July 1", home: null, relationships: "Practice 'warm & open' at any outing", creativity: null },
  { day: 60, date: "July 2", home: null, relationships: null, creativity: null, milestone: "60-DAY REVIEW: Celebrate wins! What's next? 🎉" },
];

const TABS = [
  { id: "week", label: "Week", icon: "📋", color: PALETTE.blushRose },
  { id: "habits", label: "Habits", icon: "🔥", color: PALETTE.princetonOrange },
  { id: "goals60", label: "60-Day", icon: "🎯", color: PALETTE.tomatoJam },
  { id: "content", label: "Content", icon: "📱", color: PALETTE.olive },
  { id: "finances", label: "Bills", icon: "💰", color: PALETTE.tomatoJam },
  { id: "bucket", label: "Bucket List", icon: "✨", color: PALETTE.blushRose },
];

const DEFAULT_ROUTINES = [
  { id: "r1", text: "Pray", done: false },
  { id: "r2", text: "Bible study", done: false },
  { id: "r3", text: "Morning planner check-in", done: false },
  { id: "r4", text: "Vitamins", done: false },
  { id: "r5", text: "Fiber", done: false },
  { id: "r6", text: "Breakfast", done: false },
];

const DEFAULT_TASKS = [
  { id: "t1", text: "Book Harvest: Block Party vendor emails", category: "work", done: false },
  { id: "t2", text: "River Church: Sunday caption", category: "church", done: false },
  { id: "t3", text: "Post to TikTok", category: "content", done: false },
  { id: "t4", text: "Grocery run", category: "personal", done: false },
];

const DEFAULT_HABITS = [
  { id: "h1", label: "Water", icon: "💧", color: PALETTE.blushRose },
  { id: "h2", label: "Exercise", icon: "🏋️", color: PALETTE.tomatoJam },
  { id: "h3", label: "Journal", icon: "📓", color: PALETTE.princetonOrange },
  { id: "h4", label: "Vitamins", icon: "💊", color: PALETTE.olive },
  { id: "h5", label: "No Spend", icon: "💳", color: "#9b6a7a" },
];

const DEFAULT_CONTENT = [
  { id: "c1", platform: "Instagram", text: "Hosting inspo reel — summer table setup", status: "draft", day: "Mon" },
  { id: "c2", platform: "TikTok", text: "Get ready with me + weekly reset", status: "planned", day: "Wed" },
  { id: "c3", platform: "Substack", text: "Personal essay: slow living in a busy season", status: "writing", day: "Fri" },
  { id: "c4", platform: "Instagram", text: "Block Party countdown", status: "planned", day: "Sat" },
];

const DEFAULT_BILLS = [
  { id: "b1", label: "Rent", amount: 1200, due: "1st", paid: false },
  { id: "b2", label: "Electric", amount: 85, due: "5th", paid: false },
  { id: "b3", label: "Phone", amount: 65, due: "10th", paid: true },
  { id: "b4", label: "Internet", amount: 55, due: "12th", paid: false },
  { id: "b5", label: "Spotify", amount: 11, due: "15th", paid: true },
  { id: "b6", label: "Now Massage", amount: 80, due: "20th", paid: false },
];

const DEFAULT_BUCKET = [
  { id: "bk1", text: "Solo trip somewhere international", category: "Travel", done: false },
  { id: "bk2", text: "Publish an essay that goes viral", category: "Creative", done: false },
  { id: "bk3", text: "Host a dinner party for 10+", category: "Lifestyle", done: false },
  { id: "bk4", text: "Pay off credit card completely", category: "Finance", done: true },
  { id: "bk5", text: "Get featured in a local publication", category: "Career", done: false },
  { id: "bk6", text: "90-day workout streak", category: "Health", done: false },
];

const PLATFORM_ICONS = { Instagram: "📸", TikTok: "🎵", Substack: "✍️", Church: "⛪", Work: "💼" };
const PLATFORMS = ["Instagram", "TikTok", "Substack", "Church", "Work"];

const STATUS_STYLES = {
  planned: { bg: "rgba(0,0,0,0.05)", color: "#999" },
  writing: { bg: "rgba(252,138,45,0.15)", color: "#c06a10" },
  draft: { bg: "rgba(220,79,124,0.15)", color: "#b03060" },
  posted: { bg: "rgba(158,152,32,0.15)", color: "#6b6600" },
};

const CAT_STYLES = {
  work: { bg: "rgba(196,43,52,0.12)", color: "#a02030" },
  church: { bg: "rgba(158,152,32,0.15)", color: "#6b6600" },
  content: { bg: "rgba(220,79,124,0.12)", color: "#b03060" },
  personal: { bg: "rgba(252,138,45,0.12)", color: "#b06020" },
};

function Tag({ label }) {
  const s = CAT_STYLES[label] || { bg: "rgba(0,0,0,0.06)", color: "#888" };
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 10, padding: "2px 8px", borderRadius: 999, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function Card({ children, style = {}, accent }) {
  return (
    <div style={{
      background: PALETTE.cardBg,
      border: `1.5px solid ${accent ? accent + "33" : PALETTE.cardBorder}`,
      borderRadius: 20, padding: 20,
      boxShadow: "0 2px 16px rgba(220,79,124,0.06)",
      ...style
    }}>{children}</div>
  );
}

function Check({ checked, onChange, accentColor }) {
  return (
    <button onClick={onChange} style={{
      width: 22, height: 22, borderRadius: 6,
      border: checked ? "none" : `2px solid ${accentColor}55`,
      background: checked ? accentColor : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, cursor: "pointer", transition: "all 0.15s"
    }}>
      {checked && <span style={{ color: "#fff", fontSize: 12, fontWeight: 900 }}>✓</span>}
    </button>
  );
}

function AddRow({ placeholder, onAdd, accentColor }) {
  const [val, setVal] = useState("");
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
      <input value={val} onChange={e => setVal(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" && val.trim()) { onAdd(val.trim()); setVal(""); } }}
        placeholder={placeholder}
        style={{ flex: 1, background: "#fdf4f6", border: `1.5px solid ${PALETTE.cardBorder}`, borderRadius: 10, padding: "8px 12px", color: PALETTE.textDark, fontSize: 13, outline: "none" }}
      />
      <button onClick={() => { if (val.trim()) { onAdd(val.trim()); setVal(""); } }}
        style={{ background: accentColor, color: "#fff", border: "none", borderRadius: 10, padding: "8px 14px", fontWeight: 900, fontSize: 16, cursor: "pointer" }}>+</button>
    </div>
  );
}

// ── SAVE HOOK ──
function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setData({}); setLoading(false); });
  }, []);

  const save = (updates) => {
    const next = { ...data, ...updates };
    setData(next);
    fetch("/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next)
    });
  };

  return { data, loading, save };
}

// ── WEEK VIEW ──
function WeekView({ data, save }) {
  const routines = data.routines || DEFAULT_ROUTINES;
  const tasks = data.tasks || DEFAULT_TASKS;
  const [newCat, setNewCat] = useState("personal");

  const toggleR = id => save({ routines: routines.map(r => r.id === id ? { ...r, done: !r.done } : r) });
  const toggleT = id => save({ tasks: tasks.map(t => t.id === id ? { ...t, done: !t.done } : t) });
  const addTask = text => save({ tasks: [...tasks, { id: Date.now().toString(), text, category: newCat, done: false }] });
  const deleteTask = id => save({ tasks: tasks.filter(t => t.id !== id) });
  const resetRoutines = () => save({ routines: routines.map(r => ({ ...r, done: false })) });
  const done = routines.filter(r => r.done).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card accent={PALETTE.blushRose}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16, color: PALETTE.textDark }}>☀️ Morning Routine</div>
            <div style={{ color: PALETTE.textLight, fontSize: 12, marginTop: 2 }}>{done}/{routines.length} complete</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {routines.map((r, i) => (
                <div key={r.id} style={{ width: 8, height: 8, borderRadius: "50%", background: i < done ? PALETTE.blushRose : "#f0d5dc" }} />
              ))}
            </div>
            <button onClick={resetRoutines} style={{ background: "none", border: "none", color: PALETTE.textLight, fontSize: 11, cursor: "pointer" }}>reset</button>
          </div>
        </div>
        {routines.map(r => (
          <div key={r.id} onClick={() => toggleR(r.id)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, marginBottom: 6,
            background: r.done ? "rgba(220,79,124,0.08)" : "#fdf4f6", cursor: "pointer"
          }}>
            <Check checked={r.done} onChange={() => toggleR(r.id)} accentColor={PALETTE.blushRose} />
            <span style={{ fontSize: 14, color: r.done ? PALETTE.textLight : PALETTE.textDark, textDecoration: r.done ? "line-through" : "none" }}>{r.text}</span>
          </div>
        ))}
      </Card>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 16, color: PALETTE.textDark }}>📋 This Week</div>
          <span style={{ color: PALETTE.textLight, fontSize: 12 }}>{tasks.filter(t => t.done).length}/{tasks.length}</span>
        </div>
        {tasks.map(t => (
          <div key={t.id} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, marginBottom: 6,
            background: "#fdf4f6", border: `1px solid ${PALETTE.cardBorder}`
          }}>
            <Check checked={t.done} onChange={() => toggleT(t.id)} accentColor={PALETTE.princetonOrange} />
            <span style={{ flex: 1, fontSize: 14, color: t.done ? PALETTE.textLight : PALETTE.textDark, textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
            <Tag label={t.category} />
            <button onClick={() => deleteTask(t.id)} style={{ background: "none", border: "none", color: PALETTE.textLight, cursor: "pointer", fontSize: 13 }}>✕</button>
          </div>
        ))}
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
          {["personal", "work", "church", "content"].map(cat => (
            <button key={cat} onClick={() => setNewCat(cat)} style={{
              padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, cursor: "pointer", border: "none",
              background: newCat === cat ? PALETTE.princetonOrange : "#f5e0e5",
              color: newCat === cat ? "#fff" : PALETTE.textMid
            }}>{cat}</button>
          ))}
        </div>
        <AddRow placeholder="Add a task... (press Enter)" onAdd={addTask} accentColor={PALETTE.princetonOrange} />
      </Card>
    </div>
  );
}

// ── HABIT TRACKER ──
function HabitTracker({ data, save }) {
  const habits = data.habits || DEFAULT_HABITS;
  const logs = data.habitLogs || {};

  const wkKey = () => {
    const d = new Date(), day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(new Date().setDate(diff)).toISOString().split("T")[0];
  };
  const wk = wkKey();

  const toggle = (hid, di) => save({ habitLogs: { ...logs, [`${wk}-${hid}-${di}`]: !logs[`${wk}-${hid}-${di}`] } });
  const getCount = hid => DAYS.reduce((a, _, i) => a + (logs[`${wk}-${hid}-${i}`] ? 1 : 0), 0);
  const totalPct = habits.length ? Math.round(habits.reduce((a, h) => a + getCount(h.id) / 7, 0) / habits.length * 100) : 0;
  const addHabit = text => save({ habits: [...habits, { id: Date.now().toString(), label: text, icon: "⭐", color: PALETTE.blushRose }] });
  const deleteHabit = id => save({ habits: habits.filter(h => h.id !== id) });

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontWeight: 900, fontSize: 16, color: PALETTE.textDark }}>🔥 Weekly Habits</div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: PALETTE.princetonOrange }}>{totalPct}%</div>
          <div style={{ fontSize: 11, color: PALETTE.textLight }}>this week</div>
        </div>
      </div>
      <div style={{ background: "#f0d5dc", borderRadius: 99, height: 6, marginBottom: 24 }}>
        <div style={{ width: `${totalPct}%`, height: 6, borderRadius: 99, background: PALETTE.princetonOrange, transition: "width 0.3s" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr repeat(7, 32px)", gap: 4, marginBottom: 8 }}>
        <div />
        {DAYS.map((d, i) => (
          <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: i === TODAY_IDX ? PALETTE.princetonOrange : PALETTE.textLight }}>{d}</div>
        ))}
      </div>
      {habits.map(h => {
        const count = getCount(h.id);
        return (
          <div key={h.id} style={{ display: "grid", gridTemplateColumns: "1fr repeat(7, 32px)", gap: 4, alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 16 }}>{h.icon}</span>
              <span style={{ fontSize: 13, color: PALETTE.textDark, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.label}</span>
              <span style={{ fontSize: 11, color: h.color, marginRight: 2 }}>{count}/7</span>
              <button onClick={() => deleteHabit(h.id)} style={{ background: "none", border: "none", color: PALETTE.textLight, cursor: "pointer", fontSize: 11, padding: 0, flexShrink: 0 }}>✕</button>
            </div>
            {DAYS.map((_, i) => {
              const checked = logs[`${wk}-${h.id}-${i}`];
              return (
                <button key={i} onClick={() => toggle(h.id, i)} style={{
                  width: 28, height: 28, borderRadius: 8,
                  border: i === TODAY_IDX ? `2px solid ${PALETTE.princetonOrange}` : `1px solid ${PALETTE.cardBorder}`,
                  background: checked ? h.color : "#fdf4f6",
                  color: checked ? "#fff" : "transparent", fontSize: 11, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto"
                }}>{checked ? "✓" : ""}</button>
              );
            })}
          </div>
        );
      })}
      <AddRow placeholder="Add a habit..." onAdd={addHabit} accentColor={PALETTE.princetonOrange} />
    </Card>
  );
}

// ── 60-DAY GOALS ──
function Goals60({ data, save }) {
  const completed = data.completedDays || {};
  const [view, setView] = useState("today");

  const toggleDay = (dayNum, track) => {
    const key = `${dayNum}-${track}`;
    save({ completedDays: { ...completed, [key]: !completed[key] } });
  };
  const isChecked = (dayNum, track) => !!completed[`${dayNum}-${track}`];
  const pct = Math.round((CURRENT_DAY / TOTAL_DAYS) * 100);
  const todayData = ALL_DAYS.find(d => d.day === CURRENT_DAY);
  const upcomingDays = ALL_DAYS.filter(d => d.day > CURRENT_DAY && d.day <= CURRENT_DAY + 7);
  const pastDays = ALL_DAYS.filter(d => d.day < CURRENT_DAY).reverse();
  const trackColor = { home: PALETTE.olive, relationships: PALETTE.blushRose, creativity: PALETTE.princetonOrange };
  const trackLabel = { home: "🏠 Home", relationships: "💗 Relationships", creativity: "🧵 Creativity" };

  const DayCard = ({ d, isCurrent }) => {
    const tracks = ["home", "relationships", "creativity"].filter(t => d[t]);
    return (
      <div style={{
        background: isCurrent ? "#fff" : "#fdf4f6",
        border: `1.5px solid ${isCurrent ? PALETTE.blushRose + "55" : PALETTE.cardBorder}`,
        borderRadius: 16, padding: 16, marginBottom: 12,
        boxShadow: isCurrent ? "0 4px 20px rgba(220,79,124,0.12)" : "none"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: isCurrent ? PALETTE.blushRose : PALETTE.textLight, textTransform: "uppercase", letterSpacing: 1 }}>Day {d.day}</span>
          <span style={{ fontSize: 11, color: PALETTE.textLight }}>· {d.date}</span>
          {isCurrent && <span style={{ marginLeft: "auto", fontSize: 11, background: PALETTE.blushRose, color: "#fff", borderRadius: 99, padding: "2px 8px", fontWeight: 700 }}>TODAY</span>}
        </div>
        {d.milestone && (
          <div style={{ background: "rgba(252,233,171,0.5)", border: `1px solid ${PALETTE.vanillaCustard}`, borderRadius: 10, padding: "6px 12px", marginBottom: 8, fontSize: 13, fontWeight: 700, color: "#7a5500" }}>⭐ {d.milestone}</div>
        )}
        {tracks.map(track => (
          <div key={track} onClick={() => toggleDay(d.day, track)} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", borderRadius: 10, marginBottom: 4,
            background: isChecked(d.day, track) ? trackColor[track] + "15" : "transparent", cursor: "pointer"
          }}>
            <Check checked={isChecked(d.day, track)} onChange={() => toggleDay(d.day, track)} accentColor={trackColor[track]} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: trackColor[track], textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{trackLabel[track]}</div>
              <div style={{ fontSize: 13, color: isChecked(d.day, track) ? PALETTE.textLight : PALETTE.textDark, textDecoration: isChecked(d.day, track) ? "line-through" : "none", lineHeight: 1.4 }}>{d[track]}</div>
            </div>
          </div>
        ))}
        {!tracks.length && !d.milestone && <div style={{ fontSize: 13, color: PALETTE.textLight }}>Morning routine only — rest day ✨</div>}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card accent={PALETTE.tomatoJam}>
        <div style={{ fontWeight: 900, fontSize: 18, color: PALETTE.textDark, marginBottom: 4 }}>🎯 60-Day Challenge</div>
        <div style={{ color: PALETTE.textMid, fontSize: 12, marginBottom: 12 }}>{START_DATE} – {END_DATE}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 44, fontWeight: 900, color: PALETTE.tomatoJam, lineHeight: 1 }}>Day {CURRENT_DAY}</span>
          <span style={{ color: PALETTE.textLight, fontSize: 14 }}>of {TOTAL_DAYS}</span>
        </div>
        <div style={{ background: "#f0d5dc", borderRadius: 99, height: 8, marginBottom: 6 }}>
          <div style={{ width: `${pct}%`, height: 8, borderRadius: 99, background: PALETTE.tomatoJam }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: PALETTE.textLight }}>
          <span>{pct}% complete</span><span>{TOTAL_DAYS - CURRENT_DAY} days to go</span>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
          {Object.entries(trackLabel).map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: trackColor[k] }} />
              <span style={{ fontSize: 11, color: PALETTE.textMid }}>{v}</span>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ display: "flex", gap: 8 }}>
        {[["today", "Today"], ["upcoming", "Upcoming"], ["past", "Past Days"]].map(([id, label]) => (
          <button key={id} onClick={() => setView(id)} style={{
            padding: "7px 16px", borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none",
            background: view === id ? PALETTE.tomatoJam : "#f0d5dc", color: view === id ? "#fff" : PALETTE.textMid
          }}>{label}</button>
        ))}
      </div>
      {view === "today" && todayData && <DayCard d={todayData} isCurrent={true} />}
      {view === "upcoming" && <div>{upcomingDays.map(d => <DayCard key={d.day} d={d} isCurrent={false} />)}</div>}
      {view === "past" && <div>{pastDays.map(d => <DayCard key={d.day} d={d} isCurrent={false} />)}</div>}
    </div>
  );
}

// ── CONTENT ──
function ContentCalendar({ data, save }) {
  const content = data.content || DEFAULT_CONTENT;
  const [filter, setFilter] = useState("All");
  const [newDay, setNewDay] = useState(DAYS[TODAY_IDX]);
  const [newPlatform, setNewPlatform] = useState("Instagram");

  const cycleStatus = id => {
    const cycle = ["planned", "writing", "draft", "posted"];
    save({ content: content.map(c => c.id === id ? { ...c, status: cycle[(cycle.indexOf(c.status) + 1) % cycle.length] } : c) });
  };
  const addPost = text => save({ content: [...content, { id: Date.now().toString(), platform: newPlatform, text, status: "planned", day: newDay }] });
  const deletePost = id => save({ content: content.filter(c => c.id !== id) });
  const filtered = filter === "All" ? content : content.filter(c => c.platform === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["All", ...PLATFORMS].map(p => (
          <button key={p} onClick={() => setFilter(p)} style={{
            padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none",
            background: filter === p ? PALETTE.olive : "#f0d5dc", color: filter === p ? "#fff" : PALETTE.textMid
          }}>{p === "All" ? "All" : `${PLATFORM_ICONS[p]} ${p}`}</button>
        ))}
      </div>
      {DAYS.map(day => {
        const posts = filtered.filter(c => c.day === day);
        if (!posts.length) return null;
        return (
          <div key={day}>
            <div style={{ fontSize: 11, fontWeight: 700, color: day === DAYS[TODAY_IDX] ? PALETTE.olive : PALETTE.textLight, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
              {day}{day === DAYS[TODAY_IDX] ? " · Today" : ""}
            </div>
            {posts.map(c => {
              const ss = STATUS_STYLES[c.status];
              return (
                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: PALETTE.cardBg, border: `1.5px solid ${PALETTE.cardBorder}`, borderRadius: 14, marginBottom: 6, boxShadow: "0 1px 8px rgba(220,79,124,0.05)" }}>
                  <span style={{ fontSize: 18 }}>{PLATFORM_ICONS[c.platform] || "📄"}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: PALETTE.textDark, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.text}</div>
                    <div style={{ fontSize: 11, color: PALETTE.textLight, marginTop: 2 }}>{c.platform}</div>
                  </div>
                  <button onClick={() => cycleStatus(c.id)} style={{ background: ss.bg, color: ss.color, border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>{c.status}</button>
                  <button onClick={() => deletePost(c.id)} style={{ background: "none", border: "none", color: PALETTE.textLight, cursor: "pointer", fontSize: 13 }}>✕</button>
                </div>
              );
            })}
          </div>
        );
      })}
      <Card>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 10, color: PALETTE.textLight, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Platform</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {PLATFORMS.map(p => (
                <button key={p} onClick={() => setNewPlatform(p)} style={{ padding: "3px 8px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", border: "none", background: newPlatform === p ? PALETTE.olive : "#f0d5dc", color: newPlatform === p ? "#fff" : PALETTE.textMid }}>{p}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: PALETTE.textLight, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Day</div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {DAYS.map(d => (
                <button key={d} onClick={() => setNewDay(d)} style={{ padding: "3px 8px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", border: "none", background: newDay === d ? PALETTE.olive : "#f0d5dc", color: newDay === d ? "#fff" : PALETTE.textMid }}>{d}</button>
              ))}
            </div>
          </div>
        </div>
        <AddRow placeholder="Add a post idea..." onAdd={addPost} accentColor={PALETTE.olive} />
      </Card>
      <p style={{ fontSize: 11, color: PALETTE.textLight, margin: 0 }}>Tap a status badge to cycle: planned → writing → draft → posted</p>
    </div>
  );
}

// ── BILLS ──
function Finances({ data, save }) {
  const bills = data.bills || DEFAULT_BILLS;
  const togglePaid = id => save({ bills: bills.map(b => b.id === id ? { ...b, paid: !b.paid } : b) });
  const addBill = text => save({ bills: [...bills, { id: Date.now().toString(), label: text, amount: 0, due: "—", paid: false }] });
  const deleteBill = id => save({ bills: bills.filter(b => b.id !== id) });
  const resetAll = () => save({ bills: bills.map(b => ({ ...b, paid: false })) });
  const paidCount = bills.filter(b => b.paid).length;
  const totalDue = bills.reduce((a, b) => a + b.amount, 0);
  const totalPaid = bills.filter(b => b.paid).reduce((a, b) => a + b.amount, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card accent={PALETTE.tomatoJam}>
        <div style={{ fontWeight: 900, fontSize: 16, color: PALETTE.textDark, marginBottom: 4 }}>💰 Monthly Bills</div>
        <div style={{ fontSize: 30, fontWeight: 900, color: PALETTE.tomatoJam }}>${totalPaid.toLocaleString()} <span style={{ fontSize: 16, color: PALETTE.textLight }}>/ ${totalDue.toLocaleString()} paid</span></div>
        <div style={{ background: "#f0d5dc", borderRadius: 99, height: 6, marginTop: 12 }}>
          <div style={{ width: totalDue ? `${(totalPaid / totalDue) * 100}%` : "0%", height: 6, borderRadius: 99, background: PALETTE.tomatoJam, transition: "width 0.3s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 12, color: PALETTE.textLight }}>{paidCount}/{bills.length} paid</span>
          <button onClick={resetAll} style={{ background: "none", border: "none", color: PALETTE.textLight, fontSize: 11, cursor: "pointer" }}>reset month</button>
        </div>
      </Card>
      <Card>
        {bills.map((b, i) => (
          <div key={b.id} onClick={() => togglePaid(b.id)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 4px",
            borderBottom: i < bills.length - 1 ? `1px solid ${PALETTE.cardBorder}` : "none",
            cursor: "pointer", opacity: b.paid ? 0.45 : 1, transition: "opacity 0.2s"
          }}>
            <Check checked={b.paid} onChange={() => togglePaid(b.id)} accentColor={PALETTE.tomatoJam} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: b.paid ? PALETTE.textLight : PALETTE.textDark, fontWeight: 600, textDecoration: b.paid ? "line-through" : "none" }}>{b.label}</div>
              <div style={{ fontSize: 11, color: PALETTE.textLight, marginTop: 1 }}>Due: {b.due}</div>
            </div>
            {b.amount > 0 && <span style={{ fontSize: 14, fontWeight: 700, color: b.paid ? PALETTE.textLight : PALETTE.tomatoJam }}>${b.amount}</span>}
            <button onClick={e => { e.stopPropagation(); deleteBill(b.id); }} style={{ background: "none", border: "none", color: PALETTE.textLight, cursor: "pointer", fontSize: 13 }}>✕</button>
          </div>
        ))}
        <AddRow placeholder="Add a bill..." onAdd={addBill} accentColor={PALETTE.tomatoJam} />
      </Card>
    </div>
  );
}

// ── BUCKET LIST ──
const BUCKET_CATS = ["Travel", "Creative", "Lifestyle", "Finance", "Career", "Health", "Church", "Work"];

function BucketList({ data, save }) {
  const items = data.bucket || DEFAULT_BUCKET;
  const [filter, setFilter] = useState("All");
  const toggle = id => save({ bucket: items.map(b => b.id === id ? { ...b, done: !b.done } : b) });
  const addItem = text => save({ bucket: [...items, { id: Date.now().toString(), text, category: filter === "All" ? "Personal" : filter, done: false }] });
  const deleteItem = id => save({ bucket: items.filter(b => b.id !== id) });
  const filtered = filter === "All" ? items : items.filter(b => b.category === filter);
  const doneCount = items.filter(b => b.done).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontSize: 36, fontWeight: 900, color: PALETTE.blushRose }}>{doneCount}</span>
          <span style={{ fontSize: 20, color: PALETTE.textLight }}>/{items.length} done</span>
        </div>
        <div style={{ background: "#f0d5dc", borderRadius: 99, height: 8, width: 120 }}>
          <div style={{ width: `${items.length ? (doneCount / items.length) * 100 : 0}%`, height: 8, borderRadius: 99, background: PALETTE.blushRose }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["All", ...BUCKET_CATS].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, cursor: "pointer", border: "none",
            background: filter === cat ? PALETTE.blushRose : "#f0d5dc", color: filter === cat ? "#fff" : PALETTE.textMid
          }}>{cat}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(b => (
          <div key={b.id} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
            background: PALETTE.cardBg, border: `1.5px solid ${b.done ? PALETTE.blushRose + "33" : PALETTE.cardBorder}`,
            borderRadius: 14, opacity: b.done ? 0.55 : 1, transition: "all 0.2s",
            boxShadow: "0 1px 8px rgba(220,79,124,0.05)"
          }}>
            <Check checked={b.done} onChange={() => toggle(b.id)} accentColor={PALETTE.blushRose} />
            <span style={{ flex: 1, fontSize: 14, color: b.done ? PALETTE.textLight : PALETTE.textDark, textDecoration: b.done ? "line-through" : "none" }}>{b.text}</span>
            <button onClick={() => deleteItem(b.id)} style={{ background: "none", border: "none", color: PALETTE.textLight, cursor: "pointer", fontSize: 13 }}>✕</button>
          </div>
        ))}
      </div>
      <AddRow placeholder="Add a bucket list item..." onAdd={addItem} accentColor={PALETTE.blushRose} />
    </div>
  );
}

// ── MAIN ──
export default function App() {
  const [tab, setTab] = useState("week");
  const { data, loading, save } = useDashboard();

  if (loading) return (
    <div style={{ minHeight: "100vh", background: PALETTE.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: PALETTE.textLight, fontSize: 16 }}>Loading your dashboard... 🌸</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: PALETTE.bg, color: PALETTE.textDark, maxWidth: 680, margin: "0 auto", fontFamily: "'Georgia', 'DM Sans', serif" }}>
      <div style={{ padding: "32px 20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 13, color: PALETTE.textLight, marginBottom: 2, fontStyle: "italic" }}>Hey Bria ✦</div>
            <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5, color: PALETTE.textDark }}>My Dashboard</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: PALETTE.textLight }}>{new Date().toLocaleDateString("en-US", { weekday: "long" })}</div>
            <div style={{ fontSize: 12, color: PALETTE.textLight }}>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })}</div>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 20px 20px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 8, width: "max-content" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 999,
              fontSize: 13, fontWeight: 700, cursor: "pointer", border: "none", whiteSpace: "nowrap", transition: "all 0.15s",
              background: tab === t.id ? t.color : "#f0d5dc",
              color: tab === t.id ? "#fff" : PALETTE.textMid,
              boxShadow: tab === t.id ? `0 4px 16px ${t.color}44` : "none"
            }}>
              <span>{t.icon}</span><span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 20px 80px" }}>
        {tab === "week" && <WeekView data={data} save={save} />}
        {tab === "habits" && <HabitTracker data={data} save={save} />}
        {tab === "goals60" && <Goals60 data={data} save={save} />}
        {tab === "content" && <ContentCalendar data={data} save={save} />}
        {tab === "finances" && <Finances data={data} save={save} />}
        {tab === "bucket" && <BucketList data={data} save={save} />}
      </div>
    </div>
  );
}
