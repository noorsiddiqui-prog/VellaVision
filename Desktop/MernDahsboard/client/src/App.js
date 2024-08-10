import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme/theme";
import Dashboard from "scenes/Dashboard";
import { useMemo } from "react";
import Layout from "scenes/Layout";
import Products from "scenes/Products";
import Customers from "scenes/Customers";
import Transactions from "scenes/Transactions";
import Geography from "scenes/Geography";
import Overview from "scenes/Overview";
import Daily from "scenes/Daily";
import Monthly from "scenes/Monthly";
import Breakdown from "scenes/Breakdown";
import Admin from "scenes/Admin";
import Performance from "scenes/Performance";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* <Layout/> */}
          <Routes>
            {/* <Route element={<Layout/>}/> */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/products"
              element={
                <Layout>
                  <Products />
                </Layout>
              }
            />
            <Route
              path="/customers"
              element={
                <Layout>
                  <Customers />
                </Layout>
              }
            />
            <Route
              path="/transactions"
              element={
                <Layout>
                  <Transactions />
                </Layout>
              }
            />
            <Route
              path="/geography"
              element={
                <Layout>
                  <Geography />
                </Layout>
              }
            />
            <Route
              path="/overview"
              element={
                <Layout>
                  <Overview />
                </Layout>
              }
            />
            <Route
              path="/daily"
              element={
                <Layout>
                  <Daily />
                </Layout>
              }
            />
            <Route
              path="/monthly"
              element={
                <Layout>
                  <Monthly />
                </Layout>
              }
            />
            <Route
              path="/breakdown"
              element={
                <Layout>
                  <Breakdown />
                </Layout>
              }
            />
            <Route
              path="/admin"
              element={
                <Layout>
                  <Admin />
                </Layout>
              }
            />
            <Route
              path="/performance"
              element={
                <Layout>
                  <Performance />
                </Layout>
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
