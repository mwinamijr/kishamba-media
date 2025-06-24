import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/HomeScreen";
import About from "./screens/AboutScreen";
import Contact from "./screens/ContactScreen";
import NewsScreen from "./screens/NewsScreen";
import SportsScreen from "./screens/SportsScreen";
import LoginScreen from "./screens/LoginScreen";
import NotFoundPage from "./screens/404Page";
import RegisterScreen from "./screens/RegisterScreen";
import AdminDashboard from "./screens/admin/AdminDashboard";
import PrivateAdminRoute from "./screens/protected/PrivateAdminRoute";
import {
  PrivateReporterOrEditorRoute,
  PrivateRoute,
} from "./screens/protected/PrivateRoute";
import Unauthorized from "./screens/admin/Unauthorized";
import AddUser from "./screens/admin/AddUser";
import UserProfile from "./screens/admin/UserProfile";
import UpdateProfile from "./screens/admin/UserUpdate";
import ChangePassword from "./screens/admin/ChangePassword";
import ViewUserProfile from "./screens/admin/ViewUserProfile";
import PrivateReporterRoute from "./screens/protected/PrivateReporterRoute";
import ReporterDashboard from "./screens/reporter/ReporterDashboard";
import AddPost from "./screens/reporter/AddPost";
import PostDetails from "./screens/reporter/PostDetails";
import PostUpdate from "./screens/reporter/PostUpdate";
import PrivateEditorRoute from "./screens/protected/PrivateEditorRoute";
import EditorDashboard from "./screens/editor/EditorDashboard";
import AddArticle from "./screens/editor/AddArticle";
import ArticleDetails from "./screens/editor/ArticleDetails";
import UpdateArticle from "./screens/editor/UpdateArticle";
import ImageUploader from "./screens/reporter/ImageUploader";
import HealthScreen from "./screens/HealthScreen";
import FashionScreen from "./screens/FashionScreen";
import EntertainmentScreen from "./screens/EntertainmentScreen";
import BusinessScreen from "./screens/BusinessScreen";

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/ingia" || location.pathname === "/jiunge"; // Changed to match your route paths for login/register

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kuhusu" element={<About />} />
        <Route path="/wasiliana-nasi" element={<Contact />} />
        <Route path="/habari/:id" element={<NewsScreen />} />
        <Route path="/michezo" element={<SportsScreen />} />
        <Route path="/afya" element={<HealthScreen />} />
        <Route path="/mitindo" element={<FashionScreen />} />
        <Route path="/burudani" element={<EntertainmentScreen />} />
        <Route path="/biashara" element={<BusinessScreen />} />
        <Route path="/ingia" element={<LoginScreen />} />
        <Route path="/jiunge" element={<RegisterScreen />} />
        <Route
          path="/upload"
          element={
            <PrivateReporterOrEditorRoute>
              <ImageUploader />
            </PrivateReporterOrEditorRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <AdminDashboard />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="admin/add-user"
          element={
            <PrivateAdminRoute>
              <AddUser />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <PrivateAdminRoute>
              <ViewUserProfile />
            </PrivateAdminRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/password"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />

        <Route
          path="/posts"
          element={
            <PrivateReporterRoute>
              <ReporterDashboard />
            </PrivateReporterRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <PrivateReporterRoute>
              <PostDetails />
            </PrivateReporterRoute>
          }
        />
        <Route
          path="/posts/:id/edit"
          element={
            <PrivateReporterRoute>
              <PostUpdate />
            </PrivateReporterRoute>
          }
        />
        <Route
          path="/posts/add"
          element={
            <PrivateReporterRoute>
              <AddPost />
            </PrivateReporterRoute>
          }
        />

        <Route
          path="/articles"
          element={
            <PrivateEditorRoute>
              <EditorDashboard />
            </PrivateEditorRoute>
          }
        />
        <Route
          path="/articles/add"
          element={
            <PrivateEditorRoute>
              <AddArticle />
            </PrivateEditorRoute>
          }
        />
        <Route
          path="/articles/:id"
          element={
            <PrivateEditorRoute>
              <ArticleDetails />
            </PrivateEditorRoute>
          }
        />
        <Route
          path="/articles/:id/edit"
          element={
            <PrivateEditorRoute>
              <UpdateArticle />
            </PrivateEditorRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
