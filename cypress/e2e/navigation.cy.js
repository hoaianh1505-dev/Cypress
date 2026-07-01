describe("Navigation Testing", () => {

    const URL = "https://portal.ut.edu.vn/";
    const CREDENTIALS = {
        username: "049205002122",
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
    };

    const checkMenuVisible = (menuItems) => {
        menuItems.forEach(item => {
            cy.contains(item).should("be.visible");
        });
    };

    beforeEach(() => {
        cy.session("login", login, {
            validate() {
                cy.visit(URL + "dashboard");
                cy.url().should("include", "/dashboard");
            }
        });
        navigateTo("dashboard");
    });

    // TC_NAV_01 & TC_NAV_02: Sidebar Toggle
    it("TC_NAV_01 - Verify Sidebar toggles on Hamburger click", () => {
        cy.get('svg[data-testid="ViewHeadlineRoundedIcon"]').parent().click();
        checkMenuVisible(["Thông tin chung", "Học tập"]);
    });


    it("TC_NAV_02 - Verify Sidebar collapse functionality", () => {
        cy.get('svg[data-testid="ViewHeadlineRoundedIcon"]').click({ force: true });
        cy.get('svg[data-testid="ViewHeadlineRoundedIcon"]').click({ force: true });
        cy.contains("Thông tin chung").should("not.exist");
    });

    // TC_NAV_03 & TC_NAV_04: Menu Verification
    it("TC_NAV_03 - Verify 'Thông tin chung' menu navigation", () => {
        // Tắt pop-up khảo sát nếu xuất hiện
        cy.wait(2000);
        cy.get('body').then(($body) => {
            if ($body.find('.MuiModal-backdrop, .MuiBackdrop-root').length > 0) {
                cy.contains(/để sau/i).click({ force: true });
                cy.wait(1000);
            }
        });

        // Đảm bảo Sidebar được MỞ bằng cách click vào nút menu hamburger nếu nó đang đóng
        cy.get('body').then(($body) => {
            const isSidebarVisible = $body.find(':contains("Thông tin chung")').length > 0 && $body.find(':contains("Thông tin chung")').is(':visible');
            if (!isSidebarVisible) {
                cy.get('svg[data-testid="ViewHeadlineRoundedIcon"]').first().click({ force: true });
                cy.wait(1000);
            }
        });

        // Click mở rộng nhóm "Thông tin chung"
        cy.contains("Thông tin chung", { timeout: 10000 }).should("be.visible").click({ force: true });
        cy.wait(500);

        // Click vào menu con "Thông tin chi tiết" để chuyển trang
        cy.contains("Thông tin chi tiết").click({ force: true });

        cy.url().should("include", "/infordetail");

        cy.contains("Cập nhật thông tin").should("be.visible");
        cy.contains("Tin tức").should("be.visible");
        cy.contains("Thông tin chi tiết").should("be.visible");
    });

    it("TC_NAV_04 - Verify 'Học tập' menu", () => {
        // Tắt pop-up khảo sát nếu xuất hiện
        cy.wait(2000);
        cy.get('body').then(($body) => {
            if ($body.find('.MuiModal-backdrop, .MuiBackdrop-root').length > 0) {
                cy.contains(/để sau/i).click({ force: true });
                cy.wait(1000);
            }
        });

        // Đảm bảo Sidebar được MỞ bằng cách kiểm tra chính xác vùng Sidebar/Drawer
        cy.get('body').then(($body) => {
            const drawer = $body.find('.MuiDrawer-paper, [class*="drawer"], [class*="sidebar"], aside');
            const isOpen = drawer.length > 0 && drawer.is(':visible') && drawer.text().includes("Học tập");
            if (!isOpen) {
                cy.get('svg[data-testid="ViewHeadlineRoundedIcon"]').first().click({ force: true });
                cy.wait(1000);
            }
        });

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

    // TC_NAV_05 through TC_NAV_07: Navigation Tests
    it("TC_NAV_05 - Verify navigation to 'Kết quả học tập'", () => {
        cy.get('a[href="/transcript"]').click();
        cy.url().should("include", "/transcript");
    });

    it("TC_NAV_06 - Verify navigation to 'Đăng ký học phần'", () => {
        cy.get('a[href="/coursesregistration"]').first().click();
        cy.url().should("include", "/coursesregistration");
    });

    it("TC_NAV_07 - Verify navigation to Online Payment", () => {
        cy.get('a[href="/tuition"]').click();
        cy.url().should("include", "/tuition");
    });

    // TC_NAV_08: User Profile Dropdown
    it("TC_NAV_08 - Verify User Profile dropdown", () => {
        // Tắt pop-up khảo sát nếu xuất hiện
        cy.wait(2000);
        cy.get('body').then(($body) => {
            if ($body.find('.MuiModal-backdrop, .MuiBackdrop-root').length > 0) {
                cy.contains(/để sau/i).click({ force: true });
                cy.wait(1000);
            }
        });

        // Click bình thường (không force) vào #user-button để kích hoạt sự kiện React
        cy.get('#user-button').click();

        // Đợi menu xuất hiện và kiểm tra các mục hiển thị
        cy.wait(1000);
        checkMenuVisible(["Thông tin cá nhân", "Đổi mật khẩu trang sinh viên", "Đăng xuất"]);
    });

    // TC_NAV_09: Logo Navigation
    it("TC_NAV_09 - Verify navigation via School Logo", () => {
        cy.get('a[href="/transcript"]').click();
        cy.url().should("include", "/transcript");

        cy.get('img[alt="sv_logo_dashboard.png"]').click();
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
            cy.get(nav.href).first().click();
            cy.url().should("include", nav.expectedUrl);
            navigateTo("dashboard");
        });
    });

});