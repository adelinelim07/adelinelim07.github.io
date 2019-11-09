module.exports = [
  {
    msn: 0001,
    aircraft: {
      aircraft_model: "B737-700",
      engine_model: "CFM",
      esn1: "123456",
      esn2: "654321",
      manufactured_date: "2011-11-09"
    },
    lease: {
      status: "Delivered",
      sub_status: "Delivered",
      lease_start: "2011-11-11",
      lease_end: "2021-11-10",
      IRR: "0.05",
      operator: "Airline XYZ",
      country_operator: "Singapore",
      country_registration: "Ireland",
      rent: 400000,
      security_deposit: 400000
    },
    obligor: {
      obligor_name: "Airline XYZ",
      obligor_country: "Singapore",
      rating: 3.2
    },
    accounting: {
      nbv: 48000000
    }
  },

  {
    msn: 0002,
    aircraft: {
      aircraft_model: "B737-800",
      engine_model: "CFM",
      esn1: "123456",
      esn2: "654321",
      manufactured_date: "2011-11-09"
    },
    lease: {
      status: "Delivered",
      sub_status: "Delivered",
      lease_start: "2011-11-11",
      lease_end: "2021-11-10",
      IRR: "0.05",
      operator: "Airline XXX",
      country_operator: "Singapore",
      country_registration: "Ireland",
      rent: 400000,
      security_deposit: 400000
    },
    obligor: {
      obligor_name: "Airline XXX",
      obligor_country: "Singapore",
      rating: 3.2
    },
    accounting: {
      nbv: 50000000
    }
  },

  {
    msn: 0003,
    aircraft: {
      aircraft_model: "A320neo",
      engine_model: "PW",
      esn1: "123456",
      esn2: "654321",
      manufactured_date: "2013-12-09"
    },
    lease: {
      status: "Delivered",
      sub_status: "Delivered",
      lease_start: "2013-12-11",
      lease_end: "2025-12-10",
      IRR: "0.05",
      operator: "Airline YYY",
      country_operator: "Singapore",
      country_registration: "Ireland",
      rent: 300000,
      security_deposit: 0
    },
    obligor: {
      obligor_name: "Airline YYY",
      obligor_country: "Singapore",
      rating: 3.2
    },
    accounting: {
      nbv: 59000000
    }
  }
];
