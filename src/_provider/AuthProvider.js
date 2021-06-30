import React, { createContext } from 'react';
import { Loader } from 'rsuite';
import { Auth } from '_firebaseconn/firebase.config';

export const AuthContext = createContext({ user: null });
class AuthProvider extends React.Component {
    state = {
      user: null,
      loading: true
    }

    componentDidMount = () => {
      Auth.onAuthStateChanged(userAuth => {
          if (userAuth) {
            const userDetail = {
              uid: userAuth?.uid,
              email: userAuth?.email,
            }
            this.setState({ user: userDetail, loading: false});
          } else {
            this.setState({user: null, loading: false})
          }   
        });
    }
    render() {
        return (
          <AuthContext.Provider value={this.state.user}>
            {this.state.loading === false ? <div>
              {this.props.children}
            </div>
            :
            <div className="loader-container"><Loader vertical size="lg" content="Loading..." /></div>
            }
          </AuthContext.Provider>
        );
      }
}

export default AuthProvider;
