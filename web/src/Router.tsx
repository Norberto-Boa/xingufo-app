import { Route, Routes } from 'react-router-dom';
import { Index } from './Pages/Home/Index';
import { Sidebar } from "./components/Sidebar";
import { RightBar } from "./components/RightBar";

export function Router() {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/foo" element={<h1>foo</h1>} />
      </Routes>

      <RightBar />
    </div>
  )
}