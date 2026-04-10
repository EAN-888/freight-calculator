// 木虾物流运费报价数据 - 基于腾讯文档最新数据
// 更新时间: 2026-04-10
// 数据来源: https://docs.qq.com/sheet/DRm1UQWp2aXlVZW1s

const freightRates = [
    // ========== 海运报价 ==========
    {
        "provider": "天航海派",
        "providerType": "海运",
        "serviceType": "美森正班",
        "cargoType": "普货",
        "countries": ["US"],
        "unitPrice": 12.8,
        "additionalFee": {"wood": 1, "remote": 50},
        "deliveryTime": "13-16 天",
        "currency": "CNY",
        "minWeight": 12
    },
    {
        "provider": "天航海派", 
        "providerType": "海运",
        "serviceType": "美森加班",
        "cargoType": "普货",
        "countries": ["US"],
        "unitPrice": 12.5,
        "additionalFee": {"wood": 1, "remote": 50},
        "deliveryTime": "15-19 天",
        "currency": "CNY",
        "minWeight": 12
    },
    {
        "provider": "天航海派",
        "providerType": "海运", 
        "serviceType": "以星快船",
        "cargoType": "普货",
        "countries": ["US"],
        "unitPrice": 9.4,
        "additionalFee": {"wood": 1, "remote": 50},
        "deliveryTime": "18-20 天",
        "currency": "CNY",
        "minWeight": 12
    },
    {
        "provider": "天航海派",
        "providerType": "海运",
        "serviceType": "OA",
        "cargoType": "普货", 
        "countries": ["US"],
        "unitPrice": 8.5,
        "additionalFee": {"wood": 1, "remote": 50},
        "deliveryTime": "23 天",
        "currency": "CNY",
        "minWeight": 12
    },
    {
        "provider": "方鸿",
        "providerType": "海运",
        "serviceType": "美森限时达",
        "cargoType": "普货",
        "countries": ["US"],
        "unitPrice": 13.2,
        "additionalFee": {"wood": 1, "pen": 1, "remote": 2},
        "deliveryTime": "18-22 天",
        "currency": "CNY",
        "minWeight": 21
    },
    {
        "provider": "飞特",
        "providerType": "海运",
        "serviceType": "美森正班限时达",
        "cargoType": "普货",
        "countries": ["US"],
        "unitPrice": 12.3,
        "additionalFee": {"wood": 1, "battery": 1, "magnet": 1, "pen": 1, "remote": 40},
        "deliveryTime": "16 天",
        "currency": "CNY",
        "minWeight": 12
    },
    
    // ========== 空运报价 ==========
    {
        "provider": "拓威",
        "providerType": "空运",
        "serviceType": "英国大陆飞",
        "cargoType": "普货",
        "countries": ["GB"],
        "unitPrice": 36,
        "additionalFee": {"delivery": 100},
        "deliveryTime": "8-11 天",
        "currency": "CNY",
        "minWeight": 21
    },
    {
        "provider": "拓威",
        "providerType": "空运",
        "serviceType": "英国香港飞",
        "cargoType": "普货",
        "countries": ["GB"],
        "unitPrice": 42,
        "additionalFee": {"delivery": 100, "wood": 480},
        "deliveryTime": "8-11 天",
        "currency": "CNY",
        "minWeight": 21
    },
    {
        "provider": "飞兔",
        "providerType": "空运",
        "serviceType": "普货不包税",
        "cargoType": "普货",
        "countries": ["GB"],
        "unitPrice": 41,
        "additionalFee": {"customs": 100},
        "deliveryTime": "8-12 天",
        "currency": "CNY",
        "minWeight": 15
    },
    {
        "provider": "飞兔",
        "providerType": "空运",
        "serviceType": "普货包税",
        "cargoType": "普货",
        "countries": ["GB"],
        "unitPrice": 45.5,
        "additionalFee": {},
        "deliveryTime": "8-12 天",
        "currency": "CNY",
        "minWeight": 15
    },
    {
        "provider": "飞兔",
        "providerType": "空运",
        "serviceType": "带电包税",
        "cargoType": "带电",
        "countries": ["GB"],
        "unitPrice": 48.5,
        "additionalFee": {},
        "deliveryTime": "8-12 天",
        "currency": "CNY",
        "minWeight": 15
    },
    {
        "provider": "博浩通",
        "providerType": "空运",
        "serviceType": "普货",
        "cargoType": "普货",
        "countries": ["US"],
        "unitPrice": 54,
        "additionalFee": {"textile": 2, "wood": 2},
        "deliveryTime": "7-11 天",
        "currency": "CNY",
        "minWeight": 12
    },
    {
        "provider": "博浩通",
        "providerType": "空运",
        "serviceType": "带电",
        "cargoType": "带电",
        "countries": ["US"],
        "unitPrice": 59.9,
        "additionalFee": {},
        "deliveryTime": "7-12 天",
        "currency": "CNY",
        "minWeight": 12
    },
    
    // ========== 快递报价 ==========
    {
        "provider": "联邦",
        "providerType": "快递",
        "serviceType": "IE",
        "cargoType": "普货",
        "countries": ["US", "CA"],
        "unitPrice": null,
        "additionalFee": {"fuel": 0.2825},
        "deliveryTime": "10 天",
        "currency": "CNY"
    },
    {
        "provider": "联邦",
        "providerType": "快递",
        "serviceType": "IP",
        "cargoType": "普货",
        "countries": ["US", "CA"],
        "unitPrice": null,
        "additionalFee": {"fuel": 0.2825},
        "deliveryTime": "5 天",
        "currency": "CNY"
    },
    {
        "provider": "UPS",
        "providerType": "快递",
        "serviceType": "标准",
        "cargoType": "普货",
        "countries": ["US", "CA"],
        "unitPrice": null,
        "additionalFee": {"heavy": 108},
        "deliveryTime": "7 天",
        "currency": "CNY"
    },
    {
        "provider": "DHL",
        "providerType": "快递",
        "serviceType": "标准",
        "cargoType": "普货",
        "countries": ["US", "CA", "GB", "DE", "FR", "IT", "ES", "AU", "JP", "KR"],
        "unitPrice": null,
        "additionalFee": {},
        "deliveryTime": "7 天",
        "currency": "CNY"
    },
    {
        "provider": "拓威百顺达",
        "providerType": "快递",
        "serviceType": "UPS红单",
        "cargoType": "普货",
        "countries": ["US"],
        "unitPrice": 58,
        "additionalFee": {"handling": 150},
        "deliveryTime": "7 天",
        "currency": "CNY",
        "minWeight": 23
    },
    {
        "provider": "拓威百顺达",
        "providerType": "快递",
        "serviceType": "UPS红单",
        "cargoType": "带电",
        "countries": ["US"],
        "unitPrice": 58.5,
        "additionalFee": {"handling": 150},
        "deliveryTime": "7 天",
        "currency": "CNY",
        "minWeight": 23
    },
    {
        "provider": "天航",
        "providerType": "快递",
        "serviceType": "UPS红单包税",
        "cargoType": "普货",
        "countries": ["GB"],
        "unitPrice": 50,
        "additionalFee": {"customs": 150},
        "deliveryTime": "7 天",
        "currency": "CNY",
        "minWeight": 25
    }
];

const countries = [
    { code: "US", name: "美国", nameEn: "United States" },
    { code: "CA", name: "加拿大", nameEn: "Canada" },
    { code: "GB", name: "英国", nameEn: "United Kingdom" },
    { code: "DE", name: "德国", nameEn: "Germany" },
    { code: "FR", name: "法国", nameEn: "France" },
    { code: "IT", name: "意大利", nameEn: "Italy" },
    { code: "ES", name: "西班牙", nameEn: "Spain" },
    { code: "AU", name: "澳大利亚", nameEn: "Australia" },
    { code: "JP", name: "日本", nameEn: "Japan" },
    { code: "KR", name: "韩国", nameEn: "South Korea" }
];

const additionalFeeInfo = {
    wood: "木制品 +1 RMB/KG (部分渠道)",
    textile: "纺织品 +0.5~4 RMB/KG",
    battery: "带电产品 +1 RMB/KG",
    magnet: "带磁产品 +1~2 RMB/KG",
    pen: "笔类 +1~3 RMB/KG",
    remote: "偏远地区费用",
    fuel: "燃油附加费",
    customs: "清关费/关税",
    handling: "手续费",
    heavy: "超重附加费"
};