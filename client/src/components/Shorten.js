import { useState, useEffect } from "react";
const Shorten = ({ longUrl, shortUrl, onAdd, reset, isInvalid }) => {
  const [long, setLong] = useState("");
  const [short, setShort] = useState("");
  const [alias, setAlias] = useState("");
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setLong(longUrl);
    setAlias("");
  }, [longUrl]);

  useEffect(() => {
    setShort(shortUrl);
  }, [shortUrl]);

  useEffect(() => {
    setInvalid(isInvalid);
  }, [isInvalid]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!long) {
      alert("Please add a url");
      return;
    }
    if (!short) {
      onAdd(long, alias);
    } else {
      reset();
    }
  };

  return (
    <div className="form-container col-lg-4">
      <form className="add-name" onSubmit={onSubmit}>
        <div className="form-control border-0">
          <label className="bold">
            {short ? "Your Long URL" : "Enter a long URL to make a TinyURL"}
          </label>
          <input
            type="text"
            value={longUrl ? longUrl : long}
            onChange={(e) => setLong(e.target.value)}
          />
        </div>
        {short ? (
          <div className="form-control border-0">
            <label className="bold">TinyURL</label>
            <input type="text" value={shortUrl} readOnly="readOnly" />
          </div>
        ) : (
          <div className="form-control border-0">
            <label className="bold">Customize your link</label>
            <div className="">tinyurl.com</div>
            <input
              type="text"
              placeholder="alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              style={invalid ? { border: "1px red solid" } : {}}
            />
            {invalid && <p className="invalidText">Alias was already used</p>}
          </div>
        )}
        <input
          type="submit"
          value={short ? "Make Another" : "Shorten URL"}
          className="btn-submit btn-block-submit"
        ></input>
      </form>
    </div>
  );
};

export default Shorten;
