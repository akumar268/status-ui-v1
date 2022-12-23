const Header = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary rounded">
      <div class="container-fluid">
        <a class="navbar-brand fw-bolder" href="#">
          Master Management
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Admin
              </a>
            </li>
          </ul>
          <div class="d-flex">
            <div class="profile">
              <i class="bi bi-person"></i>
            </div>
            <div class="profile-text">
              Micheal Doe
              <span>Panel_Aes</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
