import React, {Component} from "react";
class Entry extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            editor: 0,
            isSaved: true, 
        };
      }
    
      componentDidMount() {
        get("/api/whoami").then((user) => {
          if (user._id) {
            // they are registed in the database, and currently logged in.
            this.setState({ userId: user._id });
          }
        });
      }
    
      render() {
        return (
          <>
          </>
        );
      }
    }
    
export default Entry;