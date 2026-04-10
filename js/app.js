// 木虾物流运费查询系统 v4.2 - 完整修复版
// 数据来源：腾讯文档 https://docs.qq.com/sheet/DRm1UQWp2aXlVZW1s

// 国家数据
const countries = [
    {code: 'US', name: '美国', nameEn: 'United States'},
    {code: 'CA', name: '加拿大', nameEn: 'Canada'},
    {code: 'GB', name: '英国', nameEn: 'United Kingdom'},
    {code: 'DE', name: '德国', nameEn: 'Germany'},
    {code: 'FR', name: '法国', nameEn: 'France'},
    {code: 'IT', name: '意大利', nameEn: 'Italy'},
    {code: 'ES', name: '西班牙', nameEn: 'Spain'},
    {code: 'AU', name: '澳大利亚', nameEn: 'Australia'},
    {code: 'JP', name: '日本', nameEn: 'Japan'},
    {code: 'KR', name: '韩国', nameEn: 'South Korea'}
];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing freight calculator...');
    initCountrySelect();
    loadHistory();
    updateDataInfo();
});

// 更新数据信息
function updateDataInfo() {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'info-banner';
    infoDiv.innerHTML = `
        💡 数据版本：v4.2 | 最后更新：2026-04-10 15:15<br>
        📊 数据来源：腾讯文档 | 总计：5 个 Sheet, 100+ 个渠道
    `;
    const searchSection = document.querySelector('.search-section');
    if (searchSection) {
        searchSection.insertBefore(infoDiv, document.querySelector('.form-group'));
    }
}

// 初始化国家选择器
function initCountrySelect() {
    const select = document.getElementById('country');
    if (!select) {
        console.error('Country select element not found');
        return;
    }
    
    // 清空现有选项（除了第一个）
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.name} (${country.nameEn})`;
        select.appendChild(option);
    });
    
    console.log('Country select initialized with', countries.length, 'countries');
}

// 搜索运费
async function searchFreight() {
    const country = document.getElementById('country').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const serviceType = document.getElementById('serviceType').value;
    const cargoType = document.getElementById('cargoType').value || '普货';

    if (!country) {
        alert('请选择目的国');
        return;
    }
    if (!weight || weight <= 0) {
        alert('请输入有效的重量');
        return;
    }

    document.getElementById('results').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>正在计算运费...</p>
        </div>
    `;

    setTimeout(() => {
        try {
            const results = calculateFreight(country, weight, serviceType, cargoType);
            displayResults(results, weight);
            saveHistory(country, weight, serviceType, cargoType);
        } catch (error) {
            console.error('Error calculating freight:', error);
            document.getElementById('results').innerHTML = `
                <div class="empty-state">
                    <div class="icon">❌</div>
                    <p>计算出错，请重试</p>
                    <p style="margin-top: 10px; font-size: 0.9em;">错误详情已记录到控制台</p>
                </div>
            `;
        }
    }, 300);
}

// 计算运费 v4.2
function calculateFreight(country, weight, serviceType, cargoType) {
    if (!window.freightRates) {
        throw new Error('freightRates data not loaded');
    }
    
    const results = [];

    freightRates.forEach(rate => {
        if (!rate.countries.includes(country)) return;
        if (serviceType && rate.providerType !== serviceType) return;
        if (rate.status !== 'active') return;

        let basePrice = 0;
        let priceDetail = '';

        if (rate.weightRanges) {
            for (const range of rate.weightRanges) {
                if (weight >= range.min && (range.max === null || weight < range.max)) {
                    if (Array.isArray(range.price)) {
                        const regionIndex = getRegionIndex(country, weight);
                        basePrice = weight * range.price[regionIndex];
                        priceDetail = `${range.price[regionIndex]}元/KG × ${weight}kg`;
                    } else {
                        basePrice = weight * range.price;
                        priceDetail = `${range.price}元/KG × ${weight}kg`;
                    }
                    break;
                }
            }
        }

        if (basePrice === 0) return;

        let additionalFees = [];
        let totalAdditional = 0;

        if (rate.additionalFees) {
            for (const [feeType, feeInfo] of Object.entries(rate.additionalFees)) {
                let feeAmount = 0;

                if (feeInfo.type === 'per_kg') {
                    feeAmount = feeInfo.amount * weight;
                    additionalFees.push(`${getFeeName(feeType)}: ${feeAmount.toFixed(2)}元`);
                } else if (feeInfo.type === 'per_ticket') {
                    feeAmount = feeInfo.amount;
                    additionalFees.push(`${getFeeName(feeType)}: ${feeInfo.amount}元`);
                } else if (feeInfo.type === 'per_box') {
                    feeAmount = feeInfo.amount;
                    additionalFees.push(`${getFeeName(feeType)}: ${feeInfo.amount}元`);
                } else if (feeInfo.type === 'per_item') {
                    // 品名超额费暂不计算
                } else if (feeInfo.type === 'percentage') {
                    feeAmount = basePrice * feeInfo.rate;
                    additionalFees.push(`${getFeeName(feeType)}: ${feeAmount.toFixed(2)}元`);
                }

                totalAdditional += feeAmount;
            }
        }

        const totalPrice = basePrice + totalAdditional;

        results.push({
            provider: rate.provider,
            providerType: rate.providerType,
            serviceType: rate.serviceType,
            cargoType: rate.cargoType || '普货',
            basePrice: basePrice,
            additionalFees: additionalFees,
            totalAdditional: totalAdditional,
            totalPrice: totalPrice,
            deliveryTime: rate.deliveryTime,
            priceDetail: priceDetail,
            notes: rate.notes || ''
        });
    });

    results.sort((a, b) => a.totalPrice - b.totalPrice);
    return results;
}

// 获取附加费名称
function getFeeName(type) {
    const names = {
        wood: '木制品',
        textile: '纺织品',
        battery: '带电',
        magnet: '带磁',
        pen: '笔类',
        customs: '清关费',
        handling: '手续费',
        delivery: '派送费',
        remote: '偏远费',
        overWeight: '超重费',
        overSize: '超长费',
        fuel: '燃油费'
    };
    return names[type] || type;
}

// 获取区域索引
function getRegionIndex(country, weight) {
    return 0;
}

// 显示结果
function displayResults(results, weight) {
    const container = document.getElementById('results');

    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon">😕</div>
                <p>暂无符合条件的报价</p>
                <p style="margin-top: 10px; font-size: 0.9em;">请检查筛选条件</p>
            </div>
        `;
        return;
    }

    let html = `
        <table class="results-table">
            <thead>
                <tr>
                    <th>物流服务商</th>
                    <th>类型</th>
                    <th>服务</th>
                    <th>运费 (¥)</th>
                    <th>时效</th>
                    <th>明细</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
    `;

    results.forEach(result => {
        const badgeClass = getBadgeClass(result.providerType);
        const additionalText = result.additionalFees.length > 0 
            ? `<span class="tooltip" data-tip="${result.additionalFees.join(' | ')}">+${result.totalAdditional.toFixed(2)}元</span>`
            : '-';

        html += `
            <tr>
                <td><strong>${result.provider}</strong></td>
                <td><span class="badge ${badgeClass}">${result.providerType}</span></td>
                <td>${result.serviceType}</td>
                <td class="price">¥${result.totalPrice.toFixed(2)}</td>
                <td>${result.deliveryTime}</td>
                <td>${additionalText}</td>
                <td>
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.85em;" 
                            onclick="copyPrice('${result.totalPrice.toFixed(2)}')">复制</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    html += `<p style="margin-top: 15px; color: #666; font-size: 0.9em;">共找到 ${results.length} 个报价方案 | 重量：${weight}kg</p>`;

    container.innerHTML = html;
}

function getBadgeClass(type) {
    const map = {
        '快递': 'badge-express',
        '空运': 'badge-air',
        '海运': 'badge-sea',
        '铁路': 'badge-rail'
    };
    return map[type] || 'badge-line';
}

function copyPrice(price) {
    navigator.clipboard.writeText(price).then(() => {
        alert('已复制：¥' + price);
    }).catch(() => {
        alert('复制失败，请手动复制');
    });
}

function resetForm() {
    document.getElementById('country').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('serviceType').value = '';
    document.getElementById('cargoType').value = '';
    document.getElementById('results').innerHTML = `
        <div class="empty-state">
            <div class="icon">📦</div>
            <p>请输入查询条件，点击搜索查看运费报价</p>
        </div>
    `;
}

function saveHistory(country, weight, serviceType, cargoType) {
    let history = JSON.parse(localStorage.getItem('freightHistory') || '[]');
    history.unshift({ country, weight, serviceType, cargoType, timestamp: Date.now() });
    history = history.slice(0, 10);
    localStorage.setItem('freightHistory', JSON.stringify(history));
}

function loadHistory() {}
function exportResults() {
    alert('导出功能开发中...');
}