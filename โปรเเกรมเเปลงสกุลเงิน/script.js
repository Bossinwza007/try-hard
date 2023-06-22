const currency_one=document.getElementById('currency-one');
const currency_two=document.getElementById('currency-two');

const amount_one=document.getElementById('amount-one');
const amount_two=document.getElementById('amount-two');

const rateText=document.getElementById('rate');
const swap=document.getElementById('btn');


currency_one.addEventListener('change',calculateMoney);
currency_two.addEventListener('change',calculateMoney);

amount_one.addEventListener('input',calculateMoney);
amount_two.addEventListener('input',calculateMoney);

function calculateMoney(){
    const one = currency_one.value;
    const two = currency_two.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${one}`) //ดึงข้อมูลได้ค่าเป็น promise
    .then(res=>res.json()).then(data=>{                        //ต้องการให้เกิดเหตุการณ์อะไรขึ้น //ได้ค่า promise เป็น json เเล้วก็เอาค่ามาทำเป็น data ต่อ
        const rate=data.rates[two];                            //rates เป็นค่าสกุลเงินใน data
        rateText.innerText=`1 ${one} = ${rate} ${two}`;
        amount_two.value=(amount_one.value*rate).toFixed(2);
    })
}

swap.addEventListener('click',()=>{
    const temp = currency_one.value; //ใช้tempเป็นตัวเเปรพักค่า
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculateMoney()
})

calculateMoney();