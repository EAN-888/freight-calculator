// 亚马逊美国 FBA 仓库代码与邮编对照表 (精简版)
// 数据来源：Amazon FBA Warehouse Codes

const amazonWarehouses = {
    // ========== 美西地区 (邮编 8-9 开头) ==========
    'LAX1': {city: 'Los Angeles', state: 'CA', zip: '90058', region: '美西'},
    'LAX9': {city: 'Los Angeles', state: 'CA', zip: '90058', region: '美西'},
    'LGB1': {city: 'Long Beach', state: 'CA', zip: '90810', region: '美西'},
    'LGB8': {city: 'Long Beach', state: 'CA', zip: '90810', region: '美西'},
    'ONT1': {city: 'Ontario', state: 'CA', zip: '91761', region: '美西'},
    'ONT2': {city: 'Ontario', state: 'CA', zip: '91761', region: '美西'},
    'ONT3': {city: 'Ontario', state: 'CA', zip: '91761', region: '美西'},
    'ONT8': {city: 'Ontario', state: 'CA', zip: '91761', region: '美西'},
    'ONT9': {city: 'Ontario', state: 'CA', zip: '91761', region: '美西'},
    'SMF1': {city: 'Stockton', state: 'CA', zip: '95215', region: '美西'},
    'SMF2': {city: 'Stockton', state: 'CA', zip: '95215', region: '美西'},
    'SMF3': {city: 'Stockton', state: 'CA', zip: '95215', region: '美西'},
    'SMF6': {city: 'Stockton', state: 'CA', zip: '95215', region: '美西'},
    'SMF8': {city: 'Stockton', state: 'CA', zip: '95215', region: '美西'},
    'SJC7': {city: 'San Jose', state: 'CA', zip: '95131', region: '美西'},
    'OAK2': {city: 'Oakland', state: 'CA', zip: '94621', region: '美西'},
    'OAK3': {city: 'Oakland', state: 'CA', zip: '94621', region: '美西'},
    'SEA1': {city: 'Seattle', state: 'WA', zip: '98108', region: '美西'},
    'SEA8': {city: 'Seattle', state: 'WA', zip: '98108', region: '美西'},
    'PDX1': {city: 'Portland', state: 'OR', zip: '97230', region: '美西'},
    'PDX8': {city: 'Portland', state: 'OR', zip: '97230', region: '美西'},
    'PHX1': {city: 'Phoenix', state: 'AZ', zip: '85043', region: '美西'},
    'PHX7': {city: 'Phoenix', state: 'AZ', zip: '85043', region: '美西'},
    'LAS1': {city: 'Las Vegas', state: 'NV', zip: '89115', region: '美西'},
    'LAS6': {city: 'Las Vegas', state: 'NV', zip: '89115', region: '美西'},
    'DEN2': {city: 'Aurora', state: 'CO', zip: '80011', region: '美西'},
    'DEN8': {city: 'Aurora', state: 'CO', zip: '80011', region: '美西'},
    'SLC1': {city: 'Salt Lake City', state: 'UT', zip: '84104', region: '美西'},
    'SAN1': {city: 'San Diego', state: 'CA', zip: '92154', region: '美西'},
    'SAN6': {city: 'San Diego', state: 'CA', zip: '92154', region: '美西'},
    'BFI1': {city: 'Seattle', state: 'WA', zip: '98108', region: '美西'},
    'BFL1': {city: 'Bakersfield', state: 'CA', zip: '93308', region: '美西'},
    'FAT1': {city: 'Fresno', state: 'CA', zip: '93706', region: '美西'},
    'HND1': {city: 'Henderson', state: 'NV', zip: '89015', region: '美西'},
    'RNO1': {city: 'Reno', state: 'NV', zip: '89502', region: '美西'},
    'SAC1': {city: 'Sacramento', state: 'CA', zip: '95828', region: '美西'},
    'ANC2': {city: 'Anchorage', state: 'AK', zip: '99501', region: '美西'},
    
    // ========== 美中地区 (邮编 4-7 开头) ==========
    'CHI1': {city: 'Chicago', state: 'IL', zip: '60609', region: '美中'},
    'CHI2': {city: 'Chicago', state: 'IL', zip: '60609', region: '美中'},
    'MDW2': {city: 'Chicago', state: 'IL', zip: '60638', region: '美中'},
    'MDW4': {city: 'Chicago', state: 'IL', zip: '60638', region: '美中'},
    'MDW6': {city: 'Chicago', state: 'IL', zip: '60638', region: '美中'},
    'MDW8': {city: 'Chicago', state: 'IL', zip: '60638', region: '美中'},
    'DFW1': {city: 'Dallas', state: 'TX', zip: '75212', region: '美中'},
    'DFW6': {city: 'Dallas', state: 'TX', zip: '75212', region: '美中'},
    'DAL1': {city: 'Dallas', state: 'TX', zip: '75212', region: '美中'},
    'DAL6': {city: 'Dallas', state: 'TX', zip: '75212', region: '美中'},
    'HOU1': {city: 'Houston', state: 'TX', zip: '77002', region: '美中'},
    'HOU6': {city: 'Houston', state: 'TX', zip: '77002', region: '美中'},
    'IND1': {city: 'Indianapolis', state: 'IN', zip: '46241', region: '美中'},
    'IND6': {city: 'Indianapolis', state: 'IN', zip: '46241', region: '美中'},
    'IND9': {city: 'Indianapolis', state: 'IN', zip: '46241', region: '美中'},
    'MCI1': {city: 'Kansas City', state: 'MO', zip: '64120', region: '美中'},
    'MCI6': {city: 'Kansas City', state: 'MO', zip: '64120', region: '美中'},
    'STL1': {city: 'St. Louis', state: 'MO', zip: '63114', region: '美中'},
    'STL6': {city: 'St. Louis', state: 'MO', zip: '63114', region: '美中'},
    'MKE1': {city: 'Milwaukee', state: 'WI', zip: '53209', region: '美中'},
    'MKE4': {city: 'Milwaukee', state: 'WI', zip: '53209', region: '美中'},
    'MSP1': {city: 'Minneapolis', state: 'MN', zip: '55450', region: '美中'},
    'MSP6': {city: 'Minneapolis', state: 'MN', zip: '55450', region: '美中'},
    'DTW1': {city: 'Detroit', state: 'MI', zip: '48209', region: '美中'},
    'DTW6': {city: 'Detroit', state: 'MI', zip: '48209', region: '美中'},
    'AMA1': {city: 'Amarillo', state: 'TX', zip: '79106', region: '美中'},
    'AMA6': {city: 'Amarillo', state: 'TX', zip: '79106', region: '美中'},
    'LIT1': {city: 'Little Rock', state: 'AR', zip: '72209', region: '美中'},
    'LIT6': {city: 'Little Rock', state: 'AR', zip: '72209', region: '美中'},
    
    // ========== 美东地区 (邮编 0-3 开头) ==========
    'ATL1': {city: 'Atlanta', state: 'GA', zip: '30336', region: '美东'},
    'ATL6': {city: 'Atlanta', state: 'GA', zip: '30336', region: '美东'},
    'BWI1': {city: 'Baltimore', state: 'MD', zip: '21224', region: '美东'},
    'BWI6': {city: 'Baltimore', state: 'MD', zip: '21224', region: '美东'},
    'BOS1': {city: 'Boston', state: 'MA', zip: '02128', region: '美东'},
    'BOS6': {city: 'Boston', state: 'MA', zip: '02128', region: '美东'},
    'CLT1': {city: 'Charlotte', state: 'NC', zip: '28208', region: '美东'},
    'CLT6': {city: 'Charlotte', state: 'NC', zip: '28208', region: '美东'},
    'CVG1': {city: 'Cincinnati', state: 'OH', zip: '45241', region: '美东'},
    'CVG6': {city: 'Cincinnati', state: 'OH', zip: '45241', region: '美东'},
    'CLE1': {city: 'Cleveland', state: 'OH', zip: '44135', region: '美东'},
    'CLE6': {city: 'Cleveland', state: 'OH', zip: '44135', region: '美东'},
    'CMH1': {city: 'Columbus', state: 'OH', zip: '43228', region: '美东'},
    'CMH6': {city: 'Columbus', state: 'OH', zip: '43228', region: '美东'},
    'IAD1': {city: 'Washington', state: 'VA', zip: '20166', region: '美东'},
    'IAD6': {city: 'Washington', state: 'VA', zip: '20166', region: '美东'},
    'JAX1': {city: 'Jacksonville', state: 'FL', zip: '32218', region: '美东'},
    'JAX6': {city: 'Jacksonville', state: 'FL', zip: '32218', region: '美东'},
    'MIA1': {city: 'Miami', state: 'FL', zip: '33166', region: '美东'},
    'MIA6': {city: 'Miami', state: 'FL', zip: '33166', region: '美东'},
    'ORF1': {city: 'Norfolk', state: 'VA', zip: '23502', region: '美东'},
    'ORF6': {city: 'Norfolk', state: 'VA', zip: '23502', region: '美东'},
    'PIT1': {city: 'Pittsburgh', state: 'PA', zip: '15205', region: '美东'},
    'PIT6': {city: 'Pittsburgh', state: 'PA', zip: '15205', region: '美东'},
    'RDU1': {city: 'Raleigh', state: 'NC', zip: '27610', region: '美东'},
    'RDU6': {city: 'Raleigh', state: 'NC', zip: '27610', region: '美东'},
    'RIC1': {city: 'Richmond', state: 'VA', zip: '23231', region: '美东'},
    'RIC6': {city: 'Richmond', state: 'VA', zip: '23231', region: '美东'},
    'TPA1': {city: 'Tampa', state: 'FL', zip: '33619', region: '美东'},
    'TPA6': {city: 'Tampa', state: 'FL', zip: '33619', region: '美东'},
    'AVP1': {city: 'Hazleton', state: 'PA', zip: '18202', region: '美东'},
    'ABE2': {city: 'Allentown', state: 'PA', zip: '18109', region: '美东'},
    'ACY1': {city: 'Swedesboro', state: 'NJ', zip: '08085', region: '美东'},
    'ALB1': {city: 'Albany', state: 'NY', zip: '12211', region: '美东'}
};

// 辅助函数：根据仓库代码查询信息
function getWarehouseInfo(warehouseCode) {
    const code = warehouseCode.toUpperCase().trim();
    return amazonWarehouses[code] || null;
}

// 辅助函数：根据邮编前缀自动判断区域
function getRegionByZip(zipCode) {
    if (!zipCode || zipCode.length < 5) return null;
    const firstDigit = parseInt(zipCode.charAt(0));
    if (firstDigit >= 8 || firstDigit === 9) return '美西';
    if (firstDigit >= 4 && firstDigit <= 7) return '美中';
    return '美东';
}

// 辅助函数：根据仓库代码自动选择区域
function getRegionByWarehouse(warehouseCode) {
    const info = getWarehouseInfo(warehouseCode);
    if (info) return info.region;
    return null;
}