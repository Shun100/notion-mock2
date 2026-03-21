import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Layout from "./Layout";
import Home from "./pages/Home";
import NoteDetail from "./pages/NoteDetail";
import { AuthProvider  } from "./components/context/AuthContext";

// アプリ全体のルートを表すReactコンポーネント
function App() {
  return (
    <AuthProvider>
      {/* BrowserRouter: ルーティングの設定 */}
      <BrowserRouter>
        <div className="app-container">
          {/* Routes: ページの一覧表 */}
          <Routes>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>

            {/*
              Layoutコンポーネントの内容はURLによって動的に変わる

              例.
                <Route path="/" element={<Layout />}
                  <Route path="/hoge" element={<Hoge />} />
                </Route>

                ⇒ /hogeにアクセスすると、Layoutコンポーネント内のOutletコンポーネントがHogeコンポーネントに置き換わる
            */}
            <Route path="/" element={<Layout />}> 
              <Route index element={<Home />}></Route>
              <Route path="/notes/:id" element={<NoteDetail />}></Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
