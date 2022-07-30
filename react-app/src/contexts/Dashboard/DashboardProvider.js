import React, { useState, useEffect } from 'react';
import Questionnaire from '../../services/Questionnaire';
import {
  isPrefillDataAvailable as supplierIsPrefillDataAvailable,
  queryBusinessEntity,
  acceptBulkDataUpload,
  declineBulkDataUpload,
} from '../../services/apis/Supplier';
import Relationship from '../../services/Relationship';
import Auth from '../../services/Auth';

export const DashboardContext = React.createContext({});

const questionnaire = new Questionnaire();
const relationship = new Relationship();
const auth = new Auth();

const DashboardProvider = ({ children }) => {
  const { persona } = auth.currentUser();
  const [querryAssignedQuestionnairesRes, setQuerryAssignedQuestionnaires] = useState([]);
  const [queryBusinessEntityRes, setQueryBusinessEntity] = useState([]);
  const [supplierIsPrefillDataAvailableRes, setSupplierIsPrefillDataAvailable] = useState([]);
  const [querySuppliersByCountryRes, setQuerySuppliersByCountry] = useState([]);

  const sumOfCountries = (supplierCountsResponse) => {
    const response = [];
    if (supplierCountsResponse) {
      supplierCountsResponse.forEach((v) => {
        if (v.country) {
          const countryIndex = response.findIndex((r) => r.country === v.country);
          if (countryIndex > -1) {
            response[countryIndex].count += v.count;
          } else {
            response.push({ ...v, status: 'all' });
          }
        }
      });
    }
    return response;
  };

  const querySuppliersCountry = async () => {
    try {
      const countryRes = await relationship.querySuppliersByCountry();
      const data = {
        pending: countryRes.data.filter((x) => x.status === 'pending'),
        accepted: countryRes.data.filter((x) => x.status === 'accepted'),
        flagged: countryRes.data.filter((x) => x.status === 'flagged'),
        submitted: countryRes.data.filter((x) => x.status === 'submitted'),
        published: countryRes.data.filter((x) => x.status === 'published'),
        lifecycle_updates_review: countryRes.data.filter(
          (x) => x.status === 'lifecycle_updates_review'
        ),
        onboarded: countryRes.data.filter((x) => x.status === 'onboarded'),
        all: sumOfCountries(countryRes.data),
      };
      setQuerySuppliersByCountry(data);
    } catch (e) {
      console.log(e);
    }
  };

  const queryAssignedQuestionnaires = async () => {
    try {
      const response = await questionnaire.querySupplierAssignedQuestionnaires();
      setQuerryAssignedQuestionnaires(response);
    } catch (e) {
      console.log(e);
    }
  };
  const querySupplierBusinessEntity = async () => {
    try {
      const res = await queryBusinessEntity();
      setQueryBusinessEntity(res);
    } catch (e) {
      console.log(e);
    }
  };

  const supplierIsPrefillData = async () => {
    try {
      const resp = await supplierIsPrefillDataAvailable();
      setSupplierIsPrefillDataAvailable(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const bulkUpload = async (relationshipID) => {
    try {
      if (relationshipID) {
        await acceptBulkDataUpload(relationshipID);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const rejectBulkUpload = async () => {
    try {
      await declineBulkDataUpload();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    querySuppliersCountry();
    querySupplierBusinessEntity();
    supplierIsPrefillData();
    if (persona === 'supplier') queryAssignedQuestionnaires();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        queryAssignedQuestionnaires,
        querryAssignedQuestionnairesRes,
        querySupplierBusinessEntity,
        queryBusinessEntityRes,
        supplierIsPrefillData,
        supplierIsPrefillDataAvailableRes,
        querySuppliersCountry,
        querySuppliersByCountryRes,
        bulkUpload,
        rejectBulkUpload,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
