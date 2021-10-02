import { Redirect, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const RedirectPage = ({ fetchUrl }) => {
  const [notFound, setNotFound] = useState(false);
  const { alias } = useParams();
  useEffect(() => {
    const getUrl = async () => {
      try {
        const longUrl = await fetchUrl(alias);
        window.location.href = longUrl;
      } catch {
        setNotFound(true);
      }
    };

    getUrl();
  });
  return notFound && <div>Alias not found</div>;
};

export default RedirectPage;
