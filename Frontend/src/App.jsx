import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

/* AUTH PAGES */
import Option from "./Pages/Option";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

/* TASK PAGES */
import WebDevTask from "./Pages/WebDevTask";
import AppDevTask from "./Pages/Appdev";
import DataScienceTask from "./Pages/DataScienceTask";
import MLTask from "./Pages/MLTask";
import CyberSecurityTask from "./Pages/CyberSecurityTask";
import CoreCSETask from "./Pages/CoreCSETask";

/* TEST PAGES */
import WebDevelopmentTest from "./Tests/WebDevTest";
import AppDevTest from "./Tests/AppDevTest";
import DataScienceTest from "./Tests/DataScienceTest";
import CyberSecurityTest from "./Tests/CyberSecurityTest";
import CoreCSETest from "./Tests/CoreCSETest";
import AIMachineTest from "./Tests/AIMachineTest";

/* EXTRA */
import Certificate from "./Pages/Certificate";
import LandingNeo from "./Pages/LandingNeo";
import AIMachineTest2 from "./TestInter/AiMachineTest2";
import AIMachineTest3 from "./TestAdvance/AiMachineTest3";
import SelectLevel from "./Pages/SelectLevel";
import WebDevelopmentTest2 from "./TestInter/WebDevTest2";
import WebDevelopmentTest3 from "./TestAdvance/WebDevTest3";
import CyberSecurityTest2 from "./TestInter/CyberSecurityTest2";
import AppDevTest2 from "./TestInter/AppDevTest2";
import CoreCSETest2 from "./TestInter/CoreCSETest2";
import DataScienceTest2 from "./TestInter/DataScienceTest2";
import AppDevTest3 from "./TestAdvance/AppDevTest3";
import CoreCSETest3 from "./TestAdvance/CoreCSETest3";
import DataScienceTest3 from "./TestAdvance/DataScienceTest3";
import CyberSecurityTest3 from "./TestAdvance/CyberSecurityTest3";

function App() {
  const [user, setUser] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userdata = localStorage.getItem("user");

    try {
      if (token && userdata && userdata !== "undefined") {
        setLogin(true);
        setUser(JSON.parse(userdata));
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingNeo />} />
      <Route path="/option" element={<Option />} />
      <Route path="/sign" element={<Signup setLogin={setLogin} setUser={setUser} />} />
      <Route path="/login" element={<Login setLogin={setLogin} setUser={setUser} />} />

      {/* TASKS */}
      <Route path="/webdev-task" element={<WebDevTask />} />
      <Route path="/app-task" element={<AppDevTask />} />
      <Route path="/ds-task" element={<DataScienceTask />} />
      <Route path="/ml-task" element={<MLTask />} />
      <Route path="/cyber-task" element={<CyberSecurityTask />} />
      <Route path="/core-cse-task" element={<CoreCSETask />} />

      {/* TESTS */}
      <Route path="/test/web/beginner" element={<WebDevelopmentTest />} />
      <Route path="/test/appdev/beginner" element={<AppDevTest />} />
      <Route path="/test/ds/beginner" element={<DataScienceTest />} />
      <Route path="/test/cyber/beginner" element={<CyberSecurityTest />} />
      <Route path="/test/cse/beginner" element={<CoreCSETest />} />
      <Route path="/test/ml/beginner" element={<AIMachineTest />} />
      <Route path="/test/ml/intermediate" element={<AIMachineTest2 />} />
      <Route path="/test/ml/advanced" element={<AIMachineTest3 />} />
      <Route path="/test/web/advanced" element={<WebDevelopmentTest3 />} />
      <Route path="/test/web/intermediate" element={<WebDevelopmentTest2 />} />
      <Route path="/test/ds/intermediate" element={<DataScienceTest2 />} />
      <Route path="/test/cse/intermediate" element={<CoreCSETest2 />} />
      <Route path="/test/appdev/intermediate" element={<AppDevTest2 />} />
      <Route path="/test/cyber/intermediate" element={<CyberSecurityTest2 />} />
      <Route path="/test/appdev/advanced" element={<AppDevTest3 />} />
      <Route path="/test/cse/advanced" element={<CoreCSETest3 />} />
      <Route path="/test/ds/advanced" element={<DataScienceTest3 />} />
      <Route path="/test/cyber/advanced" element={<CyberSecurityTest3 />} />
      {/* EXTRA */}
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/select-level" element={<SelectLevel />} />

    </Routes>
  );
}

export default App;
