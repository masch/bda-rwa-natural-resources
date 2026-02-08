#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, Vec};
use stellar_access::ownable::{self, Ownable};
use stellar_macros::only_owner;
use stellar_tokens::non_fungible::{Base, NonFungibleToken};

#[contracttype]
pub enum DataKey {
    Geo(u32),
    Uri(u32),
}

/// Geography coordinates for the reforestation parcel.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct GeoCoordinates {
    pub latitude: i32,
    pub longitude: i32,
}

/// SEP-11 Compliant Metadata Attribute
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct MetadataAttribute {
    pub trait_type: String,
    pub value: String,
}

/// SEP-11 Compliant Metadata Structure Template
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct BoscoraMetadata {
    pub name: String,
    pub description: String,
    pub image: String,
    pub attributes: Vec<MetadataAttribute>,
}

#[contract]
pub struct BoscoraContract;

#[contractimpl]
impl BoscoraContract {
    /// The constructor initializes the state of the contract.
    pub fn __constructor(env: Env, admin: Address) {
        ownable::set_owner(&env, &admin);

        // Initialize metadata for the collection
        Base::set_metadata(
            &env,
            String::from_str(&env, "ipfs://collection"),
            String::from_str(&env, "Boscora Impact"),
            String::from_str(&env, "BSCR"),
        );
    }

    /// mint(to: Address, token_id: u32, metadata_uri: String, geo: GeoCoordinates):
    /// Only executable by the admin. Validates uniqueness.
    #[only_owner]
    pub fn mint(env: Env, to: Address, token_id: u32, metadata_uri: String, geo: GeoCoordinates) {
        // Use our own storage to check for existence
        if env.storage().persistent().has(&DataKey::Geo(token_id)) {
            panic!("duplicate id");
        }

        Base::mint(&env, &to, token_id);

        // Store parcel data
        env.storage()
            .persistent()
            .set(&DataKey::Uri(token_id), &metadata_uri);
        env.storage()
            .persistent()
            .set(&DataKey::Geo(token_id), &geo);
    }

    /// set_metadata_uri(token_id: u32, new_uri: String): Updates the IPFS link.
    #[only_owner]
    pub fn set_metadata_uri(env: Env, token_id: u32, new_uri: String) {
        if !env.storage().persistent().has(&DataKey::Geo(token_id)) {
            panic!("not found");
        }
        env.storage()
            .persistent()
            .set(&DataKey::Uri(token_id), &new_uri);
    }

    // --- Custom Getters ---

    pub fn geo_coordinates(env: Env, token_id: u32) -> GeoCoordinates {
        env.storage()
            .persistent()
            .get(&DataKey::Geo(token_id))
            .expect("no geo data")
    }
}

/// Implement the NonFungibleToken trait by delegating.
#[contractimpl(contracttrait)]
impl NonFungibleToken for BoscoraContract {
    type ContractType = Base;

    fn token_uri(env: &Env, token_id: u32) -> String {
        env.storage()
            .persistent()
            .get(&DataKey::Uri(token_id))
            .unwrap_or_else(|| String::from_str(env, ""))
    }
}

#[contractimpl(contracttrait)]
impl Ownable for BoscoraContract {}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::{Env, String};

    #[test]
    fn test_flow() {
        let env = Env::default();
        env.mock_all_auths();

        let admin = Address::generate(&env);
        let user = Address::generate(&env);

        let contract_id = env.register(BoscoraContract, (admin.clone(),));
        let client = BoscoraContractClient::new(&env, &contract_id);

        let token_id = 1;
        let uri1 = String::from_str(&env, "ipfs://1");
        let geo = GeoCoordinates {
            latitude: 10,
            longitude: 20,
        };

        // Minting
        client.mint(&user, &token_id, &uri1, &geo);

        // Verifying
        // Pass by value for token_id
        assert_eq!(client.owner_of(&token_id), user);
        assert_eq!(client.token_uri(&token_id), uri1);
        assert_eq!(client.geo_coordinates(&token_id), geo);

        // Update URI
        let uri2 = String::from_str(&env, "ipfs://2");
        client.set_metadata_uri(&token_id, &uri2);
        assert_eq!(client.token_uri(&token_id), uri2);
    }

    #[test]
    #[should_panic]
    fn test_unauthorized_mint() {
        let env = Env::default();
        let admin = Address::generate(&env);
        let non_admin = Address::generate(&env);

        let contract_id = env.register(BoscoraContract, (admin,));
        let client = BoscoraContractClient::new(&env, &contract_id);

        client.mint(
            &non_admin,
            &1,
            &String::from_str(&env, "uri"),
            &GeoCoordinates {
                latitude: 0,
                longitude: 0,
            },
        );
    }

    #[test]
    #[should_panic(expected = "duplicate id")]
    fn test_duplicate_id() {
        let env = Env::default();
        env.mock_all_auths();
        let admin = Address::generate(&env);

        let contract_id = env.register(BoscoraContract, (admin.clone(),));
        let client = BoscoraContractClient::new(&env, &contract_id);

        let geo = GeoCoordinates {
            latitude: 0,
            longitude: 0,
        };
        client.mint(&admin, &1, &String::from_str(&env, "u1"), &geo);
        client.mint(&admin, &1, &String::from_str(&env, "u2"), &geo);
    }
}
