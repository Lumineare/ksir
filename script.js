// Daftar barang dan harga
const items = [
    { name: "Beras 5kg", price: 75000 },
    { name: "Minyak Goreng 1L", price: 18000 },
    { name: "Gula 1kg", price: 16000 },
    { name: "Telur 1kg", price: 28000 },
    { name: "Sabun Cair 500ml", price: 25000 },
    { name: "Pasta Gigi", price: 12000 },
    { name: "Roti Tawar", price: 20000 },
    { name: "Susu UHT 1L", price: 22000 }
];

// Format Rupiah
function formatRupiah(amount) {
    return `Rp ${amount.toLocaleString('id-ID')}`;
}

// Generate transaksi baru
function newTransaction() {
    const itemList = document.getElementById('item-list');
    const totalElement = document.getElementById('total');
    const paymentInput = document.getElementById('payment');
    const resultDiv = document.getElementById('result');
    const newTransactionBtn = document.getElementById('new-transaction');
    
    // Reset tampilan
    itemList.innerHTML = '';
    paymentInput.value = '';
    resultDiv.classList.add('hidden');
    newTransactionBtn.classList.add('hidden');
    
    // Pilih 1-5 barang secara acak
    const numItems = Math.floor(Math.random() * 5) + 1;
    const selectedItems = [];
    const indices = Array.from({ length: items.length }, (_, i) => i);
    for (let i = 0; i < numItems; i++) {
        const randomIndex = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];
        selectedItems.push(items[randomIndex]);
    }
    
    // Tampilkan barang
    let total = 0;
    selectedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}: ${formatRupiah(item.price)}`;
        itemList.appendChild(li);
        total += item.price;
    });
    
    totalElement.textContent = formatRupiah(total);
    window.currentTotal = total; // Simpan total untuk perhitungan
}

// Proses pembayaran
function processPayment() {
    const paymentInput = document.getElementById('payment');
    const paidAmount = parseInt(paymentInput.value);
    const total = window.currentTotal;
    
    if (isNaN(paidAmount) || paidAmount < total) {
        alert('Masukkan jumlah uang yang valid dan cukup!');
        return;
    }
    
    const change = paidAmount - total;
    
    // Tampilkan hasil
    document.getElementById('paid-amount').textContent = formatRupiah(paidAmount);
    document.getElementById('change').textContent = formatRupiah(change);
    document.getElementById('paid-display').textContent = formatRupiah(paidAmount);
    document.getElementById('total-display').textContent = formatRupiah(total);
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('new-transaction').classList.remove('hidden');
    
    window.currentChange = change; // Simpan kembalian untuk pengecekan
}

// Cek kembalian manual
function checkManualChange() {
    const manualChangeInput = document.getElementById('manual-change');
    const manualChange = parseInt(manualChangeInput.value);
    const feedback = document.getElementById('feedback');
    
    if (isNaN(manualChange)) {
        feedback.textContent = 'Masukkan angka yang valid!';
        feedback.className = 'wrong';
        return;
    }
    
    if (manualChange === window.currentChange) {
        feedback.textContent = 'Benar! Anda berhasil menghitung kembalian!';
        feedback.className = 'correct';
    } else {
        feedback.textContent = `Salah! Kembalian yang benar adalah ${formatRupiah(window.currentChange)}.`;
        feedback.className = 'wrong';
    }
}

// Inisialisasi transaksi pertama
newTransaction();