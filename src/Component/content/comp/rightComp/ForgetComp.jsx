import React from "react";
import WelcomePage from "../leftComp/WelcomePage";
export default class ForgetComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: "none"
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ visibility: "block" });
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="content">
            <WelcomePage />
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Forgot Password</h1>
                <form onSubmit={this.handleSubmit}>
                  <ul>
                    <li>
                      <span>Enter E-mail ID</span>
                      <input
                        type="text"
                        placeholder="User@gmail.com"
                        name="email"
                      />
                    </li>
                    <li>
                      <input type="submit" defaultValue="Submit" />
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
