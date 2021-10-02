import Header from "./components/Header";
import Shorten from "./components/Shorten";
import RedirectPage from "./components/RedirectPage";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [urls, setUrls] = useState({ longUrl: "", shortUrl: "" });
  const [invalid, setInvalid] = useState(false);

  const addUrl = async (longUrl, alias) => {
    try {
      const res = await fetch(`/api/urls/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl: longUrl, alias: alias }),
      });
      const data = await res.json();
      console.log("HERE3", data);
      if (data.alias) {
        setUrls({
          longUrl: data.longUrl,
          shortUrl: `http://localhost:3000/${data.alias}`,
        });
        setInvalid(false);
      }
      console.log("HERE4", urls.longUrl);
      console.log("HERE5", urls.shortUrl);
    } catch {
      setInvalid(true);
    }
  };

  const fetchUrl = async (alias) => {
    const res = await fetch(`/api/urls/${alias}`);

    const data = await res.json();

    return data.longUrl;
  };

  const reset = () => {
    setUrls({ longUrl: "", shortUrl: "" });
    setInvalid(false);
  };

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/app" />;
          }}
        />
        <Route
          exact
          path="/app"
          render={(props) => (
            <div className="container-fluid App">
              <div className="row">
                <Header />
              </div>
              <div className="row" style={{ padding: "20px" }}>
                <Shorten
                  longUrl={urls.longUrl}
                  shortUrl={urls.shortUrl}
                  onAdd={addUrl}
                  reset={reset}
                  isInvalid={invalid}
                />
              </div>
            </div>
          )}
        />
        <Route
          exact
          path="/:alias"
          render={(props) => <RedirectPage fetchUrl={fetchUrl} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
