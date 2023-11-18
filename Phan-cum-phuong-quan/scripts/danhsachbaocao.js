class Report {
    constructor(geometry, type, properties) {
        this.globalid = properties.globalid;
        this.type = type;
        this.sender_name = properties.sender_name;
        this.sender_email = properties.sender_email;
        this.sender_number = properties.sender_number;
        this.send_day = properties.send_day;
        this.details = properties.details;
        this.address = properties.place;
        this.image = properties.image;
        this.status = properties.status;
    }
}


function createCard(report) {
    let new_card = document.createElement("li")
    new_card.className = "card"
    new_card.innerHTML = `
    <ul>
        <li>${report.type}</li>
        <li>${report.address}</li>
        <li>${report.send_day}</li>
        <li>${report.status? "Đã xử lý": "Đang xử lý"}</li>
    </ul>`
    return new_card;
}

const table = document.querySelector("#table ul");
let reports = [];
$.getJSON("../data/report.json", function(data) {
    reports = data;
 }).done(function() {
    reports.forEach(rp => {
        let report = new Report(rp.geometry, rp.type, rp.properties)
        table.appendChild(createCard(report))
    });

    const type_billboards = document.querySelectorAll("#table ul li:not(:first-child) ul li:first-child");
    type_billboards.forEach((e)=>{
       if (e.innerHTML == "Tố giác sai phạm") {
           e.style.color = "#ff7b7b";
       }
       if (e.innerHTML == "Đăng ký nội dung") {
           e.style.color = "#699bf7";
       }
       if (e.innerHTML == "Đóng góp ý kiến") {
           e.style.color = "#00a41a";
       }
       if (e.innerHTML == "Giải đáp thắc mắc") {
           e.style.color = "#ffc701";
       }
    })

    const status_billboards = document.querySelectorAll("#table ul li:not(:first-child) ul li:nth-child(4)");
    status_billboards.forEach((e)=>{
       if (e.innerHTML == "Đã xử lý") {
           e.style.color = "#00a41a";
       }
       if (e.innerHTML == "Đang xử lý") {
           e.style.color = "#ffc701";
       }
    })

    const report_redirect = document.querySelectorAll("#table ul li.card");
    report_redirect.forEach((e)=>{
        e.addEventListener("click", () => {
            window.location.href = "/Phan-cum-phuong-quan/chitietbaocao.html";
        })
        e.style.cursor = "pointer";
    })
 })
 .fail(function() {
   console.log( "error" );
 })
 .always(function() {
    console.log( "complete" );
 });