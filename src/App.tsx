export default function App() {
  return (
    <div className="app">
      <Header />
      <Form />
      <GroceryList />
      <footer className="stats">
        Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)
      </footer>
    </div>
  );
}

function Header() {
  return <h1>Catatan Belanjaku 📝</h1>;
}

function Form() {
  return (
    <form className="add-form">
      <h3>Hari ini belanja apa kita?</h3>
      <div className="form-row">
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input type="text" placeholder="nama barang..." />
        <button type="button">Tambah</button>
      </div>
    </form>
  );
}

function GroceryList() {
  return (
    <>
      <div className="list">
        <ul>
          <li>
            <input type="checkbox" defaultChecked />
            <span>1 Kopi</span>
            <button>&times;</button>
          </li>
          <li>
            <input type="checkbox" />
            <span>5 Gula Pasir</span>
            <button>&times;</button>
          </li>
          <li>
            <input type="checkbox" />
            <span>3 Air Mineral</span>
            <button>&times;</button>
          </li>
        </ul>
      </div>
      <div className="actions">
        <select>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button>Bersihkan Daftar</button>
      </div>
    </>
  );
}
