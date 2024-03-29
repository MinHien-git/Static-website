let authent_popup = `
    <div id="authentication-section-form-container">
        <div id="authentication-close-button" class="authentication-close-button">
            <img id ="inscreen-authen-close" src = "../assets/images/close.png" alt = "close button"/>
        </div>
        <div id="authentication-form-button-container">
            <button id= "inscreen-switch-login" class="active">Login</button>
            <button id= "inscreen-switch-register">Register</button>
        </div>
        <form id="inscreen-form-login" class="form-container active" method="post" action="https://static-website-server.vercel.app/login">
            <h2>Login</h2>
            <div class="form-section">
                <label for="Lemail">Email:</label>
                <input type="email" name="email" id="Lemail" value="" placeholder ="email">
            </div>
            <div class="form-section">
                <label for="Lpassword">Password:</label>
                <input type="password" name="password" id="Lpassword" value="" placeholder ="password">
            </div>
            <div class="form-section">
                <p><span class="under-line">Forgot password?</span></p>
            </div>
            <div class="form-section">
                <button class="submit-button submit">login</button>
            </div>
            <hr>
            <div class="form-section">
                <button class="btn btn-dark submit-button facebook-submit">Login with Facebook (vào phường/quận)</button>
            </div>
            <div class="form-section">
                <button class="btn btn-dark submit-button google-submit">Login with Google (vào sở VHTT)</button>
            </div>
            <hr>
            <div class="form-section">
                <button class="submit-button second-choice">Register</button>
            </div>
        </form>
        <form id="inscreen-form-register" class="form-container"  method="post" action="https://static-website-server.vercel.app/register">
            <h2>Register</h2>
            <div class="form-section">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" value="" placeholder ="name">
            </div>
            <div class="form-section">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="" placeholder ="email">
            </div>
            <div class="form-section">
                <label for="number">Phone number:</label>
                <input type="tel" name="phone" id="phone" value="" placeholder ="Phone number">
            </div>
            <div class="form-section">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" value="" placeholder ="password">
            </div>
            <div class="form-section">
                <button class="submit-button submit">Register</button>
            </div>
            <hr>
            <div class="form-section">
                <button class="btn btn-dark submit-button facebook-submit">Use Facebook</button>
            </div>
            <div class="form-section">
                <button class="btn btn-dark submit-button google-submit">Use Google</button>
            </div>
            <hr>
            <div class="form-section">
                <button class="submit-button second-choice">Login</button>
            </div>
        </form>
    </div>
`;

let profile = $("#profile");
console.log("called");

profile.on("click", (e) => {
  console.log("click");
  if (!_popup) {
    _popup = document.createElement("section");
    _popup.setAttribute("id", "inscreen-authentication-section");
    _popup.classList.add("active");
    _popup.innerHTML += authent_popup;
    body.append(_popup);
    const close = $("#inscreen-authen-close");

    let switch_login = $("#inscreen-switch-login");
    let switch_register = $("#inscreen-switch-register");

    let login_form = $("#inscreen-form-login");
    let signin_form = $("#inscreen-form-register");

    let login_phuong = $(
      "#inscreen-form-login div button.submit-button.facebook-submit"
    );
    let login_so = $(
      "#inscreen-form-login div button.submit-button.google-submit"
    );

    console.log(login_form);
    console.log(login_so);

    let current_selection = 0;

    switch_login.on("click", (e) => {
      if (current_selection == 1) {
        login_form.toggleClass("active");
        switch_login.toggleClass("active");

        signin_form.toggleClass("active");
        switch_register.toggleClass("active");
        current_selection = 0;
      }
    });

    switch_register.on("click", (e) => {
      if (current_selection == 0) {
        signin_form.toggleClass("active");
        switch_register.toggleClass("active");

        login_form.toggleClass("active");
        switch_login.toggleClass("active");
        current_selection = 1;
      }
    });

    login_phuong.on("click", (e) => {
      e.preventDefault();
      window.location.href = "/Phan-cum-phuong-quan/trangchu.html";
    });

    login_so.on("click", (e) => {
      e.preventDefault();
      window.location.href = "/Phan-cum-soVHTT/map.html";
    });

    $("#inscreen-form-register").on("submit", function (e) {
      e.preventDefault();
      let email = $("#email").val();
      let name = $("#name").val();
      let phone = $("#phone").val();
      let password = $("#password").val();

      let data = {
        password: password,
        name: name,
        phone: phone,
        email: email,
      };
      console.log(data);
      fetch("https://static-website-server.vercel.app/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            alert(data.message);
          }
        });
    });

    $("#inscreen-form-login").on("submit", function (e) {
      e.preventDefault();
      let email = $("#Lemail").val();
      let password = $("#Lpassword").val();
      let data = {
        password: password,
        email: email,
      };
      console.log(data);
      fetch("https://static-website-server.vercel.app/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            alert(data.message);
          }
        });
    });

    close.on("click", () => {
      body.removeChild(_popup);
      _popup = null;
    });
  }
});
