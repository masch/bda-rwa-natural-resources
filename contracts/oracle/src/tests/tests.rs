use crate::{BoscoraOracle, BoscoraOracleClient, HealthStatus};
use soroban_sdk::{testutils::Address as _, Address, Env};

#[test]
fn test_oracle_initialization() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let contract_id = env.register(BoscoraOracle, (admin.clone(),));
    let client = BoscoraOracleClient::new(&env, &contract_id);

    let asset_id = 1;
    assert_eq!(client.lastprice(&asset_id), None);
    assert_eq!(client.get_metrics(&asset_id), None);
}

#[test]
fn test_oracle_add_price() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let contract_id = env.register(BoscoraOracle, (admin.clone(),));
    let client = BoscoraOracleClient::new(&env, &contract_id);

    let asset_id = 1;
    let price = 5000_i128;
    client.add_price(&asset_id, &price);

    assert_eq!(client.lastprice(&asset_id), Some(price));

    let metrics = client.get_metrics(&asset_id).unwrap();
    assert_eq!(metrics.biomass, price);
    assert_eq!(metrics.co2_captured, 0); // Default value
    assert_eq!(metrics.health, HealthStatus::Germinating); // Default value
}

#[test]
fn test_oracle_update_impact_metrics() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let contract_id = env.register(BoscoraOracle, (admin.clone(),));
    let client = BoscoraOracleClient::new(&env, &contract_id);

    let asset_id = 2;
    client.update_impact_metrics(&asset_id, &7500, &1500, &3);

    let metrics = client.get_metrics(&asset_id).unwrap();
    assert_eq!(metrics.biomass, 7500);
    assert_eq!(metrics.co2_captured, 1500);
    assert_eq!(metrics.health, HealthStatus::Planted);

    // `lastprice` should reflect `.biomass` directly
    assert_eq!(client.lastprice(&asset_id), Some(7500));
}

#[test]
fn test_oracle_update_impact_metrics_invalid_health() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let contract_id = env.register(BoscoraOracle, (admin.clone(),));
    let client = BoscoraOracleClient::new(&env, &contract_id);

    let asset_id = 3;
    // 4 is an invalid health status and should return InvalidHealthStatus (0)
    let result = client.try_update_impact_metrics(&asset_id, &7500, &1500, &4);
    assert_eq!(result, Err(Ok(soroban_sdk::Error::from_contract_error(0))));
}

#[test]
#[should_panic]
fn test_add_price_unauthorized() {
    let env = Env::default();

    let admin = Address::generate(&env);
    let contract_id = env.register(BoscoraOracle, (admin.clone(),));
    let client = BoscoraOracleClient::new(&env, &contract_id);

    let asset_id = 1;
    client.add_price(&asset_id, &5000);
}
