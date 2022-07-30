import React, { useState, useEffect } from 'react';
import Relationship from '../../services/Relationship';
import Auth from '../../services/Auth';

export const HelpContext = React.createContext({});

const HelpProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [buyerListing, setBuyerListing] = useState({});

  const auth = new Auth();
  const { persona } = auth.currentUser();
  const relationship = new Relationship();

  const queryMyConnections = async () => {
    try {
      if (persona === 'supplier') {
        const params = {
          classification: 'B',
          size: 20,
          skip: 0,
        };
        const buyerListingResponse = await relationship.queryRelationships(params);
        setBuyerListing(buyerListingResponse);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    queryMyConnections();
  }, []);

  return (
    <HelpContext.Provider
      value={{
        isLoading,
        setIsLoading,
        buyerListing,
        setBuyerListing,
      }}
    >
      {children}
    </HelpContext.Provider>
  );
};

export default HelpProvider;
