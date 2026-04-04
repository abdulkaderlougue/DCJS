import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoursesPage from "./app/pages/CoursesPage";
import CourseDetail from "./app/pages/CourseDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}