import { useState } from "react";

const initialItems = [
  {
    id: 1,
    name: "Kopi Bubuk",
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: "Gula Pasir",
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: "Air Mineral",
    quantity: 3,
    checked: false,
  },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(item: (typeof initialItems)[0]) {
    setItems((items) => [...items, item]);
  }

  function handleToggleItem(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleDeleteItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} />
      <GroceryList
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
      />
      <Footer items={items} />
    </div>
  );
}

function Header() {
  return <h1>Catatan Belanjaku 📝</h1>;
}

function Form({
  onAddItem,
}: {
  onAddItem: (item: (typeof initialItems)[0]) => void;
}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name) return;

    const newItem = {
      id: Date.now(),
      name,
      quantity: Number(quantity),
      checked: false,
    };

    onAddItem(newItem);
    setName("");
    setQuantity(1);
  }

  const quantityNum = [...Array(20)].map((_, i) => (
    <option value={i + 1} key={i + 1}>
      {i + 1}
    </option>
  ));

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hari ini belanja apa kita?</h3>
      <div className="form-row">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}>
          {quantityNum}
        </select>
        <input
          type="text"
          placeholder="nama barang..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Tambah</button>
      </div>
    </form>
  );
}

function GroceryList({
  items,
  onToggleItem,
  onDeleteItem,
}: {
  items: typeof initialItems;
  onToggleItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
}) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
            <Item
              item={item}
              key={item.id}
              onToggleItem={onToggleItem}
              onDeleteItem={onDeleteItem}
            />
          ))}
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

function Item({
  item,
  onToggleItem,
  onDeleteItem,
}: {
  item: (typeof initialItems)[0];
  onToggleItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.checked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.name}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
}
function Footer({ items }: { items: typeof initialItems }) {
  if (items.length === 0)
    return <footer className="stats">Daftar belanjaan masih kosong!</footer>;

  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.checked).length;
  const percentage = Math.round((checkedItems / totalItems) * 100);

  return (
    <footer className="stats">
      Ada {totalItems} barang di daftar belanjaan, {checkedItems} barang sudah
      dibeli ({percentage}%)
    </footer>
  );
}
