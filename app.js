const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');

const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

const rateText = document.getElementById('rate');
const swap = document.getElementById('btn');

// ตัวแปรสำหรับสลับสกุลเงิน
currency_one.addEventListener('change', calculateMoney);
currency_two.addEventListener('change', calculateMoney);
// ตัวแปรสำหรับคำนวณสกุลเงิน
amount_one.addEventListener('input', calculateMoney);
amount_two.addEventListener('input', calculateMoney); 

function calculateMoney() {
    const one = currency_one.value;
    const two = currency_two.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${one}`) // เรียกใช้งาน API 
        .then(res => res.json()).then(data => {  // return ค่าเป็นไฟล์ json และเก็บลงใน data
            const rate = data.rates[two]; // สร้างตัวแปร rate มาเก็บสกุลเงินปลายทาง (สกุลเงินที่ 2)
            rateText.innerText = `1 ${one} = ${rate} ${two}`; // นำไปแสดงผลในช่องอัตราแลกเปลี่ยน
            amount_two.value = (amount_one.value * rate); // คำนวณอัตราการแลกเปลี่ยน
        })
}
swap.addEventListener('click', () => {
    // USD => THB || THB => USD 
    // TEMP => USD || THB = TEMP (USD)
    const temp = currency_one.value; // ต้นทาง เอาตัวแปร temp มาเก็บค่าไว้ชั่วคราว
    currency_one.value = currency_two.value; 
    currency_two.value = temp;
    calculateMoney();
})

calculateMoney();