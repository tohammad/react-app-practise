import React, { useState, useEffect, useContext } from 'react';
import { assignIn } from 'lodash';
import { ToastContext } from '../Toast/ToastProvider';
import Auth from '../../services/Auth';
import Buyer from '../../services/Buyer';
import {
  queryBusinessEntity as querySupplierBusinessEntity,
  queryAddresses as supplierQueryAddresses,
  queryContacts as supplierQueryContacts,
  updateBusinessEntity as supplierUpdateBusinessEntity,
  queryManagement,
  queryOwnerShip,
  updateOwnerShip,
  queryFinancial,
  updateFinancial,
} from '../../services/apis/Supplier';
import { getAllStockExchanges } from '../../services/apis/MetaData';
import { currencies } from '../../configs/Currencies';
import STRINGS, { replaceVariablesInTemplate } from '../../services/Strings';
import { TutorialChecklistContext } from '../TutorialChecklist/TutorialChecklistProvider';

export const ProfileMetaDataContext = React.createContext({});

const ProfileMetaDataProvider = ({ children }) => {
  const { showToast } = useContext(ToastContext);
  const buyer = new Buyer();
  const auth = new Auth();
  const isBuyer = (auth.currentUser().persona || '').toLowerCase() === 'buyer';
  const [isLoading, setIsLoading] = useState(true);
  const [supplierBusinessEntity, setSupplierBusinessEntity] = useState({});
  const [buyerBusinessEntity, setBuyerBusinessEntity] = useState({});
  const [locationDetails, setLocationDetails] = useState([]);
  const [contactDetails, setContactDetails] = useState([]);
  const [managementDetails, setManagementDetails] = useState({});
  const [totalOwnershipPercentage, setTotalOwnershipPercentage] = useState(0);
  const [ownerShipDetails, setOwnerShipDetails] = useState({
    individualOwners: [],
    parentCompany: [],
    ultimateParentCompany: {},
    entityOrOrganizations: [],
  });
  const [businessType, setBusinessType] = useState('');
  const [financialDetails, setFinancialDetails] = useState([]);
  const [stockExchangeDetails, setStockExchangeDetails] = useState([]);
  const [businessEntity, setBusinessEntity] = useState({});
  const [currencyMask, setCurrencyMask] = useState(undefined);
  const { getChecklistStatus } = useContext(TutorialChecklistContext);

  const calculateOwnershipPercentage = ({
    individualOwners,
    parentCompany,
    ultimateParentCompany,
    entityOrOrganizations,
  }) => {
    let totalOwnershipPercentageCalc = 0;
    if (individualOwners.length > 0) {
      totalOwnershipPercentageCalc += individualOwners
        .map((owner) => Number(owner.ownershipPercentage))
        .reduce((p, c) => Number(p) + Number(c));
    }
    if (parentCompany.length > 0) {
      totalOwnershipPercentageCalc += parentCompany
        .map((owner) => Number(owner.ownershipPercentage))
        .reduce((p, c) => Number(p) + Number(c));
    }
    if (Object.keys(ultimateParentCompany).length > 0) {
      totalOwnershipPercentageCalc += Number(ultimateParentCompany.ownershipPercentage);
    }
    if (entityOrOrganizations.length > 0) {
      totalOwnershipPercentageCalc += entityOrOrganizations
        .map((owner) => Number(owner.ownershipPercentage))
        .reduce((p, c) => Number(p) + Number(c));
    }
    setTotalOwnershipPercentage(Number(totalOwnershipPercentageCalc));
  };

  async function getSupplierBusinessEntity() {
    let response = {};
    try {
      response = await querySupplierBusinessEntity();
    } catch (err) {
      console.log(err);
    } finally {
      setSupplierBusinessEntity(response);
    }
  }

  async function getBuyerBusinessEntity() {
    let response = {};
    try {
      response = await buyer.queryBusinessEntity();
    } catch (err) {
      console.log(err);
    } finally {
      setBuyerBusinessEntity(response);
    }
  }

  async function getBusinessEntity() {
    try {
      if (isBuyer) {
        const response = await buyer.queryBusinessEntity();
        if (response) {
          setBuyerBusinessEntity(response);
          setBusinessEntity(response);
        }
      } else {
        const response = await querySupplierBusinessEntity();
        setSupplierBusinessEntity(response);
        setBusinessEntity(response);
        if (
          response.detailedBusinessInfo &&
          response.detailedBusinessInfo.taxProfile &&
          response.detailedBusinessInfo.taxProfile.businessType
        ) {
          const {
            detailedBusinessInfo: { taxProfile },
          } = response;
          const businessTypeString = STRINGS[taxProfile.businessType]
            ? STRINGS[taxProfile.businessType]
            : taxProfile.businessType;
          setBusinessType(businessTypeString.trim());
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getLocationDetails() {
    try {
      const response = isBuyer ? await buyer.queryAddresses() : await supplierQueryAddresses();
      if (response) {
        setLocationDetails(response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getContactDetails() {
    try {
      const contacts = isBuyer ? await buyer.queryContacts() : await supplierQueryContacts();
      const locations = isBuyer ? await buyer.queryAddresses() : await supplierQueryAddresses();
      if (contacts) {
        if (!Array.isArray(locations) && !locations.length) {
          setContactDetails(contacts);
        } else {
          const updatedContacts = contacts.map((contact) => {
            if (contact.addressID) {
              const location = locations.find((loc) => loc.addressID === contact.addressID);
              if (location) {
                contact.addressType = location.addressType;
                contact.addressTypeOther = location.addressTypeOther;
                contact.city = location.city;
                contact.country = location.country;
              }
            }
            return contact;
          });
          setContactDetails(updatedContacts);
        }
      } else {
        setContactDetails([]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getManagementDetails() {
    try {
      const response = await queryManagement();
      if (response) {
        setManagementDetails(response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getOwnershipDetails() {
    try {
      const response = await queryOwnerShip();
      const contacts = await supplierQueryContacts();
      if (response) {
        let contactIndividualOwners = [];
        if (contacts && response.individualOwners && response.individualOwners.length > 0) {
          contactIndividualOwners =
            response.individualOwners.map((owner) => {
              return assignIn(
                owner,
                contacts.find((contact) => contact.contactID === owner.contactID)
              );
            }) || [];
        }

        const ownershipProfile = {};
        ownershipProfile.individualOwners = contactIndividualOwners;
        if (response.parentCompany) {
          ownershipProfile.parentCompany = response.parentCompany;
        } else {
          ownershipProfile.parentCompany = [];
        }
        if (response.ultimateParentCompany) {
          ownershipProfile.ultimateParentCompany = response.ultimateParentCompany;
        } else {
          ownershipProfile.ultimateParentCompany = {};
        }
        if (response.entityOrOrganizations) {
          ownershipProfile.entityOrOrganizations = response.entityOrOrganizations;
        } else {
          ownershipProfile.entityOrOrganizations = [];
        }
        calculateOwnershipPercentage({ ...ownershipProfile, ownerShipDetails });
        setOwnerShipDetails({ ...ownershipProfile });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getCurrencyMask = (currency) => {
    if (currency !== '') {
      const currencyObject = currencies.find((c) => c.value === currency);
      if (currencyObject) {
        setCurrencyMask({
          prefix: currencyObject.symbol,
          allowNegative: true,
          allowDecimal: true,
          thousandsSeparatorSymbol: currencyObject.thousandsSeparatorSymbol,
          decimalSymbol: currencyObject.decimalSymbol,
        });
      }
    }
  };

  async function getFinancialDetails() {
    try {
      const response = await queryFinancial();
      if (response) {
        const financialProfile = {};
        if (response.financial && response.financial.length > 0) {
          response.financial.forEach((fi) => {
            if (fi.year === new Date().getFullYear() - 1) {
              financialProfile.revenue1YearAgo = fi.revenue;
              financialProfile.asset1YearAgo = fi.asset;
              financialProfile.profit1YearAgo = fi.profit;
              financialProfile.liability1YearAgo = fi.liability;
            }
            if (fi.year === new Date().getFullYear() - 2) {
              financialProfile.revenue2YearAgo = fi.revenue;
              financialProfile.asset2YearAgo = fi.asset;
              financialProfile.profit2YearAgo = fi.profit;
              financialProfile.liability2YearAgo = fi.liability;
            }
            if (fi.year === new Date().getFullYear() - 3) {
              financialProfile.revenue3YearAgo = fi.revenue;
              financialProfile.asset3YearAgo = fi.asset;
              financialProfile.profit3YearAgo = fi.profit;
              financialProfile.liability3YearAgo = fi.liability;
            }
          });
        }

        financialProfile.w9Name = response.w9Name;
        financialProfile.w9BusinessName = response.w9BusinessName;
        financialProfile.currency = response.currency || '';
        financialProfile.equifaxRating = response.equifaxRating || '';
        financialProfile.taxExempt = response.taxExempt || '';

        financialProfile.dnbReportfiles = response.dnbReportfiles;
        financialProfile.year = response.year || '';

        if (response.dnbReport) {
          const checkValidReport = (report) => report.title && report.id;

          if (Array.isArray(response.dnbReport)) {
            financialProfile.dnbReports = response.dnbReport.filter(checkValidReport);
          } else {
            if (!financialProfile.dnbReports) {
              financialProfile.dnbReports = [];
            }
            if (checkValidReport(response.dnbReport)) {
              financialProfile.dnbReports.push(response.dnbReport);
            }
          }
        }

        if (response.currency) {
          getCurrencyMask(response.currency);
        }

        setFinancialDetails(financialProfile);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllStockExchangeDetails() {
    try {
      const response = await getAllStockExchanges();
      if (response) {
        setStockExchangeDetails(response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function setupProfileMetaDataContext() {
    await Promise.all([
      getBusinessEntity(),
      getAllStockExchangeDetails(),
      getLocationDetails(),
      getContactDetails(),
    ]);
    if (!isBuyer) {
      await Promise.all([getManagementDetails(), getOwnershipDetails(), getFinancialDetails()]);
    }
  }

  useEffect(() => {
    setupProfileMetaDataContext().finally(() => setIsLoading(false));
  }, []);

  async function updateBusinessEntity(data) {
    let response = {};
    try {
      response = isBuyer
        ? await buyer.updateBusinessEntity(data)
        : await supplierUpdateBusinessEntity(data);
    } catch (err) {
      console.log(err);
    }
    return response;
  }

  async function updateOwnerShipDetails(ownershipPayload, isEditingOwnership) {
    try {
      setIsLoading(true);
      const response = await updateOwnerShip(ownershipPayload);
      if (response) {
        showToast({
          kind: 'success',
          subtitle: replaceVariablesInTemplate(
            isEditingOwnership === true
              ? `RESPONSE_MESSAGE_CODE_${response.code}`
              : isEditingOwnership === false
              ? `RESPONSE_MESSAGE_CODE_CREATE_${response.code}`
              : `RESPONSE_MESSAGE_CODE_DELETE_${response.code}`,
            response.replacements
          ),
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      await getOwnershipDetails();
      await getChecklistStatus();
      setIsLoading(false);
    }
  }

  async function updateFinancialDetails(data) {
    try {
      setIsLoading(true);
      const response = await updateFinancial(data);
      if (response) {
        showToast({
          kind: 'success',
          subtitle: replaceVariablesInTemplate(
            `RESPONSE_MESSAGE_CODE_${response.code}`,
            response.replacements
          ),
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      await getFinancialDetails();
      await getChecklistStatus();
      setIsLoading(false);
    }
  }

  return (
    <ProfileMetaDataContext.Provider
      value={{
        // data
        isLoading,
        businessType,
        businessEntity,
        supplierBusinessEntity,
        buyerBusinessEntity,
        totalOwnershipPercentage,
        locationDetails,
        contactDetails,
        managementDetails,
        ownerShipDetails,
        financialDetails,
        currencyMask,
        stockExchangeDetails,
        setIsLoading,

        // methods
        getSupplierBusinessEntity,
        getBuyerBusinessEntity,
        getLocationDetails,
        refreshLocations: getLocationDetails,
        updateBusinessEntity,
        getContactDetails,
        refreshContacts: getContactDetails,
        getManagementDetails,
        getOwnershipDetails,
        refreshOwnershipDetails: getOwnershipDetails,
        updateOwnerShipDetails,
        getCurrencyMask,
        getFinancialDetails,
        getAllStockExchangeDetails,
        updateFinancialDetails,
        getBusinessEntity,
      }}
    >
      {children}
    </ProfileMetaDataContext.Provider>
  );
};

export default ProfileMetaDataProvider;
