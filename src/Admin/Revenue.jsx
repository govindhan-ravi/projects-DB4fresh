import { useEffect, useState } from "react";

export default function Revenue() {
  const [range, setRange] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
const [selectedMonth, setSelectedMonth] = useState("");
const [selectedYear, setSelectedYear] = useState("");

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    codRevenue: 0,
    onlineRevenue: 0,
    avgOrderValue: 0,
    codOrders: 0,
    onlineOrders: 0,
    cancelledOrders: 0,
  });

  const loadRevenue = (
  selectedRange,
  date = "",
  month = "",
  year = ""
) => {
  setRange(selectedRange);

  let url = `http://localhost:4000/api/admin/revenue?range=${selectedRange}`;

  if (date) url += `&date=${date}`;
  if (month) url += `&month=${month}`;
  if (year) url += `&year=${year}`;

  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch revenue");
      return res.json();
    })
    .then((data) => {
      setStats({
        totalRevenue: data.totalRevenue ?? 0,
        totalOrders: data.totalOrders ?? 0,
        codRevenue: data.codRevenue ?? 0,
        onlineRevenue: data.onlineRevenue ?? 0,
        avgOrderValue: data.avgOrderValue ?? 0,
        codOrders: data.codOrders ?? 0,
        onlineOrders: data.onlineOrders ?? 0,
        cancelledOrders: data.cancelledOrders ?? 0,
      });
    })
    .catch((err) => {
      console.error("REVENUE ERROR:", err.message);
    });
};
  useEffect(() => {
    loadRevenue("all");
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Revenue Overview</h2>

      {/* FILTERS */}
      <div className="flex gap-3 flex-wrap">
        <Filter
          label="Today"
          active={range === "today"}
          onClick={() => loadRevenue("today")}
        />

        <Filter
          label="Week"
          active={range === "week"}
          onClick={() => loadRevenue("week")}
        />

        <Filter
          label="Month"
          active={range === "month"}
          onClick={() => loadRevenue("month")}
        />

        <Filter
          label="Year"
          active={range === "year"}
          onClick={() => loadRevenue("year")}
        />
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
  {/* Select Date */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Select Date
    </label>

    <input
      type="date"
      value={selectedDate}
      onChange={(e) => {
        const value = e.target.value;
        setSelectedDate(value);
        loadRevenue("custom-date", value);
      }}
      className="border rounded-lg px-3 py-2"
    />
  </div>

  {/* Select Month */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Select Month
    </label>

    <input
      type="month"
      value={selectedMonth}
      onChange={(e) => {
        const value = e.target.value;
        setSelectedMonth(value);
        loadRevenue("custom-month", "", value);
      }}
      className="border rounded-lg px-3 py-2"
    />
  </div>

  {/* Select Year */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Select Year
    </label>

    <select
      value={selectedYear}
      onChange={(e) => {
        const value = e.target.value;
        setSelectedYear(value);
        loadRevenue("custom-year", "", "", value);
      }}
      className="border rounded-lg px-3 py-2"
    >
      <option value="">Select Year</option>

      {Array.from(
        { length: 10 },
        (_, i) => new Date().getFullYear() - i
      ).map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
</div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Total Revenue"
          value={`₹${Number(stats.totalRevenue).toLocaleString()}`}
        />

        <Card title="Total Orders" value={stats.totalOrders} />

        <Card
          title="COD Revenue"
          value={`₹${Number(stats.codRevenue).toLocaleString()}`}
        />

        <Card
          title="Online Revenue"
          value={`₹${Number(stats.onlineRevenue).toLocaleString()}`}
        />

        <Card
          title="Average Order Value"
          value={`₹${Number(stats.avgOrderValue).toLocaleString()}`}
        />

        <Card title="COD Orders" value={stats.codOrders} />

        <Card title="Online Orders" value={stats.onlineOrders} />

        <Card title="Cancelled Orders" value={stats.cancelledOrders} />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Metric</th>
              <th className="p-3 text-left">Value</th>
            </tr>
          </thead>

          <tbody>
            <Row
              label="Total Revenue"
              value={`₹${Number(stats.totalRevenue).toLocaleString()}`}
            />

            <Row
              label="COD Revenue"
              value={`₹${Number(stats.codRevenue).toLocaleString()}`}
            />

            <Row
              label="Online Revenue"
              value={`₹${Number(stats.onlineRevenue).toLocaleString()}`}
            />

            <Row
              label="Average Order Value"
              value={`₹${Number(stats.avgOrderValue).toLocaleString()}`}
            />

            <Row label="Total Orders" value={stats.totalOrders} />

            <Row label="COD Orders" value={stats.codOrders} />

            <Row label="Online Orders" value={stats.onlineOrders} />

            <Row
              label="Cancelled Orders"
              value={stats.cancelledOrders}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-green-100 rounded-lg p-4 shadow-sm">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Filter({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border rounded-lg transition ${
        active
          ? "bg-gray-200 font-semibold"
          : "hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}

function Row({ label, value }) {
  return (
    <tr className="border-t">
      <td className="p-3">{label}</td>
      <td className="p-3 font-medium">{value}</td>
    </tr>
  );
}