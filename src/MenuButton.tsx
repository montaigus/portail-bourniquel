import { useState } from "react";
import "./MenuButton.css";

export default function MenuButton(): JSX.Element {
  const [faced, setFaced] = useState(false);

  function toggleButtonFace(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div
        className={`menuButton-container ${faced ? "change" : ""}`}
        onClick={() => setFaced(!faced)}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </>
  );
}
