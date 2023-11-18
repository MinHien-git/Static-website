class Billboard {
    constructor(geometry, properties, license, company_info) {
      this.globalid = properties.globalid;
      this.type_billboard = properties.type;
      this.address = properties.place;
      this.geometry = geometry;
      this.properties = properties;
      this.company_info = company_info;
      this.license = license;
    }
}


function createCard(advertisement) {
    let button_container;
    if (advertisement.license) {
        button_container = `<ul class="button-container"></ul>`
    }
    else {
        button_container = `<ul class="button-container">
            <button type="button" class="btn red-button" id="back-button">Hủy yêu cầu</button>
        </ul>`
    }
    let new_card = document.createElement("li");
    new_card.className = "card";
    new_card.innerHTML = `
    <ul>
        <li>${advertisement.type_billboard}</li>
        <li>${advertisement.address}</li>
        <li>${advertisement.license? "Đã duyệt": "Chưa duyệt"}</li>
        <label for=${advertisement.globalid}><img src="../assets/images/down-arrow.svg" alt="Chi tiết" id="info-image-1"></label>
    </ul>
    <input type="checkbox" class="card-checkbox" id=${advertisement.globalid}>
    <div class="billboard-information-container">
        <div class="billboard-image">
            <div></div>
            <div></div>
        </div>
        <div class="billboard-information">
            <ul class="billboard">
                <li>
                <p>Thông tin bảng quảng cáo:</p>
                    <ul>
                        <li>Kích thước: <span class="bold">${advertisement.properties.size}</span></li>
                        <li>Số lượng: <span class="bold">${advertisement.properties.amount}</span></li>
                        <li>Hình thức: <span class="bold">${advertisement.properties.type_advertise}</span></li>
                        <li>Phân loại: <span class="bold">${advertisement.properties.place_type}</span></li>
                    </ul>
                </li>
                <li>
                    <p>Thông tin công ty:</p>
                    <ul>
                        <li>Thông tin công ty: <span class="bold">${advertisement.company_info.name}</span></li>
                        <li>Thông tin liên lạc: <span class="bold">${advertisement.company_info.contact}</span></li>
                        <li>Ngày bắt đầu: <span class="bold">${advertisement.company_info.start_day}</span></li>
                        <li>Ngày kết thúc: <span class="bold">${advertisement.company_info.end_day}</span></li>
                    </ul>
                </li>
            </ul>
            ${button_container}
        </div>
    </div>`
    console.log(new_card);
    return new_card;
}

const table = document.querySelector("#table ul");
let advertisements = [];

document.getElementById("to-map-btn").addEventListener("onclick", () => {
    window.location.href = "/Phan-cum-phuong-quan/trangchu.html";
})

$.getJSON("../data/billboard.json", function(data) {
    advertisements = data;
 }).done(function() {
    console.log( advertisements );
    console.log( "second success" );

    start_day = new Date(2023, 10, 23);
    end_day = new Date(2025, 10, 23);

    advertisements.forEach(ad => {
        let billboard = new Billboard(ad.geometry, ad.properties, false, {
            name: "ABC Company",
            contact: "ABCCompany@email.com",
            start_day: start_day.getUTCDate() + "/" + start_day.getUTCMonth() + "/" + start_day.getUTCFullYear(),
            end_day: end_day.getUTCDate() + "/" + end_day.getUTCMonth() + "/" + end_day.getUTCFullYear()
        });
        table.appendChild(createCard(billboard))
    });
    
    const status_billboards = document.querySelectorAll("#table ul li:not(:first-child) ul li:nth-child(3)");
    status_billboards.forEach((e)=>{
       if (e.innerHTML == "Đã duyệt") {
           e.style.color = "#00a41a";
       }
       if (e.innerHTML == "Chưa duyệt") {
           e.style.color = "#ffc701";
       }
    })
 })
 .fail(function() {
   console.log( "error" );
 })
 .always(function() {
    console.log( "complete" );
 });