import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import AuthService from "./services/auth.service";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";
import LinkProject1 from "./components/link-project1";
import LinkProject2 from "./components/link-project2";
import LinkProject3 from "./components/link-project3";
import LinkProject4 from "./components/link-project4";
import LinkProject5 from "./components/link-project5";
import LinkProject6 from "./components/link-project6.js";
import LayoutPicture from "./components/Layout_picture";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Page404 from "./pages/Page404";
import "./styles/style.css";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route index path="/" element={<HomeComponent />}></Route>
          <Route path="register" element={<RegisterComponent />}></Route>
          <Route
            path="login"
            element={
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="profile"
            element={
              <ProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="course"
            element={
              <CourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="postCourse"
            element={
              <PostCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="enroll"
            element={
              <EnrollComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
        </Route>
      </Routes>
      <Routes>
        <Route path="/project1" element={<LinkProject1 />} />
        <Route path="/project2" element={<LinkProject2 />} />
        <Route path="/project3" element={<LinkProject3 />} />
        <Route path="/project4" element={<LinkProject4 />} />
        <Route path="/project5" element={<LinkProject5 />} />
        <Route path="/project6" element={<LinkProject6 />} />
      </Routes>
      <Routes>
        <Route path="/picture" element={<LayoutPicture />}>
          <Route path="/picture" element={<Homepage />}></Route>
          <Route path="/picture/about" element={<About />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
