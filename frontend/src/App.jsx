import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoursesPage from "./app/pages/CoursesPage";
import CourseDetailPage from "./app/pages/CourseDetailPage";
import AdminPage from "./app/pages/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/courses/:course_id" element={<CourseDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}