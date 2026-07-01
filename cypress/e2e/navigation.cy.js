describe("Navigation Testing", () => {

    const URL = "https://portal.ut.edu.vn/";
    const CREDENTIALS = {
        username: "087205006588",
        password: "abcxyz"
    };

    // ====== Helper Functions ======
    const login = () => {
        cy.visit(URL);
        cy.get('input[name="username"]').type(CREDENTIALS.username);
        cy.get('input[name="password"]').type(CREDENTIALS.password);
        cy.contains("button", "Đăng nhập").click();
        cy.url().should("include", "/dashboard");
    };

    const navigateTo = (path) => {
        cy.visit(URL + path);
        cy.url().should("include", "/" + path);
    };

    const checkMenuVisible = (items) => {
        items.forEach((item) => {
            cy.contains(item).should("be.visible");
        });
    };

    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.session("login", login, {
            validate() {
                cy.visit(URL + "dashboard");
                cy.url().should("include", "/dashboard");
            }
        });
        navigateTo("dashboard");
    });

    // TC_NAV_01: Sidebar Toggle - dùng viewport mobile để sidebar dùng Temporary Drawer
    it("TC_NAV_01 - Verify Sidebar toggles on Hamburger click", () => {
        cy.viewport(768, 1024);
        navigateTo("dashboard");

        // Click hamburger để mở sidebar
        cy.get('svg[data-testid="ViewHeadlineRoundedIcon"]').first().parent().click({ force: true });
        checkMenuVisible(["Thông tin chung", "Học tập"]);
    });

    // TC_NAV_02: Sidebar Collapse - dùng viewport mobile, đóng bằng backdrop
    it("TC_NAV_02 - Verify Sidebar collapse functionality", () => {
        cy.viewport(768, 1024);
        navigateTo("dashboard");

        // Mở sidebar
        cy.get('svg[data-testid="ViewHeadlineRoundedIcon"]').first().parent().click({ force: true });
        cy.contains("Thông tin chung").should("be.visible");

        // Đóng sidebar bằng cách click vào vùng ngoài (backdrop)
        cy.get('.MuiBackdrop-root').click({ force: true });
        cy.contains("Thông tin chung").should("not.exist");
    });

    // TC_NAV_03: 'Thông tin chung' menu navigation
    it("TC_NAV_03 - Verify 'Thông tin chung' menu navigation", () => {
        // Mở rộng nhóm "Thông tin chung"
        cy.contains("Thông tin chung", { timeout: 10000 }).should("be.visible").click({ force: true });

        // Click vào menu con "Thông tin chi tiết"
        cy.contains("Thông tin chi tiết").click({ force: true });

        cy.url().should("include", "/infordetail");
        cy.contains("Cập nhật thông tin").should("be.visible");
        cy.contains("Tin tức").should("be.visible");
        cy.contains("Thông tin chi tiết").should("be.visible");
    });

    // TC_NAV_04: 'Học tập' menu verification
    it("TC_NAV_04 - Verify 'Học tập' menu", () => {
        const menuItems = [
            { selector: 'a[href*="courses.ut.edu.vn"]', text: "Đào tạo trực tuyến" },
            { selector: 'a[href="/transcript"]', text: "Kết quả học tập" },
            { selector: 'a[href="/coursesregistration"]', text: "Đăng ký học phần" },
            { selector: 'a[href="/conditional"]', text: "Đăng ký môn học điều kiện" },
            { selector: 'a[href="/educationprogram"]', text: "Chương trình khung" }
        ];

        cy.contains("Học tập").should("be.visible");

        menuItems.forEach(item => {
            cy.get(item.selector).first().should("contain", item.text);
        });
    });

    // TC_NAV_05: Navigation to 'Kết quả học tập'
    it("TC_NAV_05 - Verify navigation to 'Kết quả học tập'", () => {
        cy.get('a[href="/transcript"]').first().click({ force: true });
        cy.url().should("include", "/transcript");
    });

    // TC_NAV_06: Navigation to 'Đăng ký học phần'
    it("TC_NAV_06 - Verify navigation to 'Đăng ký học phần'", () => {
        cy.get('a[href="/coursesregistration"]').first().click({ force: true });
        cy.url().should("include", "/coursesregistration");
    });

    // TC_NAV_07: Navigation to Online Payment
    it("TC_NAV_07 - Verify navigation to Online Payment", () => {
        cy.get('a[href="/tuition"]').first().click({ force: true });
        cy.url().should("include", "/tuition");
    });

    // TC_NAV_08: User Profile Dropdown
    it("TC_NAV_08 - Verify User Profile dropdown", () => {
        cy.get('#user-button').click({ force: true });
        checkMenuVisible(["Thông tin cá nhân", "Đổi mật khẩu trang sinh viên", "Đăng xuất"]);
    });

    // TC_NAV_09: Logo Navigation
    it("TC_NAV_09 - Verify navigation via School Logo", () => {
        cy.get('a[href="/transcript"]').first().click({ force: true });
        cy.url().should("include", "/transcript");

        cy.get('img[alt="sv_logo_dashboard.png"]').click({ force: true });
        cy.url().should("include", "/dashboard");
    });

    // TC_NAV_10: URL Consistency During Navigation
    it("TC_NAV_10 - Verify URL consistency during navigation", () => {
        const navigationPaths = [
            { href: 'a[href="/transcript"]', expectedUrl: "/transcript" },
            { href: 'a[href="/coursesregistration"]', expectedUrl: "/coursesregistration" },
            { href: 'a[href="/conditional"]', expectedUrl: "/conditional" }
        ];

        navigationPaths.forEach(nav => {
            cy.get(nav.href).first().click({ force: true });
            cy.url().should("include", nav.expectedUrl);
            navigateTo("dashboard");
        });
    });

});