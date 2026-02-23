use soroban_sdk::contracttype;

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum HealthStatus {
    Germinating = 0,
    Sprouted = 1,
    ReadyForTransplant = 2,
    Planted = 3,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ImpactMetrics {
    pub biomass: i128,      // In grams
    pub co2_captured: i128, // In milligrams
    pub health: HealthStatus,
}

#[contracttype]
pub enum DataKey {
    OracleContract, // Address of the Oracle contract
    Geo(u32),       // token_id -> GeoCoordinates
    MaxParcels,     // Maximum number of parcels
    PaymentToken,   // Address of the USDC/Payment token
    Price,          // Price per parcel in payment token
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct GeoCoordinates {
    pub latitude: i32,
    pub longitude: i32,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ParcelRequest {
    pub token_id: u32,
    pub geo: GeoCoordinates,
}
