const STORAGE_KEY = "utilityTrackerData";

const sampleData = [
  { name: "Electricity", type: "Energy", period: "2025-01", cost: 120 },
  { name: "Electricity", type: "Energy", period: "2025-02", cost: 115 },
  { name: "Electricity", type: "Energy", period: "2025-03", cost: 125 },
  { name: "Gas", type: "Energy", period: "2025-01", cost: 80 },
  { name: "Gas", type: "Energy", period: "2025-02", cost: 95 },
  { name: "Gas", type: "Energy", period: "2025-03", cost: 85 },
  { name: "Water", type: "Water", period: "2025-01", cost: 50 },
  { name: "Water", type: "Water", period: "2025-02", cost: 48 },
  { name: "Water", type: "Water", period: "2025-03", cost: 52 },
  { name: "Internet", type: "Internet", period: "2025-01", cost: 60 },
  { name: "Internet", type: "Internet", period: "2025-02", cost: 60 },
  { name: "Internet", type: "Internet", period: "2025-03", cost: 60 },
];

let utilitiesData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || sampleData;
let matchingUtilities = utilitiesData;

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(utilitiesData));
}

document.getElementById("service-name").addEventListener("change", function () {
  const otherServiceInput = document.getElementById("other-service");
  otherServiceInput.style.display = this.value === "Other" ? "block" : "none";
  if (this.value !== "Other") {
    otherServiceInput.value = "";
  }
});

document.getElementById("utility-type").addEventListener("change", function () {
  const otherTypeInput = document.getElementById("other-type");
  otherTypeInput.style.display = this.value === "Other" ? "block" : "none";
  if (this.value !== "Other") {
    otherTypeInput.value = "";
  }
});

function formatPeriod(period) {
  const date = new Date(period + "-01");
  return date.toLocaleString("default", { year: "numeric", month: "short" });
}

function addUtility() {
  let serviceName = document.getElementById("service-name").value.trim();
  let utilityType = document.getElementById("utility-type").value.trim();
  const period = document.getElementById("period").value;
  const cost = parseFloat(document.getElementById("cost").value);

  if (serviceName === "Other") {
    serviceName = document.getElementById("other-service").value.trim();
  }
  if (utilityType === "Other") {
    utilityType = document.getElementById("other-type").value.trim();
  }

  if (!isValidInput(serviceName, utilityType, period, cost)) {
    return;
  }

  const existingUtility = utilitiesData.find(
    (u) => u.name === serviceName && u.period === period
  );

  if (existingUtility) {
    if (
      !confirm(
        `A ${serviceName} entry already exists for ${formatPeriod(
          period
        )}. Do you want to update it?`
      )
    ) {
      return;
    }
    existingUtility.cost = cost;
    existingUtility.type = utilityType;
  } else {
    const newUtility = {
      name: serviceName,
      type: utilityType,
      period: period,
      cost: cost,
    };
    utilitiesData.push(newUtility);
  }

  saveToLocalStorage();
  renderUtilityTable();
  createUtilityChart();
  updateUtilityCheckboxes();
  updateSummary();

  document.getElementById("service-name").value = "";
  document.getElementById("utility-type").value = "";
  document.getElementById("period").value = "";
  document.getElementById("cost").value = "";
  document.getElementById("other-service").value = "";
  document.getElementById("other-type").value = "";
  document.getElementById("other-service").style.display = "none";
  document.getElementById("other-type").style.display = "none";
}

function isValidInput(serviceName, utilityType, period, cost) {
  if (!serviceName || !utilityType || !period || isNaN(cost) || cost < 0) {
    alert("Please fill in all fields correctly.");
    return false;
  }

  if (
    serviceName === "Other" &&
    !document.getElementById("other-service").value.trim()
  ) {
    alert("Please enter a service name.");
    return false;
  }

  if (
    utilityType === "Other" &&
    !document.getElementById("other-type").value.trim()
  ) {
    alert("Please enter a utility type.");
    return false;
  }

  if (!/^\d{4}-(?:0[1-9]|1[0-2])$/.test(period)) {
    alert("Invalid period format. Please use the date picker.");
    return false;
  }

  return true;
}

function renderUtilityTable() {
  const tableBody = document
    .getElementById("utility-table")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  const sortedUtilities = [...matchingUtilities].sort((a, b) => {
    if (a.period !== b.period) {
      return b.period.localeCompare(a.period);
    }
    return a.name.localeCompare(b.name);
  });

  const periodGroups = {};
  sortedUtilities.forEach((utility) => {
    if (!periodGroups[utility.period]) {
      periodGroups[utility.period] = [];
    }
    periodGroups[utility.period].push(utility);
  });

  let grandTotal = 0;

  Object.entries(periodGroups)
    .sort(([periodA], [periodB]) => periodB.localeCompare(periodA))
    .forEach(([period, utilities]) => {
      const periodRow = tableBody.insertRow();
      const periodHeader = periodRow.insertCell();
      periodHeader.colSpan = 6;
      periodHeader.style.backgroundColor = "#edf2f7";
      periodHeader.style.fontWeight = "bold";
      periodHeader.style.padding = "0.75rem 1rem";
      periodHeader.textContent = `Period: ${formatPeriod(period)}`;

      let periodTotal = 0;
      utilities.forEach((utility) => {
        const row = tableBody.insertRow();

        const nameCell = row.insertCell();
        nameCell.textContent = utility.name;

        const typeCell = row.insertCell();
        typeCell.textContent = utility.type;

        const periodCell = row.insertCell();
        periodCell.textContent = formatPeriod(utility.period);

        const costCell = row.insertCell();
        costCell.textContent = `$${utility.cost.toFixed(2)}`;
        periodTotal += utility.cost;

        const changeCell = row.insertCell();
        const prevPeriodUtil = utilitiesData.find(
          (u) => u.name === utility.name && u.period < utility.period
        );
        if (prevPeriodUtil) {
          const change =
            ((utility.cost - prevPeriodUtil.cost) / prevPeriodUtil.cost) * 100;
          const changeText = change.toFixed(1);
          changeCell.textContent = `${changeText}%`;
          changeCell.style.color = change > 0 ? "#e53e3e" : "#38a169";
        } else {
          changeCell.textContent = "-";
        }

        const deleteCell = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
          deleteUtility(utility);
        });
        deleteCell.appendChild(deleteButton);
      });

      const totalRow = tableBody.insertRow();
      const totalLabelCell = totalRow.insertCell();
      totalLabelCell.colSpan = 3;
      totalLabelCell.textContent = "Period Total:";
      totalLabelCell.style.textAlign = "right";
      totalLabelCell.style.fontWeight = "bold";
      totalLabelCell.style.backgroundColor = "#f7fafc";

      const totalAmountCell = totalRow.insertCell();
      totalAmountCell.textContent = `$${periodTotal.toFixed(2)}`;
      totalAmountCell.style.fontWeight = "bold";
      totalAmountCell.style.backgroundColor = "#f7fafc";

      const emptyCell1 = totalRow.insertCell();
      const emptyCell2 = totalRow.insertCell();
      emptyCell1.style.backgroundColor = "#f7fafc";
      emptyCell2.style.backgroundColor = "#f7fafc";

      grandTotal += periodTotal;
    });

  if (sortedUtilities.length > 0) {
    const grandTotalRow = tableBody.insertRow();
    const grandTotalLabelCell = grandTotalRow.insertCell();
    grandTotalLabelCell.colSpan = 3;
    grandTotalLabelCell.textContent = "Grand Total:";
    grandTotalLabelCell.style.textAlign = "right";
    grandTotalLabelCell.style.fontWeight = "bold";
    grandTotalLabelCell.style.backgroundColor = "#e2e8f0";

    const grandTotalAmountCell = grandTotalRow.insertCell();
    grandTotalAmountCell.textContent = `$${grandTotal.toFixed(2)}`;
    grandTotalAmountCell.style.fontWeight = "bold";
    grandTotalAmountCell.style.backgroundColor = "#e2e8f0";

    const emptyCell1 = grandTotalRow.insertCell();
    const emptyCell2 = grandTotalRow.insertCell();
    emptyCell1.style.backgroundColor = "#e2e8f0";
    emptyCell2.style.backgroundColor = "#e2e8f0";
  }
}

function deleteUtility(utility) {
  if (
    confirm(
      `Are you sure you want to delete ${utility.name} for ${formatPeriod(
        utility.period
      )}?`
    )
  ) {
    const index = utilitiesData.indexOf(utility);
    if (index !== -1) {
      utilitiesData.splice(index, 1);
      saveToLocalStorage();
      renderUtilityTable();
      createUtilityChart();
      updateUtilityCheckboxes();
      updateSummary();
    }
  }
}

let utilityChart;

function createUtilityChart(data = matchingUtilities, groupBy = null) {
  const chartCanvas = document.getElementById("utility-chart");

  if (utilityChart) {
    utilityChart.destroy();
  }

  const allPeriods = [...new Set(data.map((u) => u.period))].sort();
  const allNames = [...new Set(data.map((u) => u.name))].sort();

  let labels, datasets;
  if (groupBy === "type") {
    const groupedByType = {};

    data.forEach((utility) => {
      if (!groupedByType[utility.type]) {
        groupedByType[utility.type] = {};
      }
      if (!groupedByType[utility.type][utility.period]) {
        groupedByType[utility.type][utility.period] = 0;
      }
      groupedByType[utility.type][utility.period] += utility.cost;
    });

    datasets = Object.entries(groupedByType).map(
      ([type, periodData], index) => {
        const hue = (index * 360) / Object.keys(groupedByType).length;
        return {
          label: type,
          data: allPeriods.map((period) => periodData[period] || 0),
          backgroundColor: `hsla(${hue}, 70%, 50%, 0.2)`,
          borderColor: `hsl(${hue}, 70%, 50%)`,
          borderWidth: 2,
          tension: 0.1,
          fill: false,
        };
      }
    );

    labels = allPeriods.map(formatPeriod);
  } else if (groupBy === "cumulative") {
    datasets = allNames.map((name, index) => {
      let cumulative = 0;
      const utilityData = allPeriods.map((period) => {
        const periodCost = data
          .filter((u) => u.name === name && u.period === period)
          .reduce((sum, u) => sum + u.cost, 0);
        cumulative += periodCost;
        return cumulative;
      });

      const hue = (index * 360) / allNames.length;
      return {
        label: name,
        data: utilityData,
        backgroundColor: `hsla(${hue}, 70%, 50%, 0.2)`,
        borderColor: `hsl(${hue}, 70%, 50%)`,
        borderWidth: 2,
        fill: true,
        tension: 0.1,
      };
    });

    labels = allPeriods.map(formatPeriod);
  } else {
    datasets = allNames.map((name, index) => {
      const utilityData = allPeriods.map((period) => {
        const entry = data.find((u) => u.name === name && u.period === period);
        return entry ? entry.cost : 0;
      });

      const hue = (index * 360) / allNames.length;
      return {
        label: name,
        data: utilityData,
        backgroundColor: `hsla(${hue}, 70%, 50%, 0.8)`,
        borderColor: `hsl(${hue}, 70%, 50%)`,
        borderWidth: 1,
        stack: "stack1",
      };
    });

    const totalData = allPeriods.map((period) => {
      return data
        .filter((u) => u.period === period)
        .reduce((sum, u) => sum + u.cost, 0);
    });

    datasets.push({
      label: "Total",
      data: totalData,
      type: "line",
      borderColor: "#2d3748",
      backgroundColor: "#2d3748",
      borderWidth: 2,
      fill: false,
      tension: 0.1,
      pointRadius: 4,
      pointHoverRadius: 6,
    });

    labels = allPeriods.map(formatPeriod);
  }

  utilityChart = new Chart(chartCanvas, {
    type: groupBy ? "line" : "bar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          stacked: !groupBy,
          title: {
            display: true,
            text: "Cost ($)",
          },
          ticks: {
            callback: (value) => `$${value}`,
          },
        },
        x: {
          stacked: !groupBy,
          title: {
            display: true,
            text: "Period",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: getChartTitle(groupBy),
          font: {
            size: 16,
          },
        },
        legend: {
          display: true,
          position: "top",
          labels: {
            usePointStyle: true,
            padding: 15,
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              label += `$${context.parsed.y.toFixed(2)}`;
              return label;
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  });
}

function getChartTitle(groupBy) {
  switch (groupBy) {
    case "type":
      return "Utility Costs by Type Over Time";
    case "cumulative":
      return "Cumulative Costs by Utility Over Time";
    default:
      return "Monthly Utility Costs";
  }
}

function searchUtility() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();

  matchingUtilities = utilitiesData.filter((utility) => {
    return (
      utility.name.toLowerCase().includes(searchTerm) ||
      utility.type.toLowerCase().includes(searchTerm)
    );
  });

  renderUtilityTable();
  createUtilityChart(matchingUtilities);
  updateSummary(matchingUtilities);
}

const addUtilityForm = document.getElementById("add-utility-form");
addUtilityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addUtility();
});

let selectedUtilities = new Set();

function updateUtilityCheckboxes() {
  const checkboxContainer = document.getElementById("utility-checkboxes");
  checkboxContainer.innerHTML = "";

  const utilities = [...new Set(utilitiesData.map((u) => u.name))].sort();

  utilities.forEach((utility) => {
    const div = document.createElement("div");
    div.className = "checkbox-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `utility-${utility}`;
    checkbox.value = utility;
    checkbox.checked = selectedUtilities.has(utility);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectedUtilities.add(utility);
      } else {
        selectedUtilities.delete(utility);
      }
    });

    const label = document.createElement("label");
    label.htmlFor = `utility-${utility}`;
    label.textContent = utility;

    div.appendChild(checkbox);
    div.appendChild(label);
    checkboxContainer.appendChild(div);
  });
}

function selectAllUtilities() {
  const utilities = [...new Set(utilitiesData.map((u) => u.name))];
  selectedUtilities = new Set(utilities);
  updateUtilityCheckboxes();
  showSelectedUtilities();
}

function deselectAllUtilities() {
  selectedUtilities.clear();
  updateUtilityCheckboxes();
  showSelectedUtilities();
}

function showSelectedUtilities() {
  if (selectedUtilities.size === 0) {
    alert("Please select at least one utility to display");
    return;
  }

  const filteredData = utilitiesData.filter((u) =>
    selectedUtilities.has(u.name)
  );
  matchingUtilities = filteredData;
  renderUtilityTable();
  createUtilityChart(filteredData, "cumulative");
  updateSummary(filteredData);
}

function updateSummary(data = matchingUtilities) {
  const totalCost = data.reduce((sum, u) => sum + u.cost, 0);
  const uniquePeriods = new Set(data.map((u) => u.period)).size;
  const monthlyAverage = totalCost / (uniquePeriods || 1);

  const periodTotals = {};
  data.forEach((u) => {
    if (!periodTotals[u.period]) {
      periodTotals[u.period] = 0;
    }
    periodTotals[u.period] += u.cost;
  });
  const highestBill = Math.max(...Object.values(periodTotals), 0);

  document.getElementById(
    "monthly-average"
  ).textContent = `$${monthlyAverage.toFixed(2)}`;
  document.getElementById("total-costs").textContent = `$${totalCost.toFixed(
    2
  )}`;
  document.getElementById("highest-bill").textContent = `$${highestBill.toFixed(
    2
  )}`;
}

renderUtilityTable();
createUtilityChart();
updateUtilityCheckboxes();
updateSummary();
