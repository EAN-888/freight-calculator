// 木虾物流运费查询系统

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initCountrySelect();
    loadHistory();
});

// 初始化国家选择器
function initCountrySelect() {
    const select = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.name} (${country.nameEn})`;
        select.appendChild(option);
    });
}

// 搜索运费
function searchFreight() {
    const country = document.getElementById('country').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const serviceType = document.getElementById('serviceType').value;
    const cargoType = document.getElementById('cargoType').value || '普货';

    // 验证输入
    if (!country) {
        alert('请选择目的国');
        return;
    }
    if (!weight || weight <= 0) {
        alert('请输入有效的重量');
        return;
    }

    // 显示加载状态
    document.getElementById('results').innerHTML = `
        <div class="loading">正在计算运费</div>
    `;

    // 模拟延迟（实际使用可去掉）
    setTimeout(() => {
        const results = calculateFreight(country, weight, serviceType, cargoType);
        displayResults(results, weight);
        saveHistory(country, weight, serviceType, cargoType);
    }, 300);
}

// 计算运费
function calculateFreight(country, weight, serviceType, cargoType) {
    const results = [];

    freightRates.forEach(rate => {
        // 检查国家匹配
        if (!rate.countries.includes(country)) {
            return;
        }

        // 检查服务商类型
        if (serviceType && rate.providerType !== serviceType) {
            return;
        }

        // 检查货物类型
        if (rate.cargoType !== cargoType && rate.cargoType !== '普货') {
            return;
        }

        // 检查最小重量
        if (rate.minWeight && weight < rate.minWeight) {
            return;
        }

        // 计算运费
        let basePrice = 0;
        let priceDetail = '';

        if (rate.weightRanges) {
            // 重量区间计费
            const range = rate.weightRanges.find(r => weight >= r.min && weight <= r.max);
            if (range) {
                basePrice = range.price;
                priceDetail = `区间价 (${range.min}-${range.max}kg)`;
            } else {
                return; // 超出所有重量区间
            }
        } else if (rate.unitPrice) {
            // 统一单价计费
            basePrice = weight * rate.unitPrice;
            priceDetail = `${rate.unitPrice}元/kg × ${weight}kg`;
        }

        // 计算附加费
        let additionalFees = [];
        let totalAdditional = 0;

        if (rate.additionalFee.fuel && rate.additionalFee.fuel > 0) {
            const fuelFee = basePrice * rate.additionalFee.fuel;
            totalAdditional += fuelFee;
            additionalFees.push(`燃油：${fuelFee.toFixed(2)}元`);
        }

        if (rate.additionalFee.remote && rate.additionalFee.remote > 0) {
            totalAdditional += rate.additionalFee.remote;
            additionalFees.push(`偏远：${rate.additionalFee.remote}元`);
        }

        if (rate.additionalFee.battery && rate.additionalFee.battery > 0) {
            totalAdditional += rate.additionalFee.battery;
            additionalFees.push(`带电：${rate.additionalFee.battery}元`);
        }

        if (rate.additionalFee.port && rate.additionalFee.port > 0) {
            totalAdditional += rate.additionalFee.port;
            additionalFees.push(`港口：${rate.additionalFee.port}元`);
        }

        const totalPrice = basePrice + totalAdditional;

        results.push({
            provider: rate.provider,
            providerType: rate.providerType,
            serviceType: rate.serviceType,
            cargoType: rate.cargoType,
            basePrice: basePrice,
            additionalFees: additionalFees,
            totalAdditional: totalAdditional,
            totalPrice: totalPrice,
            deliveryTime: rate.deliveryTime,
            priceDetail: priceDetail,
            currency: rate.currency
        });
    });

    // 按总价排序
    results.sort((a, b) => a.totalPrice - b.totalPrice);

    return results;
}

// 显示结果
function displayResults(results, weight) {
    const container = document.getElementById('results');

    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon">😕</div>
                <p>暂无符合条件的报价</p>
                <p style="margin-top: 10px; font-size: 0.9em;">请检查筛选条件或联系管理员维护报价</p>
            </div>
        `;
        return;
    }

    let html = `
        <table class="results-table">
            <thead>
                <tr>
                    <th onclick="sortTable('provider')">物流服务商 ↕</th>
                    <th onclick="sortTable('providerType')">类型 ↕</th>
                    <th onclick="sortTable('serviceType')">服务 ↕</th>
                    <th>货物类型</th>
                    <th onclick="sortTable('totalPrice')">运费 (¥) ↕</th>
                    <th onclick="sortTable('deliveryTime')">时效 ↕</th>
                    <th>附加费</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
    `;

    results.forEach((result, index) => {
        const badgeClass = getBadgeClass(result.providerType);
        const additionalText = result.additionalFees.length > 0 
            ? `<span class="tooltip" data-tip="${result.additionalFees.join(' | ')}">+${result.totalAdditional.toFixed(2)}元</span>`
            : '-';

        html += `
            <tr>
                <td><strong>${result.provider}</strong></td>
                <td><span class="badge ${badgeClass}">${result.providerType}</span></td>
                <td>${result.serviceType}</td>
                <td>${result.cargoType}</td>
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

// 获取徽章样式
function getBadgeClass(type) {
    const map = {
        '快递': 'badge-express',
        '空运': 'badge-air',
        '海运': 'badge-sea',
        '专线': 'badge-line'
    };
    return map[type] || 'badge-line';
}

// 排序表格
let sortDirection = 1;
function sortTable(field) {
    sortDirection *= -1;
    // 实际应用中需要重新获取数据并排序
    alert('排序功能开发中...');
}

// 复制价格
function copyPrice(price) {
    navigator.clipboard.writeText(price).then(() => {
        alert('已复制：¥' + price);
    }).catch(() => {
        alert('复制失败，请手动复制');
    });
}

// 重置表单
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

// 保存查询历史
function saveHistory(country, weight, serviceType, cargoType) {
    let history = JSON.parse(localStorage.getItem('freightHistory') || '[]');
    const record = {
        country,
        weight,
        serviceType,
        cargoType,
        timestamp: Date.now()
    };
    
    // 添加到开头
    history.unshift(record);
    
    // 只保留最近 10 条
    history = history.slice(0, 10);
    
    localStorage.setItem('freightHistory', JSON.stringify(history));
}

// 加载历史
function loadHistory() {
    // 后续可以添加历史记录展示功能
}

// 导出结果
function exportResults() {
    alert('导出功能开发中...');
}
