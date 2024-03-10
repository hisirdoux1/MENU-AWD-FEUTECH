document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('orderForm');
    const itemCounter = document.querySelector('.item-counter');
    const totalBill = document.getElementById('totalBill');
    const cashGivenInput = document.getElementById('cashGiven');
    const modal = document.getElementById("myModal");
    const submitBtn = document.querySelector(".customer-info button[type='submit']");
    const resetBtn = document.querySelector(".customer-info button[type='reset']");
    const span = document.getElementsByClassName("close")[0];
    const closeButton = document.getElementById("closeModal");
    const modalPayment = document.getElementById("modalPayment"); 

    const prices = {
        talkneneng: 10.00,
        tworon: 5.00,
        killermare: 10.00,
        behnenqueue: 12.00
    };

    function updateOrderDetails() {
        let totalQty = 0;
        let total = 0;
        Array.from(orderForm.elements).forEach(input => {
            if (input.type === "number" && input.name !== "totalBill" && input.name !== "cashGiven") {
                totalQty += parseInt(input.value, 10);
                total += parseInt(input.value, 10) * prices[input.name];
            }
        });
        itemCounter.textContent = totalQty;
        totalBill.value = total.toFixed(2);
        updateCashChange();
    }

    function updateCashChange() {
        const cashGiven = parseFloat(cashGivenInput.value);
        const totalAmount = parseFloat(totalBill.value);
        const cashChange = cashGiven - totalAmount;
        if (!isNaN(cashChange)) {
            document.getElementById('cashChange').textContent = `₱${cashChange.toFixed(2)}`;
        }
        updatePayment(); 
    }

    function updatePayment() {
        const cashGiven = parseFloat(cashGivenInput.value);
        if (!isNaN(cashGiven)) {
            modalPayment.textContent = `₱${cashGiven.toFixed(2)}`;
        } else {
            modalPayment.textContent = ""; 
        }
    }

    function checkCashSufficiency() {
        const cashGiven = parseFloat(cashGivenInput.value);
        const totalAmount = parseFloat(totalBill.value);
        if (!isNaN(cashGiven) && cashGiven < totalAmount) {
            alert("Cash provided is insufficient to cover the total bill. Please enter a sufficient amount.");
            cashGivenInput.value = ''; 
            updatePayment(); 
            document.getElementById('cashChange').textContent = ''; 
        }
        updateCashChange(); 
    }

    orderForm.addEventListener('input', function (event) {
        if (event.target.type === 'number') {
            updateOrderDetails();
        }
    });

    cashGivenInput.addEventListener('blur', function(event) {
        const cashInputValue = cashGivenInput.value.trim(); 
        if (cashInputValue !== '' && !isNaN(parseFloat(cashInputValue))) {
            checkCashSufficiency();
        }
    });

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
    });

    submitBtn.onclick = function(event) {
        updatePayment(); 
        document.getElementById('modalName').textContent = document.getElementById('name').value;
        document.getElementById('modalAddress').textContent = document.getElementById('address').value;
        document.getElementById('modalContactNumber').textContent = document.getElementById('contactNumber').value;
        document.getElementById('modalTotalBill').textContent = `₱${totalBill.value}`;
        var change = parseFloat(cashGivenInput.value) - parseFloat(totalBill.value);
        document.getElementById('modalChange').textContent = `₱${change.toFixed(2)}`;
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    };

    resetBtn.onclick = function() {
        document.getElementById('name').value = '';
        document.getElementById('address').value = '';
        document.getElementById('contactNumber').value = '';
    };

    span.onclick = closeButton.onclick = function() {
        closeModal();
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }

    
    modal.onclick = function(event) {
        event.stopPropagation();
    };
});
