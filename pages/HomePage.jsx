import React from "react";
import NavigationBar from "../components/NavigationBar";

const HomePage = () => {
  return (
    <div>
      <NavigationBar showLoginButton={true} />
      <div>
        {/* Your homepage content goes here */}
        <h1>Welcome to My Fitness App</h1>
        <p>This is the homepage content.</p>
      </div>
    </div>
  );
};

export default HomePage;
