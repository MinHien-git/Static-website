let report_node 

function get_report(position) {
    if(report_node){
        body.removeChild(report_node)
    }
    let report = `
          <div id="report-section-form-container">
          <div id="authentication-close-button" class="authentication-close-button">
            <img
              id="inscreen-report-close"
              src="../assets/images/close.png"
              alt="close button"
            />
          </div>
          <form
            id="inscreen-form-login"
            class="form-container active"
            method="post"
            action="/login"
          >
            <h2>Báo Cáo</h2>
            <div class="form-section">
              <label for="street">Địa chỉ báo cáo:</label>
              <textarea id="street" disabled>${position}</textarea>
            </div>
            <div class="form-section">
              <label for="name">Họ Tên:</label>
              <input
                type="text"
                name="name"
                id="name"
                value=""
                placeholder="Họ và tên người báo cáo"
              />
            </div>
            <div class="form-section">
              <label for="Lemail">Email:</label>
              <input
                type="email"
                name="email"
                id="Lemail"
                value=""
                placeholder="Email"
              />
            </div>
            <div class="form-section">
              <label for="tel">Điện thoại:</label>
              <input
                type="tel"
                name="tel"
                id="tel"
                value=""
                placeholder="Điện thoại liên lạc"
              />
            </div>
            <div class="form-section file-section">
              <p>Thông tin đính kèm:</p>
              <div class="file-button">
                <label for="attached_files">Chọn</label>
                <input
                  type="file"
                  name="attached_files"
                  id="attached_files"
                />
              </div>
            </div>
            <div class="form-section">
              <label for="tel">Thông tin báo cáo:</label>
              <div id="editor"></div>
            </div>
            <div class="form-section">
              <button class="submit-button submit">Gửi</button>
            </div>
          </form>
        </div>`;
    report_node =document.createElement("section");
    report_node.setAttribute("id","report-popup")
    report_node.classList.add("active")

    report_node.innerHTML += report
    body.append(report_node);

    var close = $("#inscreen-report-close")
    close.on("click",()=>{
        body.removeChild(report_node)
        report_node = null
    })

    var quill = new Quill('#editor', {
        theme: 'snow'
     });
}
