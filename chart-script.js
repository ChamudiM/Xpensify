

document.addEventListener("DOMContentLoaded", function() {

    
    const ctx = document.getElementById('balance_Chart').getContext('2d');
    const balance_Chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["jan", "feb", "mar", "apr", "may", "jun", "jul"],
            datasets: 
            [{
                label: 'Total Balance',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1    
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        callback: function(value, index, values) {
                            // Display only specific labels
                            if (value % 20 === 0 || value === 0) {
                                return value;
                            }
                        }
                    },                    
                    grid: {
                        display: false,
                        
                    }
                }
            }
        },
        
    });


    const ctx2 = document.getElementById('inc_Vs_exp').getContext('2d');
    const inc_Vs_exp = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ["jan", "feb", "mar", "apr", "may", "jun", "jul"],
            datasets: 
            [{
                label: 'Income',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#9acd32',
                tension: 0.1    
            },

            {
                label: 'Expenses',
                data: [60, 19, 40, 52, 56, 45, 0],
                fill: false,
                borderColor: '#cd5c5c',
                tension: 0.1    
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        callback: function(value, index, values) {
                            // Display only specific labels
                            if (value % 30 === 0 || value === 0) {
                                return value;
                            }
                        }
                    },
                    
                    grid: {
                        display: false
                    }
                }
            }
        },
        
    });

});



