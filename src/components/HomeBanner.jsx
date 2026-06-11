import { useNavigate } from "react-router-dom";

export default function HomeBanner() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #e53935, #ec407a)",
        color: "#fff",
        borderRadius: "12px",
        padding: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px 0",
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: "26px", fontWeight: "700" }}>
          Delivery in 30 Minutes ⚡
        </h2>
        <p style={{ margin: "6px 0 16px", fontSize: "15px" }}>
          Fresh groceries at your doorstep
        </p>

        <button
          onClick={() => navigate("/category/groceries")}
          style={{
            background: "#ffffff",
            color: "#e53935",
            border: "none",
            padding: "10px 22px",
            borderRadius: "20px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Shop Now →
        </button>
      </div>
    </div>
  );
}
