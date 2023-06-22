const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions=[];

function init(){       //updateข้อมูลให้เรา
    list.innerHTML='';
    transactions.forEach(addDataToList);
    calculateMoney();
}
function addDataToList(transactions){           //กรองข้อมูล
    const symbol = transactions.amount < 0 ?'-':'+';    //ถ้าน้อยกว่า0ให้ติด-
    const status = transactions.amount < 0 ? 'minus':'plus';    //สถานะสีของรายการ
    const item=document.createElement('li');    //สร้างli
    result = formatNumber(Math.abs(transactions.amount));   //สร้างresultเพื่อนำค่าไปเเสดงบรรทัดที่22
    item.classList.add(status);             //addคลาสไปที่li
    item.innerHTML=`${transactions.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`;
    list.appendChild(item)                      //นำliที่สร้างไปไว้ในlist
}
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function autoID(){
    return Math.floor(Math.random()*1000000)
}

function calculateMoney(){
    const amounts=transactions.map(transactions=>transactions.amount);  //เหมือนforEachเเต่นำค่าไปใช้ต่อได้ outputเป็นarray เเล้วเราก็เอาค่าไปใช้ต่อที่total income expense
    //คำนวณยอดคงเหลือ
    const total=amounts.reduce((result,item)=>(result+=item),0).toFixed(2); //รวมผลลัพธ์
    // คำนวณรายรับ
    const income=amounts.filter(item=>item>0).reduce((result,item)=>(result+=item),0).toFixed(2);   //กรองหาค่าผลบวกเเล้วนำมารวมกัน
    // คำนวณรายจ่าย
    const expense=(amounts.filter(item=>item<0).reduce((result,item)=>(result+=item),0)*-1).toFixed(2); 

    // แสดงผลทางจอภาพ
    balance.innerText=`฿`+formatNumber(total); //ใช้ฟังชั่นformatNumberจัดการค่าของtotal
    money_plus.innerText=`฿`+formatNumber(income);
    money_minus.innerText=`฿`+formatNumber(expense);
}

function removeData(id){
    transactions=transactions.filter(transactions=>transactions.id !==id);
    init();
}
function addTransaction(e){     //ฟังชั่นของปุ่ม
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){     //เช็คว่ามีค่าว่างหรือไม่
        alert("กรุณาป้อนข้อมูลให้ครบ");
    }else{
        const data={
            id:autoID(),
            text:text.value,
            amount:+amount.value
        }
        
        transactions.push(data);
        addDataToList(data);
        calculateMoney();
        text.value='';
        amount.value='';
    }
}

form.addEventListener('submit',addTransaction);
init();
