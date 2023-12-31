let map = null;
let defaultCoord = [10.7743, 106.6669]; // coord mặc định, 9 giữa HCMC
let zoomLevel = 13;
const api_key = "3dbf2ce56c45401b855931d7f3828a85";
let popup = L.popup();
let billboards = [];

$.getJSON("../../data/billboard.json", function (json) {
  billboards = json; // this will show the info it in firebug console
});
console.log(billboards);
let infoboards = document.getElementById("info");
let current_feature = null;

let current_marker = null;
let requestOptions = {
  method: "GET",
};

var geojsonMarkerOptions = {
  radius: 8,
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

function setInfoBoard() {
  if (current_feature) {
    infoboards.innerHTML = "";
    infoboards.innerHTML = `<div class="info_container">
        <div class="info-close"><img src = "../assets/images/close.png"></div>
        <div class="info_container-image1"><img class="ad-image" src = "${
          current_feature.properties.image
        }" alt = "image-1"></div>
        <div class="info_container-image2"><img class="ad-image" src = "${
          current_feature.properties.image
        }" alt = "image-2"></div>
        <div class="info-container-info">
          <h2>${current_feature.properties.type}</h2>
          <p>${current_feature.properties.place}</p>
          <p>Kích thước: <span class="bold">${
            current_feature.properties.size
          }</span></p>
          <p>Số lượng: <span class="bold">${
            current_feature.properties.amount
          }</span></p>
          <p>Hình thức: <span class="bold">${
            current_feature.properties.type_advertise
          }</span></p>
          <p>Phân Loại: <span class="bold">${
            current_feature.properties.place_type
          }</span></p>
        </div>
        <div class="info-container-info">
        <h3>Thông tin công ty</h3>
        <p>Thông tin công ty: <span class="bold">ABC Company</span></p>
        <p>Liên lạc: <span class="bold">ABCCompany@email.com</span></p>
        <p>Ngày bắt đầu: <span class="bold">dd/mm/yyyy</span></p>
        <p>Ngày kết thúc đầu: <span class="bold">dd/mm/yyyy</span></p>
        ${
          is_offical != 0
            ? `
          <p>Trạng thái: <span class="bold status ${
            current_feature.properties.status ? "complete" : ""
          }">${
                current_feature.properties.status ? "Đã duyệt" : "Chưa duyệt"
              }</span></p>
          ${
            is_offical == 1
              ? !current_feature.properties.status
                ? `<div class="flex button-container"><button class="request"><img src="../assets/images/information.png" alt="report">Cấp phép</button><button class="report"><img src="../assets/images/red-edit.png" alt="report">Huỷ yêu cầu</button></div>`
                : ""
              : is_offical == 2
              ? `<div class="flex button-container"><button class="request"><img src="../assets/images/information.png" alt="report">Cấp phép</button><button class="request-edit"><img src="../assets/images/information.png" alt="report">Y/C chỉnh</button><button class="report"><img src="../assets/images/red-edit.png" alt="report">Từ chối</button></div>`
              : ""
          }
          
        </div>`
            : ""
        }
      </div>`;

    $(".info-close").on("click", () => {
      console.log("click");
      infoboards.classList.remove("active");
    });
    let request_btn = $("#info .request");
    if (request_btn) {
      request_btn.on("click", () => {
        console.log("click");
        get_resquest(current_feature.properties.place);
      });
    }
  }
}

function onMapClick(e) {
  let data;
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&apiKey=3dbf2ce56c45401b855931d7f3828a85`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      data = result;
      console.log(result);
      popup
        .setLatLng(e.latlng)
        .setContent(
          `<h3>${data.features[0].properties.address_line1}</h3>
          <p>${data.features[0].properties.address_line2}</p>
          <div class="infomation">
          <h4>Thông tin</h4>
          <p>Chưa có thông tin</p>
          </div>
          ${
            is_offical != 0
              ? '<button class="edit"><img src="../assets/images/edit-yellow.png" alt="report">Chỉnh sửa</button>'
              : '<button class="report"><img src="../assets/images/report-fill.png" alt="report">Báo cáo</button>'
          }`
        )
        .openOn(map);

      let btn = is_offical == 0 ? $(".report") : $(".edit");
      btn.on("click", () => {
        current_feature = data.features[0];
        get_report(data.features[0].properties.address_line2);
      });
    })
    .catch((error) => console.log("error", error));
}

window.onload = function () {
  // init map
  map = L.map("map", {
    attributionControl: false,
  }).setView(defaultCoord, 20);

  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const address_search_controller = L.control.addressSearch(api_key, {
    position: "topleft",
    resultCallback: (address) => {
      if (current_marker) {
        map.removeLayer(current_marker);
      }
      current_marker = L.marker([address.lat, address.lon]).addTo(map);
      map.setView([address.lat, address.lon]);
    },
  });

  map.zoomControl.setPosition("topright");
  var lc = L.control
    .locate({
      position: "topright",
      strings: {
        title: "Show me where I am, yo!",
      },
      enableHighAccuracy: true,
      keepCurrentZoomLevel: true,
    })
    .addTo(map);
  map.addControl(address_search_controller);
  map.on("click", onMapClick);
  let geojsonLayer = L.geoJSON(billboards, {
    pointToLayer: function (feature, latlng) {
      const attributionDiv = document.createElement("div");
      const button_container = document.createElement("div");
      const report_button = document.createElement("button");
      const info_button = document.createElement("button");

      attributionDiv.setAttribute("id", "content" + feature._id);
      button_container.classList.add("button_container");
      info_button.classList.add("info");
      info_button.setAttribute("id", "info-" + feature._id);
      report_button.classList.add(is_offical != 0 ? "edit" : "report");
      report_button.setAttribute("id", "report-" + feature._id);

      attributionDiv.innerHTML = `<h3>${feature.properties.type}</h3>
          <p>${feature.properties.place}</p>
          <p>Kích thước: <span class="bold">${
            feature.properties.size
          }</span></p>
          <p>Số lượng: <span class="bold">${
            feature.properties.amount
          }</span></p>
          <p>Hình thức: <span class="bold">${
            feature.properties.type_advertise
          }</span></p>
          <p>Phân Loại: <span class="bold">${
            feature.properties.place_type
          }</span></p>
          <p>Quy Hoạch: <span class="bold">${
            feature.properties.zoning ? "Đã Quy Hoạch" : "Chưa Quy Hoạch"
          }</span></p>
          `;
      info_button.innerHTML = `<img src="../assets/images/information.png" alt="information">Thông tin`;
      report_button.innerHTML =
        is_offical != 0
          ? `<img src="../assets/images/edit-yellow.png" alt="edit">Chỉnh sửa`
          : `<img src="../assets/images/report-fill.png" alt="report">Báo cáo`;

      button_container.appendChild(info_button);
      button_container.appendChild(report_button);

      report_button.addEventListener("click", (e) => {
        current_feature = feature;
        get_report(feature.properties.place);
      });

      info_button.addEventListener("click", (e) => {
        console.log("check-info :" + feature._id, feature);
        current_feature = feature;
        setInfoBoard();
        if (!infoboards.classList.contains("active"))
          infoboards.classList.add("active");
      });
      attributionDiv.appendChild(button_container);

      return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(
        attributionDiv
      );
    },
    style: function (feature) {
      if (!feature.properties.zoning) {
        return {
          color: "#ff0000",
          fillColor: "#ff0000",
        };
      } else {
        return {
          color: "#0000ff",
          fillColor: "#0000ff",
        };
      }
    },
  }).addTo(map);
};
