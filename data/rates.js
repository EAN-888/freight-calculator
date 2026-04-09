// 物流报价数据
// 计费方式：weightRange - 重量区间计费，unitPrice - 统一单价

const freightRates = [
    // DHL 快递
    {
        provider: "DHL",
        providerType: "快递",
        serviceType: "标准",
        cargoType: "普货",
        countries: ["US", "GB", "DE", "FR", "IT", "ES", "CA", "AU", "JP", "KR"],
        weightRanges: [
            { min: 0, max: 0.5, price: 45 },
            { min: 0.5, max: 1, price: 85 },
            { min: 1, max: 2, price: 150 },
            { min: 2, max: 5, price: 280 },
            { min: 5, max: 10, price: 520 },
            { min: 10, max: 20, price: 980 },
            { min: 20, max: 30, price: 1400 }
        ],
        unitPrice: null,
        additionalFee: { fuel: 0.15, remote: 0 },
        deliveryTime: "3-5 天",
        currency: "CNY"
    },
    {
        provider: "DHL",
        providerType: "快递",
        serviceType: "特快",
        cargoType: "普货",
        countries: ["US", "GB", "DE", "FR", "IT", "ES", "CA", "AU", "JP", "KR"],
        weightRanges: [
            { min: 0, max: 0.5, price: 65 },
            { min: 0.5, max: 1, price: 120 },
            { min: 1, max: 2, price: 210 },
            { min: 2, max: 5, price: 380 },
            { min: 5, max: 10, price: 720 },
            { min: 10, max: 20, price: 1380 },
            { min: 20, max: 30, price: 1950 }
        ],
        unitPrice: null,
        additionalFee: { fuel: 0.15, remote: 0 },
        deliveryTime: "2-3 天",
        currency: "CNY"
    },
    {
        provider: "DHL",
        providerType: "快递",
        serviceType: "标准",
        cargoType: "带电",
        countries: ["US", "GB", "DE", "FR", "IT", "ES", "CA", "AU", "JP", "KR"],
        weightRanges: [
            { min: 0, max: 0.5, price: 55 },
            { min: 0.5, max: 1, price: 105 },
            { min: 1, max: 2, price: 190 },
            { min: 2, max: 5, price: 350 },
            { min: 5, max: 10, price: 650 },
            { min: 10, max: 20, price: 1230 },
            { min: 20, max: 30, price: 1750 }
        ],
        unitPrice: null,
        additionalFee: { fuel: 0.15, remote: 0, battery: 50 },
        deliveryTime: "4-6 天",
        currency: "CNY"
    },
    
    // UPS 快递
    {
        provider: "UPS",
        providerType: "快递",
        serviceType: "标准",
        cargoType: "普货",
        countries: ["US", "GB", "DE", "FR", "IT", "ES", "CA", "AU", "JP"],
        weightRanges: [
            { min: 0, max: 0.5, price: 42 },
            { min: 0.5, max: 1, price: 80 },
            { min: 1, max: 2, price: 145 },
            { min: 2, max: 5, price: 270 },
            { min: 5, max: 10, price: 500 },
            { min: 10, max: 20, price: 950 },
            { min: 20, max: 30, price: 1350 }
        ],
        unitPrice: null,
        additionalFee: { fuel: 0.12, remote: 0 },
        deliveryTime: "4-6 天",
        currency: "CNY"
    },
    {
        provider: "UPS",
        providerType: "快递",
        serviceType: "特快",
        cargoType: "普货",
        countries: ["US", "GB", "DE", "FR", "IT", "ES", "CA", "AU", "JP"],
        weightRanges: [
            { min: 0, max: 0.5, price: 60 },
            { min: 0.5, max: 1, price: 115 },
            { min: 1, max: 2, price: 200 },
            { min: 2, max: 5, price: 360 },
            { min: 5, max: 10, price: 680 },
            { min: 10, max: 20, price: 1300 },
            { min: 20, max: 30, price: 1850 }
        ],
        unitPrice: null,
        additionalFee: { fuel: 0.12, remote: 0 },
        deliveryTime: "2-4 天",
        currency: "CNY"
    },
    
    // FedEx 快递
    {
        provider: "FedEx",
        providerType: "快递",
        serviceType: "标准",
        cargoType: "普货",
        countries: ["US", "GB", "DE", "FR", "IT", "ES", "CA", "AU", "JP", "KR"],
        weightRanges: [
            { min: 0, max: 0.5, price: 40 },
            { min: 0.5, max: 1, price: 75 },
            { min: 1, max: 2, price: 140 },
            { min: 2, max: 5, price: 260 },
            { min: 5, max: 10, price: 480 },
            { min: 10, max: 20, price: 920 },
            { min: 20, max: 30, price: 1320 }
        ],
        unitPrice: null,
        additionalFee: { fuel: 0.13, remote: 0 },
        deliveryTime: "4-7 天",
        currency: "CNY"
    },
    
    // 中美专线
    {
        provider: "中美专线",
        providerType: "专线",
        serviceType: "标准",
        cargoType: "普货",
        countries: ["US"],
        weightRanges: null,
        unitPrice: 35,
        additionalFee: { fuel: 0, remote: 0 },
        deliveryTime: "8-12 天",
        currency: "CNY"
    },
    {
        provider: "中美专线",
        providerType: "专线",
        serviceType: "标准",
        cargoType: "带电",
        countries: ["US"],
        weightRanges: null,
        unitPrice: 42,
        additionalFee: { fuel: 0, remote: 0, battery: 30 },
        deliveryTime: "8-12 天",
        currency: "CNY"
    },
    
    // 欧洲专线
    {
        provider: "欧洲专线",
        providerType: "专线",
        serviceType: "标准",
        cargoType: "普货",
        countries: ["GB", "DE", "FR", "IT", "ES", "NL", "BE", "PL"],
        weightRanges: null,
        unitPrice: 38,
        additionalFee: { fuel: 0, remote: 0 },
        deliveryTime: "10-15 天",
        currency: "CNY"
    },
    
    // 英国专线
    {
        provider: "英国专线",
        providerType: "专线",
        serviceType: "标准",
        cargoType: "普货",
        countries: ["GB"],
        weightRanges: null,
        unitPrice: 32,
        additionalFee: { fuel: 0, remote: 0 },
        deliveryTime: "7-10 天",
        currency: "CNY"
    },
    
    // 海运美线
    {
        provider: "美森海运",
        providerType: "海运",
        serviceType: "快船",
        cargoType: "普货",
        countries: ["US"],
        weightRanges: null,
        unitPrice: 12,
        additionalFee: { fuel: 0, remote: 0, port: 200 },
        deliveryTime: "25-35 天",
        currency: "CNY",
        minWeight: 100
    },
    
    // 空运美线
    {
        provider: "空派美线",
        providerType: "空运",
        serviceType: "标准",
        cargoType: "普货",
        countries: ["US"],
        weightRanges: null,
        unitPrice: 28,
        additionalFee: { fuel: 0.08, remote: 0 },
        deliveryTime: "12-18 天",
        currency: "CNY",
        minWeight: 21
    },
    
    // 日本专线
    {
        provider: "日本专线",
        providerType: "专线",
        serviceType: "标准",
        cargoType: "普货",
        countries: ["JP"],
        weightRanges: null,
        unitPrice: 18,
        additionalFee: { fuel: 0, remote: 0 },
        deliveryTime: "5-8 天",
        currency: "CNY"
    },
    
    // 韩国专线
    {
        provider: "韩国专线",
        providerType: "专线",
        serviceType: "标准",
        cargoType: "普货",
        countries: ["KR"],
        weightRanges: null,
        unitPrice: 15,
        additionalFee: { fuel: 0, remote: 0 },
        deliveryTime: "3-5 天",
        currency: "CNY"
    },
    
    // 澳洲专线
    {
        provider: "澳洲专线",
        providerType: "专线",
        serviceType: "标准",
        cargoType: "普货",
        countries: ["AU"],
        weightRanges: null,
        unitPrice: 40,
        additionalFee: { fuel: 0, remote: 0 },
        deliveryTime: "12-18 天",
        currency: "CNY"
    }
];

// 国家列表
const countries = [
    { code: "US", name: "美国", nameEn: "United States" },
    { code: "GB", name: "英国", nameEn: "United Kingdom" },
    { code: "DE", name: "德国", nameEn: "Germany" },
    { code: "FR", name: "法国", nameEn: "France" },
    { code: "IT", name: "意大利", nameEn: "Italy" },
    { code: "ES", name: "西班牙", nameEn: "Spain" },
    { code: "CA", name: "加拿大", nameEn: "Canada" },
    { code: "AU", name: "澳大利亚", nameEn: "Australia" },
    { code: "JP", name: "日本", nameEn: "Japan" },
    { code: "KR", name: "韩国", nameEn: "South Korea" },
    { code: "NL", name: "荷兰", nameEn: "Netherlands" },
    { code: "BE", name: "比利时", nameEn: "Belgium" },
    { code: "PL", name: "波兰", nameEn: "Poland" }
];
