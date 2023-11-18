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
function assignStatus(item_id) {
  const status_num = item_id % 4;
  let status = new String("	");
  switch (+status_num) {
    case 1: {
      status = `<li class="list__col3 fw-semibold" style="color: #329a44">
                                          Đã duyệt
                                      </li>`;
      break;
    }
    default: {
      status = `<li class="list__col3 fw-semibold" style="color: #e7b400">
        Chưa duyệt
    </li>`;
      break;
    }
  }
  return status;
}

function createCard(advertisement) {
  let new_item = document.createElement("div");
  const id = advertisement.globalid;
  new_item.className = "card shadow-sm";
  new_item.id = "list__item" + id;
  new_item.innerHTML = `
                              <div class="card-header" id="brief__info${id}">
                                  <ul class="list__flex">
                                      <li class="list__col1">${
                                        advertisement.type_billboard
                                      }</li>
                                      <li class="list__col2">${
                                        advertisement.address
                                      }</li>
                                      ${assignStatus(id)}
                                      <li class="list__col4">
                                          <button
                                              class="btn collapsed"
                                              id="collapse__btn${id}"
                                              type="button"
                                              onclick="toggleCollapseButton('collapse__btn${id}')"
                                              data-bs-toggle="collapse"
                                              data-bs-target="#full__info${id}"
                                              aria-expanded="false"
                                              aria-controls="full__info${id}">
                                              <i class="bi bi-chevron-down"></i>
                                          </button>
                                      </li>
                                  </ul>
                              </div>
                              <div
                                  id="full__info${id}"
                                  class="collapse"
                                  aria-labelledby="brief__info${id}">
                                  <div class="card-body">
                                      <ul id="full__info__list">
                                          <li class="mock__image__container">
                                              <div class="mock__image">&nbsp;</div>
                                              <div class="mock__image">&nbsp;</div>
                                          </li>
                                          <li>
                                              <p class="fw-bold">Thông tin bảng quảng cáo</p>
                                              <ul>
                                                  <li>
                                                      Kích thước: <span class="fw-bold">${
                                                        advertisement.properties
                                                          .size
                                                      }</span>
                                                  </li>
                                                  <li>
                                                      Số lượng:
                                                      <span class="fw-bold">${
                                                        advertisement.properties
                                                          .amount
                                                      }</span>
                                                  </li>
                                                  <li>
                                                      Hình thức:
                                                      <span class="fw-bold">${
                                                        advertisement.properties
                                                          .type_advertise
                                                      }</span>
                                                  </li>
                                                  <li>
                                                      Phân loại: <span class="fw-bold">${
                                                        advertisement.properties
                                                          .place_type
                                                      }</span>
                                                  </li>
                                              </ul>
                                          </li>
                                          <li>
                                              <p class="fw-bold">Thông tin công ty</p>
                                              <ul>
                                                  <li>
                                                      Tên công ty:
                                                      <span class="fw-bold">${
                                                        advertisement
                                                          .company_info.name
                                                      }</span>
                                                  </li>
                                                  <li>
                                                      Email liên hệ:
                                                      <span class="fw-bold">${
                                                        advertisement
                                                          .company_info.contact
                                                      }</span>
                                                  </li>
                                                  <li>
                                                      Ngày bắt đầu:
                                                      <span class="fw-bold">${
                                                        advertisement
                                                          .company_info
                                                          .start_date
                                                      }</span>
                                                  </li>
                                                  <li>
                                                      Ngày kết thúc:
                                                      <span class="fw-bold">${
                                                        advertisement
                                                          .company_info.end_date
                                                      }</span>
                                                  </li>
                                              </ul>
                                          </li>
                                          <li>
                                              <ul class="buttons__container">
                                             
                                                  <li>
                                                      <button
                                                          class="btn btn-danger"
                                                          data-bs-toggle="modal"
                                                          data-bs-target="#delete__confirm__modal">
                                                          <i class="bi bi-trash"></i>Huỷ yêu cầu
                                                      </button>
                                                  </li>
                                              </ul>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
      `;
  return new_item;
}

const table = document.querySelector("#main__list");
let advertisements = [];

document.getElementById("map__btn").addEventListener("onclick", () => {
  window.location.href = "/Phan-cum-phuong-quan/trangchu.html";
});

$.getJSON("../data/billboard.json", function (data) {
  advertisements = data;
})
  .done(function () {
    console.log(advertisements);
    console.log("second success");

    start_day = new Date(2023, 10, 23);
    end_day = new Date(2025, 10, 23);

    advertisements.forEach((ad) => {
      let billboard = new Billboard(ad.geometry, ad.properties, false, {
        name: "ABC Company",
        contact: "ABCCompany@email.com",
        start_day:
          start_day.getUTCDate() +
          "/" +
          start_day.getUTCMonth() +
          "/" +
          start_day.getUTCFullYear(),
        end_day:
          end_day.getUTCDate() +
          "/" +
          end_day.getUTCMonth() +
          "/" +
          end_day.getUTCFullYear(),
      });
      table.appendChild(createCard(billboard));
    });

    const status_billboards = document.querySelectorAll(
      "#table ul li:not(:first-child) ul li:nth-child(3)"
    );
    status_billboards.forEach((e) => {
      if (e.innerHTML == "Đã duyệt") {
        e.style.color = "#00a41a";
      }
      if (e.innerHTML == "Chưa duyệt") {
        e.style.color = "#ffc701";
      }
    });
  })
  .fail(function () {
    console.log("error");
  })
  .always(function () {
    console.log("complete");
  });
