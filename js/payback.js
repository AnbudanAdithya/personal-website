// ── STATE ─────────────────────────────────────────────────────
let chartInstance = null
let numYears      = 0

// ── MODE CHANGE ───────────────────────────────────────────────
function onModeChange() {
    const mode = document.querySelector('input[name="cf-mode"]:checked').value
    document.getElementById('cf-fixed-inputs').style.display  = mode === 'fixed'  ? 'block' : 'none'
    document.getElementById('cf-uneven-note').style.display   = mode === 'uneven' ? 'block' : 'none'
    document.getElementById('dynamic-table').innerHTML        = ''
    document.getElementById('btn-calculate').style.display    = 'none'
    document.getElementById('calc-results').style.display     = 'none'
    document.getElementById('chart-wrapper').style.display    = 'none'
}

// ── GENERATE INPUT TABLE ──────────────────────────────────────
function generateInputTable() {
    numYears = parseInt(document.getElementById('num-years').value)

    if (!numYears || numYears < 1 || numYears > 20) {
        alert('⚠️ Please enter a valid number of years (1–20).')
        return
    }

    const mode      = document.querySelector('input[name="cf-mode"]:checked').value
    const container = document.getElementById('dynamic-table')
    container.innerHTML = ''

    // Fixed mode — no table needed
    if (mode === 'fixed') {
        document.getElementById('btn-calculate').style.display = 'block'
        return
    }

    // Uneven mode — build year-by-year table
    container.innerHTML = `
        <div class="calc-inputs-top">
            <h3 style="color:var(--accent); margin-bottom:0.5rem;">
                📋 Year-by-Year Cash Flows
            </h3>
            <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:1.5rem;">
                Enter Net Cash Flow for each year. Can go up, down, or stay flat.
            </p>
            <div style="overflow-x:auto;">
                <table class="input-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Net Cash Flow (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Array.from({ length: numYears }, (_, i) => `
                            <tr>
                                <td style="color:var(--accent); font-weight:600;">
                                    Year ${i+1}
                                </td>
                                <td>
                                    <input type="number" id="cf-${i+1}"
                                           placeholder="e.g. 200000"
                                           class="table-input"/>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `

    document.getElementById('btn-calculate').style.display = 'block'
}

// ── MAIN CALCULATOR ───────────────────────────────────────────
function runCalculator() {

    const name         = document.getElementById('biz-name').value || 'My Business'
    const investment   = parseFloat(document.getElementById('lump-sum-amount').value)
    const discountRate = parseFloat(document.getElementById('discount-rate').value) / 100
    const taxRate      = parseFloat(document.getElementById('tax-rate').value)      / 100
    const mode         = document.querySelector('input[name="cf-mode"]:checked').value

    if (isNaN(investment) || investment <= 0) {
        alert('⚠️ Please enter a valid Initial Investment.'); return
    }
    if (isNaN(discountRate) || isNaN(taxRate)) {
        alert('⚠️ Please fill in Discount Rate and Tax Rate.'); return
    }
    if (discountRate < 0 || discountRate > 1) {
        alert('⚠️ Discount Rate must be between 0% and 100%.'); return
    }
    if (taxRate < 0 || taxRate > 1) {
        alert('⚠️ Tax Rate must be between 0% and 100%.'); return
    }
    if (!numYears || numYears < 1) {
        alert('⚠️ Please click Generate Input Table first.'); return
    }

    // ── Build cash flow array ─────────────────────────────────
    const netCF = []

    if (mode === 'fixed') {
        const cf1      = parseFloat(document.getElementById('cf-year1').value)
        const cfGrowth = parseFloat(document.getElementById('cf-growth').value) / 100 || 0
        if (isNaN(cf1)) { alert('⚠️ Please enter Year 1 Cash Flow.'); return }
        for (let i = 0; i < numYears; i++) {
            netCF.push(cf1 * Math.pow(1 + cfGrowth, i))
        }
    } else {
        for (let y = 1; y <= numYears; y++) {
            const cf = parseFloat(document.getElementById(`cf-${y}`)?.value)
            if (isNaN(cf)) { alert(`⚠️ Please enter Cash Flow for Year ${y}.`); return }
            netCF.push(cf)
        }
    }

    // ── Apply tax to positive cash flows ──────────────────────
    // Net CF after tax = CF - (CF × taxRate) if CF > 0
    const netCFafterTax = netCF.map(cf => cf > 0 ? cf * (1 - taxRate) : cf)

    // ── Discounted cash flows ─────────────────────────────────
    const discountedCF = netCFafterTax.map(
        (cf, i) => cf / Math.pow(1 + discountRate, i + 1)
    )

    // ── Simple Payback Period ─────────────────────────────────
    let simplePayback = null
    const simpleCumCF = []
    let cum = 0

    for (let i = 0; i < numYears; i++) {
        cum += netCFafterTax[i]
        simpleCumCF.push(cum)

        if (cum === investment) {
            simplePayback = { yr: i + 1, mon: 0, exists: true, exact: true }
            break
        }
        if (cum > investment) {
            const pCumCF = cum - netCFafterTax[i]
            const mon    = Math.round(((investment - pCumCF) / netCFafterTax[i]) * 12 * 100) / 100
            simplePayback = { yr: i, mon, exists: true, exact: false }
            break
        }
    }
    if (!simplePayback) simplePayback = { exists: false }

    // ── Discounted Payback Period ─────────────────────────────
    let discountedPayback = null
    const discCumCF       = []
    let dcum = 0

    for (let i = 0; i < numYears; i++) {
        dcum += discountedCF[i]
        discCumCF.push(dcum)

        if (dcum === investment) {
            discountedPayback = { yr: i + 1, mon: 0, exists: true, exact: true }
            break
        }
        if (dcum > investment) {
            const pCumCF = dcum - discountedCF[i]
            const mon    = Math.round(((investment - pCumCF) / discountedCF[i]) * 12 * 100) / 100
            discountedPayback = { yr: i, mon, exists: true, exact: false }
            break
        }
    }
    if (!discountedPayback) discountedPayback = { exists: false }

    // ── Format (matches VBA output) ───────────────────────────
    function formatPeriod(pb) {
        if (!pb.exists)   return '❌ No Payback Period Exists'
        if (pb.exact)     return `${pb.yr} Years`
        if (pb.mon === 0) return `${pb.yr} Years`
        return `${pb.yr} Years & ${pb.mon} Months`
    }

    renderResults(
        name, formatPeriod(simplePayback), formatPeriod(discountedPayback),
        investment, netCF, netCFafterTax, simpleCumCF, discCumCF
    )
}

// ── RENDER RESULTS ────────────────────────────────────────────
function renderResults(name, simplePayback, discountedPayback,
                       investment, netCF, netCFafterTax,
                       cumulativeCF, cumulativeDCF) {

    const fmt = n => {
        if (n === null || n === undefined || isNaN(n)) return '—'
        const abs = Math.abs(n)
        const str = '₹' + abs.toLocaleString('en-IN', { maximumFractionDigits: 0 })
        return n < 0 ? `(${str})` : str
    }

    let tableRows = ''
    for (let i = 0; i < numYears; i++) {
        const cfClass  = cumulativeCF[i]  >= 0 ? 'positive' : 'negative'
        const dcfClass = cumulativeDCF[i] >= 0 ? 'positive' : 'negative'

        // Show change vs previous year
        const cfChange      = i > 0 && netCF[i-1] !== 0
            ? ((netCF[i] - netCF[i-1]) / Math.abs(netCF[i-1]) * 100).toFixed(1) + '%'
            : '—'
        const cfChangeColor = i > 0
            ? (netCF[i] >= netCF[i-1] ? '#00e599' : '#ff4d6d')
            : '#606070'

        // Tax = difference between gross CF and after-tax CF (only on positive CFs)
        const taxPaid = netCF[i] > 0 ? netCF[i] - netCFafterTax[i] : 0

        tableRows += `
            <tr>
                <td>Year ${i+1}</td>
                <td>
                    ${fmt(netCF[i])}
                    <span style="font-size:0.72rem; color:${cfChangeColor}; margin-left:6px;">
                        ${cfChange}
                    </span>
                </td>
                <td style="color:#ff9966;">${fmt(taxPaid)}</td>
                <td>${fmt(netCFafterTax[i])}</td>
                <td class="${cfClass}">${fmt(cumulativeCF[i])}</td>
                <td class="${dcfClass}">${fmt(cumulativeDCF[i])}</td>
            </tr>
        `
    }

    const resultsEl = document.getElementById('calc-results')
    resultsEl.style.display = 'block'
    resultsEl.innerHTML = `
        <h3 style="color:var(--accent); margin-bottom:1.5rem;">📊 Results — ${name}</h3>

        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin-bottom:2rem;">
            <div class="result-metric" style="flex-direction:column; align-items:flex-start; gap:0.4rem;">
                <span class="label">💰 Initial Investment</span>
                <span class="value">${fmt(investment)}</span>
            </div>
            <div class="result-metric" style="flex-direction:column; align-items:flex-start; gap:0.4rem;">
                <span class="label">💵 Simple Payback Period</span>
                <span class="value">${simplePayback}</span>
            </div>
            <div class="result-metric" style="flex-direction:column; align-items:flex-start; gap:0.4rem;">
                <span class="label">📉 Discounted Payback Period</span>
                <span class="value">${discountedPayback}</span>
            </div>
        </div>

        <h4 style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1rem;">
            📋 Cash Flow Schedule
        </h4>
        <div style="overflow-x:auto;">
            <table class="cf-table">
                <thead>
                    <tr>
                        <th style="text-align:left;">Year</th>
                        <th>Cash Flow</th>
                        <th>Tax Paid</th>
                        <th>CF After Tax</th>
                        <th>Cumul. CF</th>
                        <th>Cumul. DCF</th>
                    </tr>
                </thead>
                <tbody>${tableRows}</tbody>
            </table>
        </div>
    `

    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    renderChart(numYears, cumulativeCF, cumulativeDCF, netCFafterTax, investment)
}

// ── CHART ─────────────────────────────────────────────────────
function renderChart(years, cumulativeCF, cumulativeDCF, netCF, investment) {
    const wrapper = document.getElementById('chart-wrapper')
    wrapper.style.display = 'block'

    const labels        = ['Year 0', ...Array.from({ length: years }, (_, i) => `Year ${i+1}`)]
    const barData       = [-investment, ...netCF]
    const barColors     = barData.map((v, i) =>
        i === 0 ? 'rgba(220,100,30,0.85)'
        : v >= 0 ? 'rgba(30,80,160,0.85)' : 'rgba(220,60,60,0.75)'
    )
    const cumulData     = [-investment, ...cumulativeCF]
    const discCumulData = [-investment, ...cumulativeDCF]

    if (chartInstance) chartInstance.destroy()

    const ctx = document.getElementById('payback-chart').getContext('2d')
    chartInstance = new Chart(ctx, {
        data: {
            labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Net Cash Flow (After Tax)',
                    data: barData,
                    backgroundColor: barColors,
                    borderRadius: 4,
                    order: 2
                },
                {
                    type: 'line',
                    label: 'Cumulative CF',
                    data: cumulData,
                    borderColor: '#f0c040',
                    borderWidth: 2.5,
                    pointRadius: 5,
                    pointBackgroundColor: '#f0c040',
                    tension: 0.3,
                    fill: false,
                    order: 1
                },
                {
                    type: 'line',
                    label: 'Discounted Cumulative CF',
                    data: discCumulData,
                    borderColor: '#00e599',
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: '#00e599',
                    borderDash: [6, 3],
                    tension: 0.3,
                    fill: false,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                title: {
                    display: true,
                    text: 'Payback Period Analysis',
                    color: '#fff',
                    font: { family: 'Inter', size: 16, weight: '600' },
                    padding: { bottom: 20 }
                },
                legend: { 
                    labels: { 
                        color: '#a0a0b0', 
                        font: { family: 'Inter' },
                        usePointStyle: true, // Tells Chart.js to use our custom shapes
                        padding:25,
                        boxpadding:10,

                        generateLabels: function(chart) {
                            
                            // 1. Create a dual-color box (Orange & Black) for Cash Flow
                            const createDualBox = () => {
                                const c = document.createElement('canvas');
                                c.width = 28; c.height = 16;
                                const ctx = c.getContext('2d');
                                ctx.fillStyle = 'rgba(220,100,30,0.85)'; // Orange
                                ctx.fillRect(0, 0, 8, 16);
                                ctx.fillStyle = 'rgba(30,80,160,0.85)';      // Blue
                                ctx.fillRect(8, 0, 8, 16);
                                return c;
                            };

                            // 2. Create a literal line with a circle marker on it
                            const createLineMarker = (color, isDash) => {
                                const c = document.createElement('canvas');
                                c.width = 44; c.height = 16;
                                const ctx = c.getContext('2d');
                                
                                // Draw the line
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2.5;
                                if (isDash) ctx.setLineDash([5, 3]);
                                ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(32, 8); ctx.stroke();
                                
                                // Draw the circle marker in the middle
                                ctx.setLineDash([]);
                                ctx.fillStyle = color;
                                ctx.beginPath(); ctx.arc(16, 8, 4.5, 0, 2 * Math.PI); ctx.fill();
                                return c;
                            };

                            // 3. Apply these custom shapes to the correct datasets
                            const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            labels.forEach((label, i) => {
                                if (i === 0) {
                                    label.pointStyle = createLineMarker('#f0c040', false); // Cumul CF
                                } else if (i === 1) {
                                    label.pointStyle = createLineMarker('#00e599', true);  // Disc Cumul CF
                                } else if (i === 2) {
                                    label.pointStyle = createDualBox(); // Cash Flow
                                }
                            });
                            return labels;
                        }
                    } 
                },
                tooltip: {
                    backgroundColor: '#16161f',
                    borderColor: '#2a2a3a',
                    borderWidth: 1,
                    titleColor: '#fff',
                    bodyColor: '#a0a0b0',
                    padding: 12,
                    callbacks: {
                        label: ctx => {
                            const v = ctx.raw
                            return ` ${ctx.dataset.label}: ${v < 0 ? '-' : '+'}₹${Math.abs(v).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
                        }
                    }
                }
            },
            scales: {
                x: { ticks: { color: '#a0a0b0', padding:20 }, grid: { color: '#2a2a3a' } 
            },
                y: {
                    grace:'10%',
                    ticks: {
                        color: '#a0a0b0',
                        callback: v => {
                            const abs = Math.abs(v)
                            let str = '';
                            if (abs >= 10000000) {
                                str = '₹' + (abs/10000000).toFixed(2) + 'Cr';
                            } else if (abs >= 100000) {
                                str = '₹' + (abs/100000).toFixed(2) + 'L';
                            } else if (abs >= 1000) {
                                str = '₹' + (abs/1000).toFixed(0) + 'k';
                            } else {
                                str = '₹' + abs.toLocaleString('en-IN');
                            }
                            return v < 0 ? `(${str})` : str
                        }
                    },
                    grid: { color: '#2a2a3a' }
                }
            }
        },
        plugins: [{
            id: 'customLabels',
            afterDatasetsDraw(chart) {
                const { ctx, data, scales: { y } } = chart
                ctx.save()
                const zeroY = y.getPixelForValue(0)
                ctx.beginPath()
                ctx.moveTo(chart.chartArea.left, zeroY)
                ctx.lineTo(chart.chartArea.right, zeroY)
                ctx.strokeStyle = 'rgba(255,255,255,0.2)'
                ctx.lineWidth = 1
                ctx.setLineDash([6, 4])
                ctx.stroke()
                ctx.setLineDash([])

                chart.getDatasetMeta(0).data.forEach((bar, i) => {
                    const val = data.datasets[0].data[i]
                    if (val == null) return
                    const abs   = Math.abs(val)
                    const label = (val < 0 ? '-' : '') + '₹' + (
                        abs >= 10000000 ? (abs/10000000).toFixed(2) + 'Cr' :
                        abs >= 100000 ? (abs/100000).toFixed(2) + 'L' :
                        abs.toLocaleString('en-IN', { maximumFractionDigits: 0 })
                    )
                    ctx.fillStyle = '#ffffff'
                    ctx.font = '600 10px Inter'
                    ctx.textAlign = 'center'
                    ctx.fillText(label, bar.x, val >= 0 ? bar.y - 8 : bar.y + 16)
                })
                ctx.restore()
            }
        }]
    })
}