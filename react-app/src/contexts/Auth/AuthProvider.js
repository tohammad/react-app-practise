import React, { useState, useEffect, useContext } from 'react';
import Relationship from '../../services/Relationship';
import Auth from '../../services/Auth';
import STRINGS, { replaceVariablesInTemplate } from '../../services/Strings';
import { ToastContext } from '../Toast/ToastProvider';
import { queryDeclineContent } from '../../services/apis/AppContent';
import AppState from '../AppState/AppState';
import Logger from '../../services/Logger';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const auth = new Auth();
  const relationship = new Relationship();
  const appState = useContext(AppState);
  const { currentUser } = appState;
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useContext(ToastContext);
  const [userAuditDetailsRes, setUserAuditDetails] = useState({});
  const [ssoLogingUser, setUserPreferedLanguage] = useState({});
  const [querryDeclineResponse, setDeclineResponse] = useState('');
  const [userData, setUserDataRes] = useState({});
  const [ssoDetailsResonse, setSsoDetailsRes] = useState({});
  const [existingUserValidated, setExistingUserValidated] = useState(false);
  const [existingUserPassword, setExistingUserPassword] = useState('');

  async function userAuditDetails() {
    try {
      if (currentUser && currentUser.accessToken) {
        const res = await auth.getUserAuditDetails();
        if (res) {
          setUserAuditDetails(res);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function updateUser(preferredLanguage) {
    try {
      await relationship.updateUser(preferredLanguage);
    } catch (e) {
      console.log(e);
    }
  }

  async function changeOldPassword(submitRequest) {
    try {
      const changePasswordResponse = await auth.changePassword(submitRequest);
      if (changePasswordResponse && changePasswordResponse.code) {
        showToast({
          kind: 'success',
          subtitle: replaceVariablesInTemplate(
            STRINGS[`RESPONSE_MESSAGE_CODE_${changePasswordResponse.code}`],
            changePasswordResponse.replacements
          ),
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function loginSSOUser(payload) {
    try {
      const loginUserRes = await auth.loginSSOUser(payload);
      if (loginUserRes) {
        setUserPreferedLanguage(loginUserRes);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function generatePasswordResetURL(user) {
    try {
      await auth.generatePasswordResetURL(user);
    } catch (e) {
      console.log(e);
    }
  }

  async function queryDecline() {
    try {
      const declineResponse = await queryDeclineContent();
      if (declineResponse) {
        setDeclineResponse(declineResponse);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }

  async function updateRelationship(registrationInput) {
    try {
      const response = await relationship.updateRelationship(registrationInput);
      if (response) {
        showToast({
          kind: 'success',
          subtitle: replaceVariablesInTemplate(
            `RESPONSE_MESSAGE_CODE_${response.code}`,
            response.replacements
          ),
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUnsubscribeSupplier(data) {
    try {
      const response = await relationship.unsubscribeSupplier(data);
      if (response) {
        showToast({
          kind: 'success',
          subtitle: replaceVariablesInTemplate(
            `RESPONSE_MESSAGE_CODE_${response.code}`,
            response.replacements
          ),
        });
      }
    } catch (e) {
      Logger.error(e);
    }
  }

  async function getUserSSODetails(username) {
    try {
      const ssoDetailsRes = await auth.getUserSSODetails(username);
      if (ssoDetailsRes) {
        setSsoDetailsRes(ssoDetailsRes);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function login(user) {
    try {
      const userDataRes = await auth.initialLogin(user);
      if (userDataRes) {
        setUserDataRes(userDataRes);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    userAuditDetails();
    queryDecline();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userAuditDetails,
        userAuditDetailsRes,
        updateUser,
        loginSSOUser,
        ssoLogingUser,
        changeOldPassword,
        generatePasswordResetURL,
        queryDecline,
        querryDeclineResponse,
        updateRelationship,
        getUserSSODetails,
        ssoDetailsResonse,
        login,
        userData,
        existingUserValidated,
        setExistingUserValidated,
        existingUserPassword,
        setExistingUserPassword,
        handleUnsubscribeSupplier,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
