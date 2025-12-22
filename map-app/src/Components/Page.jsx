import '../App.css'
import Map from './Map'

export default function Page() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebarHeader">
          <h1>Third Space</h1>
          <input className="search" placeholder="Search places..." />
          <button className="primaryBtn">+ Add New Place</button>
        </div>

        <div className="cards">
          <div className="card">Card 1…</div>
          <div className="card">Card 2…</div>
          <div className="card">Card 3…</div>
        </div>
      </aside>

      <main className="mapArea">
        <Map />
      </main>
    </div>
  );
}
