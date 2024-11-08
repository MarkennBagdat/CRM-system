const CarModels = {
    toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Prius", "Yaris", "Sienna", "Tacoma", "Tundra", "4Runner"],
    lada: ["Vesta", "Granta", "Niva", "Kalina", "Priora", "XRAY", "Largus", "Samara", "2107", "2106"],
    hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona", "Accent", "Veloster", "Palisade", "Venue", "Nexo"],
    kia: ["Sportage", "Sorento", "Rio", "Optima", "Stinger", "Forte", "Soul", "Telluride", "Seltos", "Cadenza"],
    chevrolet: ["Cruze", "Malibu", "Tahoe", "Camaro", "Impala", "Traverse", "Equinox", "Silverado", "Suburban", "Colorado"],
    nissan: ["Almera", "Qashqai", "X-Trail", "Juke", "Sentra", "Pathfinder", "Maxima", "Murano", "Titan", "Armada"],
    volkswagen: ["Polo", "Golf", "Passat", "Tiguan", "Jetta", "Atlas", "Arteon", "Touareg", "ID.4", "Taos"],
    skoda: ["Octavia", "Superb", "Kodiaq", "Fabia", "Karoq", "Scala", "Enyaq iV", "Citigo", "Rapid", "Yeti"],
    renault: ["Logan", "Duster", "Megane", "Kadjar", "Captur", "Clio", "Koleos", "Scenic", "Talisman", "Twingo"],
    bmw: ["3 Series", "5 Series", "X5", "X6", "7 Series", "X3", "X1", "4 Series", "2 Series", "6 Series"],
    audi: ["A3", "A4", "Q5", "Q7", "A6", "A5", "Q3", "A1", "Q8", "TT"],
    mercedesBenz: ["C-Class", "E-Class", "S-Class", "GLE", "GLC", "A-Class", "GLA", "G-Class", "CLA", "GLB"],
    ford: ["Focus", "Fusion", "Escape", "Explorer", "F-150", "Edge", "Mustang", "Ranger", "Expedition", "Transit"],
    mazda: ["Mazda3", "Mazda6", "CX-5", "MX-5", "CX-9", "CX-30", "MX-30", "BT-50", "CX-3", "RX-8"],
    honda: ["Civic", "Accord", "CR-V", "Pilot", "Fit", "HR-V", "Odyssey", "Ridgeline", "Insight", "Passport"],
    mitsubishi: ["Lancer", "Outlander", "Pajero", "Eclipse Cross", "ASX", "Mirage", "Montero Sport", "Xpander", "Strada", "Attrage"],
    lexus: ["IS", "ES", "RX", "NX", "UX", "LS", "RC", "GX", "LX", "LC"],
    peugeot: ["208", "308", "3008", "5008", "2008", "508", "Rifter", "Partner", "Traveller", "Expert"],
    citroen: ["C3", "C4", "C5", "Berlingo", "C1", "C4 Cactus", "C3 Aircross", "C-Elysée", "Spacetourer", "C4 Picasso"],
    landRover: ["Range Rover", "Discovery", "Defender", "Evoque", "Discovery Sport", "Velar", "Freelander", "Range Rover Sport", "Series I", "Series II"],
    jeep: ["Wrangler", "Cherokee", "Grand Cherokee", "Renegade", "Compass", "Gladiator", "Commander", "Wagoneer", "Patriot", "CJ"],
    subaru: ["Impreza", "Legacy", "Outback", "Forester", "Crosstrek", "Ascent", "BRZ", "WRX", "XV", "Baja"],
    volvo: ["S60", "S90", "XC60", "XC90", "V60", "V90", "XC40", "S40", "C70", "850"],
    infiniti: ["Q50", "Q60", "QX50", "QX80", "QX60", "QX30", "QX70", "FX35", "G35", "M35"],
    tesla: ["Model S", "Model 3", "Model X", "Model Y", "Roadster", "Cybertruck", "Semi", "Model B", "Model R", "Model T"],
    ssangyong: ["Tivoli", "Korando", "Rexton", "Musso", "Actyon", "Rodius", "Chairman", "Stavic", "Korando Family", "Korando Turismo"],
    porsche: ["911", "Cayenne", "Panamera", "Macan", "Boxster", "Carrera GT", "Taycan", "Cayman", "918 Spyder", "914"],
    jaguar: ["XE", "XF", "F-PACE", "I-PACE", "XJ", "E-PACE", "S-Type", "F-TYPE", "XK", "Mark II"],
    fiat: ["500", "Panda", "Tipo", "500X", "500L", "Doblo", "124 Spider", "Bravo", "Qubo", "Linea"],
    alfaRomeo: ["Giulia", "Stelvio", "Giulietta", "4C", "Spider", "MiTo", "156", "159", "Brera", "GTV"],
    maserati: ["Ghibli", "Quattroporte", "Levante", "GranTurismo", "GranCabrio", "Spyder", "Shamal", "3200 GT", "Bora", "Mistral"],
    bentley: ["Continental GT", "Flying Spur", "Bentayga", "Mulsanne", "Arnage", "Azure", "Brooklands", "Turbo R", "Mark VI", "S1"],
    rollsRoyce: ["Phantom", "Ghost", "Cullinan", "Wraith", "Dawn", "Silver Shadow", "Silver Spirit", "Silver Seraph", "Park Ward", "Camargue"],
    lotus: ["Elise", "Evora", "Exige", "Esprit", "Europa", "Seven", "Eclat", "Elite", "Cortina", "Super Seven"],
    mini: ["Cooper", "Countryman", "Clubman", "Paceman", "Convertible", "Hardtop", "Roadster", "Coupe", "Cabrio", "John Cooper Works"],
    cadillac: ["CTS", "XTS", "Escalade", "CT6", "XT4", "XT5", "ATS", "CTS-V", "SRX", "CT4"],
    buick: ["Regal", "Enclave", "Encore", "LaCrosse", "Envision", "Cascada", "Verano", "Park Avenue", "Riviera", "Roadmaster"],
    chrysler: ["300", "Pacifica", "Voyager", "Sebring", "PT Cruiser", "Aspen", "Crossfire", "Concorde", "LHS", "New Yorker"],
    lincoln: ["MKZ", "Navigator", "Aviator", "Nautilus", "Corsair", "Continental", "MKX", "MKC", "Town Car", "Zephyr"],
    dodge: ["Charger", "Challenger", "Durango", "Journey", "Grand Caravan", "Viper", "Dart", "Nitro", "Magnum", "Caliber"],
    ram: ["1500", "2500", "3500", "Promaster", "Promaster City", "Dakota", "C/V", "Ramcharger", "Van", "Wagon"],
    astonMartin: ["DB11", "Vantage", "DBS Superleggera", "Rapide", "DB9", "Vanquish", "Virage", "DBS", "One-77", "Lagonda"],
    maybach: ["S-Class", "GLS", "Exelero", "62", "57", "Landaulet", "Zeppelin", "SW 38", "DS 8", "DS 7"],
    ferrari: ["488", "812 Superfast", "Portofino", "SF90 Stradale", "F8 Tributo", "Roma", "GTC4Lusso", "LaFerrari", "458 Italia", "California"],
    lamborghini: ["Huracan", "Aventador", "Urus", "Sian", "Gallardo", "Murcielago", "Diablo", "Countach", "Jalpa", "Espada"],
    morgan: ["Plus Six", "4/4", "Plus Four", "Roadster", "Aero 8", "Plus 8", "3 Wheeler", "Aero Coupe", "Plus 4", "4 Seater"],
    saab: ["9-3", "9-5", "900", "9000", "Sonett", "92", "96", "99", "900 Convertible", "96 Sport"],
    smart: ["fortwo", "forfour", "roadster", "fortwo Cabrio", "forfour Electric Drive", "fortwo Electric Drive", "forjeremy", "crossblade", "forstars", "forus"],
    dacia: ["Sandero", "Duster", "Logan", "Dokker", "Lodgy", "Solenza", "1300", "1304", "1305", "1307"],
    geely: ["Emgrand", "Coolray", "Bo Rui", "Atlas", "Vision", "X7", "Xingyue", "Boyue", "FC", "MK"],
    byd: ["Tang", "Song", "Yuan", "Han", "Qin", "Tang EV", "e2", "F0", "G3", "G5"],
    greatWall: ["Haval H6", "Great Wall Cannon", "Pao", "Wey VV7", "Wingle", "Voleex C30", "Hover H5", "Peri", "Cowry", "Sailor"],
    changan: ["CS35", "CS75", "Alsvin", "Eado", "BenBen", "Raeton", "Yuexiang", "Vado", "CX70", "Ouliwei"],
    zotye: ["T600", "T700", "Z700", "Z560", "SR9", "E200", "E300", "E30", "SR7", "T300"],
    dongfeng: ["Fengon", "A9", "Joyear", "S50", "H30", "AX7", "SUV", "A60", "S35", "R30"],
    jac: ["S2", "S3", "S5", "S7", "T6", "J3", "J5", "J6", "J7", "Heyue"],
    // Добавьте другие марки и модели по аналогии
};

export default CarModels;
