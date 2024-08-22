import { SettingFilled } from "@ant-design/icons";
import React from "react";
import "../assests/css/loader.css"
const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-icon">
        <SettingFilled rotate={180} />
      </div>
    </div>
  );
};

export default Loader;
