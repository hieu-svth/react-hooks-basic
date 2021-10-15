import React, { useState, useEffect } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  const [action, setAction] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  // Ví dụ 1: thay đổi state thì effect cũng bị render lại
  useEffect(() => {
    document.h1 = `You clicked ${count} lần`;
  }, [count]);
  // Ví dụ 2: dùng useEffect đùng với fetch
  useEffect(() => {
    fetch(`https://reqres.in/api/${action}?page=2`)
      .then((respond) => console.log(respond))
      .catch((err) => console.log(err));
  }, [action]);
  const handleScroll = () => {
    setScrollPosition(window.scrollY)
  }
  // Ví dụ 3: dùng useEffect return ra một function bên trong
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll)
    };
  }, []); // chỉ thực thi một lần duy nhất dùng empty array

  return (
    <div className="App" style={{ height: '3000px' }}>
      <p> you clicked {count} lần </p>
      <button onClick={() => setCount(count + 1)}> Click me!</button>

      <button
        onClick={() => {
          setAction("users");
        }}
      >
        get Users
      </button>
      <button
        onClick={() => {
          setAction("comments");
        }}
      >
        get Comments
      </button>

      <p style={{ position: "fixed", left: "20px" }}>{scrollPosition}</p>
    </div>
  );
}

