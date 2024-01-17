/** Import */
import "./App.css";

/** All the necessary information in text form */
function Info() {
  return (
    <div className="info-bg">
      <h1>About the Project</h1>
      <h3>
        <i>Author: Joonas Sipilä</i>
      </h3>

      <text>
        <br></br>
      </text>

      <text>
        This web app has been designed to help students learn english.
      </text>
      <text>Use the "Main" page to start learning.</text>
      <text>Use the "Panel" page to make changes to contents.</text>
      <p>
        After some inactivity time, connection to the server is automatically
        cut. Connection will automatically re-establish in a minute.
      </p>
      <p>
        <i>psst... the password is admin123</i>
      </p>
      <br></br>
      <h2>:)</h2>
    </div>
  );
}

export default Info;
