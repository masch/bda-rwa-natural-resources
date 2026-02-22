use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ContractErrors {
    MaxParcelsNotSet = 1,
    OwnerNotSet = 2,
    PaymentTokenNotSet = 3,
    PriceNotSet = 4,
    InvalidParcelId = 5,
    ParcelAlreadyDonated = 6,
    OracleAddressNotSet = 7,
    MetricsNotFound = 8,
    NoGeoDataFound = 9,
}
